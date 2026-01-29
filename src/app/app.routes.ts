import { Routes } from '@angular/router';
import { PLogin } from './components/pages/p-login/p-login';
import { PCategory } from './components/pages/p-category/p-category';
import { PProducts } from './components/pages/p-products/p-products';
import { PIngredients } from './components/pages/p-ingredients/p-ingredients';
import { PUser } from './components/pages/p-user/p-user';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path: '', component:PLogin},
    {path: 'login', component:PLogin},
    {path: 'categories', component:PCategory, canActivate: [authGuard]},
    {path: 'products', component:PProducts, canActivate: [authGuard]},
    {path: 'ingredients', component:PIngredients, canActivate: [authGuard]},
    {path: 'users', component:PUser, canActivate: [authGuard]},
];
