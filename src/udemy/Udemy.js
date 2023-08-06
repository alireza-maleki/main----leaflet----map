import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Popup,
  TileLayer,
  Marker,
  useMapEvent,
} from "react-leaflet";
import { DefaultIcons } from "../icons/DefaultIcons";
import L from "leaflet";

const DEFAULT_LANGITUDE = -123;
const DEFAULT_LATITUDE = 48;

const Udemy = (props) => {
  const [selectedPosition, setSelectedPosition] = useState([0, 0]);
  const [userLocation, setUserLocation] = useState([0, 0]);
  const position = [35.72994, 771.493692];

  const langitude = props.coords ? props.coords.langitude : DEFAULT_LANGITUDE;
  const latitude = props.coords ? props.coords.latitude : DEFAULT_LATITUDE;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          console.log(position);
          alert(position);
        },
        function (error) {
          alert(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const customIcon = L.icon({
    iconUrl: require("../image/map.jpg"),
    iconSize: [30, 30],
  });

  const Markers = () => {
    const map = useMapEvent({
      click(e) {
        setSelectedPosition([e.latlng.lat, e.latlng.lng]);
        L.marker([e.latlng.lat, e.latlng.lng], { icon: customIcon }).addTo(map);
      },
    });
  };

  console.log(selectedPosition);
  return (
    <MapContainer center={position} zoom={16} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers />
      <Marker position={userLocation || position} icon={DefaultIcons}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Udemy;
