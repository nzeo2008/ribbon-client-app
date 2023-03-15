import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;
  isDataLoaded: boolean = false;
  user: IUser;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.userService.getCurrentUser().subscribe((data) => {
        this.user = data;
        this.isDataLoaded = true;
      });
    }
  }

  logout() {
    this.tokenStorageService.logOut();
    this.router.navigate(['/login']);
  }
}
