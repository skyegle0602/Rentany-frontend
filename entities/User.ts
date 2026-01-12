export interface UserData {
  id?: string;
  email: string;
  username?: string;
  [key: string]: any;
}

export class User {
  static async login(): Promise<void> {
    // Redirect to sign-in page
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/signin';
    }
  }

  static async getCurrent(): Promise<UserData | null> {
    try {
      const response = await fetch('/api/user/current');

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }
}

