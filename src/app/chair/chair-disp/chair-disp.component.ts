import { Component, Input } from '@angular/core';


@Component({
    selector: 'chair-disp',
    templateUrl: './chair-disp.component.html'
})
export class ChairDispComponent {
    @Input() colors: string[];
    //
    // ngOnChange() {
    //     console.log(this.colors);
    // }
}