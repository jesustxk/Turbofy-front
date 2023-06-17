import { Injectable } from '@angular/core';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class TurbofyApiService {

  turbofyAPI: string = 'http://localhost:8080';

  constructor() { }

  async addSong() {
    console.log('addSong');

  }

  async getSong(songId: string) {
    console.log('getSong');

    let responseSong = await fetch(this.turbofyAPI + '/songs/read?songId=' + songId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const song = await responseSong.json();
    console.log(song)
    return song;
  }

  async getAllSongs(): Promise<Song[]> {
    console.log('getAllSongs');
    
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
    console.log('searchSong');
    
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
    console.log('updateSong');

  }

  async deleteSong() {
    console.log('deleteSong');

  }

  async getSpotySongs() {
    console.log('getSpotySongs');

  }

  async addComment() {
    console.log('addComment');

  }

  async deleteComment() {
    console.log('deleteComment');
    
  }

}
