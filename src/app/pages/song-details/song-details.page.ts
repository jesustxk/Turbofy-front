import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TurbofyApiService } from '../../services/turbofy-api.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.page.html',
  styleUrls: ['./song-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SongDetailsPage implements OnInit {

  song: any;

  constructor(private turbofyApi: TurbofyApiService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.song = await this.turbofyApi.getSong(String(this.route.snapshot.paramMap.get('songId')));
  }

}
