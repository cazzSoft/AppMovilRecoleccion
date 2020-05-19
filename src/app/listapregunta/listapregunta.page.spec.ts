import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListapreguntaPage } from './listapregunta.page';

describe('ListapreguntaPage', () => {
  let component: ListapreguntaPage;
  let fixture: ComponentFixture<ListapreguntaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListapreguntaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListapreguntaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
