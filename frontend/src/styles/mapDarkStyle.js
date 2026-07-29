const mapDarkStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#1d1d1d" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#8b8b8b" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#111111" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#2d2d2d" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#121212" }],
  },
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
];

export default mapDarkStyle;