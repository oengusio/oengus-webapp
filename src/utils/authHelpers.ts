export function passwordResetErrorToMessage(e: any): string {
  if ((e.error || {}).errors) {
    return e.error.errors.flatMap(error => error.defaultMessage.split(',')).join('\n');
  } else if (e.error.status) {
    return `auth.passwordReset.error.${e.error.status.toUpperCase()}`;
  }

  return e.message;
}
