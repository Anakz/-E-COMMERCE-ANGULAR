import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { NavigationExtras, Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { Basket } from 'src/app/model/basket';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  template : `{{ currentIndex }}`
})
export class ProductDetailComponent implements OnInit {

  selectedProduct = new Product(0, '', '', 0, 0, 0, 0, 0, [], false);
  currentIndex:string = "99"
  errormessage?: string;
  panier_product ?: number[];
  product_exist:boolean = false

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private userService: UserService,
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
          // this.selectedProduct = data
          this.selectedProduct = new Product(data.id, data.name, data.description, data.buying_price, data.selling_price, data.stock, data.stock_available, data.weight, data.images, data.is_deleted, data.category, data.order, data.basket)
          console.log("data in product-detail")
          console.log(data)
          console.log(this.selectedProduct)
          console.log("this.selectedProduct.category")
          console.log(this.selectedProduct.category?.name)
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

  updateBasket(id:number){
    //Find the login user
    this.userService.getById("4").subscribe(
      res => {
        let user = new User(res.id, res.first_name, res.last_name, res.phone, res.address, res.credit_card, res.email, res.password, res.role, res.is_deleted, res.order, res.payment, res.basket)
        console.log("user in updateBasket")
        console.log(user)

        if (user.basket) {
          console.log("if user.basket")
          console.log(user.basket)
          // Find the user's Basket
          this.basketService.getById(user.basket.id.toString()).subscribe(
            res => {
              let current_basket = new Basket(res.id, res.date, res.quantity, res.total_price, res.user, res.product, res.is_deleted)
              console.log("current_basket")
              console.log(current_basket)
              // Find the product to add in the basket
              this.productService.getById(id.toString()).subscribe(
                res =>{
                  console.log(res)
                  let product_to_add = new Product(res.id, res.name, res.description, res.buying_price, res.selling_price, res.stock, res.stock_available, res.weight, res.images, res.is_delete, res.category, res.order, res.basket)
                  console.log("product_to_add")
                  console.log(product_to_add)
                  current_basket.product.push(product_to_add)
                  console.log("current_basket after pushing the new product")
                  console.log(current_basket)
                  this.basketService.update(current_basket.id, current_basket).subscribe(
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
              )
            },
            err => {

            }
          )
            
        }
      }, 
      err => {

      }
    )
  }
  
  addToBasket(id:number){

    let panier = localStorage.getItem("products")
    
    if ( panier != null) {
      this.panier_product = JSON.parse(panier)
      if (id) {
          if (this.panier_product) {
            let table = this.panier_product;
            if (table) {
              console.log('table.includes(id)')
              console.log(table.includes(id))
              if (!table.includes(id)) {
                
                console.log("table in if")
                console.log(table)
                table.push(id)
                
                localStorage.removeItem("products")
                localStorage.setItem("products", JSON.stringify(table));
                console.log("localStorage.getItem('products') in product-list")
                console.log(localStorage.getItem("products"))
              }
              else {
                console.log("product already existe in basket")
                this.product_exist = true
              }
            }

            console.log("table")
            console.log(table)
            
            console.log("id")
            console.log(id)
          }
      }
    }

  }

}