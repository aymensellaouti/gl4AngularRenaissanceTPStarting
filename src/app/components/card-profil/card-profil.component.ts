import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-card-profil',
    templateUrl: './card-profil.component.html',
    styleUrls: ['./card-profil.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FormsModule]
})
export class CardProfilComponent {
  name = 'sellaouti';
  firstname = 'aymen';
  job = 'teacher';
  path = 'rotating_card_profile.png';
}
