import { Injectable, computed, signal } from '@angular/core';
import { Cv } from '../model/cv';

@Injectable({
  providedIn: 'root',
})
export class EmbaucheService {
  #embauchees = signal<Cv[]>([]);
  readonly embauchees = this.#embauchees.asReadonly();
  readonly nbEmbauchees = computed(() => this.#embauchees().length);

  /**
   * Embauche une personne si elle ne l'est pas encore
   * Sinon il retourne false
   *
   * @param cv : Cv
   * @returns boolean
   */
  embauche(cv: Cv): boolean {
    if (this.#embauchees().some((e) => e.id === cv.id)) {
      return false;
    }
    this.#embauchees.update((list) => [...list, cv]);
    return true;
  }
}
