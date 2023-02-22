import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  isAdmin = false;
  isClient = false;
  isFournisseur = false;
  username?: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("token", this.tokenStorageService.getTokenValue());
    if (this.tokenStorageService.getTokenValue() != null) {
      this.isLoggedIn = true;
      console.log("isLoggedIn is true")
    }
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUsername();
      this.isAdmin = <boolean>this.tokenStorageService.hasRole('ADMIN');
      this.isClient = <boolean>this.tokenStorageService.hasRole('CLIENT');
      this.isFournisseur = <boolean>this.tokenStorageService.hasRole('FOURNISSEUR');
      this.username = <string>this.tokenStorageService.getUsername();
      console.log(this.isAdmin, "isAdmin")
      console.log(this.isClient, "isClient")
      console.log(this.isFournisseur, "isFournisseur")
      console.log(this.username, "username")
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    this.isAdmin = false
    this.isClient = false
    this.isFournisseur = false
    this.username = ''
    this.router.navigate(['/login']);
  }
  login(){
    this.router.navigate(['/login']);
  }
  register(){
    this.router.navigate(['/user-create']);
  }

}
