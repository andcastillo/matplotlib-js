const chroma = require('chroma-js');

/**
 * Creates a color scale for a set of values 
 * @param {array} z 
 * @param {array} palette of colors
 * @returns {function} returns a map function between the active domain of z and the linear degradation of the palette colors
 * @example colorScale([1, 1, 3, 2, 2], ['red', 'green', 'blue']); 
 */
function colorScale(z, palette) {
    if (typeof z[0] === 'number') {
        let lng = z.length;
        let min = z[0];
        let max = z[0];
        
        for (let i = 1; i < lng; i++) {
            if (z[i] > max) 
                max = z[i];
            if (z[i] < min)
                min = z[i];
        }

        return chroma.scale(palette).domain([min, max]).mode('hsl');
    } else if (typeof z[0] === 'string'){
        let distinct = [... new Set(z)];
        let map = {};
        for (let i = 0; i < distinct.length; i++) {
            map[distinct[i]] = palette[i];
        }
        
        return (value)  => map[value];
    }
}

module.exports = colorScale;