import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { IUser, UserService } from './../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public inputPassword = {
    visible: false,
    passwordEyeIcon: 'eye-off-outline',
    inputType: 'password',
  };

  public user: IUser;
  constructor(private userService: UserService) {}

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

  register() {
    if (
      !this.user.name ||
      !this.user.phone ||
      !this.user.city ||
      !this.user.email ||
      !this.user.password
    ) {
      alert('Por favor, preencha todos os campos!');
      throw Error('Por favor, preencha todos os campos!');
    }

    this.user.id = uuid();
    this.userService.store(this.user);
    this.ngOnInit();
    this.userService.navigate('/authenticate/login');
  }
}
