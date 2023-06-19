import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { Song } from '../../models/song';
import { AuthService } from '../../services/auth.service';
import { TurbofyApiService } from '../../services/turbofy-api.service';

@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.page.html',
  styleUrls: ['./search-songs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class SearchSongsPage implements OnInit {

  searchForm: FormGroup | undefined;
  songs: Song[] = [];
  loggedIn: boolean;

  constructor(private turbofyApi: TurbofyApiService, private formBuilder: FormBuilder, private authService: AuthService, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.pattern('^[ a-zñáéíóúA-ZÑÁÉÍÓÚ0-9_.,():-]*$')
      ])),
      artist: new FormControl('', Validators.compose([
        Validators.pattern('^[ a-zñáéíóúA-ZÑÁÉÍÓÚ0-9_.,():-]*$')
      ])),
      date: new FormControl('', Validators.compose([
        Validators.pattern('[0-9]{4}-[0-1]{0,1}[0-9]{1}-[0-3]{0,1}[0-9]{1}')
      ])),
    });

    // Comprobamos si el usuario ha iniciado sesion
    this.loggedIn = this.authService.isLoggedIn();
  }

  async searchSong(value: { name: String; artist: String; date: String }) {
    this.songs = await this.turbofyApi.searchSong(value.name, value.artist, value.date);
  }

  async deleteSong(songId: any) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Seguro que quieres eliminar la canción?',
      buttons: [
        {
          text: 'ELIMINAR',
          handler: async () => {
            const response = await this.turbofyApi.deleteSong(songId);

            // Controlamos la respuesta
            await Toast.show({
              text: response.message,
              position: 'top'
            });
            
            this.searchSong(this.searchForm?.value);
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
