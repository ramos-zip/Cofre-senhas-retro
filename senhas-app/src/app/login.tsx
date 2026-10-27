import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, commonStyles, fontMono } from '../lib/styles';
import { useApp } from '../lib/store';

export default function Login() {
  const router = useRouter();
  const { login } = useApp();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (login(password)) {
      router.replace('/home');
      return;
    }

    setError('Senha incorreta.');
  }

  return (
    <View style={styles.screen}>
      <View style={styles.panel}>
        <View style={styles.iconBox}>
          <Ionicons name="shield-half-sharp" size={38} color={colors.green} />
        </View>
        <Text style={commonStyles.title}>ACESSAR O COFRE</Text>
        <Text style={styles.description}>Informe sua senha de acesso.</Text>

        <Text style={commonStyles.label}>Senha de acesso</Text>
        <TextInput
          style={commonStyles.input}
          placeholder="••••"
          placeholderTextColor={colors.greenDark}
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          onSubmitEditing={handleLogin}
          autoFocus
        />

        {!!error && <Text style={commonStyles.error}>ERRO: {error}</Text>}

        <Pressable style={commonStyles.button} onPress={handleLogin}>
          <Text style={commonStyles.buttonText}>AUTENTICAR</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
    justifyContent: 'center',
    padding: 20,
  },
  panel: {
    width: '100%',
    maxWidth: 520,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panel,
    padding: 20,
  },
  protocol: {
    color: colors.greenDim,
    fontFamily: fontMono,
    fontSize: 12,
    marginBottom: 8,
  },
  description: {
    color: colors.muted,
    fontFamily: fontMono,
    marginTop: 8,
    marginBottom: 14,
  },
  iconBox: {
    width: 96,
    height: 96,
    borderWidth: 1,
    borderColor: colors.green,
    backgroundColor: colors.panel,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});
