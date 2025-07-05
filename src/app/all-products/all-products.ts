import { Component, effect, inject, viewChildren } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from '../product-card/product-card';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-all-products',
  imports: [ProductCard],
  templateUrl: './all-products.html',
  styleUrl: './all-products.scss'
})
export class AllProducts {
  protected readonly cartService = inject(CartService);
  readonly products = toSignal(this.cartService.productsPlusQuantity, { initialValue: [] });

  readonly cards = viewChildren(ProductCard);

  logCards = effect(() => {
    console.log('Cards:', this.cards().length);
  })
}
