
export default class StatisticService{

    constructor(){

    }

    getStatisticByAge (employees){
        const res =[];
        employees.forEach(element=> {
            let index = Math.floor((new Date().getFullYear()-element.birthYear)/10);
            res[index] = res[index]==undefined ? 1 : res[index]+=1;
        });
        return res.map((el, i) => ({min: i*10, max: i*10+9, count: el}))
    }
}