import { count } from "../util/number-functions.js";
import { getRandomInt } from "../util/random.js";
const minId = 100000;
const maxId = 1000000;

const POLLING_INTERVAL = 5000;
const URL = 'http://localhost:3500/employees';
export default class CompanyServiceServer {

    #baseUrl;
    #employeesCash;
    #dataUpdateFn;
    #intervalId;

    constructor(baseUrl, dataUpdateFn){
        this.#baseUrl = baseUrl;
        this.#dataUpdateFn = dataUpdateFn;
        this.#intervalId = setInterval(this.poller.bind(this), POLLING_INTERVAL)
    }
   

    async #poller(){
        const employees = await this.getAllEmployees();
        if (JSON.stringify(employees)!=JSON.stringify(this.#employeesCash)){
            this.#dataUpdateFn(employees);
            this.#employeesCash = employees;
        }
    }

    async addEmployee(employee) {
        await fetch(URL, {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(employee)
        })
        return new Promise (resolve => setTimeout(()=>resolve(), 500));

    }

    updateEmployee(employee, id){
        const URL_FOR_UPDATE = URL+'/'+id;
        fetch(URL_FOR_UPDATE, {
            method: 'PUT',
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(employee)
        })
        //return new Promise (resolve => setTimeout(()=>resolve(), 1000)); 
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

    async removeById(id){
        const URL_FOR_DELETE = URL+'/'+id;
        await fetch(URL_FOR_DELETE, {
            method: 'DELETE',
            headers: {"Content-type": "application/json"}
        });
        return new Promise (resolve => setTimeout(()=>resolve(), 1000)); 
    }

    async getById(id){
        const URL_BY_ID = URL+'/'+id;
        const employee = await fetch(URL_BY_ID);
        return await employee.json();
    }
}