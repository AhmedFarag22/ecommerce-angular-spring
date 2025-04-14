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

  storage: Storage | undefined;

  private oktaStateService = inject(OktaAuthStateService);
  private oktaAuth = inject(OKTA_AUTH);

  public isAuthenticated$ = this.oktaStateService.authState$.pipe(
    filter((authState: AuthState) => !!authState),
    map((authState: AuthState) => authState.isAuthenticated ?? false)
  );

  public userFullName = signal<string>('');

  public theEmail = signal<string>('');

  ngOnInit(): void {
    this.oktaStateService.authState$.subscribe((authState) => {
      if (authState.isAuthenticated) {
        this.oktaAuth.getUser().then(user => {
          this.userFullName.set(user.name ?? '');

          // retrieve the user's email from authentication response
          this.theEmail.set(user.preferred_username ?? '');

          console.log(`\n${this.userFullName()}`);
          console.log('User object:', user);
          console.log("User email is:", user.email);
          console.log("this.theEmail() is:", this.theEmail());
          console.log(`\n${this.theEmail()}`);

          // now store the email in browser storage
          if (typeof window !== 'undefined' && window.sessionStorage) {
            this.storage = window.sessionStorage;
            this.storage.setItem('userEmail', JSON.stringify(this.theEmail()));

          }

        });
      } else {
        this.userFullName.set('');
        this.theEmail.set('');
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
