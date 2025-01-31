import type { FirebaseError } from '@firebase/app';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  // Type guard for FirebaseError
  if (
    error && 
    typeof error === 'object' && 
    'code' in error && 
    'message' in error && 
    error instanceof Error
  ) {
    return new AppError(
      error.message,
      (error as FirebaseError).code,
      error
    );
  }

  if (error instanceof Error) {
    return new AppError(
      error.message,
      'unknown.error',
      error
    );
  }

  return new AppError(
    'An unknown error occurred',
    'unknown.error'
  );
}; 