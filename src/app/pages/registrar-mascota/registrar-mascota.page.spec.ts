import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarMascotaPage } from './registrar-mascota.page';

describe('RegistrarMascotaPage', () => {
  let component: RegistrarMascotaPage;
  let fixture: ComponentFixture<RegistrarMascotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarMascotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
