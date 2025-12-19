import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/loginResponse';
import { AuthService } from './auth-service';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    http = inject(HttpClient);
    authService = inject(AuthService);
    url = 'http://localhost:8080/api/users/login';

    logIn(name: string, plainPassword: string) {
        this.http.post<LoginResponse>(this.url, {name, plainPassword}).subscribe({
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
