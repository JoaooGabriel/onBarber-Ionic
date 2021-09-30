import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
  constructor(private userService: UserService, private navController: NavController) { }

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
    if (
      !this.user.email ||
      !this.user.password
    ) {
      alert('Por favor, preencha todos os campos!');
      throw Error('Por favor, preencha todos os campos!');
    }

    const user = this.userService.login(this.user.email, this.user.password);

    this.ngOnInit();
    this.userService.navigate('/home');

    return user;
  }
}
