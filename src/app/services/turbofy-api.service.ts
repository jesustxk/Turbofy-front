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

  async searchSong(name: String, artist: String, date: String): Promise<Song[]> {
    console.log('WORK')
    let queryParams = '';

    if (name) {
      queryParams += 'name=' + name;
    } else if (artist) {
      queryParams += 'artist=' + artist;
    } else if (date) {
      queryParams += 'date=' + date;
    }

    let responseSongs = await fetch(this.turbofyAPI + '/songs/search?' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const songs = await responseSongs.json();
    return songs;
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
