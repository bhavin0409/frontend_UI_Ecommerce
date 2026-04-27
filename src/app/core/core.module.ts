
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { authInterceptor } from './interceptors/auth.interceptor';
import { errorInterceptorFn } from './interceptors/error.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, errorInterceptorFn])
    )
  ]
})
export class CoreModule { }
