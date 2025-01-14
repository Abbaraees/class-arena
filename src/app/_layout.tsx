import '../../global.css';

import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper'
import DataProvider from '../providers/DataProvider';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
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
