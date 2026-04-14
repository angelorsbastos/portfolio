import { useRef, useState, useEffect, useMemo } from "react";
import { useLang } from "@/lib/LanguageContext";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { Map, MapMarker, MapRoute, MarkerContent, MarkerLabel } from "@/components/ui/map";

const JourneySection = () => {
  const { t } = useLang();
  const containerRef = useRef<HTMLDivElement>(null);
  const rawProgress = useScrollProgress(containerRef);
  
  // Custom timing: Start at 15%, End at 85% of section scroll
  const progress = useMemo(() => {
    const start = 0.15;
    const end = 0.85;
    if (rawProgress < start) return 0;
    if (rawProgress > end) return 1;
    return (rawProgress - start) / (end - start);
  }, [rawProgress]);

  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);

  const LISBON: [number, number] = [-9.1393, 38.7223];
  const LEIDEN: [number, number] = [4.4909, 52.1601];

  // Stealth Map Style Definition
  const stealthStyle = useMemo(() => ({
    version: 8,
    sources: {
      land: {
        type: "geojson",
        data: "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_land.geojson",
      },
    },
    layers: [
      {
        id: "background",
        type: "background",
        paint: { "background-color": "#000000" },
      },
      {
        id: "land-fill",
        type: "fill",
        source: "land",
        paint: {
          "fill-color": "#1a1a1a",
          "fill-opacity": 1,
        },
      },
      {
        id: "land-border",
        type: "line",
        source: "land",
        paint: {
          "line-color": "#333333",
          "line-width": 0.5,
        },
      },
    ],
  }), []);

  useEffect(() => {
    async function fetchRoute() {
      try {
        const response = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${LISBON[0]},${LISBON[1]};${LEIDEN[0]},${LEIDEN[1]}?overview=full&geometries=geojson`
        );
        const data = await response.json();
        if (data.routes?.[0]?.geometry?.coordinates) {
          setRouteCoords(data.routes[0].geometry.coordinates);
        }
      } catch (error) {
        console.error("Failed to fetch journey route:", error);
      }
    }
    fetchRoute();
  }, []);

  const currentPos = useMemo(() => {
    if (routeCoords.length === 0) return LISBON;
    const index = Math.floor(progress * (routeCoords.length - 1));
    return routeCoords[index];
  }, [routeCoords, progress]);

  const completedRoute = useMemo(() => {
    if (routeCoords.length === 0) return [];
    const index = Math.floor(progress * (routeCoords.length - 1));
    return routeCoords.slice(0, index + 1);
  }, [routeCoords, progress]);

  // Stable style object for the map to prevent redundant setStyle calls
  const mapStyles = useMemo(() => ({
    dark: stealthStyle as any,
    light: stealthStyle as any
  }), [stealthStyle]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Immersive Background Map */}
        <div className="absolute inset-0 z-0">
          <Map 
            center={[-2.32, 45.44]} 
            zoom={4} 
            interactive={false}
            styles={mapStyles}
          >
            {/* Future Route Path (Ghostly) */}
            {routeCoords.length > 0 && (
              <MapRoute 
                coordinates={routeCoords} 
                color="#00E676" 
                width={1} 
                opacity={0.05} 
              />
            )}

            {/* Traveled Glow Path (The neon green track) */}
            {completedRoute.length > 1 && (
              <>
                {/* Glow layer */}
                <MapRoute 
                  coordinates={completedRoute} 
                  color="#00E676" 
                  width={8} 
                  opacity={0.3} 
                />
                {/* Core layer */}
                <MapRoute 
                  coordinates={completedRoute} 
                  color="#00E676" 
                  width={3} 
                  opacity={1} 
                />
              </>
            )}

            {/* Lisbon Marker */}
            <MapMarker longitude={LISBON[0]} latitude={LISBON[1]}>
              <MarkerContent>
                <div className="size-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,230,118,0.8)]" />
                <MarkerLabel position="bottom" className="text-muted-foreground/50 text-[8px] uppercase tracking-tighter">Lisbon</MarkerLabel>
              </MarkerContent>
            </MapMarker>

            {/* Leiden Marker */}
            <MapMarker longitude={LEIDEN[0]} latitude={LEIDEN[1]}>
              <MarkerContent>
                <div className={`size-2 rounded-full ${progress > 0.99 ? 'bg-primary animate-ping' : 'bg-muted-foreground/30'}`} />
                <MarkerLabel position="top" className={`text-[8px] uppercase tracking-tighter ${progress > 0.99 ? 'text-primary' : 'text-muted-foreground/30'}`}>Leiden</MarkerLabel>
              </MarkerContent>
            </MapMarker>

            {/* The Traveler (Moving Neon Point) */}
            {progress > 0 && progress < 1 && (
              <MapMarker longitude={currentPos[0]} latitude={currentPos[1]}>
                <MarkerContent>
                  <div className="relative flex items-center justify-center">
                    <div className="absolute size-8 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <div className="size-4 rounded-full bg-primary shadow-[0_0_20px_rgba(0,230,118,1)] flex items-center justify-center border-2 border-white">
                      <div className="size-1 rounded-full bg-white" />
                    </div>
                  </div>
                </MarkerContent>
              </MapMarker>
            )}
          </Map>
        </div>

        {/* Content Overlays */}
        <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-between p-12">
          <div 
            className="text-center mt-8 transition-all duration-700"
            style={{ 
              opacity: rawProgress < 0.2 ? 1 : 0,
              transform: `translateY(${rawProgress < 0.2 ? 0 : -20}px)`,
              visibility: rawProgress < 0.3 ? 'visible' : 'hidden'
            }}
          >
            <h2 className="font-display text-4xl md:text-7xl font-bold mb-4 tracking-tighter text-white drop-shadow-2xl">
              {t.lang === 'pt' ? 'De Lisboa para Leiden' : 'From Lisbon to Leiden'}
            </h2>
            <div className="h-px w-24 bg-primary mx-auto mb-4" />
          </div>

          {/* Dynamic Story Cards */}
          <div className="flex justify-between items-end w-full max-w-7xl mx-auto mb-12">
            {/* Lisbon Card */}
            <div 
              className="max-w-[280px] bg-black/60 backdrop-blur-2xl border border-white/5 p-6 rounded-3xl transition-all duration-1000 shadow-2xl"
              style={{ 
                opacity: (rawProgress < 0.4 && rawProgress > 0.05) ? 1 : 0, 
                transform: `translateY(${(rawProgress < 0.4) ? 0 : 50}px)` 
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,230,118,0.8)]" />
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest">The Foundation</span>
              </div>
              <h4 className="font-display font-bold text-lg text-white leading-tight mb-2">BSc Information Technology</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t.lang === 'pt' 
                  ? 'Faculdade de Ciências da Universidade de Lisboa. Onde tudo começou: algoritmos, bases de dados e a paixão pela tecnologia.' 
                  : 'Faculty of Sciences, University of Lisbon. Where it all began: algorithms, databases, and the passion for technology.'}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground mt-4 opacity-50">2020 — 2025</p>
            </div>

            {/* Leiden Card */}
            <div 
              className="max-w-[280px] bg-black/60 backdrop-blur-2xl border border-white/5 p-6 rounded-3xl transition-all duration-1000 shadow-2xl text-right"
              style={{ 
                opacity: rawProgress > 0.7 ? 1 : 0, 
                transform: `translateY(${rawProgress > 0.7 ? 0 : 50}px)` 
              }}
            >
              <div className="flex items-center gap-3 mb-3 justify-end">
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest">The Specialization</span>
                <div className="size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,230,118,0.8)] animate-pulse" />
              </div>
              <h4 className="font-display font-bold text-lg text-white leading-tight mb-2">MSc Computer Science: AI</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t.lang === 'pt' 
                  ? 'Leiden University. Explorando as fronteiras da Inteligência Artificial em um dos centros de ciência mais prestigiados da Europa.' 
                  : 'Leiden University. Exploring the frontiers of Artificial Intelligence at one of Europe\'s most prestigious science centers.'}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground mt-4 opacity-50">2025 — 2027</p>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Bar at bottom */}
        <div className="absolute bottom-10 inset-x-12 z-20 flex items-center gap-6 opacity-30">
          <span className="font-mono text-[10px] text-white whitespace-nowrap tracking-tighter uppercase">Journey Progress</span>
          <div className="h-[2px] flex-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300 ease-out" 
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="font-mono text-[10px] text-white w-8">{Math.round(progress * 100)}%</span>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
