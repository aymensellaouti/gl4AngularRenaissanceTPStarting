import { Country } from "../model/country.interface";

export const countries: Country[] = [
  { name: 'Tunisia', defaultCurrency: 'DIN', acceptedCurrencies: ['DIN','EUR','USD'] },
  {
    name: 'France',
    defaultCurrency: 'EUR',
    acceptedCurrencies: ['EUR', 'USD'],
  },
  { name: 'UK', defaultCurrency: 'GBP', acceptedCurrencies: ['GBP', 'USD'] },
  {
    name: 'UAE',
    defaultCurrency: 'AED',
    acceptedCurrencies: ['AED', 'EUR', 'USD'],
  },
  { name: 'USA', defaultCurrency: 'USD', acceptedCurrencies: ['USD'] },
];
