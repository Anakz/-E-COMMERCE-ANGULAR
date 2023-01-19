import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  allCategories?: any
  categories:Array<Category> = []

  constructor(
    private categoryService: CategoryService
  ) { }

  
  ngOnInit(): void {
    this.categoryService.getAll().subscribe(
      res => {
        console.log("res all categories")
        console.log(res)
        this.allCategories = res
      },
      err => {
        console.log("err all categories")
        console.log(err)
      }
    )
  }
  goToProduct(name:string){
    console.log("name category")
    console.log(name)
  }

}
