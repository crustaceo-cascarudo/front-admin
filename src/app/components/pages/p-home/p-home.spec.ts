import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PHome } from './p-home';

describe('PHome', () => {
  let component: PHome;
  let fixture: ComponentFixture<PHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
