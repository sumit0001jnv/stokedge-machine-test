let width = 600
    height = 450
    margin = 40

let radius = Math.min(width, height) / 2 - margin

let svg = d3.select("#pie-chart")
  .append("svg")
    .attr("width", width)
    .attr("height", height);
    let chart=svg
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


let dataJSON = [
  {name: "USA", value: 60},
{name: "UK", value: 20}, 
{name: "Canada", value: 30}, 
{name: "Maxico", value: 15}
,{name: "Japan", value: 10} 
];

let color = d3.scaleOrdinal()
  .domain(dataJSON.map(d=>d.name))
  .range(d3.schemeDark2);

function update(data) {
  const pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { return d3.ascending(a.value, b.value);} );
  const data_ready = pie(data);

  const u = chart.selectAll("path")
    .data(data_ready)

  u
    .enter()
    .append('path')
    .merge(u)
    .transition()
    .duration(1000)
    .attr('d', d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    )
    .attr('fill', function(d){ return(color(d.data.value)) })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1);

  u
    .exit()
    .remove()

    const labelHeight=10;
    const legend = svg
    .append('g')
    .attr('transform', `translate(${width/ 2+radius + 20},${height/2-labelHeight*3})`);

    legend
    .selectAll(null)
    .data(data)
    .enter()
    .append('rect')
    .attr('y', (d,index) => labelHeight*index * 1.8)
    .attr('width', labelHeight)
    .attr('height', labelHeight)
    .attr('fill', d => color(d.value))
    .attr('stroke', 'grey')
    .style('stroke-width', '1px');

  legend
    .selectAll(null)
    .data(data)
    .enter()
    .append('text')
    .text(d =>`${d.name}(${d.value})`)
    .attr('x', labelHeight * 1.2)
    .attr('y', (d,index) => labelHeight * index * 1.8 + labelHeight)
    .style('font-family', 'sans-serif')
    .style('font-size', `${labelHeight}px`);

}

update(dataJSON)