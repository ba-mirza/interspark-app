import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Job } from 'src/app/interfaces/job-form.interface';

@Component({
  selector: 'app-create-job-form',
  templateUrl: './create-job-form.component.html',
  styleUrls: ['./create-job-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CreateJobFormComponent implements OnInit, OnChanges {
  @Input() jobFields?: Job;
  @Output() createJobEmit: EventEmitter<Job> = new EventEmitter<Job>();
  public job_form_structure: string[] = [];

  public createJobForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    job_number: new FormControl(null, [Validators.required]),
    job_title: new FormControl(null, [Validators.required]),
    job_start_date: new FormControl(null, [Validators.required]),
    job_close_date: new FormControl(null, [Validators.required]),
    experience_required: new FormControl(false, [Validators.requiredTrue]),
    number_of_openings: new FormControl(null, [Validators.required]),
    job_notes: new FormControl(null, [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {
    this.getControls();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.patchValueFields(changes);
  }

  public createJob() {
    const job = this.createJobForm.getRawValue();
    const { experience_required } = job;
    const newJob = {
      ...job,
      experience_required: coerceBooleanProperty(experience_required),
    };
    this.createJobEmit.emit(newJob);
  }

  private getControls(): void {
    for (let key in this.createJobForm.controls) {
      this.job_form_structure.push(key);
    }
  }

  private patchValueFields(field: SimpleChanges) {
    const setValuesFields = field['jobFields'].currentValue;
    if (setValuesFields) {
      this.createJobForm.setValue(setValuesFields);
    }
  }
}
