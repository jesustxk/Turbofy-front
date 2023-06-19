import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TurbofyApiService } from '../../services/turbofy-api.service';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.page.html',
  styleUrls: ['./edit-song.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditSongPage implements OnInit {

  songForm: FormGroup | undefined;
  comments: Comment[] = [];
  song: any;

  constructor(private turbofyApi: TurbofyApiService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  async ngOnInit() {
    await this.getSong();
    
    this.songForm = this.formBuilder.group({
      url: new FormControl(this.song.image?.url, Validators.compose([
        Validators.pattern('(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?')
      ])),
      name: new FormControl(this.song.name, Validators.compose([
        Validators.pattern('^[ a-zñáéíóúA-ZÑÁÉÍÓÚ0-9_.,():-]*$')
      ])),
      duration: new FormControl(this.song.duration, Validators.compose([
        Validators.pattern('^(0?[1-9]|1[0-2]):[0-5][0-9]$')
      ])),
      artist: new FormControl(this.song.artist, Validators.compose([
        Validators.pattern('^[ a-zñáéíóúA-ZÑÁÉÍÓÚ0-9_.,():-]*$')
      ])),
      album: new FormControl(this.song.album, Validators.compose([
        Validators.pattern('^[ a-zñáéíóúA-ZÑÁÉÍÓÚ0-9_.,():-]*$')
      ])),
      date: new FormControl(this.song.date, Validators.compose([
        Validators.pattern('[0-9]{4}-[0-1]{0,1}[0-9]{1}-[0-3]{0,1}[0-9]{1}')
      ])),
    });
  }

  async getSong() {
    this.song = await this.turbofyApi.getSong(String(this.route.snapshot.paramMap.get('songId')));

    if (this.song.comments) {
      this.comments = this.song.comments;
    }
  }

  async editSong(value: {
    url: string; name: string; duration: string;
    artist: string; album: string; date: Date
  }) {

    const editedSong = {
      _id: this.song._id,
      name: value.name,
      duration: value.duration,
      artist: value.artist,
      album: value.album,
      date: value.date,
      image: { url: value.url },
      geolocation: {}
    }

    this.song = await this.turbofyApi.updateSong(editedSong);
  }

}
