import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../services/cart';
import { ITEMS } from '../services/product-data';

@Component({
  selector: 'app-detail-view',
  imports: [],
  templateUrl: './detail-view.html',
  styleUrl: './detail-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailView {
  @Input() set productId(val: string) {
    this.id.set(val);
  }

  readonly id = signal<string>('');

  protected readonly cartService = inject(CartService);
  // Hardcoded for demo purposes
  protected readonly selectedProduct = ITEMS[0];
  
  // TODO: use RxResource to make this reactive
  // toSignal(this.cartService.getProductById(this.id()));

  addToCart(id: string) {
    this.cartService.addItemToCart(id);
  }
}
