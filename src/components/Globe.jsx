import { onMount, createEffect } from 'solid-js';
import * as d3 from 'd3';
import worldData from '../lib/world.json';

const Globe = () => {
  let mapContainer;

  const visitedCountries = [
    "Germany", "Netherlands", "Finland", "Norway", "Sweden",
    "Latvia", "Estonia", "Cuba", "Panama", "Spain",
    "Italy", "Russia", "Greece", "Turkey", "Vatican",
    "Austria", "Poland", "England", "Hungary",
  ];

  const updateGlobeColors = () => {
    const isDarkTheme = document.documentElement.classList.contains('dark');
    const oceanColor = isDarkTheme ? '#222' : '#5089b4';
    const landColor = isDarkTheme ? '#303030' : '#c2c2c2';
    const visitedCountryColor = isDarkTheme ? '#45CE8A' : '#45CE8A';
    const strokeColor = isDarkTheme ? '#525252' : '#737373';

    const svg = d3.select(mapContainer).select("svg");
    svg.selectAll("circle").attr("fill", oceanColor);
    svg.selectAll("path")
       .attr("fill", d => visitedCountries.includes(d.properties.name) ? visitedCountryColor : landColor)
       .style("stroke", strokeColor); 
  };

  onMount(() => {
    const width = mapContainer.clientWidth;
    const height = 500;
    const rotationSpeed = 0.1;
    const intervalTime = 24;
    let lastTime = Date.now();

    let projection = d3.geoOrthographic()
      .scale(250)
      .center([0, 0])
      .rotate([300, -50])
      .translate([width / 2, height / 2]);

    let pathGenerator = d3.geoPath().projection(projection);

    let svg = d3.select(mapContainer)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg.append("circle")
      .attr("cx", width / 2)
      .attr("cy", height / 2)
      .attr("r", projection.scale())
      .attr("stroke", "#000")
      .attr("stroke-width", "0");

    let map = svg.append("g");
    map.selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("d", pathGenerator)
      .style("stroke-width", 0.5);

    updateGlobeColors();

    const themeChangeListener = () => {
      updateGlobeColors();
    };
    document.addEventListener('theme-change', themeChangeListener);

    d3.timer(() => {
      const now = Date.now();
      const deltaTime = now - lastTime;

      if (deltaTime > intervalTime) {
        const rotate = projection.rotate();
        projection.rotate([rotate[0] + rotationSpeed, rotate[1]]);
        svg.selectAll("path").attr("d", pathGenerator);

        lastTime = now;
      }
    });

    // Cleanup routine
    return () => {
      document.removeEventListener('theme-change', themeChangeListener);
    };
  });

  // Effect to update globe colors when the theme changes
  createEffect(updateGlobeColors);

  return (
    <div class="flex flex-col text-white justify-center items-center w-full h-full">
      <div class="w-full" ref={el => { mapContainer = el; }}></div>
    </div>
  );
};

export default Globe;
