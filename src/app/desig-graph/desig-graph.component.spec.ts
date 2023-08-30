import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesigGraphComponent } from './desig-graph.component';

describe('DesigGraphComponent', () => {
  let component: DesigGraphComponent;
  let fixture: ComponentFixture<DesigGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesigGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesigGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
