import { Component } from '@angular/core';


@Component({
    selector: 'chair',
    templateUrl: './chair.component.html'
})
export class ChairComponent {

    colors: string[];

    onColorChanged(colors) {this.colors = colors}
}
