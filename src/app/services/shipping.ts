import { inject, Injectable } from '@angular/core';
import { ShippingHttp } from './shipping-http';
import { BehaviorSubject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
    private readonly ShippingHttpService = inject(ShippingHttp);
    readonly shippingMethodIndex = new BehaviorSubject<number>(0);

    updateShippingMethodIndex() {
        this.shippingMethodIndex.next((this.shippingMethodIndex.value + 1) % 4);
    }

    getShippingMethods() {
        return this.shippingMethodIndex.pipe(
            switchMap((index) => this.ShippingHttpService.shippingHttpResponse(index)   
        ))
    }
}
