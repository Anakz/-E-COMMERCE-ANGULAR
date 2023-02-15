import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
  template : `{{ currentIndex }}`
})
export class CategoryEditComponent implements OnInit {

  currentIndex:string = "99"
  isAdmin = false
  errorMessage:string = ''
  category = new Category(0, '', false)

  constructor(
    private route: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private categoryService: CategoryService,
    private router: Router,
  ) {
    this.currentIndex = this.route.snapshot.queryParams['currentIndex'];
    console.log(this.route.snapshot.queryParams['currentIndex'])
   }

  ngOnInit(): void {
    this.authVerify()
    if (this.isAdmin) {
      this.categoryService.getById(parseInt(this.currentIndex)).subscribe(
        res => {
          console.log("res category-create")
          console.log(res)
          this.category = new Category(res.id, res.name, res.is_deleted, res.products)
        },
        err => {
          console.log("err category-create")
          console.log(err)
        }
      )
    }
  }
  submit(){
    if (this.category.name && this.category.is_deleted == false) {
      
      this.categoryService.update(this.category.id, this.category).subscribe(
        res => {
          console.log("res category update")
          console.log(res)
          this.router.navigate(['/category-list']);
        },
        err => {
          console.log("err category create")
          console.log(err)
        }
      )
    } else{
      this.errorMessage = "Please, verify all fields"
    }
  }
  goToCategoryList(){

  }
  authVerify(){
    if (this.tokenStorageService.hasRole('ADMIN')) {
      this.isAdmin = true;
      console.log("this.isAdmin user-list");
      console.log(this.isAdmin);
    }
  }

}
