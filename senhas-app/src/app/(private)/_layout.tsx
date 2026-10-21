import { Redirect, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useApp } from '../../lib/store';
import { colors, fontMono } from '../../lib/styles';

export default function PrivateLayout() {
  const { authenticated } = useApp();

  if (!authenticated) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: colors.green,
        headerTitleStyle: styles.headerTitle,
        headerShadowVisible: false,
        contentStyle: styles.content,
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black,
  },
  headerTitle: {
    color: colors.green,
    fontFamily: fontMono,
    fontWeight: '700',
  },
  content: {
    backgroundColor: colors.background,
  },
});
