import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { AsyncPipe } from '@angular/common';
import { LoginStatusComponent } from './components/login-status/login-status.component';
@Component({
  selector: 'app-root',
  imports: [LoginStatusComponent, AsyncPipe, RouterOutlet, ProductListComponent, RouterModule, ProductCategoryMenuComponent, SearchComponent, NgbModule, CartStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-ecommerce';
}
