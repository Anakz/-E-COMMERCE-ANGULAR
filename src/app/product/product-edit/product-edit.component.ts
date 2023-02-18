import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from 'src/app/model/image';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  template : `{{ currentIndex }}`
})
export class ProductEditComponent implements OnInit {

  product = new Product(0, '', '', 0, 0, 0, 0, 0, [], 0, 0, false);
  currentIndex:string = "99"
  image = new Image(0, '', false, this.product)
  categories: any;

  errorMessage: string = ''
  isLoggedIn=false
  isAdminOrFournisseur = false
  isLoginFailed = false

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router:Router
  ) { 
    this.currentIndex = this.route.snapshot.queryParams['currentIndex'];
    console.log(this.route.snapshot.queryParams['currentIndex'])
   }

  ngOnInit(): void {
    this.getAllCategories()
    console.log("In product-edit")
    console.log(this.currentIndex)
    if (this.currentIndex != '99' && this.currentIndex != undefined) {
      this.productService.getById(this.currentIndex).subscribe(
        data => {
          // this.selectedProduct = data
          this.product = new Product(data.id, data.name, data.description, data.buying_price, data.selling_price, data.stock, data.stock_available, data.weight, data.images, data.selected_quantity, data.fournisseur, data.is_deleted, data.category, data.order, data.basket)
          console.log("data in product-edit")
          console.log(data)
          console.log(this.product)
          console.log("this.product.category")
          console.log(this.product.category?.name)
        },
        err => {
          // this.errormessage = JSON.parse(err.error).message
          console.log("ERROR")
        }
      )
    }
  }
  updateProduct(){
    // console.log("Before update the product in DB")
    // console.log(this.product)
    // console.log("this.product.images")
    if(this.product.name && this.product.description && this.product.buying_price && this.product.stock && this.product.weight && this.product.images[0].img && this.product.category?.name && this.product.fournisseur){
    this.productService.update(parseInt(this.currentIndex), this.product).subscribe(
      res =>{
        console.log("res in update product in product-edit")
        console.log(res)
        if (this.product.images[0]) {
          let updated_image = new Image(this.product.images[0].id, this.product.images[0].img, this.product.images[0].is_deleted, this.product)
          console.log("updated_image")
          console.log(updated_image)
          this.imageService.update(updated_image.id, updated_image).subscribe(
            res =>{
              console.log("res image in update product in product-edit")
              console.log(res)
              this.router.navigate(['/products']);
            },
            err =>{
              console.log("err image update product in product-edit")
              console.log(err)
            }
          )
        }
      },
      err => {
        console.log("err update product in product-edit")
        console.log(err)
        console.log("Error in update product")
      }
    )
    }  else {
      this.errorMessage = 'Please, verify all the fields';
      this.isLoginFailed = true;
    }
  }
  getAllCategories(){
    this.categoryService.getAll().subscribe(
      res => {
        this.categories = res
        console.log("res")
        console.log(res)
        console.log("this.categories")
        console.log(this.categories)
      },
      err => {

      }
    )
  }

}
