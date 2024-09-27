import {
  ApplicationConfig,
  importProvidersFrom,
  NgModule,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule),
  ],
};

import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [ReactiveFormsModule],
})
export class AppModule {}
