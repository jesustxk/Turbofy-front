import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Toast } from '@capacitor/toast';
import { IonicModule } from '@ionic/angular';
import { Song } from '../../models/song';
import { TurbofyApiService } from '../../services/turbofy-api.service';

@Component({
  selector: 'app-import-song',
  templateUrl: './import-song.page.html',
  styleUrls: ['./import-song.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class ImportSongPage implements OnInit {

  searchForm: FormGroup | undefined;

  songs: Song[] = [];

  constructor(private turbofyApi: TurbofyApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.pattern('[a-zñÑ A-Z]+')
      ])),
      artist: new FormControl('', Validators.compose([
        Validators.pattern('[a-zñÑ A-Z]+')
      ])),
      date: new FormControl('', Validators.compose([
        Validators.pattern('[0-9]{4}-[0-1]{0,1}[0-9]{1}-[0-3]{0,1}[0-9]{1}')
      ])),
    });
  }

  async searchSong(value: { name: String; artist: String; date: String }) {
    this.songs = await this.turbofyApi.searchSpotySongs(value.name, value.artist, value.date);
  }

  async importSong(song: Song) {
    // Importamos la cancion
    const response = await this.turbofyApi.addSong(song);

    // Controlamos la respuesta
    if (response.message) {
      await Toast.show({
        text: response.message,
        position: 'top'
      });
    } else {
      await Toast.show({
        text: 'Canción añadida',
        position: 'top'
      });
    }
  }

}
