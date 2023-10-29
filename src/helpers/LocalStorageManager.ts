export class LocalStorageManager {
  static get(key: string) {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
      return null;
    }
  }

  static set(key: string, value: string) {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }
}
