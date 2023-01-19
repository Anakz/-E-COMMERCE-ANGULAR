import { Component, OnInit } from '@angular/core';
import { Basket } from './model/basket';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'projetpfafront';
  
  products_id?: number[];
  
  ngOnInit(){
    let myData = {
      table: [0,0,0],
      role: "Visiteur"
    };
    let check_panier = localStorage.getItem("products")

    if (check_panier != undefined && check_panier != "undefined" && check_panier.length >2) {
      console.log("check_panier if")
      console.log(check_panier)
    } else{
      console.log("check_panier else")
      console.log(check_panier)
      this.products_id = []
      localStorage.setItem("products", JSON.stringify(this.products_id));
    }

    
    // localStorage.setItem("products", JSON.stringify(products));
    console.log("localStorage.getItem('products')")
    console.log(localStorage.getItem("products"))
  }

  

  // getMyData(): {table: number[], name: string}{
  //   let data = JSON.parse(localStorage.getItem("myData"))
  //   return data;
  // }
  
}
