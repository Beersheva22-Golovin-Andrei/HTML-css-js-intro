
function myToString(number, radix) {
    let sign = number < 0 ? "-" : "";
    number = Math.abs(number.toFixed(0));
    if (radix < 2 || radix > 36) {
        radix = 10;
    }
    let res = "";
    do {
        let digit = number % radix;
        if (digit > 9) {
            digit = String.fromCharCode(55 + digit);
        }
        res = digit + res;
        number = Number.parseInt(number / radix);
    } while (number != 0);
    res = sign + res;
    return res;
}

//console.log(myToString(-123456789, 36));


function myParseInt(number, radix) {
    let res = NaN;
    if (radix >= 2 && radix <= 36) {
        res = 0;
        let sign = 1;
        let i = 0;
        let encodeArr = number.split('.')[0].split("");
        if (encodeArr[0] == '-') {
            sign = -1;
            i = 1
        }
        const pref1 = '0'.charCodeAt(0);
        const pref2 = 'A'.charCodeAt(0) - 10;
        let run = true;
        while (run && i < encodeArr.length) {
            let digit = encodeArr[i].charCodeAt(0);
            digit = digit > pref1 + 9 ? digit - pref2 : digit - pref1;
            if (digit < radix) {
                res = res * radix + digit;
                i++;
            } else run = !run;
        }
        res *= sign;
    }
    return res;
}

//console.log(myParseInt('199', 2));

let b = function(){return 1};
let c = function(){ return function(){return 2}};

//console.log(b()+c()());

let a = 6;
a=""+a;
//console.log(typeof(a), a);
let s = new String();
console.log(s+3);




