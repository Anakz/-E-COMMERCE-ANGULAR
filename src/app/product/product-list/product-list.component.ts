import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  panier_product ?: number[];
  product_exist:boolean = false

  products: any;
  allProduct: Array<Product> = new Array();
  validProduct: Array<Product> = new Array();
  productCategory: Array<Product> = new Array();
  testProduct: Array<Product> = new Array();
  errormessage?: string;

  currentProduct: Product = new Product(0, '', '', 0, 0, 0, 0, 0, [], false);
  currentIndex = -1;
  name = ''
  isAdmin: boolean = false
  my_basket:Basket = new Basket(0, new Date(), 0, 0, new User(6,'','', '', '', '', '', '', '', false,[], 0 ), [], false)

  // Category name
  current_category?: string | null;
  emptyAllProduct:boolean = false;

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    // Get the category name from the sidebar
      // this.route.paramMap.subscribe(params => {
      //   this.categoryName = params.get('name');
      //   this.products = this.filterProductsByCategory(this.categoryName);
      // });
      this.route.paramMap.subscribe(params => {
        
        this.current_category = params.get('category');
        console.log("Current category")
        console.log(this.current_category)
        if (this.current_category) {
          this.productService.getAll().subscribe(
            res =>{
              this.products = res
              // this.allProduct = new Array<Product>((res))
              this.filterProductByCategory(this.products, this.current_category)
            },
            err => {
              console.log(err)

            }
          )
        }
      })
    // 
    this.productService.getAll().subscribe(
      data => {
        this.products = data;
        // this.allProduct = new Array<Product>((data))

        this.allProduct.map(item => {
          console.log("this.testProduct")
          console.log(this.testProduct)
          this.testProduct.push(new Product(item.id, item.name, item.description, item.buying_price, item.selling_price, item.stock, item.stock_available, item.weight, item.images, item.is_delete))
        })

        // this.validProduct = this.allProduct.filter(item => {
        //   // const ite:Product = JSON.parse(item)
        //   const new_item :Product = new Product(item.id, item.name, item.description, item.buying_price, item.selling_price, item.stock, item.stock_available, item.weight, item.images, item.is_delete, item.category, item.order, item.basket)
        //   console.log("item in filter method")
        //   console.log(new_item)
        //   console.log(new_item.is_delete==false)
        //   return item.is_delete != false
        // })

        // if (this.current_category) {
        //   // this.allProduct = []
        //   this.products.forEach((item: any) => {
        //     console.log("item hahahah inside first if")
        //     console.log(item.category.name)
        //     let item_product = new Product(item.id, item.name, item.description, item.buying_price, item.selling_price, item.stock, item.stock_available, item.weight, item.images, item.is_delete)
        //     console.log("item_product")
        //     console.log(item_product)
        //     if (this.current_category == item.category.name) {
        //       console.log("this.allProduct.push(item_product)")
        //       console.log(this.allProduct.push(item_product))
        //       this.allProduct.push(item_product)
        //     }
        //   });
        //   console.log("allProduct after forEach")
        //   console.log(this.allProduct)
        // }

        // console.log("this.validProduct")
        // console.log(this.validProduct)
        // if (this.tokenStorageService.hasRole('ADMIN')) {
        //   this.isAdmin = true;
        // }
        console.log("data")
        console.log(data)
        console.log("this.products")
        console.log(this.products)
        console.log("this.allProduct")
        console.log(this.allProduct)
      },
      err => {
        this.errormessage = JSON.parse(err.error).message;
        console.log("ERROR")
      }
    )

  }
  filterProductByCategory(products: any, current_category: string | null | undefined){
    if(products){
      if (current_category) {
        console.log("this.allProduct")
        console.log(this.allProduct)
        this.allProduct = products.filter((item:any) => {
          let product = new Product(item.id, item.name, item.description, item.buying_price, item.selling_price, item.stock, item.stock_available, item.weight, item.images, item.is_delete, item.category, item.order, item.basket)
          console.log("product.category")
          console.log(product.category)
          console.log("product")
          console.log(product)
          console.log("item.category")
          console.log(item)
          if (product.category) {
            console.log("item If this.current_category")
            console.log(item)
            console.log("item.category?.name")
            console.log(item.category?.name)
            console.log("current_category")
            console.log(current_category)
            return product.category.name == current_category
          }
          
          return null
        })
        if (this.allProduct.length >0) {
            // this.allProduct = new Product(0, '')
            console.log("Empty category")
            this.emptyAllProduct = true
        }
        console.log ("This.productCategory After fct filter category")
        console.log (this.allProduct)
        console.log (this.allProduct.length)
      }
    } else{
      console.log("err this.products")
    }
  }

  goToProductDetail(id:number) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentIndex: id
      }
    };
    this.router.navigate(['/product-detail'], navigationExtras);
  }

  updateBasket(id:number){
    //Find the login user
    this.userService.getById("4").subscribe(
      res => {
        let user = new User(res.id, res.first_name, res.last_name, res.phone, res.address, res.credit_card, res.email, res.password, res.role, res.is_deleted, res.order, res.payment, res.basket)
        console.log("user in updateBasket")
        console.log(user)
        console.log("res of user")
        console.log(res)

        if (user.basket) {
          console.log("if user.basket")
          console.log(user.basket)
          // Find the user's Basket
          this.basketService.getById(user.basket.id.toString()).subscribe(
            res => {
              let current_basket = new Basket(res.id, res.date, res.quantity, res.total_price, res.user, res.product, res.is_deleted)
              console.log("current_basket")
              console.log(current_basket)
              console.log(res)
              // Find the product to add in the basket
              let check_product = current_basket.product.some(item => {
                return item.id == id
              })
              if(!check_product)
              {  
                this.productService.getById(id.toString()).subscribe(
                  res =>{
                    console.log("res get assosieted product")
                    console.log(res)
                    let product_to_add = new Product(res.id, res.name, res.description, res.buying_price, res.selling_price, res.stock, res.stock_available, res.weight, res.images, res.is_deleted, res.category, res.order, res.basket)
                    console.log("product_to_add")
                    console.log(product_to_add)
                    // verifier est ce que le panier a deja le produit
                    console.log("check_product")
                    console.log(check_product)
                      current_basket.product.push(product_to_add)
                      console.log("current_basket after pushing the new product")
                      console.log(current_basket)
                      this.basketService.update(current_basket.id, current_basket).subscribe(
                        res => {
                          console.log("res update current basket")
                          console.log(res)
                        },
                        err =>{
                          console.log("err update current basket")
                          console.log(res)
                        }
                      )
                    
                  },
                  err =>{
                    console.log(err)
                  }
                )}
                else{
                  console.log("else")
                }
            },
            err => {

            }
          )
            
        }
      }, 
      err => {

      }
    )
  }

  addToBasket(id:string){
    console.log(id)
    console.log("This is the product-list to add a product to the front basket")

    let panier = localStorage.getItem("products")
    console.log("panier")
    console.log(panier)
    

    if ( panier != null) {
      this.panier_product = JSON.parse(panier)
      if (id) {

        if (this.panier_product) {
          let table = this.panier_product;
          if (table) {
              console.log('table.includes(id)')
              console.log(table.includes(parseInt(id)))
              if (!table.includes(parseInt(id))) {
                
                console.log("table in if")
                console.log(table)
                table.push(parseInt(id))
                
                localStorage.removeItem("products")
                localStorage.setItem("products", JSON.stringify(table));
                console.log("localStorage.getItem('products') in product-list")
                console.log(localStorage.getItem("products"))
              }
              else {
                console.log("product already existe in basket")
                this.product_exist = true
              }
            }

          console.log("table")
          console.log(table)
          
          console.log("id")
          console.log(id)
        }
          

      }
    }

    // const test = JSON.parse(localStorage.getItem("products"))
    // console.log("test")
    // console.log(test)

  }


  goToProductCreate(){
    this.router.navigate(['/product-create']);
  }
  editProduct(id:number){
    
  }
  deleteProduct(id:number){

    if (id) {
      // const suppressedProduct: Product = new Product(0, '', '', 0, 0, 0, 0, 0, [], false);
      this.productService.getById(id.toString()).subscribe(
        res => {
          console.log(res)
          const suppressedProduct = new Product(res.id, res.name, res.description, res.buying_price, res.selling_price, res.stock, res.stock_available, res.weight, res.images, true, res.category, res.order, res.basket)
          this.productService.delete(id, suppressedProduct).subscribe(
            res => {
              console.log(res)
            },
            err => {
              console.log(err)
            }
          )
          this.router.navigate(['/products']);
        },
        err =>{
          console.log(err)
        }
      )

      /*this.productService.delete(id).subscribe(
        res => {
          console.log(res)
          this.router.navigate(['/products']);
        },
        err =>{
          console.log(err)
        }
      )*/
    }
    else{
      console.log(id+"error")
    }
  }

}
