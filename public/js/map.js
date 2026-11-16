// mapboxgl.accessToken = mapToken;

// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: 'mapbox://styles/mapbox/streets-v12', 
//     center: listing.geometry.coordinates, // starting position [lng, lat].
//     zoom: 9 // starting zoom
// });

// const marker = new mapboxgl.Marker({ color: "red" })
//     .setLngLat(listing.geometry.coordinates)  //Listing.geometry.coordinates
//     .setPopup(
//         new mapboxgl.Popup({ offset: 25 }).setHTML(
//             `<h4>${listing.title}</h4><p>Exact Location Will Be Shared After Booking</p>`
//         )
//     )
//     .addTo(map);


mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates,
    zoom: 9
});

// Custom marker element
const markerElement = document.createElement('div');

markerElement.className = 'custom-marker';

// Create marker
const marker = new mapboxgl.Marker({
    element: markerElement,
    anchor: 'center'
})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h4>${listing.title}</h4>
             <p>Exact Location Will Be Shared After Booking</p>`
        )
    )
    .addTo(map);