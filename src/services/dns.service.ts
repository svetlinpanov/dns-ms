import { CNameRequest } from "../models";
import { injectable } from "inversify";
import fetch, { RequestInit } from "node-fetch";
import { Resolver, promises } from "dns";

@injectable()
export class DnsService {
  private testServiceEndpoint =
    process.env.DNS_SERVICE_ENDPOINT || "http://localhost:3000";
  private resolver: promises.Resolver;
  constructor() {
    this.resolver = new promises.Resolver();
    this.resolver.setServers([process.env.DNS_SERVER || "127.0.0.1"]);
  }

  public async createCNameRecord(request: CNameRequest): Promise<boolean> {
    const requestOptions: RequestInit = { method: "POST", body: JSON.stringify(request) };
    const response = await fetch(
      `${this.testServiceEndpoint}${"/api/dns/"}`,
      requestOptions,
    );
    const data = await response.json();
    // DNS service should return true if the post request is successful
    if (data) {
      return await this.checkDnsReservation(request.cname);
    }
    return false;
  }

  public async checkDnsReservation(cname: string): Promise<boolean> {
    try {
      // I am not completelly sure if i have to use resolveCname or just resolve, resolveAny is used for demo purposes
      const addreses = await this.resolver.resolveAny(cname);
      return addreses.length > 0 ? true : false;
    } catch (error) {
      return false;
    }
  }
}
