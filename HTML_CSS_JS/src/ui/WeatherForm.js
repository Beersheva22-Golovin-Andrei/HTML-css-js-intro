import { getEndDateStr, getISODateStr } from "../util/date-functions.js";
import {range} from "../util/number-functions.js";
import { setData } from "../main.js";

const CITY_ID='city-id';
const DATE_ID='date-id';
const DAYS_ID='days-id';
const HOUR_FROM_ID = 'hour-from-id';
const HOUR_TO_ID = 'hour-to-id';
const FORM_ID = 'form-id';

export default class WeatherForm {

    #formElement;
    #cityElement;
    #dateElement;
    #daysElement;
    #hourFromElement;
    #hourToElement;
    #formData;
    #maxDays;
    #cities;
    #parentId


    constructor(parentId, cities, maxDays) {
        this.#parentId = parentId;
        this.#cities = cities;
        this.#maxDays = maxDays;
        this.#formData={};
        this.#buildForm();
        this.#setElements();
        this.#setHandlers();
        this.#setSelectOptions();
    }

    #cityHandler(){
        this.#formData.city = this.#cityElement.value;
    }

    #daysHandler(){
       const countDays = this.#daysElement.value;
        this.#formData.days = countDays;
        this.#dateElement.max = getEndDateStr(getISODateStr(new Date()), +countDays);
    }

    #dateHandler(){
        this.#formData.beginDate = this.#dateElement.value;
    }

    #hourFromHandler(){
        const hourFrom = this.#hourFromElement.value;
        this.#formData.hourFrom = hourFrom;
        setOptionItem(this.#hourToElement, range(+hourFrom,24), 'Hour to');
    }

    #hourToHandler(){
        const hourTo = this.#hourToElement.value;
        this.#formData.hourTo = hourTo;
    }

    #setHandlers(){
        this.#cityElement.onchange = this.#cityHandler.bind(this);
        this.#dateElement.onchange = this.#dateHandler.bind(this);
        this.#daysElement.onchange = this.#daysHandler.bind(this);
        this.#hourFromElement.onchange = this.#hourFromHandler.bind(this);
        this.#hourToElement.onchange = this.#hourToHandler.bind(this);
        this.#formElement.onsubmit = (event)=> {
            event.preventDefault();
            setData(this.#formData);
        } 
    }

    #setElements(){
        this.#formElement = document.getElementById(`${this.#parentId}-${FORM_ID}`);
        this.#cityElement = document.getElementById(`${this.#parentId}-${CITY_ID}`);
        this.#daysElement = document.getElementById(`${this.#parentId}-${DAYS_ID}`);
        this.#dateElement = document.getElementById(`${this.#parentId}-${DATE_ID}`);
        this.#hourFromElement = document.getElementById(`${this.#parentId}-${HOUR_FROM_ID}`);
        this.#hourToElement = document.getElementById(`${this.#parentId}-${HOUR_TO_ID}`);

    }

    #setSelectOptions(){
        const minDate = getISODateStr(new Date())
        this.#dateElement.min = minDate;
        this.#dateElement.max = getEndDateStr(minDate, this.#maxDays);
        setOptionItem(this.#cityElement, this.#cities, 'select city');
        setOptionItem(this.#daysElement, range(0,this.#maxDays+1), "count of days for forecast");
        setOptionItem(this.#hourFromElement, range(0,24), 'Hour from');
        setOptionItem(this.#hourToElement, range(0,24), 'Hour to');
    }

    #buildForm(){
        const parentElement = document.getElementById(this.#parentId);
        parentElement.innerHTML = 
        `<form id = "${this.#parentId}-${FORM_ID}" class="form-contr">
            <div class="row-nput">
                <select id="${this.#parentId}-${CITY_ID}" class="select-contr" required></select>
                <select id="${this.#parentId}-${DAYS_ID}" class="select-contr" required></select>
            </div>
            <div class="row-nput">
                <select id="${this.#parentId}-${HOUR_FROM_ID}" class="select-contr" required></select>
                <select id="${this.#parentId}-${HOUR_TO_ID}" class="select-contr" required></select>
            </div>
            <div class="date-group-contr">
                <label class="label-input">Enter start date</label>
                <input class="date-input" type="date" id="${this.#parentId}-${DATE_ID}" required>
            </div>
            <div class="buttons-group">
                <button type="submit">Submit</button>
            </div>
        </form>`
    }



}

function setOptionItem(element, array, placeholder){
    element.innerHTML = `<option value hidden selected>--${placeholder}--</option>`;
    element.innerHTML += array.map(o=>`<option value="${o}">${o}</option>`);  
}
