//console.log("Hello world!")

// let a = "5";
// a = a +5;

// console.log(typeof a);

// a-=5;
// console.log(typeof a);

// a=a+"0";
// console.log(typeof a);

// a=+a;
// console.log(typeof a);
// console.log(a);

// if (a=0){
//     console.log("true");
// }
// console.log(a);

// let a = "abc";
// let b = 2;
// let c = 3;

// if (a < c){
//     console
//     .log("yes");
// }
// a=!a;console.log(a)
// console.log()
// let g = new Number(9);
// console.log(g)
// g=+g
// console.log(g)

// let str = "256 * 320";
// console.log(str)
// console.log(+str)
// console.log(parseInt(str))

// let w = "546.8u";
// console.log(+w, parseInt(w), parseFloat(w))
// console.log(w.length)

function myToString(number, radix){
    let res= number<0 ? "-" : "";
    number = Math.abs(number.toFixed(0));
    if (radix<2 || radix>36) {
        radix = 10;
    }
    let pref = 0;
    if (radix>10) {
        pref = 55;
    }
    let resArr = [];
    let i = 0;
   do{
       let res = number%radix;
        if (res>9) {
            res = String.fromCharCode(pref+res);
        }
        resArr[i] = res;
        i++;
        number= Number.parseInt(number/radix);
   } while(number!=0);
   for (let i = resArr.length-1; i>=0; i--){
        res+=resArr[i];
   }
   return res; 
}

console.log(myToString(-45586666, 1));