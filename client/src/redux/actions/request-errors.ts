export interface RequestError {
  message: string;
  field?: string;
}

export interface RequestErrors {
  errors: RequestError[];
}
