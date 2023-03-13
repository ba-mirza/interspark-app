import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Job } from 'src/app/interfaces/job-form.interface';
import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'app-job-create-page',
  templateUrl: './job-create-page.component.html',
  styleUrls: ['./job-create-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class JobCreatePageComponent implements OnInit {
  public job_form_structure: string[] = [];

  constructor(private stateService: StateService, private route: Router) {}

  ngOnInit(): void {}

  public createJob(newJob: Job): void {
    this.stateService
      .postJobs(newJob)
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe();
    if (!this.stateService.error) {
      this.route.navigate(['jobs']);
    }
  }
}
