import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('logbook.db');

export const init = (drop) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      drop ? tx.executeSql('DROP TABLE entries') : null;
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY NOT NULL, logBook_id INTEGER NOT NULL , recordType TEXT NOT NULL, title TEXT, date INTEGER, description TEXT, imageUri TEXT, address TEXT, lat REAL, lng REAL);',
        [],
        () => {
          //if succeed
          resolve();
        },
        (_, err) => {
          // if fail
          console.log('db init error', err);
        }
      );
    });
  });
  return promise;
};

init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch((err) => {
    console.log('Initializing db failed.');
    console.log(err);
  });

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
