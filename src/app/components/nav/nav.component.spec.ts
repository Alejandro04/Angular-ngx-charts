import { TestBed, async } from '@angular/core/testing';
import { NavComponent } from './nav.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
       NavComponent
      ],
    }).compileComponents();
  }));

  it('should not render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(NavComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome!');
  }));
});