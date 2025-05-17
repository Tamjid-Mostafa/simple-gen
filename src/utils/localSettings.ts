import { UserSettings } from "@/types/user";

export const getLocalSettings = (): UserSettings | null => {
    try {
      const raw = localStorage.getItem("userSettings");
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };
  
  export const saveLocalSettings = (settings: UserSettings) => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
  };
  
  export const clearLocalSettings = () => {
    localStorage.removeItem("userSettings");
  };
  