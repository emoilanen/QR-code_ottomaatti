import { View } from "react-native";
import { Provider as PaperProvider, Text } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Button } from 'react-native';
import * as Location from 'expo-location';
import Automaatit from '../assets/automaatit'


function Ottomaattihaku() {

    const [ottomaatit, setOttomaatit] = useState([]);
    const [nearestCity, setNearestCity] = useState("");
    const [distance, setDistance] = useState("");
    const [locationPermission, setLocationPermission] = useState(false);
    const [error, setError] = useState("");



    useEffect(() => {

        const objectDetails = Object.values(Automaatit);

        setOttomaatit(ottomaatit.concat(objectDetails));

    }, []);


    // Ask permisson for use location
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

            searchOttomaatti(locationObject);

        } else {
            setError("Sinun täytyy hyväksyä puhelimelle oikeus käyttää sijaintia, jotta voit etsiä automaattia");
        }
    }


    // Search nearest cash automatic
    const searchOttomaatti = (locationObject) => {

        let shortestDistance = 0;
        let shortestCity = "";

        ottomaatit.map((am) => {

            let degree_LAT_km = locationObject.koordinaatti_LAT / 360 * 40000;
            let degree_LON_km = locationObject.koordinaatti_LON / 360 * 40000;;

            let degree_LAT_km_ottomaatti = am.koordinaatti_LAT / 360 * 40000;
            let degree_LON_km_ottomaatti = am.koordinaatti_LON / 360 * 40000;

            let a_point = degree_LAT_km - degree_LAT_km_ottomaatti;
            let b_point = degree_LON_km - degree_LON_km_ottomaatti;

            let distancePoint = Math.sqrt((Math.pow(a_point, 2)) + (Math.pow(b_point, 2)));

            if (distancePoint < shortestDistance || shortestDistance === 0) {
                shortestDistance = distancePoint;
                shortestCity = am;
            }

        })
        setDistance(shortestDistance.toFixed(2));
        setNearestCity(shortestCity);
    }


    return (

        (locationPermission)
            ? <PaperProvider>

                {(distance)
                    ? <View style={styles.details}>
                        <Text>Lähin Ottoautomaatti on {distance} km:n päässä</Text>
                        <Text style={styles.text}>Katuosoite: {nearestCity.katuosoite}</Text>
                        <Text>Postitoimipaikka: {nearestCity.postitoimipaikka}</Text>
                        <Text>Postinumero: {nearestCity.postinumero}</Text>
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


            : <PaperProvider>


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
    },
    details: {
        marginTop: 300,
        alignSelf: 'center',
        backgroundColor: "yellow",
        padding: 15
    },
    text: {
        marginTop: 20
    }
});


export default Ottomaattihaku;