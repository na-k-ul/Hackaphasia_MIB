import Feature from "ol/Feature.js";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { Circle } from "ol/geom.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Style } from "ol/style.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";

const circleFeature = new Feature({
  geometry: new Circle([12127398.797692968, 4063894.123105166], 50),
});

circleFeature.setStyle(
  new Style({
    renderer(coordinates, state) {
      const [[x, y], [x1, y1]] = coordinates;
      const ctx = state.context;
      const dx = x1 - x;
      const dy = y1 - y;
      const radius = Math.sqrt(dx * dx + dy * dy);

      const innerRadius = 0;
      const outerRadius = radius;

      const gradient = ctx.createRadialGradient(
        x,
        y,
        innerRadius,
        x,
        y,
        outerRadius
      );
      gradient.addColorStop(0, "rgba(255,0,0,0)");
      gradient.addColorStop(0.6, "rgba(255,0,0,0.2)");
      gradient.addColorStop(1, "rgba(255,0,0,0.8)");
      ctx.beginPath();
      ctx.arc(x, y, radius * 5000, 0, 2 * Math.PI, true);
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
      ctx.strokeStyle = "rgba(255,0,0,1)";
      ctx.stroke();
    },
  })
);

new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
      visible: true,
    }),
    new VectorLayer({
      source: new VectorSource({
        features: [circleFeature],
      }),
    }),
  ],
  target: "map",
  view: new View({
    center: [12127398.797692968, 4063894.123105166],
    zoom: 1,
  }),
});

// Send data to the backend
document.getElementById("sendData").addEventListener("click", async () => {
  const searchInput = document.getElementById("searchInput").value; 
  
  const response = await fetch("/process", {
    method: "POST",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    
    body: new URLSearchParams({ location: searchInput }),
  });
  const result = await response.json();
  console.log(result); // Log response from backend
});
