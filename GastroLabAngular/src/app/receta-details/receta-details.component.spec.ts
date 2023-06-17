import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetaDetailsComponent } from './receta-details.component';

describe('RecetaDetailsComponent', () => {
  let component: RecetaDetailsComponent;
  let fixture: ComponentFixture<RecetaDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecetaDetailsComponent]
    });
    fixture = TestBed.createComponent(RecetaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
