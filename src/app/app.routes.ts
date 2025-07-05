import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./all-products/all-products').then(m => m.AllProducts)

    },
    {
        path: 'cart',
        loadComponent: () => import('./cart-view/cart-view').then(m => m.CartView)
    },
    {
        path: 'detail',
        loadComponent: () => import('./detail-view/detail-view').then(m => m.DetailView)
    },

];
