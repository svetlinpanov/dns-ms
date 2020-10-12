export interface CNameRequest {
  domainName: string;
  cname: string;
  cname_target: string;
  ttl: number;
}
