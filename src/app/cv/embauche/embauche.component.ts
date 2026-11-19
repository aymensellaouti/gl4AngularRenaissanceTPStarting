import { Component, inject } from '@angular/core';
import { EmbaucheService } from '../services/embauche.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-embauche',
  templateUrl: './embauche.component.html',
  styleUrls: ['./embauche.component.css'],
  imports: [ItemComponent],
})
export class EmbaucheComponent {
  private embaucheService = inject(EmbaucheService);

  embauchees = this.embaucheService.embauchees;
}
