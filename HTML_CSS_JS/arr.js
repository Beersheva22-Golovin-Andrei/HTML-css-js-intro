// let ar = [];
// ar[5] = 100;
// ar[0] = 'string';
// ar[3] = [];
// ar.length = 0;
// ar[0] = 1;
// //[]&&console.log(true);

// //addind to the end of array
// ar[ar.length] = 10;
// const insertArr = [1,2,3];
// ar.push(...insertArr, true);

// ar[3] = 'hello';
// // console.log(ar[3][0]);
// // ar[3][0] = '*';
// // console.log(ar[3]);

function getRandomInt(min, max, minIncl = true, maxIncl = false) {
    let res;
    if (max > min) {
        let b = 0;

        if (maxIncl) {
            max += max;
        }
        if (!minIncl) {
            min += min;
        }
        res = Math.floor((Math.random() * (max - min)) + min);
    }
    return res;
}

function getArrayOfRandomInt(nNumbers, min, max, minIncl = true, maxIncl = false) {
    let arr = [];
    arr.length = nNumbers;
    return [...arr].map(() => getRandomInt(min, max, minIncl, maxIncl));
}

//console.log(getRandomInt(1,3, false, true));
//console.log(...getArrayOfRandomInt(5, 1,3, false, true));

function getOrderedList(array) {
    let res;
    if (Array.isArray(array)) {
        array = array.map(n => getElenemtLi(n));
        res = `<ol>${array.join('')}</ol>`
    }
    return res;
}

function getElenemtLi(n) {
let color = n==1 ? 'black' : 'white';
    return `<li style="background-color: ${color};"></li>`;
}

//console.log(getOrderedList([1, 2, 3, 4, 5]));

//bodyId.innerHTML = getOrderedList(getArrayOfRandomInt(20, 0, 2));

function getMatrix(raw, column, min, max, minIncl = true, maxIncl = false){
    let matr = [];
    matr.length = raw;
    return [...matr].map(() => getArrayOfRandomInt(column, min, max, minIncl, maxIncl));
}

function getChessBoard(row, column){
    let matr = [];
    for (let i = 0; i<row; i++){
        matr[i]=getColumns(column,!!(i%2));
        }
        return `<section>${matr.join('')}</section>`
    }
   
function getColumns (columnNumber, startColor){
    let column=[]; 
    for (let j=0; j<columnNumber; j++){
        let isblck = startColor;
        if (j%2){
            isblck = !isblck;
        }
        column[j] = `<div style="background-color: ${color=isblck?'black':'white'}"></div>`;
}
return `<div>${column.join('')}</div>`
}

//bodyId.innerHTML = getChessBoard(10, 10);

const a = [1,2,3,4,5,6,7];
const b = [50,60,70,80,90,100];

// let index = a.indexOf(5);
// let res = a.splice(index+1, 0, ...b);
// //console.log(a);
// // console.log(a.slice(2,6));
// // console.log(a);
// let greaterThanTen = a.findIndex(e=>e>10);
// let newArrAfterFilter = a.filter(e=>e>10);



function arrayCopy (src, posSrc, dst, posDest, length){
    let elementsForInsert = src.slice(posSrc, posSrc+length);
    dst.splice(posDest, elementsForInsert.length, ...elementsForInsert);
}

//arrayCopy(b, 3, a, 2, 7);

function moveElement(array, pos, shift){
    let temp = array.splice(pos, pos+1);
    pos +=shift;
    if (pos<0) pos = 0;
    if (pos>array.length) pos = array.length;
    array.splice(pos, 0, ...temp);           
}

moveElement(a, 6, -9);
//console.log(a);


