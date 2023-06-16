import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { AllSongsPage } from './all-songs.page';

describe('AllSongsPage', () => {
  let component: AllSongsPage;
  let fixture: ComponentFixture<AllSongsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(AllSongsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
