import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    http = inject(HttpClient);
    url = ''; //ToDO add url of the api

    isAdminSubject = new BehaviorSubject<boolean>(false);

    isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();

    logIn(password: string) {
        this.http.get<string[]>(this.url).subscribe({
            next: (datos) => {
                console.log(datos);

                if (datos.at(0) === password) {
                    this.isAdminSubject.next(true);
                } else {
                    this.isAdminSubject.next(false);
                    alert("Contraseña incorrecta");
                }
            },
            error: (error) => console.log('ERROR JSON SERVER' + error.status),
        });
    }
    logOut() {
        this.isAdminSubject.next(false);
        //this.isAdminSubject.complete();
    }
}
