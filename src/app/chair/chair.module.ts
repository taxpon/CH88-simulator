import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { routes } from './chair.routing';

import { ChairComponent } from './chair.component';
import { ChairDispComponent } from './chair-disp/chair-disp.component';


@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule
    ],
    declarations: [
        ChairComponent,
        ChairDispComponent
    ],
    exports: [
        ChairComponent,
        ChairDispComponent
    ]
})
export class ChairModule {}