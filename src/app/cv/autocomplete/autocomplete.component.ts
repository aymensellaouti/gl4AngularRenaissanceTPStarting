import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal, rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Cv } from '../model/cv';
import { CvService } from '../services/cv.service';
import { CvCardComponent } from '../cv-card/cv-card.component';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  imports: [FormsModule, CvCardComponent],
})
export class AutocompleteComponent {
  private cvService = inject(CvService);

  /** Signal lié au champ de recherche via [(ngModel)] */
  search = signal('');

  /**
   * Signal debouncé :
   * Les signaux sont synchrones et n'ont pas de debounce natif.
   * On passe par l'interop RxJS : toObservable -> debounceTime(400) -> distinctUntilChanged -> toSignal
   */
  debouncedSearch = toSignal(
    toObservable(this.search).pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  /**
   * Ressource réactive de recherche :
   * - params : extrait la valeur du signal debouncé. Si vide, renvoie undefined (aucune requête émise).
   * - stream : appelle CvService.selectByName(name)
   */
  cvsResource = rxResource<Cv[], string | undefined>({
    params: () => {
      const term = this.debouncedSearch()?.trim();
      return term && term.length > 0 ? term : undefined;
    },
    defaultValue: [] as Cv[],
    stream: ({ params: name }) => this.cvService.selectByName(name),
  });

  /** Signal représentant le CV sélectionné dans la liste */
  selectedCv = signal<Cv | null>(null);

  /** Sélectionne un CV et affiche ses détails */
  onSelectCv(cv: Cv): void {
    this.selectedCv.set(cv);
  }
}
