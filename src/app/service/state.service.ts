import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { Job, Jobs } from '../interfaces/job-form.interface';
import { ERROR, OK } from '../utils/errorConstants';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly listOfJobs: BehaviorSubject<Jobs | null> =
    new BehaviorSubject<Jobs | null>(null);

  private readonly errorCode: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(private db: DatabaseService) {}

  public getDeterminationJob(id: number): Observable<Job> {
    return this.db.getJobs(id);
  }

  public getJobs() {
    this.db.getJobs<Jobs>().subscribe((jobs: Jobs) => {
      this.listOfJobs.next(jobs);
    });
    return this.listOfJobs.asObservable();
  }

  public get error(): string | null {
    return this.errorCode.getValue();
  }

  public set addToList(job: Jobs) {
    this.listOfJobs.next(job);
  }

  public postJobs(newJob: Job, callBack: (newData: Jobs) => void) {
    this.db
      .createNewJob(newJob)
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe((newData) => callBack(newData));
  }
}
