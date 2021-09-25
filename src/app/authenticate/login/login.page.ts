import { Component, OnInit } from '@angular/core';
import { IUser, UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public inputPassword = {
    visible: false,
    passwordEyeIcon: 'eye-off-outline',
    inputType: 'password'
  };
  public user: IUser;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.init();
  }

  public isPasswordVisible(state: boolean) {
    if (state === true) {
      this.inputPassword.visible = false;
      this.inputPassword.passwordEyeIcon = 'eye-outline';
      this.inputPassword.inputType = 'text';
    }

    if (state === false) {
      this.inputPassword.visible = true;
      this.inputPassword.passwordEyeIcon = 'eye-off-outline';
      this.inputPassword.inputType = 'password';
    }
  }

  login() {
    const email = this.user.email;
    const password = this.user.password;
    const result = this.userService.login(email, password);

    if (!result) {
      throw Error('E-mail ou senha inválidos!');
    }

    alert('Autenticado com sucesso!');
  }
}
