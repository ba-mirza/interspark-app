import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Job, Jobs } from '../interfaces/job-form.interface';

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
    return this.db.getJobs<Jobs>();
  }

  public get error(): string | null {
    return this.errorCode.getValue();
  }

  public postEditJob(id: number, job: any) {
    return this.db.editJob(id, job);
  }

  public postJobs(newJob: Job) {
    return this.db.createNewJob(newJob);
  }
}
