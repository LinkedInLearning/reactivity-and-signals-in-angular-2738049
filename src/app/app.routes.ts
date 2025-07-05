import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cart',
        pathMatch: 'full'
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
