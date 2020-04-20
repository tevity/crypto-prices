import { Injectable } from "@nestjs/common";
import { CryptoPrice } from "../crypto-price.model";
import { CryptoApisCryptoPrice } from "./crypto-apis-crypto-price.model";

@Injectable()
export class CryptoApisMapper {
    mapCryptoPrice(cryptoApiPrice: CryptoApisCryptoPrice): CryptoPrice {
        return {
            date: new Date(cryptoApiPrice.lastUpdate),
            name: cryptoApiPrice.name,
            price: cryptoApiPrice.price
        }
    }
}