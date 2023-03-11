import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsPageComponent } from './pages/jobs-page/jobs-page.component';
import { JobCreatePageComponent } from './pages/job-create-page/job-create-page.component';
import { JobEditPageComponent } from './pages/job-edit-page/job-edit-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobsPageComponent },
  { path: 'jobs/new', component: JobCreatePageComponent },
  { path: 'jobs/:id', component: JobEditPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
