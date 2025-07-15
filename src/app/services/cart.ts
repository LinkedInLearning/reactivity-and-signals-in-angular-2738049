import { computed, inject, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from './product';
import { ShippingService } from './shipping';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly productService = inject(Product);
  readonly products$ = this.productService.getProducts();
  readonly productsSignal = toSignal(this.products$, { initialValue: [] });

  private readonly shippingService = inject(ShippingService);

  private cartItems = new BehaviorSubject<Record<string, { quantity: number }>>({});
  readonly cartItems$ = this.cartItems.asObservable();
  readonly cartItemsSignal = toSignal(this.cartItems.asObservable(), { requireSync: true });

  readonly productsPlusQuantity = this.cartItems$.pipe(
    switchMap((cartItems) => {
      return this.products$.pipe(
        switchMap((products) => {
          return  of(products.map(product => {
            const itemInCart = cartItems[product.id];
            return {
              ...product,
              quantity: itemInCart ? itemInCart.quantity : 0
            };
          }));
        })
      );
    })
  );

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
    const subtotal = Object.keys(this.cartItemsSignal()).reduce((acc, key) => {
      const product = this.productsSignal().find((product) => product.id === key);

      if(product) {
        return acc + ((this.cartItemsSignal()[key]?.quantity || 0) * product.price);
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

  readonly productsInCartWithQuantity$ = this.cartItems$.pipe(
    switchMap(cartItems =>
      this.products$.pipe(
        map(products =>
          products
            .filter(product => cartItems[product.id]?.quantity > 0)
            .map(product => ({
              ...product,
              quantity: cartItems[product.id].quantity
            }))
        )
      )
    )
  );

  addItemToCart(itemId: string) {
    const existingCart = this.cartItems.getValue();
    const currentQuantity = existingCart[itemId]?.quantity || 0;
    this.cartItems.next({ 
      ...existingCart,
      [itemId]: {
        quantity: currentQuantity + 1 // Increment quantity by 1        
      }
    });
  }

  removeItemFromCart(itemId: string) {
    const existingCart = this.cartItems.getValue();
    const currentQuantity = existingCart[itemId]?.quantity || 0;
    if (currentQuantity > 1) {
      this.cartItems.next({
        ...existingCart,
        [itemId]: {
          quantity: currentQuantity - 1
        }
      });
    } else if (currentQuantity === 1) {
      delete existingCart[itemId];
      this.cartItems.next(existingCart);
    }
  }

}
