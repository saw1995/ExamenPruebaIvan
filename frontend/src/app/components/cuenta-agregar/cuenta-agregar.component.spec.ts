import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaAgregarComponent } from './cuenta-agregar.component';

describe('CuentaAgregarComponent', () => {
  let component: CuentaAgregarComponent;
  let fixture: ComponentFixture<CuentaAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
