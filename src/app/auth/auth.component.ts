import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  userLoggedIn='';

  constructor(
    private authService:AuthService,
    private tokenStorage:TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  form = {username:'', password: ''}

  get f(){
    return this.form
  }

  ngOnInit(): void {
  }

  submit(){
    if (this.form.username && this.form.password) {
      //let auth = new User(0, '', '', '', '', '', this.form.username, this.form.password, '', false)
      
      this.authService.login(this.form.username, this.form.password).subscribe(
        res => {
          this.tokenStorage.saveToken(res);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.userLoggedIn = <string>this.tokenStorage.getUsername();
          // window.location.reload
          this.router.navigate(['/products']);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      )
    } else {
      this.errorMessage = "Please, fill all the champs";
      this.isLoginFailed = true;
    }
  }
  goToRegister()
  {
    this.router.navigate(['/register']);
  }

}
