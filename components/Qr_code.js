import { Provider as PaperProvider, Text } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { WebView } from 'react-native-webview';
import React, { useState } from 'react';
import { StyleSheet, Button, View, Dimensions } from 'react-native';



function Qr_code() {

    const [url, setUrl] = useState("");
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [error, setError] = useState("");
    const [useScannerPermission, setUseScannerPermission] = useState(false);


    const useScanner = async () => {

        const { status } = await BarCodeScanner.requestPermissionsAsync();

        if (status === 'granted') {
            setHasPermission(true);
            setError("");
            setUseScannerPermission(true);
        }
        else if (status === 'denied') {
            setError('Et ole antanut oikeutta käyttää kameraa! Sovellus ei voi lukea koodia, jos et ole antanut käyttöoikeutta kameralle');
        }
    }


    const handleBarCodeScanned = ({ data }) => {

        console.log(data);

        if (data.includes("http")){
        setScanned(true);
        setUrl(data);
        setUseScannerPermission(false);
        setScanned(false);
    } else {
        setScanned(true);
        setUrl("https://"+data);
        setUseScannerPermission(false);
        setScanned(false);
    }
    }


    return (

        (hasPermission && useScannerPermission)
            ? <PaperProvider>

                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{
                        height: Dimensions.get('window').height,
                        width: Dimensions.get('window').width,
                    }}
                />


                <View style={styles.button}>
                    <Button
                        title="Sulje skanneri"
                        onPress={() => setUseScannerPermission(false)}
                        color="pink"
                    />
                </View>
            </PaperProvider>

            :
            <PaperProvider>
                <View style={{ height: 1000 }}>
                    <WebView source={{ uri: url }}
                        style={{ marginTop: 50, height: 500 }} />
                </View>
                <View style={styles.button}>
                    {(error)
                        ? <Text>{error} </Text>
                        : null
                    }
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