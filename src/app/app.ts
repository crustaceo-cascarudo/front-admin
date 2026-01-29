import { Component, signal, inject } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { NavBar } from "./components/nav-bar/navbar";
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './services/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('front-admin');
  private authService = inject(AuthService);

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
