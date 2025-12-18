import { Routes } from '@angular/router';
import { PLogin } from './components/pages/p-login/p-login';
import { PCategory } from './components/pages/p-category/p-category';
import { PProducts } from './components/pages/p-products/p-products';
import { PIngredients } from './components/pages/p-ingredients/p-ingredients';
import { PUser } from './components/pages/p-user/p-user';

export const routes: Routes = [
    {path: '', component:PLogin},
    {path: 'login', component:PLogin},
    {path: 'categories', component:PCategory},
    {path: 'products', component:PProducts},
    {path: 'ingredients', component:PIngredients},
    {path: 'users', component:PUser},
];
