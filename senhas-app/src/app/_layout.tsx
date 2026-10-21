import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { AppProvider } from '../lib/store';
import { colors } from '../lib/styles';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: styles.content,
        }}
      />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
  },
});
