import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { Product } from 'src/app/model/product';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-basket-create',
  templateUrl: './basket-create.component.html',
  styleUrls: ['./basket-create.component.css']
})
export class BasketCreateComponent implements OnInit {

  basket = new Basket(0, new Date(), 0, 0, 0, new Array<Product>(), false)
  submitted = false;
  message:string=''

  constructor(
    private basketService: BasketService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  
  createBasket(): void{
    this.basketService.create(this.basket).subscribe(
      response => {
        this.submitted = true;
        this.router.navigate([{ outlets: {primary: 'navbar', contenu: 'baskets'} }])
      },
      error => {
        this.message = error.message;
        console.log(error);
      }
    )
  }

}
