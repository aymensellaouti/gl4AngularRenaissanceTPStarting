import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { HighlightDirective } from '../highlight.directive';

@Component({
    selector: 'app-ngclass',
    templateUrl: './ngclass.component.html',
    styleUrls: ['./ngclass.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NgClass, HighlightDirective]
})
export class NgclassComponent {
  isAllume = false;
  interrupteur() {
    this.isAllume = !this.isAllume;
  }
}
