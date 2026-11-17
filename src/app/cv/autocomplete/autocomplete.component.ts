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

  search = signal('');


  debouncedSearch = toSignal(
    toObservable(this.search).pipe(
      debounceTime(400),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );


  cvsResource = rxResource<Cv[], string | undefined>({
    params: () => {
      const term = this.debouncedSearch()?.trim();
      return term && term.length > 0 ? term : undefined;
    },
    defaultValue: [] as Cv[],
    stream: ({ params: name }) => this.cvService.selectByName(name),
  });

  selectedCv = signal<Cv | null>(null);

  onSelectCv(cv: Cv): void {
    this.selectedCv.set(cv);
  }
}
