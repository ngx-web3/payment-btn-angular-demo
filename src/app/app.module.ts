import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { DemoPageComponent } from './demo-page/demo-page.component';
import { RouterModule } from '@angular/router';
import { ShareComponent } from './share/share.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    PaymentPageComponent,
    DemoPageComponent,
    ShareComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: DemoPageComponent },
      { path: 'p/:code', component: PaymentPageComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
