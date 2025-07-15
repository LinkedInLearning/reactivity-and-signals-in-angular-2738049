import { InMemoryDbService } from 'angular-in-memory-web-api';
import { SHIPPING_METHODS_LIST } from './services/shipping-data';
import { ITEMS } from './services/product-data';

export class AppData implements InMemoryDbService {
  createDb() {
      const shipping = SHIPPING_METHODS_LIST;
      const items = ITEMS;
      return { shipping, items }
  }
}