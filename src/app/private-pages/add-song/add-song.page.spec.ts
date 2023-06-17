import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddSongPage } from './add-song.page';

describe('AddSongPage', () => {
  let component: AddSongPage;
  let fixture: ComponentFixture<AddSongPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddSongPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
