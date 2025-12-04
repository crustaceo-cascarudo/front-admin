import { Routes } from '@angular/router';
import { PLogin } from './components/pages/p-login/p-login';
import { PCategories } from './components/pages/p-categories/p-categories';
import { PProducts } from './components/pages/p-products/p-products';

export const routes: Routes = [
    {path: '', component:PLogin},
    {path: 'categories', component:PCategories},
    {path: 'products', component:PProducts},
];
