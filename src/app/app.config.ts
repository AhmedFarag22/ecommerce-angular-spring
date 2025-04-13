import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';
import { OktaAuthModule } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      OktaAuthModule.forRoot({
        oktaAuth: new OktaAuth({
          issuer: 'https://dev-74969463.okta.com/oauth2/default',
          clientId: '0oao8ui0cdAwJXYSm5d7',
          redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/login/callback` : '',

          scopes: ['openid', 'offline_access', 'profile'],

        })
      })
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()), provideHttpClient()]
};
