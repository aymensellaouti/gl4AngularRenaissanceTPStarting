import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FilsComponent } from '../fils/fils.component';

@Component({
    selector: 'app-pere',
    templateUrl: './pere.component.html',
    styleUrls: ['./pere.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FilsComponent]
})
export class PereComponent {
  onSendMessageToDad(message: string) {
    alert(message);
  }
}
