import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TurbomemberZonePage } from './turbomember-zone.page';

describe('TurbomemberZonePage', () => {
  let component: TurbomemberZonePage;
  let fixture: ComponentFixture<TurbomemberZonePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), RouterTestingModule]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TurbomemberZonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
