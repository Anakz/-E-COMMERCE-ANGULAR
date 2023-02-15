import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/services/category.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  category = new Category(0, '', false)
  errorMessage:string = ''
  isAdmin = false

  constructor(
    private categoryService: CategoryService,
    private router: Router,    
    private tokenStorageService: TokenStorageService,

  ) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getUsername() != null) {
      if (this.tokenStorageService.hasRole('ADMIN')) {
        this.isAdmin = true;
      }
    }
  }

  submit(){
    if (this.category.name && this.category.is_deleted == false) {
      
      this.categoryService.create(this.category).subscribe(
        res => {
          console.log("res category create")
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
    this.router.navigate(['/category-list']);
  }

}
