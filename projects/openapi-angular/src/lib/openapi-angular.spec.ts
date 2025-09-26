import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenapiAngular } from './openapi-angular';

describe('OpenapiAngular', () => {
  let component: OpenapiAngular;
  let fixture: ComponentFixture<OpenapiAngular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenapiAngular],
    }).compileComponents();

    fixture = TestBed.createComponent(OpenapiAngular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
