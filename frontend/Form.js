document.addEventListener('DOMContentLoaded', () => {
    const scriptElement = document.querySelector('script[src="Form.js"]');

    if (!scriptElement) {
        console.error('Script element with src="form.js" not found.');
        return;
    }

    const path = scriptElement.getAttribute('path');
    const courses = scriptElement.getAttribute('courses')

    if (!path || !courses) {
        console.error('Custom data attribute not found in script element.');
        return;
    }

    const currentPath = window.location.pathname;

    if (path.includes(currentPath)) {
        createForm(courses);
    }
    console.log(path);
    console.log(courses);
});

function createForm(courseOptions) {
    const form = document.createElement('form');
    form.id = 'studentDetailsForm';
    document.body.appendChild(form);

    const fieldOptions = [
        { labelText: "Student's Name:", inputType: 'text', inputId: 'studentName', inputName: 'studentName', required: true },
        { labelText: 'Contact No.:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
        { labelText: 'OTP:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
        { labelText: 'E-mail:', inputType: 'email', inputId: 'email', inputName: 'email', required: true },
        { labelText: 'OTP:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
        { labelText: 'Whatsapp No.:', inputType: 'tel', inputId: 'whatsappNo', inputName: 'whatsappNo', required: false },
        { labelText: "Father's Name:", inputType: 'text', inputId: 'fatherName', inputName: 'fatherName', required: true },
        // { labelText: 'Address:', inputType: 'textarea', inputId: 'address', inputName: 'address', required: true },
        // { labelText: 'City:', inputType: 'text', inputId: 'city', inputName: 'city', required: true },
        // { labelText: 'State:', inputType: 'text', inputId: 'state', inputName: 'state', required: true }
    ];

    fieldOptions.forEach(option => {
        createField(form, option);
    });
    const inlineGroup = document.createElement('div');
    inlineGroup.className = 'inline-group';

    createField(inlineGroup, { labelText: 'City:', inputType: 'text', inputId: 'city', inputName: 'city', required: true });
    createField(inlineGroup, { labelText: 'State:', inputType: 'text', inputId: 'state', inputName: 'state', required: true });

    form.appendChild(inlineGroup);

    const courseSelectWrapper = document.createElement('div');
    courseSelectWrapper.className = 'form-group';
    createSelectField(courseSelectWrapper, 'Course Selection:', 'courseSelection', 'courseSelection', courseOptions);
    form.appendChild(courseSelectWrapper);

    createField(form, { labelText: 'NEET Score:', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true });

    //hostname checker
    if (window.location.hostname === 'abhigyadufare.github.io') {
        createField(form, { labelText: 'Preferred College:', inputType: 'text', inputId: 'preferredCollege', inputName: 'preferredCollege', required: true });
    }
    createCheckboxField(form, 'I agree to receive information by signing up on Careerkick services', 'agreeCheckbox');

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.className = 'submit-button';
    form.appendChild(submitButton);
    form.addEventListener('submit', submitForm);
}

function createField(form, field) {
    const { labelText, inputType, inputId, inputName, required } = field;

    const wrapper = document.createElement('div');
    wrapper.className = 'form-group';

    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = inputId;
    wrapper.appendChild(label);

    let input;
    if (inputType === 'textarea') {
        input = document.createElement('textarea');
    } else {
        input = document.createElement('input');
        input.type = inputType;
    }
    input.id = inputId;
    input.name = inputName;
    input.required = required;
    wrapper.appendChild(input);

    form.appendChild(wrapper);
}

function createSelectField(form, labelText, selectId, selectName, options) {
    const wrapper = document.createElement('div');
    wrapper.className = 'form-group';

    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = selectId;
    wrapper.appendChild(label);

    const select = document.createElement('select');
    select.id = selectId;
    select.name = selectName;
    select.required = true;

    console.log(options);
    JSON.parse(options).map((optionText) => {
        const option = document.createElement('option');
        option.textContent = optionText;
        option.value = optionText;
        select.appendChild(option);
    });

    wrapper.appendChild(select);
    form.appendChild(wrapper);
}

function createCheckboxField(form, labelText, checkboxId) {
    const wrapper = document.createElement('div');
    wrapper.className = 'form-group';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;

    const label = document.createElement('label');
    label.textContent = labelText;
    label.htmlFor = checkboxId;

    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);

    form.appendChild(wrapper);
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const utmData = {
    source: getUrlParameter('utm_source'),
    sourceId: getUrlParameter('campaign_id')
};

function submitForm(event) {
    event.preventDefault();

    const formData = {
        studentName: document.getElementById('studentName').value,
        contactNo: document.getElementById('contactNo').value,
        email: document.getElementById('email').value,
        whatsappNo: document.getElementById('whatsappNo').value,
        fatherName: document.getElementById('fatherName').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        courseSelection: document.getElementById('courseSelection').value,
        neetScore: document.getElementById('neetScore').value,
        // preferredCollege: document.getElementById('preferredCollege').value,
        agreeCheckbox: document.getElementById('agreeCheckbox').checked,
        formSource: utmData
    };


    if (formData.courseSelection === "Select Course") {
        alert("Please select a course.");
        return;
    }

    // console.log(formData);
    sendData(formData)
    // const form = document.getElementById('studentDetailsForm');
    // form.reset();
}

const url = 'http://localhost:4000/api/v1/form'





const sendData = async (formData) => {
    const Data = {
        name: formData.studentName,
        contactNumber: formData.contactNo,
        email: formData.email,
        whatsappNumber: formData.whatsappNo,
        fatherName: formData.fatherName,
        city: formData.city,
        state: formData.state,
        courseSelected: formData.courseSelection,
        neetScore: formData.neetScore
    }
    console.log(Data);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        });

        if (!response.ok) {
            const err = await response.json();
            const errorData = err.message
            throw new Error(errorData);
        }

        const result = await response.json();
        const msg = result.msg
        alert( msg);
        // const form = document.getElementById('studentDetailsForm');
        // form.reset();
    } catch (errorData) {
        console.log(errorData);
        alert(errorData);
        // console.error('Error:', error);
    }

}