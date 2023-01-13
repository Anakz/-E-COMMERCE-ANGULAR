import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  template : `{{ currentIndex }}`
})
export class ProductDetailComponent implements OnInit {

  selectedProduct = new Product("Empty", "Empty", 0, 0, 0, 0, 0, 0, [], [], []);
  currentIndex:string = "99"
  errormessage?: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.currentIndex = this.route.snapshot.queryParams['currentIndex'];
    console.log(this.route.snapshot.queryParams['currentIndex'])
  }

  ngOnInit(): void {
    console.log("In product-detail")
    console.log(this.currentIndex)
    if (this.currentIndex != '99' && this.currentIndex != undefined) {
      this.productService.getById(this.currentIndex).subscribe(
        data => {
          this.selectedProduct = data
          console.log(data)
          console.log(this.selectedProduct)
        },
        err => {
          this.errormessage = JSON.parse(err.error).message
          console.log("ERROR")
        }
      )
    }
  }
  goProductList(): void{
    this.router.navigate(['/products'])
  }

}