import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-fournisseur',
  templateUrl: './product-fournisseur.component.html',
  styleUrls: ['./product-fournisseur.component.css']
})
export class ProductFournisseurComponent implements OnInit {

  products: any;
  myProduct: Array<Product> = new Array();
  isFournisseur: boolean = false
  isAdmin: boolean = false
  isAdminOrFournisseur: boolean = false
  fournisseur_id = 0
  isLoggedIn = false

  constructor(private productService: ProductService,
    private basketService: BasketService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.productService.getAll().subscribe(
      data => {
        this.products = data;
        this.getFournisseurId()
      },
      err => {
        // this.errormessage = JSON.parse(err.error).message;
        console.log("ERROR")
        console.log(err)
      }
    )
  }
  getFournisseurId(){

    if(this.tokenStorageService.getUsername() != null){
      this.isLoggedIn = true
      if (this.tokenStorageService.hasRole('FOURNISSEUR') || this.tokenStorageService.hasRole('ADMIN')) {
        this.isAdminOrFournisseur = true
      }
      if (this.isAdminOrFournisseur) {
        let email = this.tokenStorageService.getUsername() || ''
        this.userService.getByEmail(email).subscribe(
          res => {
            this.fournisseur_id = res.id
            this.getMyProduct(this.products, this.fournisseur_id)
          },
          err => {
            console.log("Error, getFournisseur in product-fournisseur")
          }
        )
      }
    }
  }
  getMyProduct(products: any, fournisseur_id:number){
    if(products){
      if (fournisseur_id) {
        console.log("this.myProduct----------------------------------------------------------")
        console.log(this.myProduct)
        this.myProduct = products.filter((item:any) => {
          let product = new Product(item.id, item.name, item.description, item.buying_price, item.selling_price, item.stock, item.stock_available, item.weight, item.images, item.selected_quantity, item.fournisseur, item.is_deleted, item.category, item.order, item.basket)
          if (product) {
            return product.fournisseur == fournisseur_id
          }
          return null
        }
        )
        console.log("Final result")
        console.log(this.myProduct)
      }
    } else{
      console.log("err this.products")
    }
  }

  goToProductCreate(){
    this.router.navigate(['/product-create']);
  }
  goToProductDetail(id:number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentIndex: id
      }
    };
    this.router.navigate(['/product-detail'], navigationExtras);
  }
  editProduct(id:number){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentIndex: id
      }
    };
    this.router.navigate(['/product-edit'], navigationExtras);
  }
  deleteProduct(id:number){

    if (id) {
      // const suppressedProduct: Product = new Product(0, '', '', 0, 0, 0, 0, 0, [], false);
      this.productService.getById(id.toString()).subscribe(
        res => {
          console.log("res get product in delete product")
          console.log(res)
          const suppressedProduct = new Product(res.id, res.name, res.description, res.buying_price, res.selling_price, res.stock, res.stock_available, res.weight, res.images, res.selected_quantity, res.fournisseur, true, res.category, res.order, res.basket)
          console.log("the suppressed product")
          console.log(suppressedProduct)
          this.productService.delete(id, suppressedProduct).subscribe(
            res => {
              console.log("res update product in delete product")
              console.log(res)
              if (this.products.length >0) {
                let index_product_to_delete = this.products.findIndex((product: any) => {
                  product == id
                })
                this.products.splice(index_product_to_delete, 1)
                if (this.myProduct.length > 0) {
                  console.log("if (this.myProduct.length > 0)")
                  console.log(this.myProduct.length)
                  let index_myProduct_to_delete = this.myProduct.findIndex((product: any) => {
                    product == id
                  })
                  this.myProduct.splice(index_myProduct_to_delete, 1)
                  console.log("new this.allPproduct")
                  console.log(this.myProduct)
                }
                console.log("new this.products")
                console.log(this.products)
              }

            },
            err => {
              console.log("err in delete product")
              console.log(err)
              if (this.products.length >0) {
                let index_product_to_delete = this.products.findIndex((product: any) => {
                  product == id
                })
                this.products.splice(index_product_to_delete, 1)
                if (this.myProduct.length > 0) {
                  console.log("if (this.myProduct.length > 0)")
                  console.log(this.myProduct.length)
                  let index_myProduct_to_delete = this.myProduct.findIndex((product: any) => {
                    product == id
                  })
                  this.myProduct.splice(index_myProduct_to_delete, 1)
                  console.log("new this.allPproduct")
                  console.log(this.myProduct)
                }
                console.log("new this.products")
                console.log(this.products)
              }
            }
          )
          // this.router.navigate(['/products']);
        },
        err =>{
          console.log(err)
        }
      )

    }
    else{
      console.log(id+"error")
    }
  }
  updateBasket(id:number){
    //Find the login user
    if(this.tokenStorageService.getUsername() != null){
      let email = this.tokenStorageService.getUsername() || ''
      this.userService.getByEmail(email).subscribe(
      res => {
        let user = new User(res.id, res.first_name, res.last_name, res.phone, res.address, res.credit_card, res.email, res.password, res.role, res.is_deleted, res.order, res.payment, res.basket)
        console.log("user in updateBasket")
        console.log(user)
        console.log("res of user")
        console.log(res)

        if (user.basket) {
          console.log("if user.basket")
          console.log(user.basket)
          // Find the user's Basket
          this.basketService.getById(user.basket.id.toString()).subscribe(
            res => {
              let current_basket = new Basket(res.id, res.date, res.quantity, res.total_price, res.user, res.product, res.is_deleted)
              console.log("current_basket")
              console.log(current_basket)
              console.log(res)
              // Find the product to add in the basket
              let check_product = current_basket.product.some(item => {
                return item.id == id
              })
              console.log("Check produit")
              console.log(check_product)
              if(!check_product)
              {  
                this.productService.getById(id.toString()).subscribe(
                  res =>{
                    console.log("res get assosieted product")
                    console.log(res)
                    let product_to_add = new Product(res.id, res.name, res.description, res.buying_price, res.selling_price, res.stock, res.stock_available, res.weight, res.images, res.selected_quantity, res.fournisseur, res.is_deleted, res.category, res.order, res.basket)
                    console.log("product_to_add")
                    console.log(product_to_add)
                    // verifier est ce que le panier a deja le produit
                    console.log("check_product")
                    console.log(check_product)
                      current_basket.product.push(product_to_add)
                      console.log("current_basket after pushing the new product")
                      console.log(current_basket)
                      this.basketService.update(current_basket.id, product_to_add.id).subscribe(
                        res => {
                          console.log("res update current basket")
                          console.log(res)
                        },
                        err =>{
                          console.log("err update current basket")
                          console.log(res)
                        }
                      )
                  },
                  err =>{
                    console.log(err)
                  }
                )}
                else{
                  console.log("else")
                }
            },
            err => {

            }
          )
            
        }
      }, 
      err => {

      }
    )}
    else {
      console.log("no login found")
    }
  }

}
