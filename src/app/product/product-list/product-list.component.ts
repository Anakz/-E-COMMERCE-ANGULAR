import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products?: any;
  errormessage?: string;

  currentProduct: Product = new Product('', '', 0, 0, 0, 0, 0, 0, [], [], []);
  currentIndex = -1;
  name = ''
  isAdmin: boolean = false

  constructor(
    private productService: ProductService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      data => {
        this.products = data;
        // if (this.tokenStorageService.hasRole('ADMIN')) {
        //   this.isAdmin = true;
        // }
        console.log(data)
        console.log(this.products)
      },
      err => {
        this.errormessage = JSON.parse(err.error).message;
        console.log("ERROR")
      }
    )
  }
  goToProductDetail(id:string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentIndex: id
      }
    };
    this.router.navigate(['/product-detail'], navigationExtras);
  }

}
