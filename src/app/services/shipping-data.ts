export interface ShippingMethod {
    name: string;
    price: number;
    hasPriceChange?: boolean
}

const SHIPPING_METHODS: ShippingMethod[] = [
    { name: 'Standard Shipping', price: 5.00 },
    { name: 'Speedy Shipping', price: 15.00 },
    { name: 'Overnight Shipping', price: 25.00 }
];

const SHIPPING_METHODS_TWO: ShippingMethod[] = [
    { name: 'Standard Shipping', price: 5.00 },
    { name: 'Faster Shipping', price: 18.00 },
    { name: 'Overnight Shipping', price: 29.00 }
];

const SHIPPING_METHODS_THREE: ShippingMethod[] = [
    { name: 'Standard Shipping', price: 5.00 },
    { name: 'Two Day Shipping', price: 12.00 },
    { name: 'Faster Shipping', price: 18.00 },
    { name: 'Overnight Shipping', price: 32.00 }
];

const SHIPPING_METHODS_FOUR: ShippingMethod[] = [
    { name: 'Standard Shipping', price: 10.00 },
    { name: 'Overnight Shipping', price: 35.00 }
];

export const SHIPPING_METHODS_LIST = [
    SHIPPING_METHODS,
    SHIPPING_METHODS_TWO,
    SHIPPING_METHODS_THREE,
    SHIPPING_METHODS_FOUR
];