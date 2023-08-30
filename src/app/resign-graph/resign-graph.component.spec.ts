import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignGraphComponent } from './resign-graph.component';

describe('ResignGraphComponent', () => {
  let component: ResignGraphComponent;
  let fixture: ComponentFixture<ResignGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResignGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResignGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
