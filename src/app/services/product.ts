import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Item } from './product-data';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Product {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);

  getProducts() {
    return this.httpClient.get<Item[]>(`api/items`)
  }

  getProductById(id: string) {
    return this.httpClient.get<Item>(`api/items/${id}`)
  }
}
