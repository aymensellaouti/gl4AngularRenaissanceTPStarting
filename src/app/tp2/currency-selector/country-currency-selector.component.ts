import { ChangeDetectionStrategy, Component, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { countries } from '../data/countries';
import { Country } from '../model/country.interface';

@Component({
  selector: 'app-country-currency-selector',
  imports: [FormsModule],
  templateUrl: './country-currency-selector.component.html',
  styleUrl: './country-currency-selector.component.css'
})
export class CountryCurrencySelectorComponent {
  protected readonly countries = countries;

  protected readonly selectedCountry = signal<Country>(this.countries[0]);

  protected readonly selectedCurrency = linkedSignal<Country, string>({
    source: this.selectedCountry,
    computation: (country, previous) =>
      previous && country.acceptedCurrencies.includes(previous.value)
        ? previous.value
        : country.acceptedCurrencies[0],
  });
}
