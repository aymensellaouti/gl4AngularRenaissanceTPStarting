import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PRODUCTS } from './product.data';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-products-filter',
  imports: [AsyncPipe],
  standalone: true,
  templateUrl: './products-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './products-filter.component.css',
})
export class ProductsFilterComponent {
  readonly products = PRODUCTS;
  protected categories = this.products.map((p) => p.category);

  protected search = new BehaviorSubject<string>('');
  protected category = new BehaviorSubject<string>('');



  protected reset() {
    this.search.next('');
    this.category.next('');
  }
}
