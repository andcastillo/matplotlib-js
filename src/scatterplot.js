
const colorScale = require('./colorScale');

/**
 * Create a scatterplot from the dataframe 
 * @param {object} data 
 * @param {object} params x, y, color, palette, makerStyle, size, xlab, ylab, highlight, over
 * @example scatterplot(data, {x: "Sepal.Length", y: "Sepal.Width", color: "Species", palette: ["red", "green", "blue"]} );
 */
function scatterplot(data, params) {
    let parameters = Object.assign({}, 
        {x: 'x', y: 'y', color: 'z', 
        palette: ['red', 'green', 'blue'], 
        makerStyle: 'circle', size: 3,
        xlab: params.x,
        ylab: params.y
        },
        params);
    
    let tmp = scatterplotxyz(data.map(row => row[parameters.x]), 
            data.map(row => row[parameters.y]),
            data.map(row => row[parameters.color]),
            parameters.makerStyle,
            parameters.size, 
            parameters.palette, parameters.xlab, parameters.ylab);
            

    return tmp;
}


function scatterplotxyz(x, y, z, markerStyle, size, palette, xlab, ylab) {

  if (!palette)
    palette = ['red', 'green', 'blue', 'black', 'cyan', 'magenta', 'yellow' ];

  let unselectedScale = colorScale(z, palette);
  let result = {
    title: 'main plot',
    axis: {"0": {
        "label": xlab,
        "type": "bottom",
        "unit": ""}
    },
    data: [
      {
        x: x,
        y: y,
        type: 'scatter',
        info: Array.from({ length: x.length }, (v, k) => k + 1),
        _highlight: [],
        styles: {
          unselected: new Array(x.length)
        },
        xAxis: "0"
      }
    ]
  };
  
  let unselected = z.map((x, i) => ({
    fill: unselectedScale(x).toString(),
    shape: markerStyle,
    cx: 0,
    cy: 0,
    r: size,
    height: '5px',
    width: '5px',
    stroke: 'transparent'
  }));

  let highlight = z.map((x, i) => ({ _highlight: x }));

  result.data[0].styles.unselected = unselected;
  result.data[0]._highlight = highlight;

  return result;
}

module.exports = {scatterplot}