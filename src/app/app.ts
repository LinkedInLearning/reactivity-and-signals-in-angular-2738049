import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [CurrencyPipe]
})
export class App {
  protected shippingMethods = [
    {name: 'Standard Shipping', price: 5.00},
    {name: 'Speedy Shipping', price: 15.00},
    {name: 'Overnight Shipping', price: 25.00}
  ];
  protected shippingMethod = this.shippingMethods[0];

  protected quantity = 1;
  
  protected item = {
    name: 'Super Cool Item',
    price: 19.99
  };

  protected itemTotal = +(this.quantity * this.item.price).toFixed(2);
  protected subtotal = this.itemTotal;
  protected tax = +(this.subtotal * 0.07).toFixed(2);
  protected shipping = this.shippingMethod.price;
  protected total = +(this.subtotal + this.tax + this.shipping).toFixed(2);


  addToCart() {
    this.quantity++;
  }

  updateShippingMethod(method: {name: string, price: number}) {
    this.shippingMethod = method;
  }
}
