
const OPCODES = {
    1: ( addr, register ) => {
        
    },
    2: ( addr, register ) => {

    },
    3: ( addr, register ) => {

    },
    4: ( addr, register ) => {

    },
};

const compiled = [];

function compile( address ) {
    
}

module.exports = ( program ) => {
    compiled.fill( null, 0, program.length )
    let currentAddress = 0;

    while ( compile( currentAddress ).opCode !== 99 ) {

    }
    
}
