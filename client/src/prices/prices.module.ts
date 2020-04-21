import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PricesListComponent } from './list';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [
        PricesListComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        PricesListComponent
    ]
})
export class PricesModule { }
