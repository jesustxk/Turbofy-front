import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Song } from '../../models/song';
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

  constructor(private turbofyApi: TurbofyApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.pattern('[a-zñÑ A-Z]+')
      ])),
      artist: new FormControl('', Validators.compose([
        Validators.pattern('[a-zñÑ A-Z]+')
      ])),
      date: new FormControl('', Validators.compose([
        Validators.pattern('[0-9]{4}/[0-1]{0,1}[1-9]{1}/[0-3]{0,1}[1-9]{1}')
      ])),
    });
  }

  async searchSong(value: { name: String; artist: String; date: String }) {
    this.songs = await this.turbofyApi.searchSong(value.name, value.artist, value.date);
  }

}
