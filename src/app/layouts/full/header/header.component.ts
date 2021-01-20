import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from "../../../services/auth-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
