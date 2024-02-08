import { onMount } from "solid-js";
import * as d3 from "d3";
import worldData from "../lib/world.json";

const Globe = () => {
  let mapContainer;

  const visitedCountries = [
    "Germany", "Netherlands", "Finland", "Norway", "Sweden",
    "Latvia", "Estonia", "Cuba", "Panama", "Spain",
    "Italy", "Russia", "Greece", "Turkey", "Vatican",
    "Austria", "Poland", "England", "Hungary",
];

onMount(() => {
  if (!mapContainer) return;

  const width = mapContainer.clientWidth;
  const height = 500;
  const rotationSpeed = 0.1; // Increase this value to make the globe rotate faster

  let projection = d3
    .geoOrthographic()
    .scale(250)
    .center([0, 0])
    .rotate([300, -50])
    .translate([width / 2, height / 2]);

  const initialScale = projection.scale();
  let pathGenerator = d3.geoPath().projection(projection);

  let svg = d3
    .select(mapContainer)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  svg
    .append("circle")
    .attr("fill", "#222") // Darker color for the ocean
    .attr("stroke", "#000")
    .attr("stroke-width", "0.2")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", initialScale);

  let map = svg.append("g");

  map
    .selectAll("path")
    .data(worldData.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator)
    .attr("fill", d => visitedCountries.includes(d.properties.name) ? "#45CE8A" : "#333") // Orange color for visited countries
    .style("stroke", "black")
    .style("stroke-width", 0.2);

  // Optimize the timer function
  let lastTime = Date.now();

d3.timer(() => {
  const now = Date.now();
  const deltaTime = now - lastTime;

  // Check if enough time has passed since the last invocation
  if (deltaTime > intervalTime) {
    const rotate = projection.rotate();
    projection.rotate([rotate[0] + rotationSpeed, rotate[1]]);
    svg.selectAll("path").attr("d", pathGenerator);

    lastTime = now; // Reset the last time
  }
});

const intervalTime = 24; // in milliseconds, adjust this for slower or faster rotation

  // You can also control the timer's frequency by setting a longer duration
  // between invocations, which can help with performance.
});


  return (
    <div class="flex flex-col text-white justify-center items-center w-full h-full">
      <div class="w-full" ref={el => { mapContainer = el; }}></div>
    </div>
  );
};

export default Globe;
