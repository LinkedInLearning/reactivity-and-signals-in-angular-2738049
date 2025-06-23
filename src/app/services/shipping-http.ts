import { Injectable } from '@angular/core';
import { delay, map, of, take } from 'rxjs';
import { SHIPPING_METHODS_LIST } from './shipping-data';

@Injectable({
  providedIn: 'root'
})
export class ShippingHttp {
    shippingHttpResponse(index: number) {
        return of(index).pipe(
            delay(100), // Simulate network delay
            map((index) => SHIPPING_METHODS_LIST[index]),
            take(1), // Angular's HttpClient emits one value and then completes
        )
    }
}
