
import { toast } from "sonner";

export class FavoritesManager {
  private favorites: string[] = [];

  constructor() {
    this.loadFavorites();
  }

  toggleFavorite(airlineId: string): boolean {
    const index = this.favorites.indexOf(airlineId);
    if (index === -1) {
      this.favorites.push(airlineId);
      this.saveFavorites();
      toast.success("Added to favorites");
      this.notifyFavoritesChanged();
      return true;
    } else {
      this.favorites.splice(index, 1);
      this.saveFavorites();
      toast.success("Removed from favorites");
      this.notifyFavoritesChanged();
      return false;
    }
  }

  isFavorite(airlineId: string): boolean {
    return this.favorites.includes(airlineId);
  }

  getFavoriteIds(): string[] {
    return [...this.favorites];
  }

  private saveFavorites(): void {
    localStorage.setItem('airline-favorites', JSON.stringify(this.favorites));
  }

  private loadFavorites(): void {
    try {
      const storedFavorites = localStorage.getItem('airline-favorites');
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }

  private notifyFavoritesChanged(): void {
    const event = new CustomEvent('favoritesChanged');
    window.dispatchEvent(event);
  }
}
