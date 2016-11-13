import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'chair-control',
    templateUrl: './chair-control.component.html'
})
export class ChairControlComponent {
    colors: string[] = ['#000000', '#000000', '#000000'];

    @Output() colorChanged: EventEmitter<string[]> = new EventEmitter();

    onColorChanged(color, index) {
        this.colors[index] = color;
        this.colorChanged.emit(this.colors);
    }
}