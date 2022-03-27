fetch("https://adventofcode.com/2015/day/7/input")
.then(res => res.text())
.then(data => parseCommands(data))
.catch(err => console.error(err));

const lookup = {};

function parseCommands(text) {
    text.split('\n').forEach(line => {
        const [operation, variable] = line.split(' -> ');
        if(variable) lookup[variable] = operation;
    });
    console.log('a ', getValue('a'));
}

function getValue(variable) {
    if (Number.isInteger(+lookup[variable])) {
        // part 2
        //if (variable === 'b') return 46065; 
        return +lookup[variable];
    }
    
    const tokens = lookup[variable].split(' ');
    let calculatedValue;

    if (tokens.length === 1) return getValue(tokens[0]);
    if (tokens.length === 2) return ~getValue(tokens[1]);
    if (tokens.length === 3) {
        const left = Number.isInteger(+tokens[0]) ? +tokens[0] : getValue(tokens[0]),
              right = Number.isInteger(+tokens[2]) ? +tokens[2] : getValue(tokens[2]);
        switch (tokens[1]) {
            case 'AND':
                calculatedValue = left & right;
                break;
            case 'OR':
                calculatedValue = left | right;
                break;
            case 'LSHIFT':
                calculatedValue = left << right;
                break;
            case 'RSHIFT':
                calculatedValue = left >> right;
                break;
            default:
                console.error('unknown op');
                break;
        }

        lookup[variable] = calculatedValue;
        return calculatedValue;
    }

    return null;
}
