import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../interfaces/job-form.interface';
import { environments } from 'src/environments';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  public getJobs<T>(id?: number): Observable<T> {
    if (id !== 0) {
      return this.http.get<T>(`${environments.url}jobs/${id}`);
    }
    return this.http.get<T>(`${environments.url}jobs`);
  }

  public createNewJob(job: Job): Observable<any> {
    return this.http.post<Job>(`${environments.url}jobs`, job);
  }

  public editJob(id: number, editedJob: Job) {
    return this.http.post(`${environments.url}/${id}`, { body: editedJob });
  }
}
