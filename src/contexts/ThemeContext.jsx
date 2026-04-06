
import React, { createContext, useContext, useState, useEffect } from 'react';
import pb from '@/lib/pocketbaseClient';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState('blue');
  const [settingsId, setSettingsId] = useState(null);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const records = await pb.collection('theme_settings').getFullList({ $autoCancel: false });
        if (records.length > 0) {
          const activeTheme = records[0].active_theme || 'blue';
          setThemeState(activeTheme);
          setSettingsId(records[0].id);
          document.documentElement.setAttribute('data-theme', activeTheme);
        }
      } catch (error) {
        console.error("Failed to fetch theme settings:", error);
        document.documentElement.setAttribute('data-theme', 'blue');
      }
    };
    fetchTheme();
  }, []);

  const setTheme = async (newTheme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    
    try {
      if (settingsId) {
        await pb.collection('theme_settings').update(settingsId, { active_theme: newTheme }, { $autoCancel: false });
      } else {
        const record = await pb.collection('theme_settings').create({ active_theme: newTheme }, { $autoCancel: false });
        setSettingsId(record.id);
      }
    } catch (error) {
      console.error("Failed to save theme:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, getTheme: () => theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
