import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider, BottomNavigation, Text } from 'react-native-paper';
import Ottomaattihaku from './components/Ottomaattihaku';
import Qr_code from './components/Qr_code';
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
