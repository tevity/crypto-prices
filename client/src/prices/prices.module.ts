import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PricesList } from './list';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        PricesList
    ],
    exports: [
        CommonModule,
        FormsModule,
        PricesList
    ]
})
export class PricesModule { }
