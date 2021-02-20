import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import NavBottom from './components/NavBottom'




export default function App() {
  return (
    <PaperProvider >
      <NavBottom />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    
    marginTop: 100
  },
});
