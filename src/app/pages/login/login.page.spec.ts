// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginPage } from './login.page';
// import { Router } from '@angular/router';
// import { AlertController } from '@ionic/angular';
// import { FormsModule } from '@angular/forms';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// describe('LoginPage', () => {
//   let component: LoginPage;
//   let fixture: ComponentFixture<LoginPage>;
//   let routerSpy: jasmine.SpyObj<Router>;
//   let alertSpy: jasmine.SpyObj<any>;
//   let alertControllerSpy: jasmine.SpyObj<AlertController>;

//   beforeEach(async () => {
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);
//     alertSpy = jasmine.createSpyObj('alert', ['present']);
//     alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
//     alertControllerSpy.create.and.resolveTo(alertSpy);

//     await TestBed.configureTestingModule({
//       declarations: [LoginPage],
//       imports: [FormsModule],
//       providers: [
//         { provide: Router, useValue: routerSpy },
//         { provide: AlertController, useValue: alertControllerSpy }
//       ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA]
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('debería crear el componente', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('isEmailInvalid()', () => {
//     it('retorna true si el correo está vacío', () => {
//       component.correo = '';
//       expect(component.isEmailInvalid()).toBeTrue();
//     });

//     it('retorna true si el correo no es válido', () => {
//       component.correo = 'correo_invalido';
//       expect(component.isEmailInvalid()).toBeTrue();
//     });

//     it('retorna false si el correo es válido', () => {
//       component.correo = 'ejemplo@correo.com';
//       expect(component.isEmailInvalid()).toBeFalse();
//     });
//   });

//   describe('isPasswordInvalid()', () => {
//     it('retorna true si la contraseña está vacía', () => {
//       component.contrasena = '';
//       expect(component.isPasswordInvalid()).toBeTrue();
//     });

//     it('retorna true si la contraseña no tiene 6 dígitos numéricos', () => {
//       component.contrasena = 'abc123';
//       expect(component.isPasswordInvalid()).toBeTrue();
//     });

//     it('retorna false si la contraseña tiene 6 dígitos', () => {
//       component.contrasena = '123456';
//       expect(component.isPasswordInvalid()).toBeFalse();
//     });
//   });

//   describe('login()', () => {
//     it('muestra alerta si correo o contraseña son inválidos', async () => {
//       component.correo = '';
//       component.contrasena = '123';

//       await component.login({});

//       expect(alertControllerSpy.create).toHaveBeenCalledWith(jasmine.objectContaining({
//         message: '¡Ups! Debes ingresar datos válidos.'
//       }));
//       expect(alertSpy.present).toHaveBeenCalled();
//     });

//     it('guarda el usuario y navega a /home si datos son válidos', async () => {
//       component.correo = 'test@example.com';
//       component.contrasena = '123456';

//       spyOn(localStorage, 'setItem');

//       await component.login({});

//       expect(localStorage.setItem).toHaveBeenCalledWith(
//         'usuarioActual',
//         JSON.stringify({ correo: 'test@example.com' })
//       );
//       expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
//     });
//   });

//   describe('registroUsuario()', () => {
//     it('debería redirigir a /registro-usuario', () => {
//       component.registroUsuario();
//       expect(routerSpy.navigate).toHaveBeenCalledWith(['/registro-usuario']);
//     });
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
