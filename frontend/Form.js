// document.addEventListener('DOMContentLoaded', () => {
//     const scriptElement = document.querySelector('script[src="Form.js"]');

//     if (!scriptElement) {
//         console.error('Script element with src="form.js" not found.');
//         return;
//     }

//     const path = scriptElement.getAttribute('path');
//     const courses = scriptElement.getAttribute('courses')

//     if (!path || !courses) {
//         console.error('Custom data attribute not found in script element.');
//         return;
//     }

//     const currentPath = window.location.pathname;

//     if (path.includes(currentPath)) {
//         createForm(courses);
//     }
//     console.log(path);
//     console.log(courses);
// });

// function createForm(courseOptions) {
//     const form = document.createElement('form');
//     form.id = 'studentDetailsForm';
//     document.body.appendChild(form);

//     const fieldOptions = [
//         { labelText: "Student's Name:", inputType: 'text', inputId: 'studentName', inputName: 'studentName', required: true },
//         { labelText: 'Contact No.:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
//         { labelText: 'OTP:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
//         { labelText: 'E-mail:', inputType: 'email', inputId: 'email', inputName: 'email', required: true },
//         { labelText: 'OTP:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
//         { labelText: 'Whatsapp No.:', inputType: 'tel', inputId: 'whatsappNo', inputName: 'whatsappNo', required: false },
//         { labelText: "Father's Name:", inputType: 'text', inputId: 'fatherName', inputName: 'fatherName', required: true },
//         // { labelText: 'Address:', inputType: 'textarea', inputId: 'address', inputName: 'address', required: true },
//         // { labelText: 'City:', inputType: 'text', inputId: 'city', inputName: 'city', required: true },
//         // { labelText: 'State:', inputType: 'text', inputId: 'state', inputName: 'state', required: true }
//     ];

//     fieldOptions.forEach(option => {
//         createField(form, option);
//     });
//     const inlineGroup = document.createElement('div');
//     inlineGroup.className = 'inline-group';

//     createField(inlineGroup, { labelText: 'City:', inputType: 'text', inputId: 'city', inputName: 'city', required: true });
//     createField(inlineGroup, { labelText: 'State:', inputType: 'text', inputId: 'state', inputName: 'state', required: true });

//     form.appendChild(inlineGroup);

//     const courseSelectWrapper = document.createElement('div');
//     courseSelectWrapper.className = 'form-group';
//     createSelectField(courseSelectWrapper, 'Course Selection:', 'courseSelection', 'courseSelection', courseOptions);
//     form.appendChild(courseSelectWrapper);

//     createField(form, { labelText: 'NEET Score:', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true });

//     //hostname checker
//     if (window.location.hostname === 'abhigyadufare.github.io') {
//         createField(form, { labelText: 'Preferred College:', inputType: 'text', inputId: 'preferredCollege', inputName: 'preferredCollege', required: true });
//     }
//     createCheckboxField(form, 'I agree to receive information by signing up on Careerkick services', 'agreeCheckbox');

//     const submitButton = document.createElement('button');
//     submitButton.type = 'submit';
//     submitButton.textContent = 'Submit';
//     submitButton.className = 'submit-button';
//     form.appendChild(submitButton);
//     form.addEventListener('submit', submitForm);
// }

// function createField(form, field) {
//     const { labelText, inputType, inputId, inputName, required } = field;

//     const wrapper = document.createElement('div');
//     wrapper.className = 'form-group';

//     const label = document.createElement('label');
//     label.textContent = labelText;
//     label.htmlFor = inputId;
//     wrapper.appendChild(label);

//     let input;
//     if (inputType === 'textarea') {
//         input = document.createElement('textarea');
//     } else {
//         input = document.createElement('input');
//         input.type = inputType;
//     }
//     input.id = inputId;
//     input.name = inputName;
//     input.required = required;
//     wrapper.appendChild(input);

//     form.appendChild(wrapper);
// }

// function createSelectField(form, labelText, selectId, selectName, options) {
//     const wrapper = document.createElement('div');
//     wrapper.className = 'form-group';

//     const label = document.createElement('label');
//     label.textContent = labelText;
//     label.htmlFor = selectId;
//     wrapper.appendChild(label);

//     const select = document.createElement('select');
//     select.id = selectId;
//     select.name = selectName;
//     select.required = true;

//     console.log(options);
//     JSON.parse(options).map((optionText) => {
//         const option = document.createElement('option');
//         option.textContent = optionText;
//         option.value = optionText;
//         select.appendChild(option);
//     });

//     wrapper.appendChild(select);
//     form.appendChild(wrapper);
// }

// function createCheckboxField(form, labelText, checkboxId) {
//     const wrapper = document.createElement('div');
//     wrapper.className = 'form-group';

//     const checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.id = checkboxId;

//     const label = document.createElement('label');
//     label.textContent = labelText;
//     label.htmlFor = checkboxId;

//     wrapper.appendChild(checkbox);
//     wrapper.appendChild(label);

//     form.appendChild(wrapper);
// }

// function getUrlParameter(name) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(name);
// }

// const utmData = {
//     source: getUrlParameter('utm_source'),
//     sourceId: getUrlParameter('campaign_id')
// };

// function submitForm(event) {
//     event.preventDefault();

//     const formData = {
//         studentName: document.getElementById('studentName').value,
//         contactNo: document.getElementById('contactNo').value,
//         email: document.getElementById('email').value,
//         whatsappNo: document.getElementById('whatsappNo').value,
//         fatherName: document.getElementById('fatherName').value,
//         city: document.getElementById('city').value,
//         state: document.getElementById('state').value,
//         courseSelection: document.getElementById('courseSelection').value,
//         neetScore: document.getElementById('neetScore').value,
//         // preferredCollege: document.getElementById('preferredCollege').value,
//         agreeCheckbox: document.getElementById('agreeCheckbox').checked,
//         formSource: utmData
//     };


//     if (formData.courseSelection === "Select Course") {
//         alert("Please select a course.");
//         return;
//     }

//     else if (formData.agreeCheckbox === false) {
//         alert("Please agree to the terms and conditions.");
//         return;
//     }

//     // console.log(formData);


//     sendData(formData)
//     // const form = document.getElementById('studentDetailsForm');
//     // form.reset();
// }

document.addEventListener('DOMContentLoaded', () => {
    const scriptElement = document.querySelector('script[src="Form.js"]');
  
    if (!scriptElement) {
        console.error('Script element with src="Form.js" not found.');
        return;
    }
  
    const path = scriptElement.getAttribute('path');
    const courses = scriptElement.getAttribute('courses')
    const styles = scriptElement.getAttribute('styles')
    const logo = scriptElement.getAttribute('logo');
    const contact = scriptElement.getAttribute('contact');
    const customStylesheets = scriptElement.getAttribute('customStylesheets');
    if (styles) {
     
      const customStylesheet = document.querySelectorAll('link[rel="stylesheet"]');
      if (customStylesheet>0) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
          styleLink.href = "testStyle.css";
          document.head.prepend(styleLink);
      } else {
          
          const styleLink = document.createElement('link');
          styleLink.rel = 'stylesheet';
          styleLink.href = "style.css";
          document.head.prepend(styleLink);
      }
  }
    if (!path || !courses) {
        console.error('Custom data attribute not found in script element.');
        return;
    }
  
    const currentPath = window.location.pathname;
    
    
    if (JSON.parse(path).includes(currentPath)) {
      createForm(courses, styles, logo, contact);
        toggleFormStyle(styles);
      

    }
    console.log(path);
    console.log(courses);
    console.log(path.includes(currentPath))
  });
  
 

function createForm(courseOptions, styles, logo, contact) {
    // const form = document.createElement('form');
    // form.id = 'studentDetailsForm';
    // document.body.appendChild(form);
    const formContainer = document.createElement('div');
    formContainer.id = 'formContainer';
    formContainer.classList.add(styles);
    document.body.appendChild(formContainer);
    const header = document.createElement('div');
header.classList.add('formWrapper');
formContainer.insertBefore(header, formContainer.firstChild);
const logoAndContactContainer = document.createElement('div');
logoAndContactContainer.classList.add('logo-contact-container');
header.appendChild(logoAndContactContainer);

// Create and style logo
const logoElement = document.createElement('img');
logoElement.src = logo || 'Careerkick.png'; // replace 'logo.png' with the actual path to your logo image
logoElement.alt = 'Company Logo';
logoElement.classList.add('logo-style'); // add appropriate styles to logo
logoAndContactContainer.appendChild(logoElement);

// Create and style contact number
const contactElement = document.createElement('div');
contactElement.textContent = 'Contact us: ' + contact; // replace with your contact number
contactElement.classList.add('contact-style'); // add appropriate styles to contact number
logoAndContactContainer.appendChild(contactElement);
    const form = document.createElement('form');
    form.id = 'studentDetailsForm';
    form.classList.add('formWrapper');
    formContainer.appendChild(form);
    // const logoElement = document.createElement('img');
    // logoElement.src = logo; // replace 'logo.png' with the actual path to your logo image
    // logoElement.alt = 'Company Logo';
    // logoElement.classList.add('logo-style'); // add appropriate styles to logo
    // header.appendChild(logoElement);

    // // Create and style contact number
    // const contactElement = document.createElement('div');
    // contactElement.textContent = 'Contact us: ' + contact; // replace with your contact number
    // contactElement.classList.add('contact-style'); // add appropriate styles to contact number
    // header.appendChild(contactElement);
    const fieldOptions = [
        { placeholder: "Student's Name:*", inputType: 'text', inputId: 'studentName', inputName: 'studentName', required: true },
        { placeholder: 'Contact No.:*', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
        { placeholder: 'OTP:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
        { placeholder: 'E-mail:*', inputType: 'email', inputId: 'email', inputName: 'email', required: true },
        { placeholder:'Whatsapp No.*:', inputType: 'tel', inputId: 'whatsappNo', inputName: 'whatsappNo', required: true },
        { placeholder: "Guardian's Name:*", inputType: 'text', inputId: 'guardianName', inputName: 'guardianName', required: true },
        // { labelText: 'Address:', inputType: 'textarea', inputId: 'address', inputName: 'address', required: true },
        // { labelText: 'City:', inputType: 'text', inputId: 'city', inputName: 'city', required: true },
        // { labelText: 'State:', inputType: 'text', inputId: 'state', inputName: 'state', required: true }
    ];
  
    fieldOptions.forEach(option => {
        createField(form, option);
    });
    const inlineGroup = document.createElement('div');
      inlineGroup.className = 'inline-group';
  
      createField(inlineGroup, { placeholder: 'District:', inputType: 'text', inputId: 'district', inputName: 'district', required: true });
      createField(inlineGroup, { placeholder: 'State:', inputType: 'text', inputId: 'state', inputName: 'state', required: true });
  
      form.appendChild(inlineGroup);
  
    const courseSelectWrapper = document.createElement('div');
    courseSelectWrapper.className = 'form-group';
    createSelectField(courseSelectWrapper, '', 'courseSelection', 'courseSelection', courseOptions);
    form.appendChild(courseSelectWrapper);
  
    createField(form, { placeholder: 'NEET Score: if not available please fill expected', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true});
    createField(form, { placeholder: 'NEET AIR: if not available please fill expected', inputType: 'number', inputId: 'neetAIR', inputName: 'neetAIR', required: true});
    
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
  function toggleFormStyle(styles) {
    const formContainer = document.getElementById('formContainer');
    formContainer.className = '';
    formContainer.classList.add(styles); 
  }
  function addLogoAndContact(logo, contact) {
    const header = document.createElement('div');
    header.id = 'formHeader';
    document.body.insertBefore(header, document.body.firstChild);

    // Create and style logo
    const logoElement = document.createElement('img');
    logoElement.src = logo; // replace 'logo.png' with the actual path to your logo image
    logoElement.alt = 'Company Logo';
    logoElement.classList.add('logo-style'); // add appropriate styles to logo
    header.appendChild(logoElement);

    // Create and style contact number
    const contactElement = document.createElement('div');
    contactElement.textContent = 'Contact us: ' + contact; // replace with your contact number
    contactElement.classList.add('contact-style'); // add appropriate styles to contact number
    header.appendChild(contactElement);
}
//   function createField(form, field) {
//     // const { labelText, inputType, inputId, inputName, required } = field;
  
//     // const wrapper = document.createElement('div');
//     // wrapper.className = 'form-group';
  
//     // const label = document.createElement('label');
//     // label.textContent = labelText;
//     // label.htmlFor = inputId;
//     // wrapper.appendChild(label);
  
//     // let input;
//     // if (inputType === 'textarea') {
//     //     input = document.createElement('textarea');
//     // } else {
//     //     input = document.createElement('input');
//     //     input.type = inputType;
//     // }
//     // input.id = inputId;
//     // input.name = inputName;
//     // input.required = required;
//     // wrapper.appendChild(input);
  
//     // form.appendChild(wrapper);
    
//   }
function createField(form, field) {
    const { placeholder, inputType, inputId, inputName, required } = field;

    const wrapper = document.createElement('div');
    wrapper.className = 'form-group';

    let input;
    if (inputType === 'textarea') {
        input = document.createElement('textarea');
    } else {
        input = document.createElement('input');
        input.type = inputType;
    }

    input.id = inputId;
    input.name = inputName;
    input.placeholder = placeholder; 
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
    wrapper.className = 'form-group checkbox-group'; // Add the checkbox-group class

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = checkboxId;
    checkbox.classList.add('checkbox-input'); // Add the checkbox-input class

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
        guardianName: document.getElementById('guardianName').value,
        district: document.getElementById('district').value,
        state: document.getElementById('state').value,
        courseSelection: document.getElementById('courseSelection').value,
        neetScore: document.getElementById('neetScore').value,
        neetAIR: document.getElementById('neetAIR').value,
        preferredCollege: document.getElementById('preferredCollege')? document.getElementById('preferredCollege').value : window.location.hostanme,
        agreeCheckbox: document.getElementById('agreeCheckbox').checked,
        formSource: utmData
    };
  
  
    if (formData.courseSelection === "Select Course") {
        alert("Please select a course.");
        return;
    }
    
    // console.log(formData);

    sendData(formData);
  
    const form = document.getElementById('studentDetailsForm');
    form.reset();
  }

const url = 'http://localhost:4000/api/v1/form'





const sendData = async (formData) => {
    const Data = {
        name: formData.studentName,
        contactNumber: formData.contactNo,
        email: formData.email,
        whatsappNumber: formData.whatsappNo,
        guardianName: formData.guardianName,
        district: formData.district,
        state: formData.state,
        courseSelected: formData.courseSelection,
        neetScore: formData.neetScore,
        source: formData.formSource.source,
        sourceId: formData.formSource.sourceId,
        preffredCollege: formData.preffredCollege
    }

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
        alert(msg);
        const form = document.getElementById('studentDetailsForm');
        form.reset();
    } catch (errorData) {
        console.log(errorData);
        alert(errorData);
    }

}