import { inject, Injectable, linkedSignal, signal } from '@angular/core';
import { EASTERN, ShippingConfig, ShippingMethod, Timezones } from './shipping-data';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
    private readonly http = inject(HttpClient);
    readonly shippingMethodIndex = signal<Timezones>(EASTERN);
    readonly shippingMethods = toSignal(this.http.get<ShippingConfig>(`api/shipping/${this.shippingMethodIndex()}`));

    readonly shippingMethod = linkedSignal<ShippingConfig | undefined, ShippingMethod | undefined>({
        source: this.shippingMethods,
        computation: (newOptions, previous) => {
            if (!newOptions) {
                return undefined;
            }   

            const prevValue = previous?.value;
            if(prevValue) { 
                return newOptions.options.find((opt) => {
                    return opt.name === prevValue.name
                })
            }
            
            return undefined;
        },
    });

    updateShippingMethodIndex(timezone: Timezones) {
        this.shippingMethodIndex.set(timezone);
    }
}
