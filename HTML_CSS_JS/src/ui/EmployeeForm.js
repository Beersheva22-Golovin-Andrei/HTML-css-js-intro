
export default class EmployeeForm {

    #dataObject;
    #formElement;
    
    constructor(parentId, departments) {
        const parentElement = document.getElementById(parentId);
        this.#dataObject = {};
        this. #buildForm(parentElement, parentId);
        this.#setElements(parentId);
        this.#setSelectOptions(departments, `${parentId}-department-id`);
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
        await submitFn(this.#dataObject);
       };
    }
    
    #buildForm(parentElement, parentId, departments){
        parentElement.innerHTML = 
        `<form id = "${parentId}-form-id" class = "form-controller">
            <div class = "row-input">
            <p>
                <label>Name</label>
                <input id = "${parentId}-name-id" name="name" class = "input-field" required></input>
                </p>
                <p>
                <label>Birth of year</label>
                <input type="number" min=1920 max=2004 id = "${parentId}-year-id" name = "birthYear" class = "input-field-birth" required></input>
                </p>
                <p>
                <label>Salary</label>
                <input type="number" min=1000 name = "salary" id = "${parentId}-salary-id" class = "input-field" required></input>
                </p>
                <p>

                <div class="radio-group">

                    <div class="radio-control"> 
                        <input type="radio" name="gender" id = "${parentId}-gender-id-f" required value="female" unchecked></input>
                        <label for="${parentId}-gender-id-f">female</label>
                    </div>

                    <div class="radio-control"> 
                        <input type="radio" name="gender" id = "${parentId}-gender-id-m" required value="male" unchecked></input>
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

    #setSelectOptions(departments, elementId){
        const departElement = document.getElementById(elementId)
        departElement.innerHTML = `<option value hidden selected>--Select department--</option>`;
        departElement.innerHTML += departments.map(o => `<option value="${o}">${o}</option>`);
    }
}
