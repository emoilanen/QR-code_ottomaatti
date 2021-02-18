import { Provider as PaperProvider, BottomNavigation, Text } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { WebView } from 'react-native-webview';
import React, { useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Alert } from 'react-native';


function Qr_code() {

    const [url, setUrl] = useState("https://expo.io");


    return (
        <PaperProvider>
            <View style={{ height: 1000 }}>
                <WebView source={{ uri: url }}
                    style={{ marginTop: 50, height: 500 }} />
            </View>
            <View style={styles.button}>
                <Button
                    title="Skannaa QR-koodi"
                    onPress={() => { }}
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