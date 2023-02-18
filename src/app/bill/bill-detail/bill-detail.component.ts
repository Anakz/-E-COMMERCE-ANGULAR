import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Bill } from 'src/app/model/bill';
import { Order } from 'src/app/model/order';
import { User } from 'src/app/model/user';
import { BasketService } from 'src/app/services/basket.service';
import { BillService } from 'src/app/services/bill.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.css'],
  template : `{{ currentIndex }}`
})
export class BillDetailComponent implements OnInit {

  connectedUser = new User(0, "", "", "", "", "", "", "", "", false)
  currentIndex:string = "99"
  order = new Order(0, new Date, new Date, "", 0, 0, 0, false, [], this.connectedUser)
  products:any
  isLoggedIn = false
  bill= new Bill(0, 0, false, this.order)

  constructor(
    private basketService: BasketService,
    private userService: UserService,
    private orderService: OrderService,
    private billService: BillService,
    private deliveryService: DeliveryService,
    private productService: ProductService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.currentIndex = this.route.snapshot.queryParams['currentIndex'];
    console.log(this.route.snapshot.queryParams['currentIndex'])
  }

  ngOnInit(): void {
    if(this.tokenStorageService.getUsername() != null && this.currentIndex != '99' && this.currentIndex != undefined){
      this.isLoggedIn = true
      let email = this.tokenStorageService.getUsername() || ''
      this.userService.getByEmail(email).subscribe(
        res => {
          this.connectedUser = new User(res.id, res.first_name, res.last_name, res.phone, res.address, res.credit_card, res.email, res.password, res.role, res.is_deleted, res.order, res.payment, res.basket)
          console.log("res getByEmail in basket-detail")
          console.log(res)
          console.log(res.id)
          this.billService.getById(this.currentIndex).subscribe(
            res =>{
              this.bill = new Bill(res.id, res.total_price, res.is_deleted, res.order)
              this.products = this.bill.order.product
              console.log("this.bill")
              console.log(this.bill)
              console.log("this.products")
              console.log(this.products)
            },
            err => {}
          )
          
        },
        err => {

        }
      )
    }
  }

}
