import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  isAdmin = false;
  users:any

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.hasRole('ADMIN')) {
      this.isAdmin = true;
      console.log("this.isAdmin user-list");
      console.log(this.isAdmin);

      this.userService.getAll().subscribe(
        res => {
          console.log("res user-list")
          console.log(res)
          this.users = res
        },
        err =>{
          console.log("err user-list")
          console.log(err)
        }
      )
      
    }
  }

}
