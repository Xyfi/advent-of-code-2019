const getData = require( "./processData" );

function calculateRequiredFuel( module ) {
    const fuelRequirement = ( Math.floor( module / 3 ) - 2 );

    if ( fuelRequirement <= 0 ) {
        return 0;
    }

    return fuelRequirement + calculateRequiredFuel( fuelRequirement );
}

( async () => {
    const data = await getData();

    const answer = data.reduce( ( acc, module ) => {
        return acc + calculateRequiredFuel( module );
    }, 0 );

    console.log( answer );
} )();
