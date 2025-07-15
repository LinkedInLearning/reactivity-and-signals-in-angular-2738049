import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, linkedSignal, signal } from '@angular/core';

interface ShippingMethod {
  name: string;
  price: number;
  hasPriceChange?: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected shippingMethods = signal([
    {name: 'Standard Shipping', price: 5.00},
    {name: 'Speedy Shipping', price: 15.00},
    {name: 'Overnight Shipping', price: 25.00}
  ]);

  protected shippingMethod = linkedSignal<ShippingMethod[], ShippingMethod>({
    source: this.shippingMethods,
    computation: (newOptions, previous) => {
      const selected = newOptions.find((opt) => opt.name === previous?.value.name);
      if (selected && selected.price !== previous?.value.price) {
        selected.hasPriceChange = true;
      }
      return (
        selected ?? newOptions[0]
      );
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

  changeShippingOptions() {
    this.shippingMethods.set([
      {name: 'Standard Shipping', price: 5.00},
      {name: 'Quick Shipping', price: 10.00},
      {name: 'Fast Shipping', price: 15.00},
      {name: 'Overnight Shipping', price: 29.99},
    ]);
  }
}
