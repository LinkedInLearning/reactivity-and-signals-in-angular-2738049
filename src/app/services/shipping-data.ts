export interface ShippingMethod {
    name: string;
    price: number;
}

export interface ShippingConfig {
    id: string;
    options: ShippingMethod[];
}

export const EASTERN = 'eastern';
export const CENTRAL = 'central';
export const MOUNTAIN = 'mountain';
export const PACIFIC = 'pacific';
export const ALL_TIMEZONES = [
    EASTERN,
    CENTRAL,
    MOUNTAIN,
    PACIFIC,
  ] as const;
  
export type Timezones = typeof ALL_TIMEZONES[number]


const SHIPPING_METHODS_EASTERN: ShippingMethod[] = [
    { name: 'Standard Shipping', price: 10.00 },
    { name: 'Speedy Shipping', price: 18.00 },
    { name: 'Overnight Shipping', price: 35.00 }
];

const SHIPPING_METHODS_CENTRAL: ShippingMethod[] = [
    { name: 'Standard Shipping', price: 5.00 },
    { name: 'Faster Shipping', price: 18.00 },
    { name: 'Overnight Shipping', price: 29.00 }
];

const SHIPPING_METHODS_MOUNTAIN: ShippingMethod[] = [
    { name: 'Standard Shipping', price: 5.00 },
    { name: 'Two Day Shipping', price: 12.00 },
    { name: 'Faster Shipping', price: 18.00 },
    { name: 'Overnight Shipping', price: 32.00 }
];

const SHIPPING_METHODS_PACIFIC: ShippingMethod[] = [
    { name: 'Standard Shipping', price: 10.00 },
    { name: 'Overnight Shipping', price: 35.00 }
];

export const SHIPPING_METHODS_LIST: ShippingConfig[] = [
    {id: EASTERN, options: SHIPPING_METHODS_EASTERN},
    {id: CENTRAL, options: SHIPPING_METHODS_CENTRAL},
    {id: MOUNTAIN, options: SHIPPING_METHODS_MOUNTAIN},
    {id: PACIFIC, options: SHIPPING_METHODS_PACIFIC}
]
