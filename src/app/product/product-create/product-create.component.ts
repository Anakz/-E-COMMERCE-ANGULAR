import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product = new Product("", "", 0, 0, 0, 0, 0, 0, [], [], []);
  submitted = false;
  message:string = '';

  constructor(
    private productService: ProductService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  createProduct(): void{
    this.productService.create(this.product).subscribe(
      response => {
        this.submitted = true;
        this.router.navigate([{outlets: {primary: 'navbar', contenu: 'products'}}]);
      },
      error => {
        this.message = error.message;
        console.log(error)
      }
    )
  }

}
