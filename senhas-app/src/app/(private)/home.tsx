import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, commonStyles, fontMono } from '../../lib/styles';
import { useApp } from '../../lib/store';

export default function Home() {
  const router = useRouter();
  const { accounts } = useApp();

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          title: 'MINHAS CONTAS',
          headerBackVisible: false,
          headerRight: () => (
            <Pressable onPress={() => router.push('/profile')}>
              <Ionicons name="person-circle-outline" size={30} color={colors.green} />
            </Pressable>
          ),
        }}
      />

      <Text style={styles.counter}>
        REGISTROS ENCONTRADOS: {accounts.length.toString().padStart(2, '0')}
      </Text>

      <FlatList
        data={accounts}
        keyExtractor={(account) => account.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>// NENHUMA CONTA CADASTRADA</Text>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/account/${item.id}`)}
          >
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Ionicons name="globe-outline" size={24} color={colors.green} />
              </View>
            )}

            <View style={styles.accountInfo}>
              <Text style={styles.site}>{item.site}</Text>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.hiddenPassword}>••••••••</Text>
            </View>

            <Ionicons name="chevron-forward" size={20} color={colors.green} />
          </Pressable>
        )}
      />

      <Pressable style={commonStyles.button} onPress={() => router.push('/account/form')}>
        <Text style={commonStyles.buttonText}>+ NOVA CONTA</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...commonStyles.screen,
    padding: 20,
  },
  counter: {
    color: colors.greenDim,
    fontFamily: fontMono,
    fontSize: 12,
    marginBottom: 12,
  },
  list: {
    flexGrow: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.muted,
    fontFamily: fontMono,
    marginTop: 40,
  },
  card: {
    backgroundColor: colors.panel,
    borderRadius: 4,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.line,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 4,
    marginRight: 12,
    backgroundColor: colors.panelAlt,
    borderWidth: 1,
    borderColor: colors.line,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountInfo: {
    flex: 1,
  },
  site: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    fontFamily: fontMono,
  },
  username: {
    color: colors.greenDim,
    fontFamily: fontMono,
    marginTop: 3,
  },
  hiddenPassword: {
    color: colors.muted,
    letterSpacing: 3,
    marginTop: 4,
  },
});
