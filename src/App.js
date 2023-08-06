import React from "react";
import "./App.css";
import "leaflet/dist/leaflet.css";
import Udemy from "./udemy/Udemy";
import LocationMap from "./location/LocationMap";
import MapWithRouting from "./map-routing/MapWithRouting";
import MapCenter from "./center/MapCenter";
import MouseEventMap from "./mouse/MouseEventMap";
import MobileMap from "./mobile/MobileMap";


const App = () => {
  return (
    <div>
      <LocationMap />
      {/* <MapWithRouting /> */}

      {/* <MapCenter /> */}
      {/* <MouseEventMap /> */}


      {/* <MobileMap /> */}
    </div>
  );
};

export default App;
