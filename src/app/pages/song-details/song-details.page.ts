import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { Comment } from '../../models/comment';
import { AuthService } from '../../services/auth.service';
import { TurbofyApiService } from '../../services/turbofy-api.service';

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.page.html',
  styleUrls: ['./song-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class SongDetailsPage implements OnInit {

  commentForm: FormGroup | undefined;
  comments: Comment[] = [];
  loggedIn: boolean;
  song: any;

  constructor(private turbofyApi: TurbofyApiService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private actionSheetCtrl: ActionSheetController, private authService: AuthService) {

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

    // Comprobamos si el usuario ha iniciado sesion
    this.loggedIn = this.authService.isLoggedIn();
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

  async deleteComment(commentId: string) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: '¿Seguro que quieres eliminar el comentario?',
      buttons: [
        {
          text: 'ELIMINAR',
          handler: async () => {
            this.song = await this.turbofyApi.deleteComment(this.song._id, commentId);
            
            this.comments = this.song.comments;
          }
        },
        {
          text: 'CANCELAR'
        },
      ],
    });

    await actionSheet.present();
  }

  private resetForms() {
    this.commentForm?.reset();
  }

}
