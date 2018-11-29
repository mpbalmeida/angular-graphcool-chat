import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {take} from 'rxjs/operators';
import {ErrorService} from './core/services/error.service';
import {MatSnackBar} from '@angular/material';
import {AppConfigService} from './core/services/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(
    private appConfig: AppConfigService,
    private authService: AuthService,
    private errorService: ErrorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin()
      .pipe(take(1))
      .subscribe(
        null,
        error => {
          const message = this.errorService.getErrorMessage(error);
          this.snackBar.open(
            `Unexpected error: ${message}`,
            'Done',
            { duration: 5000, verticalPosition: 'top'}
          );
        }
      );
  }
}
