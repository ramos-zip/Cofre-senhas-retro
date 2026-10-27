import { Platform, StyleSheet } from 'react-native';

export const fontMono = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  web: 'monospace',
  default: 'monospace',
});

export const colors = {
  black: '#030504',
  background: '#06080a',
  panel: '#322e3b63',
  panelAlt: '#10121a',
  green: '#58d8ff',
  greenStrong: '#21c8e6',
  greenDim: '#2acfcf',
  greenDark: '#19163c',
  text: '#d8ffe1',
  muted: '#788295',
  line: '#242c5b',
  danger: '#ff5d5d',
};

// Estilos realmente compartilhados entre várias telas.
export const commonStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: colors.green,
    fontFamily: fontMono,
    letterSpacing: 1.2,
  },
  label: {
    fontSize: 12,
    color: colors.greenDim,
    marginTop: 16,
    marginBottom: 6,
    fontFamily: fontMono,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: colors.panel,
    color: colors.text,
    borderRadius: 4,
    padding: 13,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.line,
    fontFamily: fontMono,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.greenStrong,
    padding: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.green,
  },
  buttonText: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 15,
    fontFamily: fontMono,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  dangerButton: {
    backgroundColor: '#501212',
    borderColor: colors.danger,
  },
  error: {
    color: colors.danger,
    marginTop: 8,
    fontFamily: fontMono,
  },
});
