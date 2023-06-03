
export default class EmployeeFormUpdate {

    #dataObject;
    #formElement;
    #departments;
    #parentElement;

    #underParentElement;

    #parentId;
    #id;
    constructor(parentId, departments) {
        this.#departments = departments;
        this.#parentId = parentId;
        this.#parentElement = document.getElementById(parentId);
        this.#dataObject = {};
        this.#buildForm(parentId);
        this.#setElements(parentId);
       
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
     
        this.#parentElement.innerHTML = 
        `<form id = "${parentId}-form-id" class = "form-controller">
            
        </form>`
    }

    #setElements(parentId){
        this.#formElement = document.getElementById(`${parentId}-form-id`)
    }



    #setSelectOptionsForUpdate(elementId, selectedElement){
        const departElement = document.getElementById(elementId)
        const departCopy = this.#departments;
        departElement.innerHTML += departCopy.filter(e=>e!=selectedElement).map(o => `<option value="${o}">${o}</option>`);
        departElement.innerHTML += `<option selected value=${selectedElement}>${selectedElement}</option>`;
    }

    clearForm(){
        this.#underParentElement.innerHTML="";
        //return new Promise(resolve=>resolve());
    }

    updateFormInit (obj, id){
        this.#id = id;
        const checkedF = obj.gender =='female' ? 'checked' : 'unchecked';
        const checkedM = obj.gender =='male' ? 'checked' : 'unchecked';
        const parentId = this.#parentId;

        this.#underParentElement = document.getElementById(`${parentId}-form-id`);

            
        this.#underParentElement.innerHTML = 
            `<div class = "row-input">
            <p>
                <label>Name</label>
                <input id = "${parentId}-name1-id" name="name" class = "input-field" value = "${obj.name}" required></input>
                </p>
                <p>
                <label>Birth of year</label>
                <input type="number" min=1920 max=2004 id = "${parentId}-year1-id" name = "birthYear" value = ${obj.birthYear} class = "input-field-birth" required></input>
                </p>
                <p>
                <label>Salary</label>
                <input type="number" min=1000 name = "salary" id = "${parentId}-salary1-id" class = "input-field" value = ${obj.salary} required></input>
                </p>
                <p>
                <div class="radio-group">
                    <div class="radio-control"> 
                        <input type="radio" name="gender" id = "${parentId}-gender1-id-f" required value="female" ${checkedF}></input>
                        <label for="${parentId}-gender-id-f">female</label>
                    </div>

                    <div class="radio-control"> 
                        <input type="radio" name="gender" id = "${parentId}-gender1-id-m" required value="male" ${checkedM}></input>
                        <label for="${parentId}-gender1-id-m">male</label>
                    </div>
                    </div>
                    <p class="p-department">
                    <label>Department</label>
                    <select id = "${parentId}-department1-id" name="department" class = "select-control" required></select>
                    </p>
                <button type = "submit" class="submit-but">Submit</button>
            </div>`;

            this.#setSelectOptionsForUpdate(`${parentId}-department1-id`, obj.department);
        }
    }

