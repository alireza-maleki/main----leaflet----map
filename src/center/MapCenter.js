import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { DefaultIcons } from "./../icons/DefaultIcons";

const MapWithCenterMarker = () => {
  const [center, setCenter] = useState(null);
  const position = [35.72994, 771.493692];


  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    setCenter({ lat, lng });
  };

  const MapCenterMarker = () => {
    const map = useMapEvents({
      click(e) {
        handleClick(e);
      },
    });

    console.log(center)

    return center === null ? null : (
      <Marker
        position={center}
        icon={DefaultIcons}
        eventHandlers={{ click: () => console.log(center) }}
      />
    );
  };

  return (
    <MapContainer
      center={position}
      zoom={18}
      onclick={(e) => handleClick(e)}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapCenterMarker />
    </MapContainer>
  );
};

export default MapWithCenterMarker;
