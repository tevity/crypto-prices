import { of } from "rxjs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PricesConfig {
    // Observable as this could be configured during deployment/ make an HTTP call, or whatever
    get pollingMilliseconds() { return of(1000); }
}