import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Jobs } from 'src/app/interfaces/job-form.interface';
import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'app-jobs-page',
  templateUrl: './jobs-page.component.html',
  styleUrls: ['./jobs-page.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class JobsPageComponent implements OnInit, OnDestroy {
  public jobs!: any; // Fix it
  public loading: boolean = true;
  private readonly destroy$: Subject<undefined> = new Subject();

  constructor(private route: Router, private stateService: StateService) {}

  ngOnInit(): void {
    this.stateService
      .getJobs()
      .pipe(takeUntil(this.destroy$))
      .subscribe((jobs: Jobs) => {
        if (!jobs) {
          this.loading = false;
        }
        this.jobs = jobs;
        this.loading = true;
      });
  }

  public redirectTo(which?: string, id?: number): void {
    if (which === 'detail') {
      this.route.navigate(['jobs/', id]);
    } else {
      this.route.navigate(['jobs/new']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(undefined);
    this.destroy$.complete();
  }
}
