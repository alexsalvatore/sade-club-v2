import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EssayItemComponent } from './essay-item.component';

describe('EssayItemComponent', () => {
  let component: EssayItemComponent;
  let fixture: ComponentFixture<EssayItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EssayItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EssayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
