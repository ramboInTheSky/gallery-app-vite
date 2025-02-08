export interface ImageSettings {
  width: number;
  height: number;
  grayscale: boolean;
  blur: number;
}

export const LOCAL_STORAGE_PREFIX = process.env.LOCAL_STORAGE_EDIT_SETTINGS_PREFIX || "editSettings_";

export const saveToLocalStorage = (key: string, value: ImageSettings) => {
  localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(value));
};

export const loadFromLocalStorage = (key: string): ImageSettings | null => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(error);
    return null
  }
};
