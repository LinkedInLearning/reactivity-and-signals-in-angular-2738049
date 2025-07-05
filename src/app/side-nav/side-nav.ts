import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../services/product';

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNav {
  protected readonly productService = inject(Product);
  readonly products = this.productService.products.value;

  readonly user = model<string>('');

  updateName(name: string): void {
    this.user.set(name);
  }
}
