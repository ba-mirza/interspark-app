import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  EMPTY,
  Subject,
  catchError,
  delayWhen,
  retryWhen,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { Job } from 'src/app/interfaces/job-form.interface';
import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'app-job-edit-page',
  templateUrl: './job-edit-page.component.html',
  styleUrls: ['./job-edit-page.component.scss'],
})
export class JobEditPageComponent implements OnInit, OnDestroy {
  private id!: number;
  public jobFields!: Job;
  private destroy$: Subject<undefined> = new Subject();

  constructor(
    private activateRoute: ActivatedRoute,
    private stateService: StateService,
    private route: Router
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
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe((determinatedJob: Job) => {
        this.jobFields = determinatedJob;
      });
  }

  public editJob(newJob: Job): void {
    this.stateService
      .postEditJob(this.id, newJob)
      .pipe(
        takeUntil(this.destroy$),
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe({
        next: () => this.route.navigate(['jobs']),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
