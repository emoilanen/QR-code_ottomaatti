import { View } from "react-native";
import { Provider as PaperProvider, BottomNavigation, Text } from 'react-native-paper';
import { WebView } from 'react-native-webview';
import React, { useState } from 'react';
import { StyleSheet, Button, SafeAreaView, Alert } from 'react-native';
import * as Location from 'expo-location';
import Automaatit from '../assets/automaatit'


function Ottomaattihaku() {

    const [ottomaattiLocation, setOttomaattiLocation] = useState([]);
  //  const [currentLocation, setCurrentLocation] = useState([]);
    // const [address, setAddress] = useState("");
    // const [postcode, setPostcode] = useState("");
    // const [city, setCity] = useState("");
    const [distance, setDistance] = useState("");
    const [locationPermission, setLocationPermission] = useState(false);
    const [error, setError] = useState("");


    const askLocationPermission = async () => {

        setError("");

        const { status } = await Location.requestPermissionsAsync();

        if (status === 'granted') {

            setLocationPermission(true);

            const locationNow = await Location.getCurrentPositionAsync({});

            const locationObject = {
                koordinaatti_LAT: locationNow.coords.latitude,
                koordinaatti_LON: locationNow.coords.longitude
            }

          //  setCurrentLocation(locationObject);

            searchOttomaatti(locationObject);
            //console.log("Nyt ollaan, locationObject",locationObject);
            //console.log("Nyt ollaan, locationNow",locationNow.coords.longitude,locationNow.coords.latitude);
        } else {
            setError("Sinun täytyy hyväksyä puhelimelle oikeus käyttää sijaintia, jotta voit etsiä automaattia");
        }

    }


    const searchOttomaatti = (locationObject) => {

        console.log("Automaatissa on", locationObject);
    }



    return (

        (locationPermission)
            ? <PaperProvider>

                <View>

                </View>

                <View style={styles.button}>
                    <Button
                        title="Etsi lähin Otto-automaatti"
                        onPress={askLocationPermission}
                        color="pink"
                    />
                </View>
            </PaperProvider>


            : <PaperProvider>

                <View>

                </View>

                {(error)
                    ? <View style={styles.warning}>
                        <Text>{error}</Text>
                    </View>
                    : null
                }
                <View style={styles.button}>
                    <Button
                        title="Etsi lähin Otto-automaatti"
                        onPress={askLocationPermission}
                        color="pink"
                    />
                </View>
            </PaperProvider>

    )
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
    },
    warning: {
        alignSelf: 'center',
        margin: 50,
        marginTop: 100
    }
});


export default Ottomaattihaku;