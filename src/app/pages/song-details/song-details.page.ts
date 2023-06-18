import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Comment } from '../../models/comment';
import { TurbofyApiService } from '../../services/turbofy-api.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.page.html',
  styleUrls: ['./song-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class SongDetailsPage implements OnInit {

  commentForm: FormGroup | undefined;

  song: any;
  comments: Comment[] = [];

  constructor(private turbofyApi: TurbofyApiService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.commentForm = this.formBuilder.group({
      author: new FormControl('', Validators.compose([
        Validators.pattern('^[ a-zñáéíóúA-ZÑÁÉÍÓÚ0-9_.,():-]*$')
      ])),
      comment: new FormControl('', Validators.compose([
        Validators.pattern('^[ a-zñáéíóúA-ZÑÁÉÍÓÚ0-9_.,():-]*$')
      ])),
      rating: new FormControl('', Validators.compose([
        Validators.pattern('[0-5]{1}')
      ])),
    });
  }

  async ngOnInit() {
    this.getSong();
  }

  async getSong() {
    this.song = await this.turbofyApi.getSong(String(this.route.snapshot.paramMap.get('songId')));

    if (this.song.comments) {
      this.comments = this.song.comments;
    }
  }

  async addComment(value: { author: string; comment: string; rating: number }) {
    this.song = await this.turbofyApi.addComment(this.song._id, value.author, value.comment, value.rating);
    
    // Por tratar de evitar errores
    if (this.song.comments) {
      this.comments = this.song.comments;
    }

    this.resetForms();
  }

  private resetForms() {
    this.commentForm?.reset();
  }

}
