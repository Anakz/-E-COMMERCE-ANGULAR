import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { Image } from 'src/app/model/image';
import { Product } from 'src/app/model/product';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product = new Product(0, "", "", 0, 0, 0, 0, 0,[],0 , false);
  image = new Image(0, '', false, this.product)
  submitted = false;
  message:string = '';
  selectedCategory: number = 0;
  errorMessage: string = ''
  isLoggedIn=false
  isAdminOrFournisseur = false
  isLoginFailed = false

  categories: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllCategories()
    this.verifyAuth()
  }

  createProduct(): void{

    // console.log("this.product")
    // console.log(this.product)
    // console.log("this.image")
    // console.log(this.image)
    // console.log("this.selectedCategory")
    // console.log(this.selectedCategory)
    // console.log("this.categories")
    // console.log(this.categories)

    // this.imageService.create()
    if(this.product.name && this.product.description && this.product.buying_price && this.product.stock && this.product.weight && this.image.img && this.selectedCategory){
    this.categoryService.getById(this.selectedCategory).subscribe(
      res => {

        let currentCategory = new Category(res.id, res.name, res.is_deleted, res.product)
        this.product.category = currentCategory
        
        this.product.selling_price = this.product.buying_price + this.product.buying_price*0.01
        this.product.stock_available = this.product.stock
        this.productService.create(this.product).subscribe(
          response => {
            this.submitted = true;
            console.log("response.id After creating the new product")
            console.log(response.id)
            let redredProduct = JSON.parse(response)
            
            const createdProduct = new Product(redredProduct.id, redredProduct.name, redredProduct.description, redredProduct.buying_price, redredProduct.selling_price, redredProduct.stock, redredProduct.stock_available, redredProduct.weight, redredProduct.images, redredProduct.selected_quantity, redredProduct.is_deleted, redredProduct.category, redredProduct.order, redredProduct.basket)
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
    }  else {
      this.errorMessage = 'Please, verify all the fields';
      this.isLoginFailed = true;
    }

    
  }

  getOneCategorie() : Category |  null{
    
    return null
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
  verifyAuth(){
    if(this.tokenStorageService.getUsername() != null){
      this.isLoggedIn = true
      if(this.tokenStorageService.getRoles() == "ADMIN" || this.tokenStorageService.getRoles() == "FOURNISSEUR"){
        this.isAdminOrFournisseur = true
      }
    }
    console.log("verifyAuth")
    console.log(this.tokenStorageService.getRoles())
  }

}
