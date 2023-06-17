import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TurbofyApiService } from '../../services/turbofy-api.service';

@Component({
  selector: 'app-search-songs',
  templateUrl: './search-songs.page.html',
  styleUrls: ['./search-songs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SearchSongsPage implements OnInit {

  constructor(public turbofyApi: TurbofyApiService) { }

  ngOnInit() {
    
  }

}
