import { Component, ChangeDetectionStrategy, inject, viewChildren, effect } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-all-products',
  imports: [ProductCard],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllProducts {
  protected readonly cartService = inject(CartService);
  readonly products = this.cartService.productsPlusQuantity;

  readonly cards = viewChildren(ProductCard);

  logCards = effect(() => {
    console.log('Cards:', this.cards().length);
  });
}
