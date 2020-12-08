let number = 264793;
let validOriginalCriteria = 0;
let validNewCriteria = 0;

function valid( str ) {
    if ( str.length !== 6 ) {
        return false;
    }

    for (let i = 0; i < str.length - 1; i++) {
        const current = str[ i ], next = str[ i + 1 ];

        if ( current > next ) {
            return false;
        }
    }

    return true;
}

function getRepeatedNumbers( str ) {
    const repeated = [];

    let i = 0;
    let group = str[ i ];

    while ( i < str.length ) {
        i++;
        if ( str[ i ] === group[ 0 ] ) {
            group += str[ i ];
            continue;
        }

        repeated.push( group );
        group = str[ i ];
    }

    return repeated.filter( str => str.length > 1 );
}

while ( number <= 803935 ) {
    const str = String( number );
    number++;

    if ( ! valid( str ) ) { continue; };

    const repeatedSequences = getRepeatedNumbers( str );

    if ( repeatedSequences.length ) {
        validOriginalCriteria++;
    }

    if ( repeatedSequences.find( number => number.length === 2 ) ) {
        validNewCriteria++;
    }
}

console.log( `Valid passwords according to assignment 1's criteria: ${ validOriginalCriteria }` );
console.log( `Valid passwords according to assignment 2's criteria: ${ validNewCriteria }` );

