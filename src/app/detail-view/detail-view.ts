import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CartService } from '../services/cart';

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

  protected readonly selectedProduct = rxResource({
    params: () => ({ id: this.productId() }),
    stream: ({params}) => this.cartService.getProductById(params.id),
  });

  addToCart(id: string) {
    this.cartService.addItemToCart(id);
  }
}
