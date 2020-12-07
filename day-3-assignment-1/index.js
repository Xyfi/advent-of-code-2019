const filePath = require( "path" ).resolve( __dirname, "input.txt" )
const lineReader = require( "../helpers/lineReaderGenerator" )( filePath );

class Line {
    constructor( { x1, y1, x2, y2 } ) {
        this.x1 = x1 < x2 ? x1 : x2;
        this.x2 = x1 < x2 ? x2 : x1;
        this.y1 = y1 < y2 ? y1 : y2;
        this.y2 = y1 < y2 ? y2 : y1;
        this.horizontal = y1 === y2;
    }

    intersects( line ) {
        if ( line.horizontal === this.horizontal ) { return false; }
        const h = this.horizontal ? this : line;
        const v = this.horizontal ? line : this;

        if ( v.y2 >= h.y1 && v.y1 <= h.y2 && h.x1 <= v.x1 && h.x2 >= v.x1 ) {
            return { x: v.x1, y: h.y1 };
        }
        
        return false;
    }
}

function convertVectorsToCoordinates( line ) {
    const vectors = line.split( "," ).map( v => {
        const { groups: { direction, length } } = v.match( /^(?<direction>[UDRL])(?<length>[0-9]+)/ );

        return {
            direction,
            length: parseInt( length, 10 ),
        }
    } );

    const coordinates = [ { x: 0, y: 0 } ];
    for ( let i = 0; i < vectors.length; i++ ) {
        const { direction, length } = vectors[ i ];
        const lastCoordinate = coordinates[ i ];
        switch( direction ) {
            case "U":
                coordinates.push( { x: lastCoordinate.x, y: lastCoordinate.y + length } ); break;
            case "D":
                coordinates.push( { x: lastCoordinate.x, y: lastCoordinate.y - length } ); break;
            case "R":
                coordinates.push( { x: lastCoordinate.x + length, y: lastCoordinate.y } ); break;
            case "L":
                coordinates.push( { x: lastCoordinate.x - length, y: lastCoordinate.y } ); break;
        }
    }

    return coordinates;
}

( async () => {
    const line1Coordinates = convertVectorsToCoordinates( ( await lineReader.next() ).value );
    const line2Coordinates = convertVectorsToCoordinates( ( await lineReader.next() ).value );

    let smallest = Infinity;
    for (let i = 0; i < line1Coordinates.length - 1; i++) {
        const line1 = new Line( {
            x1: line1Coordinates[ i ].x,
            x2: line1Coordinates[ i + 1 ].x,
            y1: line1Coordinates[ i ].y,
            y2: line1Coordinates[ i + 1 ].y,
        } );
        
        for (let j = 0; j < line2Coordinates.length - 1; j++) {
            const line2 = new Line( {
                x1: line2Coordinates[ j ].x,
                x2: line2Coordinates[ j + 1 ].x,
                y1: line2Coordinates[ j ].y,
                y2: line2Coordinates[ j + 1 ].y,
            } );
            
            let intersection = line1.intersects( line2 );

            if ( intersection ) {
                console.log( intersection );
                const manhattan = Math.abs( intersection.x ) + Math.abs( intersection.y );

                if ( manhattan < smallest ) {
                    smallest = manhattan;
                }
            }
        }
    }

    console.log( smallest );
} )();
