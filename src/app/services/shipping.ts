import { Injectable, linkedSignal, signal } from '@angular/core';
import { EASTERN, ShippingConfig, ShippingMethod, Timezones } from './shipping-data';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {
    readonly shippingMethodIndex = signal<Timezones>(EASTERN);
    readonly shippingMethods = httpResource<ShippingConfig>(() => `api/shipping/${this.shippingMethodIndex()}`);

    readonly shippingMethod = linkedSignal<ShippingConfig | undefined, ShippingMethod | undefined>({
        source: this.shippingMethods.value,
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
