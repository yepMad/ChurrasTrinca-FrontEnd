declare namespace ChurrasTrinca {
  interface User {
    id: string;
    email: string;
    name: string;
  }

  interface PopupMessage {
    id: string;
    type?: 'success' | 'error' | 'info';
    description: string;
  }

  interface ApiError {
    message: string;
    statusCode: number;
  }
}
