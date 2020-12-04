const fs = require( "fs" );

const OPCODE_ADD = 1;
const OPCODE_MPLY = 2;

const programm = fs.readFileSync( "input.txt", "utf-8" ).split( "," ).map( str => parseInt( str, 10 ) );

function runProgramm( programm, arguments ) {
    const register = [ ...programm ];

    arguments.forEach( arg => {
        register[ arg.addr ] = arg.val;
    } );

    let current_address = 0;

    while ( register[ current_address ] !== 99 ) {
        const OUTPUT_REGISTER_ADDRESS = register[ current_address + 3 ];
        const VALUE_1_ADDRESS = register[ current_address + 1 ];
        const VALUE_2_ADDRESS = register[ current_address + 2 ];
        switch( register[ current_address ] ) {
            case OPCODE_ADD:
                register[ OUTPUT_REGISTER_ADDRESS ] = register[ VALUE_1_ADDRESS ] + register[ VALUE_2_ADDRESS ];
                break;
            case OPCODE_MPLY:
                register[ OUTPUT_REGISTER_ADDRESS ] = register[ VALUE_1_ADDRESS ] * register[ VALUE_2_ADDRESS ];
                break;
        }
    
        current_address += 4
    }

    return register;
}

loop:
for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
        let output = runProgramm( programm, [ { addr: 1, val: i }, { addr: 2, val: j } ] )[ 0 ];

        if ( output === 19690720 ) {
            console.log( 100 * i + j );
            break loop;
        }
    }
}