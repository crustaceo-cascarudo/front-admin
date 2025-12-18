import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../services/loginService';

@Component({
  selector: 'p-login',
  imports: [FormsModule],
  templateUrl: './p-login.html',
  styleUrl: './p-login.scss',
})


export class PLogin {
  logInService = inject(LoginService);

  loginService = inject(LoginService)

  loginData = {
    username: '',
    password: ''
  };

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Login data:', this.loginData);
      alert('Login submitted!');

      this.logInService.logIn(this.loginData.username, this.loginData.password)
    }
  }
}
