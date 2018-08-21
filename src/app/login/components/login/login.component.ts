import { ErrorService } from './../../../core/services/error.service';
import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { takeWhile } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  configs = {
    isLogin: true,
    actionText: 'SignIn',
    buttonActionText: 'Create account',
    isLoading: false
  };

  private alive = true;

  private nameControl = new FormControl('', [Validators.required, Validators.minLength(5)]);

  constructor(
    public authService: AuthService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    console.log(this.loginForm.value);

    this.configs.isLoading = true;

    const operation: Observable<any> = (this.configs.isLogin)
      ? this.authService.signInUser(this.loginForm.value)
      : this.authService.signUpUser(this.loginForm.value);

      operation
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe( res => {
        console.log('redirection...', res);
        const redirect: string = this.authService.redirectUrl || '/dashboard';
        // redirect with router
        console.log('route to redirect', redirect);
        this.authService.redirectUrl = null;
        this.configs.isLoading = false;
      },
      err => {
        console.log(err);
        this.configs.isLoading = false;
        this.snackBar.open(this.errorService.getErrorMessage(err), 'Done', {duration: 5000, verticalPosition: 'top'});
       },
      () => console.log('Observable completado')
    );
  }

  onKeepSigned() {
    this.authService.toggleKeepSigned();
  }

  changeAction(): void {
    this.configs.isLogin = !this.configs.isLogin;
    this.configs.actionText = !this.configs.isLogin ? 'SignUp' : 'SignIn';
    this.configs.buttonActionText = !this.configs.isLogin ? 'Already have account' : 'Create account';
    !this.configs.isLogin ? this.loginForm.addControl('name', this.nameControl) : this.loginForm.removeControl('name');
  }

  get name(): FormControl { return <FormControl>this.loginForm.get('name'); }

  get email(): FormControl { return <FormControl>this.loginForm.get('email'); }

  get password(): FormControl { return <FormControl>this.loginForm.get('password'); }


}
