import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RainbowDirective } from '../rainbow.directive';

@Component({
    selector: 'app-ngstyle',
    templateUrl: './ngstyle.component.html',
    styleUrls: ['./ngstyle.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgStyle, RainbowDirective]
})
export class NgstyleComponent {
  @Input() color = 'lightgreen';
}
