import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  // not category id available ... default to category id 1
  currentCategoryId: number = 1;

  constructor(private productService: ProductService, private cd: ChangeDetectorRef, private route: ActivatedRoute) { }

ngOnInit(): void {

  this.route.paramMap.subscribe(() => {
    this.listProducts();
  });
}
listProducts() {
  // check if "id" parameter is available
  const id = this.route.snapshot.paramMap.get('id');

  if (id !== null) {
    // get the "id" param string. convert string to a number using the "+" symbol
    this.currentCategoryId = +id;
  }


  this.productService.getProductList(this.currentCategoryId).subscribe(
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


