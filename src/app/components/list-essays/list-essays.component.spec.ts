import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEssaysComponent } from './list-essays.component';

describe('ListEssaysComponent', () => {
  let component: ListEssaysComponent;
  let fixture: ComponentFixture<ListEssaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEssaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEssaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
