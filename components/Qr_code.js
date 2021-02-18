import { Provider as PaperProvider, BottomNavigation, Text } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { WebView } from 'react-native-webview';
import React, { useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Alert, CameraRoll } from 'react-native';
import { Camera } from 'expo-camera';



function Qr_code() {

    const [url, setUrl] = useState("https://expo.io");
    const [hasPermission, setHasPermission] = useState(null);

    const useScanner = async () => {

        const {status} = await Camera.requestPermissionsAsync();

        if(status === 'granted'){
            console.log("LUPA MYÖNNETTY");
        }
    }



    return (
        <PaperProvider>
            <View style={{ height: 1000 }}>
                <WebView source={{ uri: url }}
                    style={{ marginTop: 50, height: 500 }} />
            </View>
            <View style={styles.button}>
                <Button
                    title="Skannaa QR-koodi"
                    onPress={useScanner}
                    color="pink"
                />
            </View>

        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        marginTop: 500,
        bottom: 50,
        width: 200,
        alignSelf: 'center',
        borderWidth: 5,
        borderBottomColor: "black",
    }
});

export default Qr_code;