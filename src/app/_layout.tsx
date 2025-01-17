import '../../global.css';

import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper'
import DataProvider, { db } from '../providers/DataProvider';
import migrations from '~/drizzle/migrations'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations)
  if (success) {
    console.log("Migration Applied successfully")
  }
  else {
    console.log("Migration failed")
    console.log(error)
  }

  return (
    <PaperProvider>
      <DataProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="groups" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </DataProvider>
    </PaperProvider>
  );
}
