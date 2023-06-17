import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Song } from '../../models/song';
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

  constructor(public turbofyApi: TurbofyApiService) { }

  async ngOnInit() {
    this.songs = await this.turbofyApi.getAllSongs();
  }

}
