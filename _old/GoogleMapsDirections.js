// /*global google*/
// import React, { Component } from 'react'
// import { DirectionsRenderer, Marker } from 'react-google-maps'
// import stop from '../assets/stop-map.svg'
// import start from '../assets/current-location-map.svg'


// class GoogleMapsDirections extends Component {
//   state = {
//     directions: null,
//   }
//   delayFactor = 0

//   componentDidMount() {
//     const origin = new google.maps.LatLng(this.props.origin.lat, this.props.origin.lon)
//     const destination = new google.maps.LatLng(this.props.destination.lat, this.props.destination.lon)
//     this.getDirections(origin, destination)
//   }

//   async getDirections(origin, destination) {
//     console.log(origin, destination)
//     const directionService = new window.google.maps.DirectionsService()
//     directionService.route(
//       {
//         origin,
//         destination,
//         travelMode: google.maps.TravelMode.WALKING
//       },
//       (result, status) => {
//         if (status === window.google.maps.DirectionsStatus.OK) {
//           this.setState({
//             directions: result,
//           })
//         } else if (
//           status === window.google.maps.DirectionsStatus.OVER_QUERY_LIMIT
//         ) {
//           this.delayFactor += 0.2
//           setTimeout(() => {
//             this.getDirections(origin, destination)
//           }, this.delayFactor * 200)
//         } else {
//           console.error(`error fetching directions ${result}`)
//         }
//       }
//     )
//   }

//   render() {
//     let originMarker = null
//     let destinationMarker = null
//     if (this.state.directions) {
//       originMarker = (
//         <Marker
//           clickable={false}
//           defaultIcon={{url: start, scaledSize: new google.maps.Size(30, 30)}}
//           position={{
//             lat: parseFloat(this.props.origin.lat),
//             lng: parseFloat(this.props.origin.lon)
//           }}
//         />
//       )
//       destinationMarker = (
//         <Marker
//           clickable={false}
//           defaultIcon={{url: stop, scaledSize: new google.maps.Size(30, 30)}}
//           position={{
//             lat: parseFloat(this.props.destination.lat),
//             lng: parseFloat(this.props.destination.lon)
//           }}
//         />
//       )
//     }
//     return (
//       <div>
//         {originMarker}
//         {destinationMarker}
//         {this.state.directions && (
//           <DirectionsRenderer
//             directions={this.state.directions}
//             defaultOptions={{
//               polylineOptions: { strokeColor: '#5c45a0', strokeOpacity: 0.6, strokeWeight: 4 },
//               suppressMarkers: true
//             }}
//           />
//         )}
//       </div>
//     )
//   }
// }

// export default GoogleMapsDirections
