import { Injectable } from '@angular/core';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class TurbofyApiService {

  turbofyAPI: string = 'http://localhost:8080';

  constructor() { }

  async addSong() {

  }

  async getSong(songId: string) {

  }

  async getAllSongs(): Promise<Song[]> {
    let responseSongs = await fetch(this.turbofyAPI + '/songs/readAll', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const songs = await responseSongs.json();
    return songs;
  }

  async searchSong() {

  }

  async updateSong() {

  }

  async deleteSong() {

  }

  async getSpotySongs() {

  }

  async addComment() {

  }

  async deleteComment() {
    
  }

}
