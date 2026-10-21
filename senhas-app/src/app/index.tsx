import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, commonStyles, fontMono } from '../lib/styles';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.systemText}>PERSONAL SECURITY SYSTEM // V4</Text>
        <View style={styles.divider} />

        <View style={styles.iconBox}>
          <Ionicons name="shield-checkmark" size={58} color={colors.green} />
        </View>

        <Text style={styles.title}>MEU COFRE</Text>
        <Text style={styles.subtitle}>
          Guarde e consulte suas senhas em um só lugar.
        </Text>

        <View style={styles.statusBox}>
          <Text style={styles.statusText}>STATUS: SISTEMA PRONTO</Text>
        </View>

        <Pressable style={styles.button} onPress={() => router.push('/login')}>
          <Text style={commonStyles.buttonText}>[ ENTRAR ]</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 460,
    alignItems: 'center',
  },
  systemText: {
    color: colors.greenDim,
    fontFamily: fontMono,
    fontSize: 12,
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.line,
    marginTop: 10,
    marginBottom: 34,
  },
  iconBox: {
    width: 96,
    height: 96,
    borderWidth: 1,
    borderColor: colors.green,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...commonStyles.title,
    fontSize: 34,
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontFamily: fontMono,
    lineHeight: 22,
    marginTop: 10,
    textAlign: 'center',
  },
  statusBox: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    padding: 12,
    marginTop: 30,
    alignItems: 'center',
  },
  statusText: {
    color: colors.greenDim,
    fontFamily: fontMono,
    fontSize: 12,
  },
  button: {
    ...commonStyles.button,
    width: '100%',
    marginTop: 18,
  },
});
