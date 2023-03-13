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
})
export class CreateJobFormComponent implements OnInit, OnChanges {
  @Input() jobFields?: Job;
  @Input() typeSubmit!: string;
  @Output() jobEmitter: EventEmitter<Job> = new EventEmitter<Job>();
  public job_form_structure: string[] = [];

  public createJobForm: FormGroup = new FormGroup({
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

  public universalEvent() {
    const job = this.createJobForm.getRawValue();
    const { experience_required } = job;
    const newJob = {
      ...job,
      experience_required: coerceBooleanProperty(experience_required),
    };
    this.jobEmitter.emit(newJob);
  }

  private getControls(): void {
    for (let key in this.createJobForm.controls) {
      this.job_form_structure.push(key);
    }
  }

  private patchValueFields(field?: SimpleChanges): void {
    const setValuesFields = field!['jobFields'].currentValue;
    if (setValuesFields) {
      const { id, ...valuesOfFields } = setValuesFields;
      this.createJobForm.setValue(valuesOfFields);
    }
  }
}
