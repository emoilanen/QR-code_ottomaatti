import { Provider as PaperProvider, BottomNavigation, Text } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { WebView } from 'react-native-webview';
import React, { useState } from 'react';
import { StyleSheet, Button, View, SafeAreaView, Alert  } from 'react-native';



function Qr_code() {

    const [url, setUrl] = useState("https://expo.io");
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [error, setError] = useState("");


    const useScanner = async () => {

        const { status } = await BarCodeScanner.requestPermissionsAsync();

        if (status === 'granted') {
            setHasPermission(true);
            setError("");
        } 
        else if (status === 'denied') {
            setError('Et ole antanut oikeutta käyttää kameraa! Sovellus ei voi lukea koodia, jos et ole antanut käyttöoikeutta kameralle');
        }
    }


    const handleBarCodeScanned = ({data}) => {

        setScanned(true);
        console.log(data);
    }



    return (

        (hasPermission)
            ? <PaperProvider>

                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} />

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



            : 
            
            <View style={styles.button}>
                { (error) 
                ?<Text>{error} </Text>
                :null
                }
                <Button
                    title="Skannaa QR-koodi"
                    onPress={useScanner}
                    color="pink"
                />
            </View>





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