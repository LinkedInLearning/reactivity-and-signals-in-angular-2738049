import { ChangeDetectionStrategy, Component, inject, Input, signal } from '@angular/core';
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
  @Input() set productId(val: string) {
    this.id.set(val);
  }
  readonly id = signal<string>('');

  protected readonly cartService = inject(CartService);

  protected readonly selectedProduct = rxResource({
    params: () => ({ id: this.id() }),
    stream: ({params}) => this.cartService.getProductById(params.id),
  });

  addToCart(id: string) {
    this.cartService.addItemToCart(id);
  }
}
