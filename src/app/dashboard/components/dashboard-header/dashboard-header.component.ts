import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Title} from '@angular/platform-browser';
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  @Input() sidenav: MatSidenav;

  constructor(
    private authService: AuthService,
    public title: Title
  ) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }
}
