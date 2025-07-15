import { inject, Injectable } from '@angular/core';
import { ShippingHttp } from './shipping-http';
import { BehaviorSubject, switchMap } from 'rxjs';
import { ALL_TIMEZONES, EASTERN, Timezones } from './shipping-data';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
    private readonly ShippingHttpService = inject(ShippingHttp);
    readonly shippingMethodIndex = new BehaviorSubject<Timezones>(EASTERN);

    updateShippingMethodIndex(timezone: Timezones) {
        this.shippingMethodIndex.next(timezone);
    }

    getShippingMethods() {
        return this.shippingMethodIndex.pipe(
            switchMap((index) => this.ShippingHttpService.shippingHttpResponse(index)   
        ))
    }
}
