import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../services/auth.services";
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public typeError: boolean = false;
  public messageError: string;
  public loginForm: FormGroup;

  constructor(
    private service: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }


  ngOnInit() {
    this.configForm();
  }

  configForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }


  public login() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.value).pipe(take(1)).subscribe(
        (data) => {
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          this.typeError = true;
          // para personalizar por tipo de error, se debe hacer una funcion que parametrize eso.
          this.messageError = "Email o contraseña incorrecta, por favor contacte a soporte";
        }
      );
    }
  }
}
