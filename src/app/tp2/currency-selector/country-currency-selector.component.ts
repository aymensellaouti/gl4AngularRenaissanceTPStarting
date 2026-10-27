import { Component, signal } from '@angular/core';
import { countries } from '../data/countries';

@Component({
  selector: 'app-country-currency-selector',
  imports: [],
  standalone: true,
  templateUrl: './country-currency-selector.component.html',
  styleUrl: './country-currency-selector.component.css',
})
export class CountryCurrencySelectorComponent {
  countries = signal(countries);
}
