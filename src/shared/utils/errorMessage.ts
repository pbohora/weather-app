import axios from 'axios';

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'No internet connection. Please check your network.';

    switch (error.response.status) {
      case 400: return 'Invalid request. Please try a different search.';
      case 404: return 'Resource not found. Please try again.';
      case 429: return 'Too many requests. Please wait a moment and try again.';
      case 500:
      case 502:
      case 503: return 'The server is temporarily unavailable. Please try again shortly.';
      default:  return `Unexpected error (${error.response.status}). Please try again.`;
    }
  }

  if (error instanceof GeolocationPositionError) {
    switch (error.code) {
      case GeolocationPositionError.PERMISSION_DENIED:  return 'Location access was denied. Search for a city instead.';
      case GeolocationPositionError.POSITION_UNAVAILABLE: return 'Your location could not be determined.';
      case GeolocationPositionError.TIMEOUT: return 'Location request timed out. Search for a city instead.';
    }
  }

  if (error instanceof Error) return error.message;

  return 'An unexpected error occurred. Please try again.';
}
