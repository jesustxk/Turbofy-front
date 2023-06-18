import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { GeolocationService } from '../services/geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class TurbofyApiService {

  turbofyAPI: string = 'http://localhost:8080';

  constructor(private geolocationService: GeolocationService) { }

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

  async searchSpotySongs(name: String, artist: String, date: String): Promise<Song[]> {
    console.log('searchSpotySongs');

    let queryParams = '';

    if (name) {
      queryParams += 'name=' + name + ' ';
    } else if (artist) {
      queryParams += 'artist=' + artist + ' ';
    } else if (date) {
      queryParams += 'date=' + date;
    }

    let responseSongs = await fetch(this.turbofyAPI + '/songs/spoty/read?searchParams=' + queryParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const songs = await responseSongs.json();
    return songs;
  }

  async addComment(songId: string, author: string, comment: string, rating: number) {
    console.log('addComment');

    const geolocation = await this.geolocationService.getGeolocation();

    const newComment = {
      author: author,
      comment: comment,
      rating: rating,
      geolocation: { latitude: geolocation.latitude, longitude: geolocation.longitude},
      // la fecha se pone por defecto la actual al insertar en la base de datos
    };

    let responseSong = await fetch(this.turbofyAPI + '/comments/create?songId=' + songId, {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const song = await responseSong.json();
    return song;
  }

  async deleteComment() {
    console.log('deleteComment');

  }

}
