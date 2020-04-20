import { Injectable } from "@nestjs/common";
import { CryptoPrice } from './crypto-price.interface';

@Injectable()
export class PricesService {
    listPrices(): CryptoPrice[] {
        return [];
    }
}