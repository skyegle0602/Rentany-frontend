export interface FavoriteData {
  id?: string;
  user_email: string;
  item_id: string;
  created_at?: string;
}

export class Favorite {
  static async create(data: FavoriteData): Promise<FavoriteData> {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create favorite');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating favorite:', error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete favorite');
      }
    } catch (error) {
      console.error('Error deleting favorite:', error);
      throw error;
    }
  }

  static async getAll(userEmail: string): Promise<FavoriteData[]> {
    try {
      const response = await fetch(`/api/favorites?user_email=${userEmail}`);

      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  }
}

