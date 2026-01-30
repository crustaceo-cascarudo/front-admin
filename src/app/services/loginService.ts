import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/loginResponse';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  http = inject(HttpClient);
  authService = inject(AuthService);
  httpClient = inject(HttpClient);
  private url = "https://api-store-class.ishimi.es/api/";

  logIn(email: string, plainPassword: string) {
    this.http.post<LoginResponse>(this.url, { email, plainPassword }).subscribe({
      next: (datos) => {
        console.log(datos);

        if (datos.token != null && datos.token != "") {
          this.authService.setToken(datos.token)
        } else {
          this.authService.removeToken()
          alert("Contraseña incorrecta");
        }
      },

      error: (error) => console.log('ERROR JSON SERVER' + error.status),
    });
  }

  logOut() {
    this.authService.logout().subscribe();
  }
}
