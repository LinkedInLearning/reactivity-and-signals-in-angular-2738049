import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChildren, effect, inject, Input } from '@angular/core';
import { Item } from '../services/product-data';
import { CartService } from '../services/cart';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard {
  @Input({required: true}) product!: Item;

  protected readonly cartService = inject(CartService);

  readonly kudos = contentChildren('kudos');

  logKudos = effect(() => {
    console.log('Kudos:', this.kudos().length);
  });
}
