import { IsNumber, IsString, Length, Max, Min } from "class-validator";

export class CNameRequest {
  @IsString()
  @Length(1, 250)
  domainName!: string;

  @IsString()
  @Length(1, 250)
  cname!: string;

  @IsString()
  @Length(1, 15)
  cnameTarget!: string;

  @IsNumber()
  @Min(300)
  @Max(2147483647)
  ttl!: number;

  constructor(domainName: string, cname: string, cnameTarget: string, ttl: number) {
    this.domainName = domainName;
    this.cname = cname;
    this.cnameTarget = cnameTarget;
    this.ttl = ttl;
  }
}
