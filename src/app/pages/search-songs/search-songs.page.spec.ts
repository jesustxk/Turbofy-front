import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';
import { TurbofyApiService } from '../../services/turbofy-api.service';
import { SearchSongsPage } from './search-songs.page';

describe('SearchSongsPage', () => {
  let component: SearchSongsPage;
  let fixture: ComponentFixture<SearchSongsPage>;
  let authService: AuthService;
  let turbofyApiService: TurbofyApiService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterTestingModule, HttpClientTestingModule, AngularFireModule.initializeApp(environment.firebase)],
      providers: [TurbofyApiService, AuthService],
    }).compileComponents();
    
    fixture = TestBed.createComponent(SearchSongsPage);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService)
    turbofyApiService = TestBed.inject(TurbofyApiService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
