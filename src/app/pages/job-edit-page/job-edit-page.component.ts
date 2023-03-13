import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Params,
} from '@angular/router';

@Component({
  selector: 'app-job-edit-page',
  templateUrl: './job-edit-page.component.html',
  styleUrls: ['./job-edit-page.component.scss'],
})
export class JobEditPageComponent implements OnInit {
  private id!: number;

  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (params: Params) => (this.id = Number(params['id']))
    );
  }
}
