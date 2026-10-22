import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { AuthInterceptorProvider } from './app/auth/interceptors/auth.interceptor';
import { provideHttpClient, withXhr, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app/app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
        AppRoutingModule, ReactiveFormsModule, ServiceWorkerModule.register("ngsw-worker.js", {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: "registerWhenStable:30000",
        })),
        AuthInterceptorProvider,
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
    ]
})
  .catch(err => console.error(err));
