import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.css']
})
export class BasketListComponent implements OnInit {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isClient: boolean = false;
  isFournisseur: boolean = false;
  username: string = "";

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService, 
  ) { }

  ngOnInit(): void {

    if (this.tokenStorageService.getTokenValue() != null) {
      this.isLoggedIn = true;
      console.log("isLoggedIn is true")
    }
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUsername();
      this.isAdmin = <boolean>this.tokenStorageService.hasRole('ADMIN');
      this.isClient = <boolean>this.tokenStorageService.hasRole('CLIENT');
      this.isFournisseur = <boolean>this.tokenStorageService.hasRole('FOURNISSEUR');
      this.username = <string>this.tokenStorageService.getUsername();
    }

    // this.userService.getByUsername().subscribe(
    //   res => {

    //   },
    //   err =>{

    //   }
    // )

    // this.basketService.getById("2").subscribe(
    //   res =>{
    //     console.log("res basket-list")
    //     console.log(res)
    //   },
    //   err => {
    //     console.log("err basket-list")
    //     console.log(err)
    //   }
    // )
  }

}
