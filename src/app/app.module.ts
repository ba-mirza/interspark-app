import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsPageComponent } from './pages/jobs-page/jobs-page.component';
import { JobEditPageComponent } from './pages/job-edit-page/job-edit-page.component';
import { JobCreatePageComponent } from './pages/job-create-page/job-create-page.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsPageComponent,
    JobEditPageComponent,
    JobCreatePageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
