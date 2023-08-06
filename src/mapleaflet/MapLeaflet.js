import React, { useEffect } from "react";

const MapLeaflet = () => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
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

  return <div></div>;
};

export default MapLeaflet;
