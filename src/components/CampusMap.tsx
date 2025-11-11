import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface CampusMapProps {
  destination?: { lng: number; lat: number };
  clubName?: string;
}

declare global {
  interface Window {
    mapboxgl: any;
    MapboxDirections: any;
  }
}

const CampusMap = ({ destination, clubName }: CampusMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const directionsRef = useRef<any>(null);
  const originMarkerRef = useRef<any>(null);
  const destinationMarkerRef = useRef<any>(null);
  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!mapboxAccessToken) {
      toast.error('Mapbox access token is missing. Please set VITE_MAPBOX_ACCESS_TOKEN.');
      console.error('Missing Mapbox access token. Set VITE_MAPBOX_ACCESS_TOKEN in your environment.');
      return;
    }

    if (!mapContainer.current) return;

    // Load Mapbox scripts
    const loadMapbox = () => {
      return new Promise<void>((resolve) => {
        if (window.mapboxgl && window.MapboxDirections) {
          resolve();
          return;
        }

        // Load CSS
        const link1 = document.createElement('link');
        link1.rel = 'stylesheet';
        link1.href = 'https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css';
        document.head.appendChild(link1);

        const link2 = document.createElement('link');
        link2.rel = 'stylesheet';
        link2.href = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.css';
        document.head.appendChild(link2);

        // Load JS
        const script1 = document.createElement('script');
        script1.src = 'https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.js';
        script1.onload = () => {
          const script2 = document.createElement('script');
          script2.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.3.1/mapbox-gl-directions.js';
          script2.onload = () => resolve();
          document.head.appendChild(script2);
        };
        document.head.appendChild(script1);
      });
    };

    loadMapbox().then(() => {
      if (!mapContainer.current) return;

      // Configuration
      window.mapboxgl.accessToken = mapboxAccessToken;
      const campusBounds: [[number, number], [number, number]] = [[-118.59044, 34.17956], [-118.57097, 34.18811]];
      // Adjusted center to focus more on southern campus area (Field House, Shepard Stadium, Parking Lot 5)
      const campusCenter: [number, number] = [-118.57689, 34.1825];
      const DEFAULT_ZOOM = 16.5;

      // Initialize map
      const map = new window.mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: campusCenter,
        zoom: DEFAULT_ZOOM,
        maxBounds: campusBounds,
        pitchWithRotate: false,
        dragRotate: false,
        attributionControl: true
      });

      map.addControl(new window.mapboxgl.NavigationControl(), 'bottom-right');
      mapRef.current = map;

      // Initialize directions
      const directions = new window.MapboxDirections({
        accessToken: window.mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/walking',
        controls: { profileSwitcher: false, instructions: true },
        alternatives: true
      });
      map.addControl(directions, 'top-left');
      directionsRef.current = directions;

      // Hide default inputs and adjust panel sizing
      directions.on('load', () => {
        const dirControl = document.querySelector('.mapboxgl-ctrl-directions') as HTMLElement;
        if (dirControl) {
          // Hide default input fields
          const inputs = dirControl.querySelectorAll('.mapbox-directions-component-keyline input');
          inputs.forEach((input: Element) => {
            const parent = input.closest('.mapbox-directions-component-keyline');
            if (parent) (parent as HTMLElement).style.display = 'none';
          });
          
          // Ensure directions panel is scrollable and doesn't get cut off
          dirControl.style.maxHeight = '550px';
          dirControl.style.overflowY = 'auto';
          dirControl.style.overflowX = 'hidden';
        }
      });

      // Helper functions
      const pointInsideBounds = ([lng, lat]: [number, number], [[w, s], [e, n]]: [[number, number], [number, number]]) =>
        lng >= w && lng <= e && lat >= s && lat <= n;

      const createMarker = (lngLat: [number, number], label: string, color: string) => {
        const el = document.createElement('div');
        el.style.width = '32px';
        el.style.height = '32px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = color;
        el.style.border = '3px solid #fff';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
        el.style.display = 'flex';
        el.style.alignItems = 'center';
        el.style.justifyContent = 'center';
        el.style.color = '#fff';
        el.style.fontWeight = 'bold';
        el.style.fontSize = '14px';
        el.textContent = label;
        el.style.cursor = 'grab';

        const marker = new window.mapboxgl.Marker({ draggable: true, element: el })
          .setLngLat(lngLat)
          .addTo(map);

        marker.on('dragend', () => {
          const ll = marker.getLngLat();
          const next: [number, number] = [ll.lng, ll.lat];
          if (!pointInsideBounds(next, campusBounds)) {
            marker.setLngLat(lngLat);
          } else {
            if (label === 'A') {
              directions.setOrigin(next);
            } else {
              directions.setDestination(next);
            }
            maybeFitBoth();
          }
        });

        return marker;
      };

      const maybeFitBoth = () => {
        setTimeout(() => {
          const dest = directions.getDestination?.();
          const orig = directions.getOrigin?.();
          if (!dest || !orig) return;
          const b = new window.mapboxgl.LngLatBounds();
          b.extend(orig.geometry.coordinates);
          b.extend(dest.geometry.coordinates);
          // Increased padding to ensure all content is visible
          map.fitBounds(b, { padding: { top: 100, bottom: 120, left: 100, right: 100 }, maxZoom: 18, duration: 400 });
        }, 100);
      };

      // Set initial origin
      const setOrigin = (lngLat: [number, number]) => {
        directions.setOrigin(lngLat);
        if (!originMarkerRef.current) {
          originMarkerRef.current = createMarker(lngLat, 'A', '#111');
        } else {
          originMarkerRef.current.setLngLat(lngLat);
        }
      };

      // Set destination if provided
      map.on('load', () => {
        setOrigin(campusCenter);
        
        // Adjust initial view to show more of the southern campus area
        map.setCenter([-118.57689, 34.1825]);
        map.setZoom(16.5);
        
        if (destination) {
          const destLngLat: [number, number] = [destination.lng, destination.lat];
          if (pointInsideBounds(destLngLat, campusBounds)) {
            directions.setDestination(destLngLat);
            destinationMarkerRef.current = createMarker(destLngLat, 'B', '#dc2626');
            maybeFitBoth();
          } else {
            // If no destination, ensure we're showing the southern area
            map.setCenter([-118.57689, 34.1825]);
            map.setZoom(16.5);
          }
        } else {
          // If no destination, focus on southern campus area
          map.setCenter([-118.57689, 34.1825]);
          map.setZoom(16.5);
        }
      });

      // Cleanup
      return () => {
        if (originMarkerRef.current) originMarkerRef.current.remove();
        if (destinationMarkerRef.current) destinationMarkerRef.current.remove();
        if (mapRef.current) mapRef.current.remove();
      };
    });
  }, [destination, mapboxAccessToken]);

  const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
          toast.error('Geolocation not supported');
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const here: [number, number] = [pos.coords.longitude, pos.coords.latitude];
            const campusBounds: [[number, number], [number, number]] = [[-118.59044, 34.17956], [-118.57097, 34.18811]];
            const pointInsideBounds = ([lng, lat]: [number, number], [[w, s], [e, n]]: [[number, number], [number, number]]) =>
              lng >= w && lng <= e && lat >= s && lat <= n;
            
            if (pointInsideBounds(here, campusBounds) && directionsRef.current && originMarkerRef.current) {
              directionsRef.current.setOrigin(here);
              originMarkerRef.current.setLngLat(here);
              if (mapRef.current) {
                mapRef.current.setCenter(here);
                mapRef.current.setZoom(16.5);
              }
            } else if (directionsRef.current && originMarkerRef.current) {
              const campusCenter: [number, number] = [-118.57689, 34.1825];
              directionsRef.current.setOrigin(campusCenter);
              originMarkerRef.current.setLngLat(campusCenter);
              if (mapRef.current) {
                mapRef.current.setCenter(campusCenter);
                mapRef.current.setZoom(16.5);
              }
            }
          },
          () => {
            toast.error('Location access denied');
          }
        );
      };

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Campus Directions</h3>
        <button
          onClick={handleUseMyLocation}
          className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition"
        >
          Use My Location
        </button>
      </div>
      <div 
        ref={mapContainer} 
        className="w-full rounded-lg overflow-hidden border border-border"
        style={{ minHeight: '600px', height: '600px' }}
      />
    </div>
  );
};

export default CampusMap;

