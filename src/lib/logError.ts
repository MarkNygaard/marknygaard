export function logError(message: string, error?: unknown) {
  const formattedError =
    error instanceof Error
      ? error.stack || error.message
      : JSON.stringify(error);

  const output = `[ERROR] ${message}\n${formattedError}`;

  if (process.env.NODE_ENV === 'development') {
    console.error(output);
  } else {
    console.error(output);
  }
}
