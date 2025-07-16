import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CartService } from '../services/cart';
import { Product } from '../services/product';

@Component({
  selector: 'app-detail-view',
  imports: [],
  templateUrl: './detail-view.html',
  styleUrl: './detail-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailView {
  readonly productId = input<string>('');

  protected readonly cartService = inject(CartService);
  protected readonly productService = inject(Product);

  protected readonly selectedProduct = this.productService.selectedProduct;
  protected readonly quantity = this.cartService.selectedProductQuantity;

  addToCart(id: string) {
    this.cartService.addItemToCart(id);
  }
}
