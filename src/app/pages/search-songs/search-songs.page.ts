import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.page.html',
  styleUrls: ['./search-songs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SearchSongsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
