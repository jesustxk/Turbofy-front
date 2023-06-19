import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { Song } from '../../models/song';
import { AuthService } from '../../services/auth.service';
import { TurbofyApiService } from '../../services/turbofy-api.service';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.page.html',
  styleUrls: ['./all-songs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class AllSongsPage implements OnInit {

  songs: Song[] = [];
  loggedIn: boolean;

  constructor(public turbofyApi: TurbofyApiService, private authService: AuthService, private actionSheetCtrl: ActionSheetController) { }

  async ngOnInit() {
    this.songs = await this.turbofyApi.getAllSongs();

    // Comprobamos si el usuario ha iniciado sesion
    this.loggedIn = this.authService.isLoggedIn();
  }

  async deleteSong(songId: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Seguro que quieres eliminar la canción?',
      cssClass: 'my-custom-actionsheet',
      buttons: [
        {
          text: 'ELIMINAR',
          handler: async () => {
            await this.turbofyApi.deleteSong(songId);

            this.songs = await this.turbofyApi.getAllSongs();
          }
        },
        {
          text: 'CANCELAR'
        },
      ],
    });

    await actionSheet.present();
  }

}
