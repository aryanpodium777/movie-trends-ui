import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@mvt/core';
import { GoogleLoginProvider, AuthService } from 'angularx-social-login';

@Component({
  selector: 'mvt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  display: boolean;
  leftNavOptions: any[];
  user: any;
  constructor(private readonly router: Router, private readonly authService: AuthService,
    private readonly userService: UserService) { }

  ngOnInit(): void {
    this.leftNavOptions = [
      { name: 'Movies', code: 'MOVIE' },
      { name: 'Analytics', code: 'ANALYTICS' }
    ];
    this.fetchLoggedInUserInfo();
  }

  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      res.id = null;
      this.userService.saveUser(res).subscribe(response => {
        this.userService.setLoggedInUser(response);
        this.user = this.userService.getLoggedInUser();
      }, error => {
        console.log('error', error);
      })
    });
  }

  public signOut(): void {
    this.authService.signOut();
    this.userService.setLoggedInUser(null);
    this.user = this.userService.getLoggedInUser();
  }

  public navigateToModule(event: any): void {
    if (event.value.code === 'ANALYTICS') {
      this.router.navigate(['analytics']);
    } else if (event.value.code === 'MOVIE') {
      this.router.navigate(['movies']);
    }
  }

  public fetchLoggedInUserInfo(): void {
    this.user = this.userService.getLoggedInUser();
  }
}
