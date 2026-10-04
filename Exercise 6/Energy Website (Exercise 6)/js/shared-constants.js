const margin = { top: 60, right: 40, bottom: 60, left: 60 };
const width = 800;  
const height = 450;    
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const barColor = "teal";

let innerChartS;
let histogramGroup;

const tooltipWidth = 65;
const tooltipHeight = 32;

const binGenerator = d3.bin() 
    .value(d => d.energyConsumption);

const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false },
]