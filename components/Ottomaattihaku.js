import { View } from "react-native";
import { Provider as PaperProvider,  Text } from 'react-native-paper';
import React, { useState } from 'react';
import { StyleSheet, Button } from 'react-native';
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

        const degree_LAT_km = locationObject.koordinaatti_LAT / 360 * 40000;
        const degree_LON_km = locationObject.koordinaatti_LON / 360 * 40000;;

        const degree_LAT_km_ottomaatti = Automaatit[Automaatit.length-3].koordinaatti_LAT / 360 * 40000;
        const degree_LON_km_ottomaatti = Automaatit[Automaatit.length-3].koordinaatti_LON / 360 * 40000;

        const a_point = degree_LAT_km - degree_LAT_km_ottomaatti;
        const b_point = degree_LON_km - degree_LON_km_ottomaatti;

        const distancePoint = Math.sqrt((Math.pow(a_point,2)) + (Math.pow(b_point,2)));



        console.log("Etäisyys",distancePoint, " Paikkakunta: ", Automaatit[Automaatit.length-3].postitoimipaikka);
        console.log("Lat on km: ",degree_LAT_km," ja lon on km ", degree_LON_km);
        console.log("OTTOMAATTI Lat on km: ",degree_LAT_km_ottomaatti," ja lon on km ", degree_LON_km_ottomaatti);

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