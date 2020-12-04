const fs = require( "fs" );

const OPCODE_ADD = 1;
const OPCODE_MPLY = 2;

const register = fs.readFileSync( "input.txt", "utf-8" ).split( "," ).map( str => parseInt( str, 10 ) );

register[ 1 ] = 12;
register[ 2 ] = 2;

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

console.log( register );