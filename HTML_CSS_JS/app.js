const person = {name: "Viktor Reinz", id: 123, birthYear: 1990, address:{country:"Israel", city: "Beer-Sheva" }};

function createPerson( id, name, birthYear, country, city){
    return {id, name, birthYear, address:{country, city }}
}

const per1 = createPerson(123, 'Igor', 1987, 'Israel', 'Rehovot');
const per2 = createPerson(123, 'Igor', 1987, 'Israel', 'Rehovot');

let name = 'name';
//console.log(person[name]);

function print(field, object){
    console.log(object[field]);
}


//console.log(Object.keys(person));
//console.log("keys", Object.keys(person));
 //Method 'values' of Object returns array of values
 //console.log("values", Object.values(person));
 //Method 'entries' of Object returns array of arrays with key as first element and value is the second one
 //console.log("entries", Object.entries(person));
 const x = {};
 x["ab"] = 10;
 x["ab"]++;
 //console.log(x["ab"]);

 

let arr = ["lmn", "ab", "lmn", "c", "d", "ab", "a", "a", "lmn"];


function displayOccurrences(array) {
const helper = {};
array.forEach(el=>{
    helper[el] = helper[el] ? helper[el]+1 : 1;
});
Object.entries(helper).sort((a,b)=>{
    let res = 0;
    if (b[1]!=a[1]) {
        res = b[1]-a[1];
    } else if (b[0]<a[0]) {
        res = 1;
    } else if (b[0]>a[0]){
        res = -1;
    }
    return res;
}).forEach(a=>console.log(a[0]+' - '+a[1]));
}

//displayOccurrences(arr);

function isAnagram (word, anagram){
    let res = true;
    word = word.toLowerCase();
    anagram = anagram.toLowerCase();
    if (word != anagram){
        if (word.length == anagram.length){
            const temp = Array.from(word).reduce((temp, s) => ({...temp, [s]: temp[s] ? temp[s]+1 : 1}), {});
            let count = 0;
            while(res && count<word.length) {
                let sumbol = anagram.charAt(count);
                if (temp[sumbol]){
                    res = false;
                } else {
                    temp[sumbol]--;
                    count++;
                }
            }
        } else {
            res = false;
        }
    }
return res;
}

console.log(isAnagram ('word', 'wdro'));