import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import {toSignal} from '@angular/core/rxjs-interop';
import { CartService } from '../services/cart';
import { Product } from '../services/product';
import { ShippingService } from '../services/shipping';
import { ShippingMethod, Timezones } from '../services/shipping-data';

@Component({
  selector: 'app-cart-view',
  imports: [CurrencyPipe],
  templateUrl: './cart-view.html',
  styleUrl: './cart-view.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartView {
  protected readonly shippingService = inject(ShippingService);
  protected readonly productService = inject(Product);
  protected readonly cartService = inject(CartService);

  readonly shippingMethods = this.shippingService.shippingMethods.value;
  readonly cartItems = toSignal(this.cartService.productsPlusQuantity, { initialValue: [] });

  addToCart(id: string) {
    this.cartService.addItemToCart(id);
  }

  updateShippingMethod(method: ShippingMethod) {
    this.shippingService.shippingMethod.set(method);
  }

  changeShippingOptions(timezone: Timezones) {
    this.shippingService.updateShippingMethodIndex(timezone);
  }
}
