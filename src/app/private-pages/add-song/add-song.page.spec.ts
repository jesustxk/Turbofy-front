import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { AddSongPage } from './add-song.page';

describe('AddSongPage', () => {
  let component: AddSongPage;
  let fixture: ComponentFixture<AddSongPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(AddSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
