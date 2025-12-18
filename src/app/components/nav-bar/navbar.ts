import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginService } from '../../services/loginService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavBar {
  loginService = inject(LoginService)
  router = inject(Router);

  logOut(){
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }
}
