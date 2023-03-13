import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobsPageComponent } from './pages/jobs-page/jobs-page.component';
import { JobEditPageComponent } from './pages/job-edit-page/job-edit-page.component';
import { JobCreatePageComponent } from './pages/job-create-page/job-create-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateJobFormComponent } from './components/create-job-form/create-job-form.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsPageComponent,
    JobEditPageComponent,
    JobCreatePageComponent,
    CreateJobFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
