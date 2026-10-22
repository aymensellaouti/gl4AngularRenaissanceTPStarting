import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-two',
    templateUrl: './two.component.html',
    styleUrls: ['./two.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule]
})
export class TwoComponent {
  two = 'init value';
}
