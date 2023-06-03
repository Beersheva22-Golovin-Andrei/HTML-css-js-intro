
export default class EmployeeForm {

    #dataObject;
    #formElement;
    #departments;
    #parentElement;
    #id;
    
    constructor(parentId, departments, obj, id) {
        this.#departments = departments;
        this.#parentElement = document.getElementById(parentId);
        this.#dataObject = {};
        this.#id=id;
        this. #buildForm(parentId, obj);
        this.#setElements(parentId);
        obj==undefined ? this.#setSelectOptions(`${parentId}-department-id`) :  this.#setSelectOptionsForUpdate(`${parentId}-department-id`, obj.department)
    }

    addHandler(submitFn) {
    this.#formElement.onsubmit = async (event)=>{
        event.preventDefault();
        const formData = new FormData(this.#formElement);
        this.#dataObject.gender = formData.get('gender');
        this.#dataObject.name = formData.get('name');
        this.#dataObject.birthYear = formData.get('birthYear');
        this.#dataObject.salary = formData.get('salary');
        this.#dataObject.department = formData.get('department');
        await submitFn(this.#dataObject, this.#id);
        this.#formElement.reset();
       };
    }
    
    #buildForm(parentId, defaultObj={name:"", birthYear: "", salary: "", department:"", gender:""}){
        const checkedF = defaultObj.gender =='female' ? 'checked' : 'unchecked';
        const checkedM = defaultObj.gender =='male' ? 'checked' : 'unchecked';
        this.#parentElement.innerHTML = 
        `<form id = "${parentId}-form-id" class = "form-controller">
            <div class = "row-input">
            <p>
                <label>Name</label>
                <input id = "${parentId}-name-id" name="name" class = "input-field" value = "${defaultObj.name}" required></input>
                </p>
                <p>
                <label>Birth of year</label>
                <input type="number" min=1920 max=2004 id = "${parentId}-year-id" name = "birthYear" value = ${defaultObj.birthYear} class = "input-field-birth" required></input>
                </p>
                <p>
                <label>Salary</label>
                <input type="number" min=1000 name = "salary" id = "${parentId}-salary-id" class = "input-field" value = ${defaultObj.salary} required></input>
                </p>
                <p>
                <div class="radio-group">
                    <div class="radio-control"> 
                        <input type="radio" name="gender" id = "${parentId}-gender-id-f" required value="female" ${checkedF}></input>
                        <label for="${parentId}-gender-id-f">female</label>
                    </div>

                    <div class="radio-control"> 
                        <input type="radio" name="gender" id = "${parentId}-gender-id-m" required value="male" ${checkedM}></input>
                        <label for="${parentId}-gender-id-m">male</label>
                    </div>
                    </div>
                    <p class="p-department">
                    <label>Department</label>
                    <select id = "${parentId}-department-id" name="department" class = "select-control" required></select>
                    </p>
                <button type = "submit" class="submit-but">Submit</button>
            </div>
        </form>`
    }

    #setElements(parentId){
        this.#formElement = document.getElementById(`${parentId}-form-id`)
    }

    #setSelectOptions(elementId){
        const departElement = document.getElementById(elementId)
        departElement.innerHTML = `<option value hidden selected>--Select department--</option>`;
        departElement.innerHTML += this.#departments.map(o => `<option value="${o}">${o}</option>`);
    }

    #setSelectOptionsForUpdate(elementId, selectedElement){
        const departElement = document.getElementById(elementId)
        const departCopy = this.#departments;
        departElement.innerHTML += departCopy.filter(e=>e!=selectedElement).map(o => `<option value="${o}">${o}</option>`);
        departElement.innerHTML += `<option selected value=${selectedElement}>${selectedElement}</option>`;
    }

    clearForm(){
        this.#parentElement.innerHTML="";
        //return new Promise(resolve=>resolve());
    }
}
