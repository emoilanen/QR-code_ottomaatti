import React, { useState } from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import Ottomaattihaku from './/Ottomaattihaku';
import Qr_code from './Qr_code';



const NavBottom = () => {


  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'qr', title: 'QR-koodi', icon: 'qrcode' },
    { key: 'ottomaatti', title: 'Ottomaatti', icon: 'account-cash' },
  ]);


  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 'qr':
        return <Qr_code jumpTo={jumpTo} />;
      case 'ottomaatti':
        return <Ottomaattihaku jumpTo={jumpTo} />;
    }
  }



  return (
    
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        activeColor="green"
        inactiveColor="white"
      />
   
  );
};

const styles = StyleSheet.create({

  navigation: {
    backgroundColor: 'pink',
    paddingTop: 50
  }
});

export default NavBottom;