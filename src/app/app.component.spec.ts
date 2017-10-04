import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from './user.service';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';

class MockUserService {

  getCurrentUser(): Observable<string> {
    return Observable.of('admin');
  }
}

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{provide: UserService, useClass: MockUserService}]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should render title in a h1 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Software Projects Manager');
  }));
});

