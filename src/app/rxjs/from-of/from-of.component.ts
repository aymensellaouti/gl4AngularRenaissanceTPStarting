import { Component, ChangeDetectionStrategy } from '@angular/core';
import { from, of } from 'rxjs';

@Component({
    selector: 'app-from-of',
    templateUrl: './from-of.component.html',
    styleUrls: ['./from-of.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FromOfComponent {
  data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  from$ = from(this.data).subscribe((data) => {
    console.log(`from: ${data}`);
  });
  of$ = of(this.data).subscribe((data) => {
    console.log(`of: ${data}`);
  });
}
