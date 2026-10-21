import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, commonStyles, fontMono } from '../../../lib/styles';
import { useApp } from '../../../lib/store';

export default function AccountDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { accounts, removeAccount } = useApp();
  const [visible, setVisible] = useState(false);

  const account = accounts.find((item) => item.id === id);

  if (!account) {
    return (
      <View style={styles.notFoundScreen}>
        <Text style={styles.notFoundText}>Conta não encontrada.</Text>
      </View>
    );
  }

  function confirmDelete() {
    Alert.alert('Excluir conta', `Remover "${account.site}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await removeAccount(account.id);
          router.back();
        },
      },
    ]);
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: account.site.toUpperCase() }} />

      <Text style={styles.protocol}>ACCOUNT://DETAIL</Text>

      {account.image && (
        <Image source={{ uri: account.image }} style={styles.accountImage} />
      )}

      <View style={styles.panel}>
        <Text style={commonStyles.label}>Site</Text>
        <Text style={styles.value}>{account.site}</Text>

        <Text style={commonStyles.label}>Usuário / e-mail</Text>
        <Text style={styles.value}>{account.username}</Text>

        <Text style={commonStyles.label}>Senha</Text>
        <View style={commonStyles.row}>
          <Text style={[styles.password, !visible && styles.hiddenPassword]}>
            {visible ? account.password : '••••••••'}
          </Text>

          <Pressable onPress={() => setVisible((current) => !current)} hitSlop={10}>
            <Ionicons
              name={visible ? 'eye-off' : 'eye'}
              size={26}
              color={colors.green}
            />
          </Pressable>
        </View>
      </View>

      <Pressable
        style={commonStyles.button}
        onPress={() => router.push(`/account/form?id=${account.id}`)}
      >
        <Text style={commonStyles.buttonText}>EDITAR</Text>
      </Pressable>

      <Pressable
        style={[commonStyles.button, commonStyles.dangerButton, styles.deleteButton]}
        onPress={confirmDelete}
      >
        <Text style={styles.dangerText}>EXCLUIR</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
    padding: 20,
  },
  protocol: {
    color: colors.greenDim,
    fontFamily: fontMono,
    fontSize: 12,
    marginBottom: 18,
  },
  accountImage: {
    width: 90,
    height: 90,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.green,
    alignSelf: 'center',
    marginBottom: 12,
  },
  panel: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    padding: 16,
  },
  value: {
    fontSize: 18,
    color: colors.text,
    fontFamily: fontMono,
  },
  password: {
    fontSize: 18,
    flex: 1,
    color: colors.green,
    fontFamily: fontMono,
  },
  hiddenPassword: {
    letterSpacing: 3,
  },
  deleteButton: {
    marginTop: 10,
  },
  dangerText: {
    ...commonStyles.buttonText,
    color: colors.danger,
  },
  notFoundScreen: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  notFoundText: {
    color: colors.text,
    fontFamily: fontMono,
  },
});
