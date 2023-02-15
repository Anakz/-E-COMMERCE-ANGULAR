import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { User } from 'src/app/model/user';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  isAdmin = false;
  isLoggedIn = false;
  user = new User(0, '', '', '', '', '', '', '', '', false);

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getTokenValue() != null) {
      console.log("user-detail I am connected")
      this.isLoggedIn = true
      let email = this.tokenStorageService.getUsername()
      if (email) {
        this.userService.getByEmail(email).subscribe(
          res =>{
            console.log("res user-detail")
            console.log(res)
            this.user = new User(res.id, res.first_name, res.last_name, res.phone, res.address, res.credit_card, res.email, res.password, res.role, res.is_deleted, res.order, res.payment, res.basket)
            console.log("this.user")
            console.log(this.user)
          }, 
          err => {
            console.log("err user-detail")
            console.log(err)
          }
        )
      }
    }
  }

  goToUserEdit(id:number){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentIndex: id
      }
    };
    this.router.navigate(['/user-edit'], navigationExtras);
    // this.router.navigate(['/user-edit'])
  }
  goToHome(){
    this.router.navigate([''])
  }

}
