import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplorarRazasPage } from './explorar-razas.page';

describe('ExplorarRazasPage', () => {
  let component: ExplorarRazasPage;
  let fixture: ComponentFixture<ExplorarRazasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorarRazasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
