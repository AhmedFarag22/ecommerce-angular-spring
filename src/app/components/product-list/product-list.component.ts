import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list-grid.component.html',
  //  templateUrl: './product-list-table.component.html',
  // templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];

  constructor(private productService: ProductService, private cd: ChangeDetectorRef) { }

ngOnInit(): void {
  this.listProducts();
}
listProducts() {
    this.productService.getProductList().subscribe(
      data => {

        console.log("Products received: ", data);
        this.products = data;
        this.cd.detectChanges();
      },
      error => {
        console.error("Error fetching products: ", error);
      }
    );
  }
}


