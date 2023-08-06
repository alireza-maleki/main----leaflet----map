import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";

import { Icon } from "leaflet";
import { L } from "leaflet";

import { useState, useEffect, useMemo, useCallback } from "react";

const center = [51.505, -0.09];
const zoom = 13;

function DisplayPosition({ map }) {
  const [position, setPosition] = useState(() => map.getCenter());

  const onMove =
    (() => {
      setPosition(map.getCenter());
    },
    [map]);

  useEffect(() => {
    map.on("click", function (e) {
      var coord = e.latlng;
      var lat = coord.lat;
      var lng = coord.lng;
      console.log("Lat : " + lat + " Lng :  " + lng);
    });
  }, [map, onMove]);

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{" "}
      <button>reset</button>
    </p>
  );
}

function ExternalStateExample() {
  const [map, setMap] = useState(null);

  const customIcon = new Icon({
    iconUrl: require("../image/map.jpg"),
    iconRetinaUrl: require("../image/map.jpg"),
    iconSize: [38, 38],
    iconAnchor: null,
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  const onClickFunc = (e) => {
    console.log(e);
  };

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        ref={setMap}
        icon={customIcon}
        onClick={(e) => {
          console.log(e.latlng);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          eventHandlers={{ click: onClickFunc }}
          onClick={onClickFunc}
          position={[51.505, -0.09]}
          icon={customIcon}
        >
          <Popup>Hi i am here!</Popup>
        </Marker>
      </MapContainer>
    ),
    []
  );

  return (
    <div className="w-screen h-full">
      {map ? <DisplayPosition map={map} /> : null}
      {displayMap}
    </div>
  );
}

export default ExternalStateExample;
