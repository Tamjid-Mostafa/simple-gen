import { useEffect, useState } from "react";
import { IUser, UserSettings } from "@/types/user";
import { getLocalSettings, saveLocalSettings, clearLocalSettings } from "@/utils/localSettings";
import { getUserSettings, updateUser } from "@/lib/actions/user.action";
import { useUser } from "@clerk/nextjs";

export function useUserSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const loadSettings = async () => {
      const local = getLocalSettings();
      if (local) {
        setSettings(local);
      } else if (user?.id) {
        const dbUser: IUser | null = await getUserSettings(user.id);
        if (dbUser?.settings) {
          setSettings(dbUser.settings);
          saveLocalSettings(dbUser.settings);
        }
      }
    };

    loadSettings();
  }, [user?.id]);


  const updateSettings = async (partial: Partial<UserSettings>) => {
    if (!settings || !user?.id) return;
    const updated = { ...settings, ...partial };

    setSettings(updated);
    saveLocalSettings(updated);

    try {
      await updateUser(user.id, {
        settings: updated,
      });
    } catch (err) {
      console.error("Failed to sync user settings:", err);
    }
  };

  const resetSettings = () => {
    clearLocalSettings();
    setSettings(null);
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
}
