"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, LatLngBoundsExpression, LatLngExpression } from "leaflet";
import { routeLegs, routeStops } from "@/lib/trip-data";

const stopByNumber = new Map(routeStops.map((stop) => [stop.number, stop]));

async function fetchDrivingLeg(from: LatLngExpression, to: LatLngExpression) {
  const [fromLat, fromLng] = from as [number, number];
  const [toLat, toLng] = to as [number, number];
  const url = `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`OSRM returned ${response.status}`);
  }

  const data = await response.json();
  const coordinates = data.routes?.[0]?.geometry?.coordinates as [number, number][] | undefined;

  if (!coordinates?.length) {
    throw new Error("OSRM response did not include route geometry");
  }

  return coordinates.map(([lng, lat]) => [lat, lng] as [number, number]);
}

export function RouteMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    let disposed = false;

    async function buildMap() {
      if (!containerRef.current || mapRef.current) {
        return;
      }

      const L = await import("leaflet");

      if (disposed || !containerRef.current) {
        return;
      }

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        zoomControl: true
      }).setView([40.85, 19.82], 7);

      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      const bounds: LatLngBoundsExpression = routeStops.map((stop) => stop.coordinates);

      const groupedStops = new Map<string, typeof routeStops>();

      routeStops.forEach((stop) => {
        const key = stop.coordinates.join(",");
        const group = groupedStops.get(key) ?? [];
        group.push(stop);
        groupedStops.set(key, group);
      });

      Array.from(groupedStops.values()).forEach((stopsAtPlace) => {
        const [primaryStop] = stopsAtPlace;
        const isCombinedStop = stopsAtPlace.length > 1;
        const markerLabel = stopsAtPlace.map((stop) => stop.number).join(" / ");
        const popupContent = stopsAtPlace
          .map((stop) => `<strong>${stop.number}. ${stop.name}</strong><br>${stop.date}<br>${stop.note}`)
          .join("<hr>");

        const marker = L.marker(primaryStop.coordinates, {
          icon: L.divIcon({
            className: isCombinedStop ? "numberedMarker combinedMarker" : "numberedMarker",
            html: `<span>${markerLabel}</span>`,
            iconAnchor: isCombinedStop ? [26, 16] : [16, 16],
            iconSize: isCombinedStop ? [52, 32] : [32, 32]
          })
        }).addTo(map);

        marker.bindPopup(popupContent);
      });

      const fallbackDriveLine = routeStops
        .filter((stop) => stop.number !== 6)
        .map((stop) => stop.coordinates);

      try {
        const driveLines = await Promise.all(
          routeLegs
            .filter((leg) => leg.mode === "drive")
            .map((leg) => {
              const from = stopByNumber.get(leg.from);
              const to = stopByNumber.get(leg.to);

              if (!from || !to) {
                throw new Error("Missing route stop");
              }

              return fetchDrivingLeg(from.coordinates, to.coordinates);
            })
        );

        driveLines.forEach((line) => {
          L.polyline(line, {
            color: "#b65f45",
            opacity: 0.9,
            weight: 5
          }).addTo(map);
        });
      } catch {
        L.polyline(fallbackDriveLine, {
          color: "#b65f45",
          opacity: 0.9,
          weight: 5
        }).addTo(map);
      }

      const sarande = stopByNumber.get(5);
      const corfu = stopByNumber.get(6);

      if (sarande && corfu) {
        L.polyline([sarande.coordinates, corfu.coordinates], {
          color: "#397c8b",
          dashArray: "8 8",
          opacity: 0.95,
          weight: 4
        }).addTo(map);
      }

      map.fitBounds(bounds, { padding: [28, 28] });
    }

    buildMap();

    return () => {
      disposed = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} className="realRouteMap" aria-label="Albania trip route map" />;
}
