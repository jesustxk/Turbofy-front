import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SongDetailsPage } from './song-details.page';

describe('SongDetailsPage', () => {
  let component: SongDetailsPage;
  let fixture: ComponentFixture<SongDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SongDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
