import {
  ChangeDetectionStrategy,
  Component,
  computed,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { countries } from '../data/countries';
import { Country } from '../model/country.interface';

@Component({
  selector: 'app-country-currency-selector',
  imports: [FormsModule],
  templateUrl: './country-currency-selector.component.html',
  styleUrl: './country-currency-selector.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryCurrencySelectorComponent {
  countries = signal(countries);

  selectedCountry = signal<Country>(this.countries()[0]);

  currencies = computed(() => this.selectedCountry().acceptedCurrencies);

  selectedCurrency = linkedSignal<string[], string>({
    source: this.currencies,
    computation: (accepted, previous) =>
      previous && accepted.includes(previous.value)
        ? previous.value
        : accepted[0],
  });
}
