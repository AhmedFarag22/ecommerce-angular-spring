import { Routes, RouterModule, Router } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';


import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular'





import { LoginStatusComponent } from './components/login-status/login-status.component';
import OktaAuth from '@okta/okta-auth-js';
import { Injector } from '@angular/core';
import { MembersPageComponent } from './components/members-page/members-page.component';


function sendToLoginPage(oktaAuth: OktaAuth) { // function sendToLoginPage(oktaAuth: OktaAuth, injector: Injector)
  // Use injector to access any service available within your application
  //const router = injector.get(Router);

  // Redirect the user to your custom login page
  //router.navigate(['/login']);
  oktaAuth.signInWithRedirect();
}

export const routes: Routes = [
  {path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard],
                    data: {onAuthRequired: sendToLoginPage} },

  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginStatusComponent},

  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];
