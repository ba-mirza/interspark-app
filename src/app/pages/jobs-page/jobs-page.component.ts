import { Component, OnInit } from '@angular/core';
import { Jobs } from 'src/app/interfaces/job-form.interface';
import { DatabaseService } from 'src/app/service/database.service';

@Component({
  selector: 'app-jobs-page',
  templateUrl: './jobs-page.component.html',
  styleUrls: ['./jobs-page.component.scss'],
})
export class JobsPageComponent implements OnInit {
  public jobs!: any;

  constructor(private db: DatabaseService) {}

  ngOnInit(): void {
    this.db.getJobs<Jobs>().subscribe((next: Jobs) => {
      this.jobs = next;
    });
  }
}
