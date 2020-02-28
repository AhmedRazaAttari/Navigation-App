import * as Location from 'expo-location';

var Data = []
async function GetLocation(queryValue) {

    let location = await Location.getCurrentPositionAsync({});
    fetch("https://api.foursquare.com/v2/venues/search?ll=" + location.coords.latitude + "," + location.coords.longitude + "&client_id=NQE3ACGGUP4NAIZSDVEGBTAFVHXU1JCYGWFKKFPJQ3JPDCVW&client_secret=X3FNU5RO5Y20LSBGO34D0HX5XVLTOI1V0KFHWCCHWM2ID1AN&v=20200205&radius=1000&query=" + queryValue)
        .then(res => res.json())
        .then((response) => {
            var tempraryArr = [];
            // console.log(response.response.venues);
            for (var i = 0; i < response.response.venues.length; i++) {

                tempraryArr.push({
                    name: response.response.venues[i].name,
                    location: response.response.venues[i].location
                })
            }
            Data = tempraryArr;
        })
        return Data;
}


export {
    GetLocation,
    Data
}