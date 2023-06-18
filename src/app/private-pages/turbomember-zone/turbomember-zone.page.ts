import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-turbomember-zone',
  templateUrl: './turbomember-zone.page.html',
  styleUrls: ['./turbomember-zone.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class TurbomemberZonePage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  tryLogout() {
    this.router.navigate(["/home"]);
    this.authService.doLogout()
      .then(res => {
        this.showSuccess();
        console.log('Cierre de sesión');
      }, err => {
        this.showError();
        console.log(err);
      })
  }

  async showError() {
    await Toast.show({
      text: 'Error al cerrar sesión. Inténtelo de nuevo',
      position: 'top'
    });
  };

  async showSuccess() {
    await Toast.show({
      text: 'Cierre de sesión realizado con éxito.',
      position: 'top'
    });
  };

}
