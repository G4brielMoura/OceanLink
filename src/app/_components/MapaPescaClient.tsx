"use client"

import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet"
import { LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"

const center: LatLngExpression = [-4.9609, -45.2744]

const zonasPesca = [
  {
    nome: "Zona Costeira - São Luís",
    coordenadas: [
      [-2.53, -44.3],
      [-2.55, -44.2],
      [-2.65, -44.25],
    ],
    cor: "blue",
  },
  {
    nome: "Zona de Alto-Mar - Raposa",
    coordenadas: [
      [-2.45, -43.95],
      [-2.55, -43.85],
      [-2.65, -43.9],
    ],
    cor: "green",
  },
  {
    nome: "Zona Interior - Baixada Maranhense",
    coordenadas: [
      [-3.25, -45.1],
      [-3.3, -45.0],
      [-3.35, -45.15],
    ],
    cor: "orange",
  },
]

export default function MapaPescaClient() {
  return (
    <div className="w-full h-40 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
      <MapContainer
        center={center as [number, number]}
        zoom={6}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          {...({
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
          } as any)}
        />

        {zonasPesca.map((zona, i) => (
          <Polygon
            key={i}
            pathOptions={{ color: zona.cor, fillOpacity: 0.3 }}
            positions={zona.coordenadas as LatLngExpression[]}
          >
            <Popup>
              <strong>{zona.nome}</strong>
              <p>Área com alta atividade de pesca.</p>
            </Popup>
          </Polygon>
        ))}

        <Marker position={center}>
          <Popup>Maranhão — Zonas de Pesca</Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
