import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Item } from './product-data';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Product {
  private readonly route = inject(ActivatedRoute);

  readonly productId = toSignal(this.route.queryParamMap.pipe(
    map(params => params.get('productId'))), { initialValue: '' });

  readonly products = httpResource<Item[]>(() => `api/items`);

  readonly selectedProduct = httpResource<Item>(() => `api/items/${this.productId()}`);
}
