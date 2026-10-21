import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, commonStyles, fontMono } from '../../lib/styles';
import { useApp } from '../../lib/store';

export default function Profile() {
  const router = useRouter();
  const { profile, updateProfile, changeAppPassword, logout } = useApp();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');

  async function saveProfile() {
    await updateProfile({ name: name.trim(), email: email.trim() });
    Alert.alert('Pronto', 'Dados atualizados.');
  }

  async function savePassword() {
    if (next !== confirm) {
      Alert.alert('Atenção', 'A confirmação não confere.');
      return;
    }

    const changed = await changeAppPassword(current, next);

    if (!changed) {
      Alert.alert('Atenção', 'Senha atual incorreta ou nova senha com menos de 4 caracteres.');
      return;
    }

    setCurrent('');
    setNext('');
    setConfirm('');
    Alert.alert('Pronto', 'Senha de acesso alterada.');
  }

  function handleLogout() {
    logout();
    router.replace('/');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: 'DADOS PESSOAIS' }} />

      <Text style={styles.protocol}>USER://PROFILE</Text>

      <View style={styles.panel}>
        <Text style={commonStyles.label}>Nome</Text>
        <TextInput
          style={commonStyles.input}
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.muted}
        />

        <Text style={commonStyles.label}>E-mail</Text>
        <TextInput
          style={commonStyles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={colors.muted}
        />

        <Pressable style={commonStyles.button} onPress={saveProfile}>
          <Text style={commonStyles.buttonText}>SALVAR DADOS</Text>
        </Pressable>
      </View>

      <View style={styles.passwordPanel}>
        <Text style={styles.sectionTitle}>SENHA DE ACESSO</Text>

        <Text style={commonStyles.label}>Senha atual</Text>
        <TextInput
          style={commonStyles.input}
          secureTextEntry
          value={current}
          onChangeText={setCurrent}
          placeholderTextColor={colors.muted}
        />

        <Text style={commonStyles.label}>Nova senha</Text>
        <TextInput
          style={commonStyles.input}
          secureTextEntry
          value={next}
          onChangeText={setNext}
          placeholderTextColor={colors.muted}
        />

        <Text style={commonStyles.label}>Confirmar nova senha</Text>
        <TextInput
          style={commonStyles.input}
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
          placeholderTextColor={colors.muted}
        />

        <Pressable style={commonStyles.button} onPress={savePassword}>
          <Text style={commonStyles.buttonText}>ALTERAR SENHA</Text>
        </Pressable>
      </View>

      <Pressable
        style={[commonStyles.button, commonStyles.dangerButton]}
        onPress={handleLogout}
      >
        <Text style={styles.dangerText}>SAIR DO SISTEMA</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  protocol: {
    color: colors.greenDim,
    fontFamily: fontMono,
    fontSize: 12,
    marginBottom: 14,
  },
  panel: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    padding: 16,
  },
  passwordPanel: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    padding: 16,
    marginTop: 18,
  },
  sectionTitle: {
    ...commonStyles.title,
    fontSize: 19,
  },
  dangerText: {
    ...commonStyles.buttonText,
    color: colors.danger,
  },
});
