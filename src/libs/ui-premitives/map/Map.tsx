import { useEffect, useRef } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L, { Marker as MarkerLayer } from 'leaflet'
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch'
import { useMap } from 'react-leaflet'
import 'leaflet-geosearch/dist/geosearch.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'
import { MapProps } from './Map.types'

const Map = ({ position, popupText, dragging = true, onPositionChanged }: MapProps) => {
  const markerRef = useRef<MarkerLayer | null>(null)

  const InitateMap = () => {
    const map = useMap()

    useEffect(() => {
      if (position) {
        map.setView(position, 15)
      }
    }, [])

    return null
  }

  const LeafletgeoSearch = () => {
    const map = useMap()

    useEffect(() => {
      map.invalidateSize()
    }, [map])

    useEffect(() => {
      const provider = new OpenStreetMapProvider()

      const searchControl = GeoSearchControl({
        provider,
        style: 'bar',
        notFoundMessage: 'نتیجه ای یافت نشد.',
        marker: {
          icon: new L.Icon.Default(),
          draggable: true,
        },
        popupFormat: ({ query, result }: { query: string; result: { label: string } }) => result.label,
        resultFormat: ({ result }: { result: { label: string } }) => result.label,
        maxMarkers: 1,
        retainZoomLevel: false,
        animateZoom: true,
        autoClose: false,
        searchLabel: 'جستوجو کنید',
        keepResult: false,
        updateMap: true,
      }).addTo(map)

      map.on('geosearch/showlocation', (e) => {
        const event = e as unknown as { location: { x: number; y: number } }
        onPositionChanged && onPositionChanged([event.location.y, event.location.x])
      })

      map.on('geosearch/marker/dragend', (e) => {
        const event = e as unknown as { location: { lat: number; lng: number } }
        onPositionChanged && onPositionChanged([event.location.lat, event.location.lng])
      })

      map.addControl(searchControl)

      return () => {
        map.removeControl(searchControl)
      }
    }, [])

    return null
  }

  const eventHandlers = () => {
    const marker = markerRef.current
    if (marker != null) {
      const { lat, lng } = marker.getLatLng()
      onPositionChanged && onPositionChanged([lat, lng])
    }
  }

  return (
    <MapContainer markerZoomAnimation={true} center={position} zoom={15} scrollWheelZoom={dragging} dragging={dragging}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiaGF3amhvM2VpbiIsImEiOiJjbDIxZzA0bmMxNTU0M2ltdGwybXNjMG1tIn0.UqL8JacAnkRK7hHESGc1dg`}
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
      />
      <Marker ref={markerRef} position={position} eventHandlers={{ dragend: eventHandlers }} draggable={dragging}>
        {popupText && <Popup>{popupText}</Popup>}
      </Marker>
      <InitateMap />

      {dragging && <LeafletgeoSearch />}
    </MapContainer>
  )
}

export default Map
