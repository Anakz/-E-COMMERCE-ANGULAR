import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { Bill } from 'src/app/model/bill';
import { Delivery } from 'src/app/model/delivery';
import { Order } from 'src/app/model/order';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { BasketService } from 'src/app/services/basket.service';
import { BillService } from 'src/app/services/bill.service';
import { DeliveryService } from 'src/app/services/delivery.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  template : `{{ currentIndex }}`
})
export class OrderDetailComponent implements OnInit {

  connectedUser = new User(0, "", "", "", "", "", "", "", "", false)
  currentIndex:string = "99"
  order = new Order(0, new Date, new Date, "", 0, 0, 0, false, [], this.connectedUser)
  products:any
  isLoggedIn = false
  bill= new Bill(0, 0, false, this.order)

  // 
  n:number = 0
  p:number = 0
  today = new Date();
  arrivedate =  new Date(this.today.setDate(this.today.getDate() + 5));
  producttodecrement:any;
  userbasket:any
  // 

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
          if (this.connectedUser.order) {
            this.connectedUser.order.map((ele: any) => {
              if (parseInt(this.currentIndex) == ele.id) {
                this.orderService.getById(ele.id).subscribe(
                  element => {
                    console.log(element)
                    this.order = new Order(element.id, element.ordered, element.shipped, element.status, element.quantity, element.delivery_price, element.total, element.is_deleted, element.product, element.user, element.bill, element.delivery)
                    console.log(this.order)
                    this.products = this.order.product
                    console.log(this.products)
                  },
                  err =>{}
                )
              }
            })
          }
          if (this.connectedUser.basket) {
            this.userbasket = this.connectedUser.basket
            console.log("this.userbasket")
            console.log(this.userbasket)
          }
          
        },
        err => {

        }
      )
    }
  }
  Subtotal(): number{
    if(this.products){  
      for(let i=0;i<this.products.length;i++){
        this.n=this.n+(this.products[i].selected_quantity*this.products[i].selling_price);
      }
      this.p = this.n;
      this.n=0;}
    return this.p;
   }

   addBillandDelivery():void{
    console.log("here")
    //for(let i=0;i<this.userorders.length;i++){
    // let bill = new Bill(this.p+20,false,this.userorderss);
    let bill = new Bill(0, this.p+20, false, this.order);
    this.billService.create(bill).subscribe(
      response =>{
        console.log(" create bill myydata:",response);
        let res = JSON.parse(response)
        console.log("res.id")
        console.log(res.id)
        this.bill = new Bill(res.id, res.total_price, res.is_deleted, res.order)
        console.log("this.bill.id")
        console.log(this.bill.id)

        let delivery = new Delivery(0, this.today, this.arrivedate, false, this.order);
        this.deliveryService.create(delivery).subscribe(
          res =>{
            console.log("myydata:",res);
          
          },
          error => {
          // this.message=error.message;
          console.log(error);
          }
          );

          this.basketService.delete(this.userbasket.id).subscribe(
          res =>{
            console.log("after update data:",res);
          
          },
          error => {
          console.log(error);
          }
        );

        this.order.status="paid";
        this.orderService.update(this.order.id , this.order).subscribe(
          res =>{
            console.log("after update data:",res);
          
          },
          error => {
          console.log(error);
          }
        );


        this.producttodecrement = this.order.product;
          console.log("updaate",this.producttodecrement);
          for(let g=0;g<this.producttodecrement.length;g++){
            for(let o=0;o<this.products.length;o++){
              if(this.producttodecrement[g].id == this.products[o].id){
                this.products[o].stock_available = this.products[o].stock_available-this.products[o].selected_quantity; 
                this.productService.update(this.products[o].id , this.products[o]).subscribe(
                res =>{
                  console.log("after update data:",res);
                },
                error => {
                console.log(error);
                }
              );
            }
            }
          }
          const navigationExtras: NavigationExtras = {
            queryParams: {
              currentIndex: this.bill.id
            }
          };
          if (this.bill.id !=0) {
            this.router.navigate(['/bill-detail'], navigationExtras);
          }
      },
      error => {
      console.log(error);
      }
    );
    

  }

}
