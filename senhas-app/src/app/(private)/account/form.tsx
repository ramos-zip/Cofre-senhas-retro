import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, commonStyles, fontMono } from '../../../lib/styles';
import { useApp } from '../../../lib/store';

export default function AccountForm() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { accounts, addAccount, updateAccount } = useApp();

  const editing = accounts.find((account) => account.id === id);

  const [site, setSite] = useState(editing?.site ?? '');
  const [image, setImage] = useState(editing?.image);
  const [username, setUsername] = useState(editing?.username ?? '');
  const [password, setPassword] = useState(editing?.password ?? '');
  const [showPass, setShowPass] = useState(false);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  async function save() {
    if (!site.trim() || !username.trim() || !password) {
      Alert.alert('Atenção', 'Preencha site, usuário e senha.');
      return;
    }

    const data = {
      site: site.trim(),
      image,
      username: username.trim(),
      password,
    };

    if (editing) {
      await updateAccount(editing.id, data);
    } else {
      await addAccount(data);
    }

    router.back();
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: editing ? 'EDITAR CONTA' : 'NOVA CONTA' }} />

      <View style={styles.formContainer}>
        <Text style={styles.protocol}>RECORD://ACCOUNT</Text>

        <Pressable onPress={pickImage} style={styles.imageButton}>
          {image ? (
            <Image source={{ uri: image }} style={styles.accountImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="camera-outline" size={30} color={colors.green} />
            </View>
          )}

          <Text style={styles.imageText}>
            {image ? '[ TROCAR IMAGEM ]' : '[ ADICIONAR IMAGEM ]'}
          </Text>
        </Pressable>

        <Text style={commonStyles.label}>Site</Text>
        <TextInput
          style={commonStyles.input}
          value={site}
          onChangeText={setSite}
          autoCapitalize="none"
          placeholder="ex.: github.com"
          placeholderTextColor={colors.muted}
        />

        <Text style={commonStyles.label}>Usuário ou e-mail</Text>
        <TextInput
          style={commonStyles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={colors.muted}
        />

        <Text style={commonStyles.label}>Senha</Text>
        <View style={styles.passwordField}>
          <TextInput
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPass}
            autoCapitalize="none"
          />

          <Pressable onPress={() => setShowPass((visible) => !visible)} hitSlop={10}>
            <Ionicons
              name={showPass ? 'eye-off' : 'eye'}
              size={24}
              color={colors.green}
            />
          </Pressable>
        </View>

        <Pressable style={commonStyles.button} onPress={save}>
          <Text style={commonStyles.buttonText}>
            {editing ? 'SALVAR ALTERAÇÕES' : 'CADASTRAR'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 560,
  },
  protocol: {
    color: colors.greenDim,
    fontFamily: fontMono,
    fontSize: 12,
    marginBottom: 18,
  },
  imageButton: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  accountImage: {
    width: 90,
    height: 90,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.green,
  },
  imagePlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.panelAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    textAlign: 'center',
    color: colors.green,
    fontFamily: fontMono,
    fontSize: 12,
    marginTop: 8,
  },
  passwordField: {
    ...commonStyles.input,
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    fontFamily: fontMono,
    padding: 0,
  },
});
