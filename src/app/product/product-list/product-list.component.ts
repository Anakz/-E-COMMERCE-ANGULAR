import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { Basket } from 'src/app/model/basket';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { BasketService } from 'src/app/services/basket.service';
import { ProductService } from 'src/app/services/product.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

// import { MatDialog } from '@angular/material/dialog';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private basketService: BasketService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    // private dialog: MatDialog,
  ) { }
  // 
  openModal(){
    // this.dialog.open(NavbarComponent);
  }
  // 

  panier_product ?: number[];
  product_exist:boolean = false

  products: any;
  allProduct: Array<Product> = new Array();
  validProduct: Array<Product> = new Array();
  productCategory: Array<Product> = new Array();
  testProduct: Array<Product> = new Array();
  errormessage?: string;

  currentProduct: Product = new Product(0, '', '', 0, 0, 0, 0, 0, [], 0, 0, false);
  currentIndex = -1;
  name = ''
  isAdmin: boolean = false
  isClient: boolean = false
  isFournisseur: boolean = false
  my_basket:Basket = new Basket(0, new Date(), 0, 0, new User(6,'','', '', '', '', '', '', '', false,[], 0 ), [], false)
  fournisseur_id = 0

  // Category name
  current_category?: string | null;
  emptyAllProduct:boolean = false;


  ngOnInit(): void {

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
        if (this.tokenStorageService.hasRole('ADMIN')) {
          this.isAdmin = true;
          console.log("this.isAdmin");
          console.log(this.isAdmin);
        }
        if (this.tokenStorageService.hasRole('CLIENT')) {
          this.isClient = true;
          console.log("this.isClient");
          console.log(this.isClient);
        }
        if (this.tokenStorageService.hasRole('FOURNISSEUR')) {
          this.isFournisseur = true;
          console.log("this.isFournisseur");
          console.log(this.isFournisseur);
        }

        this.allProduct.map(item => {
          console.log("this.testProduct")
          console.log(this.testProduct)
          this.testProduct.push(new Product(item.id, item.name, item.description, item.buying_price, item.selling_price, item.stock, item.stock_available, item.weight, item.images, item.selected_quantity, item.fournisseur, item.is_deleted))
        })

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
        console.log("this.allProduct----------------------------------------------------------")
        console.log(this.allProduct)
        console.log("current_category----------------------------------------------------------")
        console.log(current_category)
        this.allProduct = products.filter((item:any) => {
          let product = new Product(item.id, item.name, item.description, item.buying_price, item.selling_price, item.stock, item.stock_available, item.weight, item.images, item.selected_quantity, item.fournisseur, item.is_deleted, item.category, item.order, item.basket)
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

  test(){
    this.userService.getByEmail("user@gmail.com").subscribe(
      res => {
        console.log("res test email")
        console.log(res)
      },
      err => {
        console.log("err test email")
        console.log(err)
      }
    )
  }

  updateBasket(id:number){
    //Find the login user
    if(this.tokenStorageService.getUsername() != null){
      let email = this.tokenStorageService.getUsername() || ''
      this.userService.getByEmail(email).subscribe(
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
              console.log("Check produit")
              console.log(check_product)
                this.productService.getById(id.toString()).subscribe(
                  res =>{
                    console.log("res get assosieted product")
                    console.log(res)
                    let product_to_add = new Product(res.id, res.name, res.description, res.buying_price, res.selling_price, res.stock, res.stock_available, res.weight, res.images, res.selected_quantity, res.fournisseur, res.is_deleted, res.category, res.order, res.basket)
                    console.log("product_to_add")
                    console.log(product_to_add)
                    // verifier est ce que le panier a deja le produit
                    console.log("check_product")
                    console.log(check_product)
                    //Here to change--------------------------------
                    if (!check_product) {
                      current_basket.product.push(product_to_add)
                      console.log("current_basket after pushing the new product")
                      console.log(current_basket)
                      this.basketService.update(current_basket.id, product_to_add.id).subscribe(
                        res => {
                          console.log("res update current basket")
                          console.log(res)
                          alert("Product added to the Cart")
                        },
                        err =>{
                          console.log("err update current basket")
                          console.log(err)
                        }
                      )
                    } else{
                      current_basket.product.map((product:Product) => {
                        if (product.id == product_to_add.id) {
                          console.log("hahahaa you Got me")
                          product.selected_quantity = product.selected_quantity+1
                          product_to_add.selected_quantity = product_to_add.selected_quantity+1
                          this.basketService.update2(current_basket.id, product_to_add).subscribe(
                            res => {
                              alert("Product added to the Cart")
                              console.log("res update current basket")
                              console.log(res)
                            },
                            err =>{
                              console.log("err update current basket")
                              console.log(err)
                            }
                          )
                        }
                      })
                    }
                      
                  },
                  err =>{
                    console.log(err)
                  }
                )
            },
            err => {

            }
          )
            
        }
      }, 
      err => {

      }
    )}
    else {
      alert("Please, log in to add a product to your cart")
      console.log("no login found")
    }
  }


  goToProductCreate(){
    this.router.navigate(['/product-create']);
  }
  editProduct(id:number){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentIndex: id
      }
    };
    this.router.navigate(['/product-edit'], navigationExtras);
  }
  deleteProduct(id:number){

    if (id) {
      // const suppressedProduct: Product = new Product(0, '', '', 0, 0, 0, 0, 0, [], false);
      this.productService.getById(id.toString()).subscribe(
        res => {
          console.log("res get product in delete product")
          console.log(res)
          const suppressedProduct = new Product(res.id, res.name, res.description, res.buying_price, res.selling_price, res.stock, res.stock_available, res.weight, res.images, res.selected_quantity, res.fournisseur, true, res.category, res.order, res.basket)
          console.log("the suppressed product")
          console.log(suppressedProduct)
          this.productService.delete(id, suppressedProduct).subscribe(
            res => {
              console.log("res update product in delete product")
              console.log(res)
              if (this.products.length >0) {
                let index_product_to_delete = this.products.findIndex((product: Product) => {
                  product.id == id
                })
                this.products.splice(index_product_to_delete, 1)
                alert("Product deleted")
                if (this.allProduct.length > 0) {
                  console.log("if (this.allProduct.length > 0)")
                  console.log(this.allProduct.length)
                  let index_allProduct_to_delete = this.allProduct.findIndex((product: Product) => {
                    product.id == id
                  })
                  this.allProduct.splice(index_allProduct_to_delete, 1)
                  alert("Product deleted")
                  console.log("new this.allPproduct")
                  console.log(this.allProduct)
                }
                console.log("new this.products")
                console.log(this.products)
              }

            },
            err => {
              console.log("err in delete product")
              console.log(err)
              if (this.products.length >0) {
                let index_product_to_delete = this.products.findIndex((product: Product) => {
                  console.log("product && id")
                  console.log(product.id +" && "+ id)
                  return product.id === id
                })
                console.log("index_product_to_delete")
                console.log(index_product_to_delete)
                this.products.splice(index_product_to_delete, 1)
                alert("Product deleted")
                if (this.allProduct.length > 0) {
                  console.log("if (this.allProduct.length > 0)")
                  console.log(this.allProduct.length)
                  let index_allProduct_to_delete = this.allProduct.findIndex((product: Product) => {
                    return product.id == id
                  })
                  this.allProduct.splice(index_allProduct_to_delete, 1)
                  alert("Product deleted")
                  console.log("new this.allPproduct")
                  console.log(this.allProduct)
                }
                console.log("new this.products")
                console.log(this.products)
              }
            }
          )
          // this.router.navigate(['/products']);
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
