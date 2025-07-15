import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { ShippingMethod, Timezones } from './services/shipping-data';
import { ShippingService } from './services/shipping';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CurrencyPipe, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected readonly shippingService = inject(ShippingService);
  readonly shippingMethods = this.shippingService.getShippingMethods();

  protected shippingMethod = linkedSignal<ShippingMethod[], ShippingMethod>({
    source: this.shippingMethods,
    computation: (newOptions, previous) => {
      if(newOptions.length) {
        const selected = newOptions.find((opt) => opt.name === previous?.value.name);
        if (selected && selected.price !== previous?.value.price) {
          selected.hasPriceChange = true;
        }
        return (
          selected ?? newOptions[0]
        );
      }
      return { name: '', price: 0, hasPriceChange: false };
    },
  });

  protected quantity = signal<number>(0);
  
  protected item = {
    name: 'Super Cool Item',
    price: 19.99
  };

  protected itemTotal = computed<number>(() => {
    return +(this.quantity() * this.item.price).toFixed(2);
  });

  protected subtotal = computed(() => this.itemTotal());
  protected tax = computed(() => +(this.subtotal() * 0.07).toFixed(2));
  protected shipping = computed(() => this.shippingMethod()?.price || 0);
  protected total = computed(() => +(this.subtotal() + this.tax() + this.shipping()).toFixed(2));

  constructor() {
    effect(() => {
      console.log(`Quantity: ${this.quantity()}`);
    })
  }

  addToCart() {
    this.quantity.update(previous => previous + 1);
  }

  updateShippingMethod(method: ShippingMethod) {
    this.shippingMethod.set({
        ...method,
        hasPriceChange: false
      });
  }

  changeShippingOptions(timezone: Timezones) {
    this.shippingService.updateShippingMethodIndex(timezone);
  }
}
