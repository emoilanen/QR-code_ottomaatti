import React, {useState} from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';


const qrRoute = () => <Text>qr</Text>;

const ottomaattiRoute = () => <Text>ottomaatti</Text>;




const NavBottom = () => {


  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'qr', title: 'QR-koodi', icon: 'qrcode' },
    { key: 'ottomaatti', title: 'Ottomaatti', icon: 'account-cash' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    qr: qrRoute,
    ottomaatti: ottomaattiRoute,
  });



  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}    
    />
  );
};

const styles = StyleSheet.create({
    
    navigation: {
        backgroundColor: 'pink',
    }
  });

export default NavBottom;