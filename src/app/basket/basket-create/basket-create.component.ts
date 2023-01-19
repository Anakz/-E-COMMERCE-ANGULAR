import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { BasketService } from 'src/app/services/basket.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-basket-create',
  templateUrl: './basket-create.component.html',
  styleUrls: ['./basket-create.component.css']
})
export class BasketCreateComponent implements OnInit {

  basket = new Basket(0, new Date(), 0, 0, new User(0,'','', '', '', '', '', '', '', false,[], 0 ), [], false)

  submitted = false;
  message:string=''

  constructor(
    private basketService: BasketService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.basketService.getAll().subscribe(
      data =>{
        console.log(data)
      },
      err => {
        console.log(err)
      }
    )
  }
  
  createBasket(): void{
    
    console.log(this.basket)
    this.userService.getById("4").subscribe(
      res => {
        let current_user = new User( res.id, 
          res.first_name,
          res.last_name,
          res.phone,
          res.address,
          res.credit_card,
          res.email,
          res.password,
          res.role,
          res.is_deleted,
          res.order,
          res.payment,
          res.basket
          )
        this.basket.user = current_user
        console.log('this.basket')
        console.log(this.basket)
        this.basketService.create(this.basket).subscribe(
          response => {
            this.submitted = true;
            console.log("response create basket")
            console.log(response)
            
            let responseJson = JSON.parse(response)
            let new_basket = new Basket(responseJson.id, responseJson.data, responseJson.quantity, responseJson.total_price, responseJson.user, responseJson.product, responseJson.is_deleted)
            current_user.basket = new_basket
            console.log("current_user before update")
            console.log(current_user)
            this.userService.update(current_user.id, current_user).subscribe(
              res => {
                console.log("res update user")
                console.log(res)
              },
              err => {
                console.log(err)
              }
            )

            //Update user to have the Basket that we created
            
            // this.router.navigate(['products'])
          },
          error => {
            this.message = error.message;
            console.log(error);
          }
        )
      },
      err =>{

      }
    )
    
  }

}
