import { Component, ChangeDetectionStrategy, inject, ViewChildren, QueryList } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  readonly products = toSignal(this.cartService.productsPlusQuantity, { initialValue: [] });

  @ViewChildren(ProductCard) cards!: QueryList<ProductCard>;

  ngOnInit(): void {
    console.log('Cards On Init:', this.cards);  
  }  

  ngAfterViewInit(): void {
    console.log('Cards After Init:', this.cards);  
  }
}
