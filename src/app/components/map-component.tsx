"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LeafletMouseEvent } from "leaflet";

interface LocationMapProps {
  initialPosition: [number, number];
  onLocationChange: (lat: number, lon: number) => void;
}

function MapClickHandler({
  onClick,
}: {
  onClick: (lat: number, lon: number) => void;
}) {
  useMapEvents({
    click(event: LeafletMouseEvent) {
      const { lat, lng } = event.latlng;
      onClick(lat, lng);
    },
  });
  return null;
}

export default function LocationMap({ initialPosition, onLocationChange }: LocationMapProps) {
  const [position, setPosition] = useState(initialPosition);

  useEffect(() => {
    import("leaflet").then((L) => {
      L.Icon.Default.prototype.options = {
        ...L.Icon.Default.prototype.options,
        iconRetinaUrl: "marker-icon-2x.png",
        iconUrl: "marker-icon.png",
        shadowUrl: "marker-shadow.png",
      };
    });
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onLocationChange(lat, lng);
  };

  const eventHandlers = {
    dragend(event: L.LeafletEvent) {
      const marker = event.target as L.Marker;
      const latlng = marker.getLatLng();
      setPosition([latlng.lat, latlng.lng]);
      onLocationChange(latlng.lat, latlng.lng);
    },
  };

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "300px", width: "100%", marginBottom: "1rem" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='© OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} draggable eventHandlers={eventHandlers} />
      <MapClickHandler onClick={handleMapClick} />
    </MapContainer>
  );
}