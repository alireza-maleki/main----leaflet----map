import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

const MapWithRouting = () => {
  const [startLocation, setStartLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const position = [35.72994, 771.493692];

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    if (!startLocation) {
      setStartLocation([lat, lng]);
    } else {
      setDestination([lat, lng]);
    }
  };

  const LocationMarker = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        if (!startLocation) {
          setStartLocation([lat, lng]);
        } else {
          setDestination([lat, lng]);
        }
      },
      locationfound(e) {
        const { lat, lng } = e.latlng;
        setStartLocation([lat, lng]);
        map.flyTo([lat, lng], map.getZoom());
      },
    });

    return null;
  };

  const handleBackClick = () => {
    if (destination) {
      setDestination(null);
    } else if (startLocation) {
      setStartLocation(null);
    }
  };

  return (
    <div>
      <MapContainer
        center={position}
        zoom={16}
        onClick={handleMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {startLocation && <Marker position={startLocation} />}
        {destination && <Marker position={destination} />}
        <LocationMarker />
      </MapContainer>
      {destination ? (
        <button className="bg-blue-700 px-6 py-2 rounded text-white" onClick={handleBackClick}>برگشت به مرحله قبل</button>
      ) : (
        <button onClick={handleBackClick}>Back</button>
        // startLocation && <p className="text-bold text-lg">لطفاً مقصد را انتخاب کنید</p>
      )}
    </div>
  );
};

export default MapWithRouting;
