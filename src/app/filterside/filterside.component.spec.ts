import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersideComponent } from './filterside.component';

describe('FiltersideComponent', () => {
  let component: FiltersideComponent;
  let fixture: ComponentFixture<FiltersideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
