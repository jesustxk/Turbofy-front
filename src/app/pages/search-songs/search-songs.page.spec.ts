import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { SearchSongsPage } from './search-songs.page';

describe('SearchSongsPage', () => {
  let component: SearchSongsPage;
  let fixture: ComponentFixture<SearchSongsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(SearchSongsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
