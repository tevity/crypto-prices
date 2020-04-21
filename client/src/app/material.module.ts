import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';


@NgModule({
    imports: [
        MatCardModule,
        MatTableModule
    ],
    exports: [
        MatCardModule,
        MatTableModule
    ]
})
export class MaterialModule { }
