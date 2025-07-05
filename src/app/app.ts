import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ShippingMethod, Timezones } from './services/shipping-data';
import { ShippingService } from './services/shipping';
import {toSignal} from '@angular/core/rxjs-interop';
import { Product } from './services/product';
import { CartService } from './services/cart';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
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
