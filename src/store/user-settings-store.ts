"use client";

import { create } from "zustand";
import { IUser, UserSettings } from "@/types/user";
import { getLocalSettings, saveLocalSettings, clearLocalSettings } from "@/utils/localSettings";
import { getUserSettings, updateUser } from "@/lib/actions/user.action";
import { UserResource } from "@clerk/types";

interface UserSettingsStore {
  settings: UserSettings | null;
  loading: boolean;

  // Actions
  loadSettings: (user: UserResource | null) => Promise<void>;
  updateSettings: (user: UserResource | null, partial: Partial<UserSettings>) => Promise<void>;
  resetSettings: () => void;
}

export const useUserSettingsStore = create<UserSettingsStore>((set, get) => ({
  settings: null,
  loading: false,

  // Load from local or DB
  async loadSettings(user) {
    set({ loading: true });
    try {
      const local = getLocalSettings();
      if (local) {
        set({ settings: local });
      } else if (user?.id) {
        const dbUser: IUser | null = await getUserSettings(user.id);
        if (dbUser?.settings) {
          set({ settings: dbUser.settings });
          saveLocalSettings(dbUser.settings);
        }
      }
    } catch (err) {
      console.error("Failed to load user settings:", err);
    } finally {
      set({ loading: false });
    }
  },

  // Update local, save to DB
  async updateSettings(user, partial) {
    const current = get().settings;
    if (!current || !user?.id) return;

    const updated = { ...current, ...partial };
    set({ settings: updated });
    saveLocalSettings(updated);

    try {
      await updateUser(user.id, { settings: updated });
    } catch (err) {
      console.error("Failed to sync user settings:", err);
    }
  },

  // Clear settings
  resetSettings() {
    clearLocalSettings();
    set({ settings: null });
  },
}));
