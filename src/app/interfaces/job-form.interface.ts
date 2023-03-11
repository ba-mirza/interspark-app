export interface Jobs {
  jobs: Job[];
}

export interface Job {
  id: number;
  job_number: string;
  job_title: string;
  job_start_date: Date | string;
  job_close_date: Date | string;
  experience_required: boolean;
  number_of_openings: number;
  job_notes: string;
}
