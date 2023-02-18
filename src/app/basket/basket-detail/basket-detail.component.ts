import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-basket-detail',
  templateUrl: './basket-detail.component.html',
  styleUrls: ['./basket-detail.component.css']
})
export class BasketDetailComponent implements OnInit {

  basket = new Basket(0, new Date, 0, 0, new User(0,'','', '', '', '', '', '', '', false,[], 0 ), [], false)
  baskets: any
  products: any
  connectedUser = new User(0, "", "", "", "", "", "", "", "", false)

  // 
  p: number = 0
  total: number = 0
  today1 = new Date();
  today = new Date();
  tomorrow =  new Date(this.today1.setDate(this.today1.getDate() + 1));
  // 


  constructor(
    // private productService: ProductService,
    private basketService: BasketService,
    private userService: UserService,
    private orderService: OrderService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if(this.tokenStorageService.getUsername() != null){
      let email = this.tokenStorageService.getUsername() || ''
      this.userService.getByEmail(email).subscribe(
        res => {
          this.connectedUser = new User(res.id, res.first_name, res.last_name, res.phone, res.address, res.credit_card, res.email, res.password, res.role, res.is_deleted, res.order, res.payment, res.basket)
          console.log("res getByEmail in basket-detail")
          console.log(res)
          console.log(res.id)
          this.basket = new Basket(res.basket.id, res.basket.date, res.basket.quantity, res.basket.total_price, res, res.basket.product, res.basket.is_deleted )
          console.log("this.basket basket-detail")
          console.log(this.basket)
          this.products = this.basket.product
          console.log("this.products")
          console.log(this.products)
          // this.basketService.getById(res.id)
          // this.basketService.getAll().subscribe(
          //   res =>{
          //     this.baskets = res
          //   },
          //   err =>{console.log(err)}
          // )
        },
        err => {

        }
      )
    }
  }

  Total(){
    if (this.basket) {
      for(let i=0;i<this.basket.product.length;i++){
      this.total =this.total+(this.basket.product[i].selected_quantity*this.basket.product[i].selling_price); 
    }
    this.p=this.total;
    this.total=0;
    console.log("this.p")
    console.log(this.p)
    return this.p;
    } 
    return 0   
  }

  addOrder(){
    
    let totalQuanti = 0
    this.basket.product.map((product: Product) => {
      totalQuanti +=product.selected_quantity
    })
    let order = new Order(0,new Date(), new Date(), "unpaid", totalQuanti, 20, this.p, false, this.basket.product, this.connectedUser)
    console.log("order")
    console.log(order)
    this.orderService.create(order).subscribe(
      respo =>{
        console.log("res valider panier")
        console.log(respo)
        let res = JSON.parse(respo)
        let ordered = new Order(res.id, res.ordred, res.shipped, res.status, res.quantity, res.delivery_price, res.total, res.is_deleted, res.product, res.user)
        console.log(ordered)
        const navigationExtras: NavigationExtras = {
          queryParams: {
            currentIndex: ordered.id
          }
        };
        this.router.navigate(['/order-detail'], navigationExtras);
      },
      err => {console.log(err)}
    ) 
    console.log(order)
  }

}
