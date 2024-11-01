import {
  ApplicationConfig,
  importProvidersFrom,
  NgModule,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations'; // Import animations provider

import { routes } from './app.routes';
import {provideToastr} from 'ngx-toastr'

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(ReactiveFormsModule),
    provideToastr(),
    provideAnimations()
  ],
};

import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  imports: [ReactiveFormsModule],
})
export class AppModule {}
