import { Component, OnInit, inject, signal } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthState } from '@okta/okta-auth-js';
import { filter, map } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-status',
  standalone: true,
  imports: [CommonModule, RouterModule, AsyncPipe],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})
export class LoginStatusComponent implements OnInit {
  private oktaStateService = inject(OktaAuthStateService);
  private oktaAuth = inject(OKTA_AUTH);

  public isAuthenticated$ = this.oktaStateService.authState$.pipe(
    filter((authState: AuthState) => !!authState),
    map((authState: AuthState) => authState.isAuthenticated ?? false)
  );

  public userFullName = signal<string>('');

  ngOnInit(): void {
    this.oktaStateService.authState$.subscribe((authState) => {
      if (authState.isAuthenticated) {
        this.oktaAuth.getUser().then(user => {
          this.userFullName.set(user.name ?? '');
        });
      } else {
        this.userFullName.set('');
      }
    });
  }

  public async signIn(): Promise<void> {
    await this.oktaAuth.signInWithRedirect();
  }

  public async signOut(): Promise<void> {
    await this.oktaAuth.signOut();
  }


  public redirectToSignUp(): void {
    window.location.href = 'https://dev-74969463.okta.com/signin/register';
  }

}
