const input = '3113322113';
const iterations = 40;

function iteration(input) {
    let i = 0,
        j = 1,
        output = '';
    while(i < input.length) {
        if (input[i] !== input[j]) {
            output += `${input.substring(i, j).length}${input[i]}`;
            i = j;
            continue;
        }
        j++;
    }

    return output;
}

function lookAndSay(input, noIterations) {
    let result = input;
    for (let i = 0; i < noIterations; i++) {
        result = iteration(result);
    }

    return result;
}

lookAndSay('3113322113', 40).length;
