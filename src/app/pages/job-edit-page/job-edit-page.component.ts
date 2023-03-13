import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Job } from 'src/app/interfaces/job-form.interface';
import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'app-job-edit-page',
  templateUrl: './job-edit-page.component.html',
  styleUrls: ['./job-edit-page.component.scss'],
})
export class JobEditPageComponent implements OnInit {
  private id!: number;
  public jobFields!: Job;

  constructor(
    private activateRoute: ActivatedRoute,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (params: Params) => (this.id = Number(params['id']))
    );

    this.initData();
  }

  public initData(): void {
    this.stateService
      .getDeterminationJob(this.id)
      .subscribe((determinatedJob: Job) => {
        this.jobFields = determinatedJob;
      });
  }
}
