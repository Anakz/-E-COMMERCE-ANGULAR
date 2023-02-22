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
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  connectedUser = new User(0, "", "", "", "", "", "", "", "", false)
  // order = new Order(0, new Date, new Date, "", 0, 0, 0, false, [], this.connectedUser)
  bills: Array<Bill> = [];
  orders:any
  products:any
  isLoggedIn = false
  // bill= new Bill(0, 0, false, this.order)

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
  ) { }

  ngOnInit(): void {
    if(this.tokenStorageService.getUsername() != null){
      this.isLoggedIn = true
      let email = this.tokenStorageService.getUsername() || ''
      this.userService.getByEmail(email).subscribe(
        res => {
          this.connectedUser = new User(res.id, res.first_name, res.last_name, res.phone, res.address, res.credit_card, res.email, res.password, res.role, res.is_deleted, res.order, res.payment, res.basket)
          console.log("res getByEmail in basket-detail")
          console.log(res)
          console.log(res.id)
          if (this.connectedUser.order) {
            this.orders = this.connectedUser.order
            if (this.orders) {
              this.billService.getAll().subscribe(
                res => {
                  console.log("res all bills")
                  console.log(res)
                  const allBills = res
                  allBills.map((ele:Bill) =>{
                    this.orders.map((everyOrder: Order) =>{
                      if (everyOrder.id == ele.order.id) {
                        console.log("inside if of map map")
                        console.log(everyOrder.id)
                        console.log(ele.order.id)
                        console.log(ele)
                        this.bills.push(ele)
                      }
                    })
                  })
                  console.log("just my bills")
                  console.log(this.bills)
                  this.bills.map((bill:Bill) =>{
                    this.products = bill.order.product
                  })
                  console.log("this.products")
                  console.log(this.products)
                }, err => {}
              )
            }
            // this.connectedUser.order.map((ele: any) => {
            //   if (parseInt(this.currentIndex) == ele.id) {
            //     this.orderService.getById(ele.id).subscribe(
            //       element => {
            //         console.log(element)
            //         this.order = new Order(element.id, element.ordered, element.shipped, element.status, element.quantity, element.delivery_price, element.total, element.is_deleted, element.product, element.user, element.bill, element.delivery)
            //         console.log(this.order)
            //         this.products = this.order.product
            //         console.log(this.products)
            //       },
            //       err =>{}
            //     )
            //   }
            // })
          }
          // if (this.connectedUser.basket) {
          //   this.userbasket = this.connectedUser.basket
          //   console.log("this.userbasket")
          //   console.log(this.userbasket)
          // }
        },
        err => {

        }
      )
    }
  }

}
