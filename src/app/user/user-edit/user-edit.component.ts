import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  template : `{{ currentIndex }}`
})
export class UserEditComponent implements OnInit {

  currentIndex:string = "99"
  isAdmin = false;
  isLoggedIn = false;
  user = new User(0, '', '', '', '', '', '', '', '', false);
  errorMessage='';
  isLoginFailed=false
  
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private imageService: ImageService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.currentIndex = this.route.snapshot.queryParams['currentIndex'];
    console.log(this.route.snapshot.queryParams['currentIndex'])
   }

  ngOnInit(): void {
    if (this.currentIndex != '99' && this.currentIndex != undefined) {
      console.log("------------------------------"+this.currentIndex)
      if (this.tokenStorageService.getTokenValue() != null) {
        console.log("user-detail I am connected")
        this.isLoggedIn = true
        let email = this.tokenStorageService.getUsername()
        // if (email) {
          this.userService.getById(this.currentIndex).subscribe(
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
        // }
      }
    }
  }

  submit(){
    console.log("submit user edit -------------------")
    console.log(this.user)
    if(this.user.first_name && this.user.last_name && this.user.phone && this.user.address && this.user.credit_card && this.user.email && this.user.password && this.user.role && this.user.is_deleted == false){
      this.userService.update(this.user.id, this.user).subscribe(
      res =>{
        console.log("res user-edit")
        console.log(res)
      },
      err => {
        console.log("err user-edit")
        console.log(err)
      }
      )
    } else {
      console.log("Please, verify all the fields")
      this.errorMessage = 'Please, verify all the fields';
      this.isLoginFailed = true;
    }
  }

  goToHome(){
    this.router.navigate([''])
  }

}
