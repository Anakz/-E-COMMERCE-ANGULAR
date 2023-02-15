import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders: any

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private basketService: BasketService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.orderService.getAll().subscribe(
      res =>{
        console.log("all orders in order-list")
        console.log(res)
      },
      err =>{
        console.log("all orders in order-list")
        console.log(err)
      }
    )
  }

}
