import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  user = new User(0, '', '', '', '', '', '', '', "CLIENT", false);
  submitted = false;
  message:string = '';
  selectedCategory: number = 0;
  errorMessage='';
  isLoginFailed=false
  
  constructor(
    private userService: UserService,
    private basketService: BasketService,
    private authService: AuthService,
    private tokenStorage:TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signup(){
    console.log("this.user")
    console.log(this.user)
    if(this.user.first_name && this.user.last_name && this.user.phone && this.user.address && this.user.credit_card && this.user.email && this.user.password && this.user.role == "CLIENT" && this.user.is_deleted == false){
      this.userService.create(this.user).subscribe(
      respo =>{
        console.log("res register")
        console.log(respo)
        let response = JSON.parse(respo)
        let res = new User(response.id, response.first_name, response.last_name, response.phone, response.addresponses, response.credit_card, response.email, response.password, response.role, response.is_deleted, response.order, response.payment, response.basket)
        let created_user = new User(res.id, res.first_name, res.last_name, res.phone, res.address, res.credit_card, res.email, res.password, res.role, res.is_deleted, res.order, res.payment, res.basket)
        let new_basket = new Basket(0, new Date, 0, 0, created_user, [], false)
        this.basketService.create(new_basket).subscribe(
          res => {
            console.log("res basket after register")
            console.log(res)
            // this.tokenStorage.saveToken(res);
            this.authService.login(created_user.email, created_user.password).subscribe(
              res => {
                  this.tokenStorage.signOut();
                  this.tokenStorage.saveToken(res);
                  // this.isLoginFailed = false;
                  // this.isLoggedIn = true;
                  // this.userLoggedIn = <string>this.tokenStorage.getUsername();
                  this.router.navigate(['/products'])
                  .then(() => {
                    window.location.reload
                  })
                  ;
                  // window.location.href = '/'
                },
                err => {
                  this.errorMessage = err.error.message;
                  this.isLoginFailed = true;
                }
            )
          },
          err => {
            console.log("err basket after register")
            console.log(err)
          }
        )
      },
      err => {

      }
      )
    } else {
      this.errorMessage = 'Please, verify all the fields';
      this.isLoginFailed = true;
    }
  }
  goToLogin(){
    this.router.navigate(['/login']);
  }
}
