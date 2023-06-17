import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  loginErrors : Map<string, string> = new Map<string, string>();

  formValidation: FormGroup | undefined;
  errorMessage: string = '';
  
  formMessages = {
    'email': [
      { type: 'required', message: 'El email es un campo obligatorio.' },
      { type: 'pattern', message: 'El formato del email no es correcto.' }],
    'password': [
      { type: 'required', message: 'La contraseña es un campo obligatorio.' },
      {
        type: 'minlength', message: 'La lóngitud mínima de una contraseña es 6 caracteres.'
      }]
  };

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formValidation = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
    
    // Preparamos los mensajes de error
    this.loginErrors.set('auth/user-not-found', 'Usuario no encontrado. Contacte con el administrador.');
    this.loginErrors.set('auth/wrong-password', 'Contraseña incorrecta. Contacte con el administrador.');
  }

  tryLogin(value: { email: string; password: string; }) {
    this.authService.doLogin(value)
      .then(res => {
        this.showSuccess();
        this.router.navigate(["/turbomember-zone"]);
      }, err => {
        this.showError();
        console.log(err.code);
      })

      this.resetForms();
  }

  async showError() {
    await Toast.show({
      text: 'Error en el acceso, revise los datos introducidos.',
      position: 'top'
    });
  };

  async showSuccess() {
    await Toast.show({
      text: 'Inicio de sesión realizado con éxito.',
      position: 'top'
    });
  };

  private resetForms() {
    this.formValidation?.reset();
  }

}
