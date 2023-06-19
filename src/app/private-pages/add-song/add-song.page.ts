import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Toast } from '@capacitor/toast';
import { IonicModule } from '@ionic/angular';
import { TurbofyApiService } from '../../services/turbofy-api.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.page.html',
  styleUrls: ['./add-song.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class AddSongPage implements OnInit {

  songForm: FormGroup | undefined;

  photo: string;

  constructor(private turbofyApi: TurbofyApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.songForm = this.formBuilder.group({
      url: new FormControl('', Validators.compose([
        Validators.pattern('(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?')
      ])),
      name: new FormControl('', Validators.compose([
        Validators.pattern('^[ a-zñáéíóúA-ZÑÁÉÍÓÚ0-9_.,():-]*$')
      ])),
      duration: new FormControl('', Validators.compose([
        Validators.pattern('^(0?[1-9]|1[0-2]):[0-5][0-9]$')
      ])),
      artist: new FormControl('', Validators.compose([
        Validators.pattern('^[ a-zñáéíóúA-ZÑÁÉÍÓÚ0-9_.,():-]*$')
      ])),
      album: new FormControl('', Validators.compose([
        Validators.pattern('^[ a-zñáéíóúA-ZÑÁÉÍÓÚ0-9_.,():-]*$')
      ])),
      date: new FormControl('', Validators.compose([
        Validators.pattern('[0-9]{4}-[0-1]{0,1}[0-9]{1}-[0-3]{0,1}[0-9]{1}')
      ])),
    });
  }

  async addSong(value: {
    url: string; name: string; duration: string; 
    artist: string; album: string; date: Date
  }) {
    
    const song = {
      name: value.name,
      duration: value.duration,
      artist: value.artist,
      album: value.album,
      date: value.date,
      image: {},
      geolocation: {}
    }

    if (this.photo) {
      song.image = { base64: this.photo };
    } else if (value.url) {
      song.image = { url: value.url };
    }

    const response = await this.turbofyApi.addSongFromForm(song);

    if (response.message) {
      await Toast.show({
        text: response.message,
        position: 'top'
      });
    } else {
      this.router.navigateByUrl('/songs/all-songs');
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      allowEditing: false,
      quality: 100
    });

    this.photo = 'data:image/jpeg;base64,' + image.base64String;
  }

}
