import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Item } from '../services/product-data';
import { CartService } from '../services/cart';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
  product = input.required<Item>();
  protected readonly cartService = inject(CartService);
}
