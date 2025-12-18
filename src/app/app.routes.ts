import { Routes } from '@angular/router';
import { PLogin } from './components/pages/p-login/p-login';
import { PCategory } from './components/pages/p-category/p-category';
import { PProducts } from './components/pages/p-products/p-products';

export const routes: Routes = [
    {path: '', component:PLogin},
    {path: 'login', component:PLogin},
    {path: 'categories', component:PCategory},
    {path: 'products', component:PProducts},
];
