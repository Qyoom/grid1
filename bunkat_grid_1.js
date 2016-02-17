/**
*   calendarWeekHour    Setup a week-hour grid: 
*                           7 Rows (days), 24 Columns (hours)
*   @param anchorElement           div id tag starting with #
*   @param width        width of the grid in pixels
*   @param height       height of the grid in pixels
*   @param square       true/false if you want the height to 
*                           match the (calculated first) width
*/
function calendarWeekHour(anchorElement, width, height, isSquare)
{
    var calData = randomData(width, height, isSquare);
    console.log("calData: " + JSON.stringify(calData));

    var marginRight = 40;
    
    var grid = d3.select(anchorElement).append("svg")
                    .attr("width", width + marginRight)
                    .attr("height", height)
                    .attr("class", "chart");

    var row = grid.selectAll(".row")
                  .data(calData)
                .enter().append("svg:g")
                  .attr("class", "row");

    var col = row.selectAll(".cell")
                 .data(function (d) { return d; })
                .enter().append("svg:rect")
                 .attr("class", "cell")
                 .attr("x", function(d) { return d.x; })
                 .attr("y", function(d) { return d.y; })
                 .attr("width", function(d) { return d.width; })
                 .attr("height", function(d) { return d.height; })
                 .on('mouseover', function() {
                    d3.select(this)
                        .style('fill', '#0F0');
                 })
                 .on('mouseout', function() {
                    d3.select(this)
                        .style('fill', '#FFF');
                 })
                 .on('click', function() {
                    console.log(d3.select(this));
                 })
                 .style("fill", '#FFF')
                 .style("stroke", '#555');
}

////////////////////////////////////////////////////////////////////////

/**
*   randomData()        returns an array: [
                                            [{anchorElement:value, ...}],
                                            [{anchorElement:value, ...}],
                                            [...],...,
                                            ];
                        ~ [
                            [hour1, hour2, hour3, ...],
                            [hour1, hour2, hour3, ...]
                          ]

*/
function randomData(gridWidth, gridHeight, isSquare)
{
    var data = new Array();
    var gridItemWidth = gridWidth / 24;
    var gridItemHeight = (isSquare) ? gridItemWidth : gridHeight / 7;
    var startX = gridItemWidth / 2;
    var startY = gridItemHeight / 2;
    var stepX = gridItemWidth;
    var stepY = gridItemHeight;
    var xpos = startX;
    var ypos = startY;
    var newValue = 0;
    var count = 0;

    for (var index_a = 0; index_a < 7; index_a++)
    {
        data.push(new Array());
        for (var index_b = 0; index_b < 24; index_b++)
        {
            newValue = Math.round(Math.random() * (100 - 1) + 1);
            data[index_a].push({
              time: index_b, 
              value: newValue,
              width: gridItemWidth,
              height: gridItemHeight,
              x: xpos,
              y: ypos,
              count: count
            });
            xpos += stepX;
            count += 1;
        }
        xpos = startX;
        ypos += stepY;
    }
    return data;
}



