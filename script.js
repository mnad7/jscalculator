function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(operator)
    {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if(b === 0) {
                return "bruh";
            }
            return a / b;
    }
} 

function addDecimal() {
    if(mDisplay.length == 0 || mDisplay[mDisplay.length - 1] == ' ') {
        mDisplay += '0.';
    } else if(!isNaN(mDisplay[mDisplay.length - 1])) {
        const splitDot = mDisplay.split('.');
        if(splitDot[splitDot.length - 1] == undefined || splitDot[splitDot.length - 1].includes(' ') || splitDot.length == 1)
        {
            mDisplay += '.';
        }
    }
}

let lDisplay = "";
let mDisplay = "";
let ops = [];
let vals = [];

function clear() {
    lDisplay = mDisplay;
    mDisplay = "";
}
function del() {
    if(mDisplay[mDisplay.length - 1] == ' ') {
        mDisplay = mDisplay.substr(0, mDisplay.length - 3);
    } else {
        mDisplay = mDisplay.substr(0, mDisplay.length - 1);
    }
}
const buttons = document.querySelectorAll('button');
const buttonValues = ['C', 'del', '/', '7', '8', '9', '*', '4', '5', '6', '+', '1', '2', '3', '-', '0', '.', 'E'];

let i = 0;
buttons.forEach(button => {
    const v = buttonValues[i];5
    if(i == 17)
        {
            console.log(button);
        }
    button.addEventListener('click', () => {
        const value = v;
        if(!isNaN(value)) {
            mDisplay += value;
        } else if(value == 'del') {
            del();
        } else if(value == 'C') {
            clear();
        } else if(value == 'E') {
            calculate();
        } else if(value == '.') { 
            addDecimal();
        } else if(!isNaN(mDisplay[mDisplay.length - 2])){
            mDisplay += ' ' + value + ' ';
        }
        populate();
    });
    i++;
});

const ld = document.querySelector("#history-display");
const md = document.querySelector("#main-display");
function populate() {
    ld.textContent = lDisplay;
    md.textContent = mDisplay;
}
function calculate() {
    //console.log("calculating");
    if(!mDisplay.includes(' ')) {
        return;
    }
    if(mDisplay[mDisplay.length - 1] != ' ') {
        const input = mDisplay.split(' ');
        input.forEach(x => {
            if(isNaN(x)) {
                ops.push(x);
            }
            else {
                vals.push(x)
            }
        });
    }
    if(incalculable()) {
        console.log("non calculable");
        ops = [];
        vals = [];
        return;
    }
    operateAll('*', '/');
    operateAll('+', '-');
    lDisplay = mDisplay;
    mDisplay = vals[0];
    populate();
    ops = [];
    vals = [];
}

function operateAll(operator, operator2) {
    if(vals.length == 1) {
        return;
    }
    let op = ops.find(element => (element == operator || element == operator2));
    let opIndex = ops.indexOf(op);
    while(op != undefined) {
        //console.log(op + " on " + vals[opIndex] + " " + vals[opIndex + 1]); 
        ops.splice(opIndex, 1);
        const result = operate(op, vals[opIndex], vals[opIndex + 1]);
        if(result == 'bruh') {
            vals = ['bruh'];
            ops = [];
            break;
        }
        vals[opIndex] = result
        vals.splice(opIndex + 1, 1);
        op = ops.find(element => (element == operator || element == operator2));
        opIndex = ops.indexOf(op)
    }
}

function incalculable() {
    return (vals.length != ops.length + 1);
}