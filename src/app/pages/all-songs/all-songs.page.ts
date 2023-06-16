import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.page.html',
  styleUrls: ['./all-songs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AllSongsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
