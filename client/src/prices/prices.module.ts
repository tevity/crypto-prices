import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PricesList } from './list';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
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
