import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesgnationComponent } from './desgnation.component';

describe('DesgnationComponent', () => {
  let component: DesgnationComponent;
  let fixture: ComponentFixture<DesgnationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesgnationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesgnationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
