/**
*   grid                  Setup a search space grid: 
*                         Configurable number of rows and columns
*   @param anchorElement  div id tag starting with #
*   @param numRows        Number of rows in grid
*   @param numCols        Number of columns in grid
*   @param cellSize       Size of cell in pixels
*/
function grid(anchorElement, numCols, numRows, cellSize)
{
    var marginHoriz = 40;
    var marginVert = 40;
    var width = numCols * cellSize;
    var height = numRows * cellSize;

    var gridData = cellData(numCols, numRows, cellSize);
    console.log("gridData: " + JSON.stringify(gridData));
    
    var grid = d3.select(anchorElement).append("svg")
        .attr("width", width + marginHoriz)
        .attr("height", height + marginVert)
        .attr("class", "grid");

    var row = grid.selectAll(".row")
        .data(gridData)
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
 *   randomData()        returns an array: []
 *
 */
function cellData(numCols, numRows, cellSize)
{
    var data = new Array();

    var startX = cellSize / 2;
    var startY = cellSize / 2;
    var stepX = cellSize;
    var stepY = cellSize;
    var xPos = startX;
    var yPos = startY;
    var newValue = 0;
    var count = 0;

    // Row iterator
    for (var index_a = 0; index_a < numRows; index_a++)
    {
        // Row array
        data.push(new Array());

        // Column iterator
        for (var index_b = 0; index_b < numCols; index_b++)
        {
            // TODO: What is the use of value? Make it uniform? Put it to some good use?
            newValue = Math.round(Math.random() * (100 - 1) + 1);

            // Columnar cell data
            data[index_a].push({
              id: index_b, 
              value: newValue,
              width: cellSize,
              height: cellSize,
              x: xPos,
              y: yPos,
              count: count // TODO: Same as id
            });

            xPos += stepX;
            count += 1;
        }
        xPos = startX;
        yPos += stepY;
    }
    return data;
}

// Starts here
grid('#grid', 40, 20, 25);



