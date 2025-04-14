import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { OktaAuthModule, OKTA_AUTH } from '@okta/okta-angular';
import OktaAuth from '@okta/okta-auth-js';
import { AuthInterceptorService } from './services/auth-interceptor.service'; // عدّل المسار حسب مكان الملف
import { withInterceptorsFromDi } from '@angular/common/http';




const oktaAuth = new OktaAuth({
  issuer: 'https://dev-74969463.okta.com/oauth2/default',
  clientId: '0oao8ui0cdAwJXYSm5d7',
  redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/login/callback` : '',
  scopes: ['openid', 'offline_access', 'profile'],
});

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      OktaAuthModule.forRoot({ oktaAuth })
    ),

    { provide: OKTA_AUTH, useValue: oktaAuth }, // عشان تقدر تعمل Inject في الـ Interceptor

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),

    provideRouter(routes),
    provideClientHydration(withEventReplay())
  ]
};
