import { computed, inject, Injectable, signal } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Product } from './product';
import { ShippingService } from './shipping';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly productService = inject(Product);
  readonly products$ = this.productService.getProducts();
  readonly productsSignal = toSignal(this.products$, { initialValue: [] });

  private readonly shippingService = inject(ShippingService);

  readonly cartItems = signal<Record<string, { quantity: number }>>({});
  readonly cartItems$ = toObservable(this.cartItems);

  readonly productsPlusQuantity = computed(() => {
    const cartItems = this.cartItems();
    const products = this.productsSignal();
    return products.map(product => {
      const itemInCart = cartItems[product.id];
      return {
        ...product,
        quantity: itemInCart ? itemInCart.quantity : 0
      };
    });
  });

  getProductById(id: string) {
    return this.cartItems$.pipe(
      switchMap((cartItems) => {
        return this.productService.getProductById(id).pipe(
          map((product) => {
              const itemInCart = cartItems[product.id];
              return {
                ...product,
                quantity: itemInCart ? itemInCart.quantity : 0
              };
          })
        );
      })
    )
  }

  readonly cartTotals = computed(() => {
    const subtotal = Object.keys(this.cartItems()).reduce((acc, key) => {
      const product = this.productsSignal().find((product) => product.id === key);

      if(product) {
        return acc + ((this.cartItems()[key]?.quantity || 0) * product.price);
      }

      return acc;
    }, 0);

    return {
      subtotal,
      tax: +(subtotal * 0.07).toFixed(2),
      shipping: this.shippingService.shippingMethod()?.price || 0,
      total: +(subtotal + (subtotal * 0.07) + (this.shippingService.shippingMethod()?.price || 0)).toFixed(2)
    };
  });

  readonly productsInCartWithQuantity = computed(() => {
    return this.productsSignal()
    .filter(product => this.cartItems()[product.id]?.quantity > 0)
    .map(product => ({
      ...product,
      quantity: this.cartItems()[product.id].quantity
    }))
  });

  addItemToCart(itemId: string) {
    const existingCart = this.cartItems();
    const currentQuantity = existingCart[itemId]?.quantity || 0;
    this.cartItems.set({
      ...existingCart,
      [itemId]: {
        quantity: currentQuantity + 1
      }
    });
  }

  removeItemFromCart(itemId: string) {
    const existingCart = this.cartItems();
    const currentQuantity = existingCart[itemId]?.quantity || 0;
    if (currentQuantity > 1) {
      this.cartItems.set({
        ...existingCart,
        [itemId]: {
          quantity: currentQuantity - 1
        }
      });
    } else if (currentQuantity === 1) {
      delete existingCart[itemId];
      this.cartItems.set({ ...existingCart });
    }
  }
}
