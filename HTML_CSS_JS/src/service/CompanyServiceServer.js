import { count } from "../util/number-functions.js";
import { getRandomInt } from "../util/random.js";
const minId = 100000;
const maxId = 1000000;

const URL = 'http://localhost:3500/employees';
export default class CompanyServiceServer {
    #employees;
   
    constructor() {
        this.#employees = {};
        
    }
    async addEmployee(employee) {
        await fetch(URL, {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(employee)
        })
        //this.#employees[id] = {...employee, id}; 
        //return new Promise (resolve => setTimeout(()=>resolve(), 500));

    }


    updateEmployee(employee, id){
        this.#employees[id] = {...employee, id};
        return new Promise (resolve => setTimeout(()=>resolve(this.#employees[id]), 1000)); 
    }

    async getStatistics(field, interval) {
        let array = await this.getAllEmployees();
        const currentYear = new Date().getFullYear();
        
        if (field == 'birthYear') {
            array = array.map(e => ({'age': currentYear - e.birthYear}));
            field = 'age';
        }
        const statisticsObj = count(array, field, interval);
        return new Promise (resolve => setTimeout(()=>resolve( Object.entries(statisticsObj).map(e => {
            const min = e[0] * interval;
            const max = min + interval - 1;
            return {min, max, count: e[1]};
        })), 3000));
    }

    async getAllEmployees() {
        const allEmpl = await fetch(URL);
        const res = await allEmpl.json();
        return new Promise (resolve => setTimeout(()=>resolve(Object.values(res)), 3000));
    }

    removeById(id){
        const URL_FOR_DELETE = URL+'/'+id;
        fetch(URL_FOR_DELETE, {
            method: 'DELETE',
            headers: {"Content-type": "application/json"}
        });
    }

    async getById(id){
        const URL_BY_ID = URL+'/'+id;
        const employee = await fetch(URL_BY_ID);
        return await employee.json();
    }
}