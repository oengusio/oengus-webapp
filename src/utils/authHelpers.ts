type ErrorArg = Error | {
  error: {
    status: string;
  } | {
    errors: Record<string, string>[];
  }
};

export function passwordResetErrorToMessage(e: ErrorArg): string {
  if ('error' in e) {
    if ('errors' in e.error) {
      return e.error.errors.flatMap(error => error.defaultMessage.split(',')).join('\n');
    }

    if (e.error.status) {
      return `auth.passwordReset.error.${e.error.status.toUpperCase()}`;
    }
  } else {
    return e.message;
  }
}
