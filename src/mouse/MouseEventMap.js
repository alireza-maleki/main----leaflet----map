import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from "react-leaflet";
import { DefaultIcons } from "../icons/DefaultIcons";

const MouseEventMap = () => {
  const [mousePosition, setMousePosition] = useState(null);
  const [touchPosition, setTouchPosition] = useState(null);
  const [userClickMap, setUserClickMap] = useState(null);
  const position = [35.72994, 771.493692];

  const handleMouseMovement = (e) => {
    const { lat, lng } = e.latlng;
    setMousePosition({ lat, lng });
  };

  const handleTouchMovement = (e) => {
    const { lat, lng } = e.latlng;
    setTouchPosition({ lat, lng });
  };

  const MapLiveTracking = () => {
    useMapEvents({
      mousemove(e) {
        handleMouseMovement(e);
      },
      touchmove(e) {
        handleTouchMovement(e);
      },
      click(e) {
        const { lat, lng } = e.latlng;
        setUserClickMap([lat, lng]);
      },
    });

    
    return mousePosition ? (
      <Marker position={mousePosition} icon={DefaultIcons} />
    ) : null;
  };

  return (
    <MapContainer center={position} zoom={18}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapLiveTracking />

      {userClickMap && (
        <Marker icon={DefaultIcons} position={userClickMap}>
          <Popup>مبدأ</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MouseEventMap;
