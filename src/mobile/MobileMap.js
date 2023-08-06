import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import L from "leaflet";

import PointerIcon from "../image/map.jpg";
import { DefaultIcons } from "../icons/DefaultIcons";

const MobileMap = () => {
  const [center, setCenter] = useState([35.72994, 771.493692]);
  const [startLocation, setStartLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [disableMapClick, setDisableMapClick] = useState(false);
  const [showRoute, setShowRoute] = useState(false);
  const [path, setPath] = useState([]);

  const mapRef = useRef();

  const handleMapClick = (e) => {
    if (!disableMapClick) {
      const { lat, lng } = e.latlng;
      if (!startLocation) {
        setStartLocation([lat, lng]);
        mapRef.current.setView([lat, lng], 18);
      } else {
        setDestination([lat, lng]);
        mapRef.current.setView([lat, lng], 18);
        // drawRoute([startLocation, [lat, lng]]);
      }
      // console.log(`Lat : ${lat} , Lng : ${lng}`);
    }
    console.log("click -- map");
  };

  const handlePointerClick = () => {
    if (destination) {
      setDestination(null);
    } else if (startLocation) {
      setStartLocation(null);
    }
    console.log("map -- position");
  };

  const LocationMap = () => {
    const map = useMapEvents({
      click(e) {
        handleMapClick(e);
      },
    });
  };

  const startLocationCloseHandler = () => {
    setStartLocation(null);
    setDisableMapClick(false);
  };

  const destinationCloseHandler = () => {
    setDestination(null);
    setDisableMapClick(false);
  };

  console.log(startLocation);
  console.log(destination);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // مرکز نقشه را بر اساس لوکیشن کاربر تنظیم کنید
        const { latitude, longitude } = position.coords;

        if (!startLocation && !destination) {
          mapRef.current.setView([latitude, longitude], 18);
        }
        // ایجاد مارکر برای لوکیشن کاربر
        // L.marker([latitude, longitude], {
        //   interactive: false,
        //   keyboard: false,
        // }).addTo(mapRef.current);

        L.popup()
          .setLatLng([latitude, longitude])
          .setContent("شما اینجا هستید -- مبدأ")
          .openOn(mapRef.current);
      },
      (error) => {
        console.log(error);
      }
    );

    if (mapRef.current && startLocation && destination) {
      const control = L.Routing.control({
        waypoints: [
          L.latLng(startLocation[0], startLocation[1]),
          L.latLng(destination[0], destination[1]),
        ],
      }).addTo(mapRef.current);

      setShowRoute(true);
      setDisableMapClick(true);

      return () => {
        if (control) {
          control.remove();
        }
      };
    }
  }, [startLocation, destination]);

  return (
    <Fragment>
      <MapContainer
        ref={mapRef}
        className="z-0 relative"
        center={center}
        zoom={18}
        onClick={handleMapClick}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMap />
        {startLocation && (
          <Marker
            icon={DefaultIcons}
            position={startLocation}
            eventHandler={handlePointerClick}
          >
            <Popup>مبدا</Popup>
          </Marker>
        )}

        {destination && (
          <Marker
            icon={DefaultIcons}
            position={destination}
            onClick={handlePointerClick}
          >
            <Popup>مقصد</Popup>
          </Marker>
        )}

        {!startLocation && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 999,
            }}
            onClick={handleMapClick}
          >
            <img
              src={PointerIcon}
              alt="pointer"
              style={{ width: "32px", height: "32px", cursor: "pointer" }}
            />
          </div>
        )}

        {/* {startLocation && (
          <button
            onClick={() => {
              if (destination) {
                setDestination(null);
              } else if (startLocation) {
                setStartLocation(null);
              }
            }}
            style={{
              position: "fixed",
              bottom: "30px",
              left: "30px",
              zIndex: 999,
            }}
            className="px-6 py-2 bg-blue-600 rounded-lg border-none outline-none text-lg text-white"
          >
            برگشت
          </button>
        )} */}

        {showRoute && (
          <Polyline pathOptions={{ color: "red" }} positions={path} />
        )}
      </MapContainer>

      {startLocation && (
        <div className="absolute w-3/4 md:w-2/4 lg:w-1/4 p-4 rounded bg-white shadow-lg fixed bottom-[4%] right-[2%] z-50">
          <span
            onClick={startLocationCloseHandler}
            className="text-lg text-red-500 cursor-pointer"
          >
            X
          </span>
          <p className="flex items-center justify-around">
            <span>Lat : {startLocation[0].toFixed(2)}</span>
            <span>Lng : {startLocation[1].toFixed(2)}</span>
            <p className="text-lg mr-4">مبدأ</p>
          </p>
        </div>
      )}

      {destination && (
        <div className="absolute w-3/4 md:w-2/4 lg:w-1/4 p-4 rounded bg-white shadow-lg fixed bottom-[15%] right-[2%] z-50">
          <span
            onClick={destinationCloseHandler}
            className="text-lg text-red-500 cursor-pointer"
          >
            X
          </span>
          <p className="flex items-center justify-around">
            <span>Lat : {destination[0].toFixed(2)}</span>
            <span>Lng : {destination[1].toFixed(2)}</span>
            <p className="text-lg mr-4">مقصد</p>
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default MobileMap;
