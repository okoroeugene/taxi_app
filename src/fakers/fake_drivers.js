import Geolocation from '@react-native-community/geolocation';

export function FakeDrivers(lat, long) {
    let result = [
        { id: 1, name: "John Sani", position: randPosition(lat, long), phone: "0800000000", plate_number: "AK-H302DSW" },
        { id: 2, name: "Prince Dakir", position: randPosition(lat, long), phone: "0800000000", plate_number: "BX-DISW12K" },
        { id: 3, name: "Chinedu Pekur", position: randPosition(lat, long), phone: "0800000000", plate_number: "XC-YUSDJ3P0" },
        { id: 4, name: "Ranni Frank", position: randPosition(lat, long), phone: "0800000000", plate_number: "YK-KDLHD9DS2" },
        { id: 5, name: "Zankur Jin", position: randPosition(lat, long), phone: "0800000000", plate_number: "PL-HDJY47DD8" },
        { id: 6, name: "Makuhue Durnamis", position: randPosition(lat, long), phone: "0800000000", plate_number: "QD-WKSLSJD3J2" }
    ]
    return result;
}

function randPosition(lat, long) {
    var r = Math.round(Math.random() * 100) / 111300 // = 100 meters
        , x0 = lat
        , y0 = long
        , u = Math.random()
        , v = Math.random()
        , w = r * Math.sqrt(u)
        , t = 2 * Math.PI * v
        , x = w * Math.cos(t)
        , y1 = w * Math.sin(t)
        , x1 = x / Math.cos(y0)

    const newX = x0 + x1
    const newY = y0 + y1
    return { latitude: newX, longitude: newY };
}