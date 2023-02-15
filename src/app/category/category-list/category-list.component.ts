import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories:any
  isAdmin = false;

  constructor(
    private categoryService: CategoryService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.hasRole('ADMIN')) {
      this.isAdmin = true
      this.categoryService.getAll().subscribe(
        res => {
          console.log("res category list")
          console.log(res)
          this.categories = res
        },
        err =>{
        }
      )
    }
  }
  goToCategoryCreate(){
    this.router.navigate(['/category-create']);
  }
  goToCategoryDetail(id:number){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentIndex: id
      }
    };
    this.router.navigate(['/category-detail'], navigationExtras);
  }
  editCategory(id:number){
    const navigationExtras: NavigationExtras = {
      queryParams: {
        currentIndex: id
      }
    };
    this.router.navigate(['/category-edit'], navigationExtras);
  }
  deleteCategory(id:number){
    if (this.isAdmin) {
      this.categoryService.getById(id).subscribe(
        res => {
          const deletedCategory = new Category(res.id, res.name, res.is_deleted, res.products)
          this.categoryService.delete(id, deletedCategory).subscribe(
            res => {
              console.log("category deleted in category list")
              console.log(res)
              if (this.categories.length > 0) {
                let index_category_to_delete = this.categories.findIndex((category: any) =>{
                  category == id
                })
                this.categories.splice(index_category_to_delete, 1)
              }
            },
            err =>{
              console.log("err category deleted in category list")
              console.log(err)
              if (this.categories.length > 0) {
                let index_category_to_delete = this.categories.findIndex((category: any) =>{
                  category == id
                })
                this.categories.splice(index_category_to_delete, 1)
              }
            }
          )
        },
        err =>{
          console.log("err find cetegory by id in deleted category in category list")
          console.log(err)
        }
      )
    }
  }

}
