import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PricesService } from '../prices.service';
import { CryptoPrice } from '../crypto-price.model';

@Component({
    selector: 'kg-prices-list',
    templateUrl: './prices-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PricesListComponent implements OnInit {
    readonly displayedColumns = ['name', 'price', 'date'];
    public prices$: Observable<CryptoPrice[]>;

    constructor(private pricesService: PricesService) { }

    ngOnInit() {
        this.prices$ = this.pricesService.streamPrices();
    }

    getPriceId(index: number, price: CryptoPrice) {
        return price.name;
    }
}
