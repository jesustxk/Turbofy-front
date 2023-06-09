import { Injectable } from '@angular/core';
import { Song } from '../models/song';
import { GeolocationService } from '../services/geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class TurbofyApiService {

  turbofyAPI: string = 'http://localhost:8080';

  constructor(private geolocationService: GeolocationService) { }

  async addSong(newSong: Song) {
    console.log('addSong');

    const geolocation = await this.geolocationService.getGeolocation();

    newSong.geolocation = { latitude: geolocation.latitude, longitude: geolocation.longitude};

    let responseSong = await fetch(this.turbofyAPI + '/songs/create', {
      method: 'POST',
      body: JSON.stringify(newSong),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const song = await responseSong.json();
    return song;
  }

  async addSongFromForm(newSong: any) {
    console.log('addSongFromForm');
    
    const geolocation = await this.geolocationService.getGeolocation();

    newSong.geolocation = { latitude: geolocation.latitude, longitude: geolocation.longitude};
    
    let responseSong = await fetch(this.turbofyAPI + '/songs/create', {
      method: 'POST',
      body: JSON.stringify(newSong),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const song = await responseSong.json();
    return song;
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

  async updateSong(editedSong: any) {
    console.log('updateSong');

    const geolocation = await this.geolocationService.getGeolocation();

    editedSong.geolocation = { latitude: geolocation.latitude, longitude: geolocation.longitude};

    let responseSong = await fetch(this.turbofyAPI + '/songs/update?songId=' + editedSong._id, {
      method: 'POST',
      body: JSON.stringify(editedSong),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const song = await responseSong.json();
    return song;
  }

  async deleteSong(songId: string) {
    console.log('deleteSong');

    let responseSong = await fetch(this.turbofyAPI + '/songs/delete?songId=' + songId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const song = await responseSong.json();
    return song;
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

  async addComment(songId: string, author: string, comment: string, rating: number): Promise<Song> {
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

  async deleteComment(songId: string, commentId: string): Promise<Song> {
    console.log('deleteComment');

    let responseSong = await fetch(this.turbofyAPI + '/comments/delete?songId=' + songId + '&commentId=' + commentId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const song = await responseSong.json();
    return song;
  }

}
