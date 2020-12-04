const getData = require( "./processData" );

( async () => {
    const data = await getData();

    const answer = data.reduce( ( acc, module ) => {
        return acc + ( Math.floor( module / 3 ) - 2 );
    }, 0 );

    console.log( answer );
} )();
