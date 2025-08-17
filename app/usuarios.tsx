// app/users.tsx
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';

const fetchUsers = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Erro ao carregar usuários');
  }
  return response.json();
};

export default function Users() {
  const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});


  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando usuários...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Erro ao carregar usuários</Text>
        <Button title="Tentar novamente" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text>{item.email}</Text>
          <Text>{item.address.city}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  card: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
