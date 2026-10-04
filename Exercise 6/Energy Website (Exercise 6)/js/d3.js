// Exercise 4.3

const svg = d3.select("#e2 .responsive-svg-container").append("svg").attr("viewBox", "0 0 1200 1600").style("border", "1px solid black");
svg.append("rect").attr("x", 10).attr("y", 10).attr("width", 414).attr("height", 16).attr("fill", "blue");


// Exercise 4.4
const logData = (data) => {
    console.log(data);
    console.log(data.length);
    console.log(d3.max(data, d => d.count));
    console.log(d3.min(data, d => d.count));
    console.log(d3.extent(data, d => d.count));

    console.log(data.sort((a, b) => b.count - a.count));

    for (let y of data) {
        d3.select("#e3 .responsive-svg-container").append("p").text(`Brand: ${y.brand} - Count: ${y.count}`);
    }
}

d3.csv("./data/newDataTV.csv", d => ({ brand: d.brand, count: +d.count })).then(logData);


// Exercise 4.5
const createBarChartOld = data => {
    const svg = d3.select("#e4 .responsive-svg-container").append("svg").attr("viewBox", "0 0 1200 1600").style("border", "1px solid black");
    svg.selectAll("rect").data(data).join("rect")
        .attr("class", d => {
            console.log(d);
            return `bar bar-${d.count}`;
        })
        .attr("width", d => d.count)
        .attr("height", 20)
        .attr("x", 20)
        .attr("y", (d, i) => i*20 + (i + 5)*5);
}

d3.csv("./data/newDataTV.csv", d => ({ brand: d.brand, count: +d.count })).then(d => createBarChartOld(d.sort((a, b) => b.count - a.count)));


// Exercise 4.6 and 4.7
const createBarChart = data => {
    const width = 500;
    const height = 1600;
    const xScale = d3.scaleLinear()
        .domain([0, Math.max(...data.map(d => d.count))])
        .range([0, width - 120]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, height])
        .padding(0.1);
        
    const svg = d3.select("#e5 .responsive-svg-container").append("svg").attr("viewBox", `0 0 ${width} ${height}`).style("border", "1px solid black");
    const barAndLabel = svg.selectAll("g").data(data).join("g").attr("transform", d => `translate(0, ${yScale(d.brand)})`);
    
    barAndLabel.append("rect")
        .attr("class", d => {
            console.log(d);
            return `bar bar-${d.count}`;
        })
        .attr("fill", "#999242")
        .attr("width", d => xScale(d.count))
        .attr("height", yScale.bandwidth())
        .attr("x", 100)
        .attr("y", 0);

    barAndLabel
        .append("text")
        .text(d => d.brand)
        .attr("x", 95)
        .attr("y", yScale.bandwidth() / 2 + 2.5)
        .attr("text-anchor", "end")
        .style("font-family", "sans-serif")
        .style("font-size", "5px");

    barAndLabel
        .append("text")
        .text(d => d.count)
        .attr("x", d => 100 + xScale(d.count) + 4)
        .attr("y", yScale.bandwidth() / 2 + 2.5)
        .style("font-family", "sans-serif")
        .style("font-size", "5px")
        .style("font-weight", "800");
}

d3.csv("./data/newDataTV.csv", d => ({ brand: d.brand, count: +d.count })).then(d => createBarChart(d.sort((a, b) => b.count - a.count)));