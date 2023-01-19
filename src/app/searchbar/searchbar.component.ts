import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category';
import { CategoryService } from '../services/category.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  allCategories?: any
  categories:Array<Category> = []

  form = new FormGroup({
    selectCategory: new FormControl('', Validators.required),
    nameCategory: new FormControl('', Validators.required)
  });
  
  constructor(
    private categoryService: CategoryService,
    private router: Router,
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
  search(){
    console.log("I am in the search method")
    console.log(this.form.get('selectCategory')?.value);
    console.log(this.form.get('nameCategory')?.value);
    if (this.form.get('selectCategory')?.value) {
      console.log("hahhahaha this is if")
      this.router.navigate([`/products/`+this.form.get('selectCategory')?.value]);
      // this.router.navigate(['/product-create']);
    }
  }
  // submit() {
  //   console.log(this.form.get('selectCategory'));
  //   console.log(this.form.get('nameCategory')?.value);
  // }
  

}
