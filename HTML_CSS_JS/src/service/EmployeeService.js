import { getRandomEmployee } from "../util/random.js";

export default class EmployeeService {

    #allEmployees; // array

    constructor(){
        this.#allEmployees=[];
    }

    addNewRandomEmployee (){
        this.#allEmployees.push(getRandomEmployee());
    }

    getAllEmployees(){
        return this.#allEmployees;
    }
}