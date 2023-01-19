import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Image } from 'src/app/model/image';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product = new Product(0, "", "", 0, 0, 0, 0, 0,[], false);
  image = new Image(0, '', false, this.product)
  submitted = false;
  message:string = '';
  selectedCategory: number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  createProduct(): void{

    console.log("this.product")
    console.log(this.product)
    console.log("this.image")
    console.log(this.image)

    // this.imageService.create()
    this.categoryService.getById(this.selectedCategory.toString()).subscribe(
      res => {

        let currentCategory = new Category(res.id, res.name, res.is_deleted)
        this.product.category = currentCategory
        this.product.selling_price = this.product.buying_price+50
        this.product.stock_available = this.product.stock
        this.productService.create(this.product).subscribe(
          response => {
            this.submitted = true;
            console.log("response.id After creating the new product")
            console.log(response.id)
            let redredProduct = JSON.parse(response)
            
            const createdProduct = new Product(redredProduct.id, redredProduct.name, redredProduct.description, redredProduct.buying_price, redredProduct.selling_price, redredProduct.stock, redredProduct.stock_available, redredProduct.weight, redredProduct.images, redredProduct.category, redredProduct.order, redredProduct.basket)
            console.log("createdProduct After creating the new product")
            console.log(createdProduct)
            this.image.product = createdProduct
            console.log("this.image before create")
            console.log(this.image)
            this.imageService.create(this.image).subscribe(
              res => {
                console.log("res image")
                console.log(res)
              },
              err =>{
                console.log("err image")
                console.log(err)
              }
            )
            // this.router.navigate([{outlets: {primary: 'navbar', contenu: 'products'}}]);
          },
          error => {
            this.message = error.message;
            console.log(error)
          }
        )
      },
      err =>{
        console.log(err)
      }
    )

    
  }

}
