import L from "leaflet";
import iconUrl from "../images/marker-icon.png";
import iconShadow from "../images/marker-shadow.png";

const { iconSize, shadowSize, iconAnchor, popupAnchor, tooltopAnchor } =
  L.Marker.prototype.options.icon.options;

export const DefaultIcons = L.icon({
  iconUrl,
  iconSize,
  iconShadow,
  shadowSize,
  iconAnchor,
  popupAnchor,
  tooltopAnchor,
});
