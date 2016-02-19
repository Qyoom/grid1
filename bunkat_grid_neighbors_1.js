/**
*   grid                  Setup a search space grid: 
*                         Configurable number of rows and columns
*   @param anchorElement  div id tag starting with #
*   @param numRows        Number of rows in grid
*   @param numCols        Number of columns in grid
*   @param cellSize       Size of cell in pixels
*/
function grid()
{
    var marginHoriz = 40;
    var marginVert = 40;
    var width = numCols * cellSize;
    var height = numRows * cellSize;

    var gridData = cellData();

    // TODO: NIX Diagnostics
    console.log("gridData num rows: " + gridData.length);
    console.log("gridData num cols: " + gridData[1].length);
    //console.log("gridData: " + JSON.stringify(gridData));
    _.each(gridData, function(row) {
        _.each(row, function(cell) {
            console.log("grid TOP, cell: " + JSON.stringify(cell));
        });
    });
    
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
        .attr("id", function(d) { return d.id; })
        .attr("class", "cell")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .on('mouseover', function(d) {
            d3.select(this)
                .style('fill', '#0F0');

            var neybs = neighbors(d);
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

/**
 *   cellData()        returns an two dimensional array of rows and columns
 */
function cellData()
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
    for (var row = 0; row < numRows; row++)
    {
        // Row array
        data.push(new Array());

        // Column iterator
        for (var col = 0; col < numCols; col++)
        {
            // TODO: What is the use of value? Make it uniform? Put it to some good use?
            //newValue = Math.round(Math.random() * (100 - 1) + 1);
            var newValue = -1;

            // Columnar cell data
            data[row].push({
              id: 'c' + count,
              index: [row, col],
              value: newValue,
              width: cellSize,
              height: cellSize,
              x: xPos,
              y: yPos
            });

            xPos += stepX;
            count += 1;
        }
        xPos = startX;
        yPos += stepY;
    }
    return data;
}

// Including diagonals
// Assuming svg origin [0,0] as upper left.
var directions = [
    [0, 1],   // south
    [1, 1],   // south-east
    [1, 0],   // east
    [1, -1],  // north-east
    [-1, 0],  // north
    [-1, -1], // north-west
    [0, -1],  // west
    [-1, 1]   // south-west
];

function neighbors(cell) {
    console.log("==> neighbors, cell: " + JSON.stringify(cell));
    //console.log("cell.index: " + JSON.stringify(cell.index));

    var result = [];

    _.each(directions, function(dir) {
        var neighbor = [
            cell.index[0] + dir[0], // x
            cell.index[1] + dir[1]  // y
        ];

        if(nodesContains(neighbor)) {
            console.log("<1>neighbor: " + JSON.stringify(neighbor));
            var rows = d3.selectAll(".row");
            console.log("~~> neighbors, rows: " + rows);
            var neybRow = rows.filter(function(d, i) {
                console.log("~~> d: " + JSON.stringify(d));
                //d.index[0] == neighbor[0];
            });
            console.log("~~> neybRow: " + neybRow);
            result.push(neighbor);
        }
    });

    return result;
}

function nodesContains(neighbor) {
    console.log("--> nodesContains, neighbor: " + neighbor);
    console.log(neighbor[0] < 0);
    console.log(numCols <= neighbor[0]);
    console.log(neighbor[1] < 0);
    console.log(numRows <= neighbor[1]);

    result = true;
    // test on range
    if(
        neighbor[0] < 0 || numRows <= neighbor[0] ||
        neighbor[1] < 0 || numCols <= neighbor[1]
    ) result = false;

    if(!result) console.log("<2>nodesContains " + neighbor + " " + result);
    return result;
}

var anchorElement = '#grid';
var numCols = 10;
var numRows = 5;
var cellSize = 25;

// Starts here
grid();



