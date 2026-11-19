import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-counter',
    templateUrl: './counter.component.html',
    styleUrls: ['./counter.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class CounterComponent {
  @Input()
  public startCount = 0;

  public count = 0;

  public ngOnChanges(): void {
    this.count = this.startCount;
  }

  public increment(): void {
    this.count++;
  }

  public decrement(): void {
    this.count--;
  }
}
