import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { User } from 'src/app/model/user';
import { BasketService } from 'src/app/services/basket.service';
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
  products: any

  constructor(
    // private productService: ProductService,
    private basketService: BasketService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if(this.tokenStorageService.getUsername() != null){
      let email = this.tokenStorageService.getUsername() || ''
      this.userService.getByEmail(email).subscribe(
        res => {
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
        },
        err => {

        }
      )
    }
  }

}
