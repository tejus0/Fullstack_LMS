// document.addEventListener('DOMContentLoaded', () => {
//     // setTimeout(initializeForm, 4000); 
//     // createFormButton(); 
//     initializeForm();
//   });
  
//   function initializeForm() {


//     // const scriptElement = document.querySelector('script[src="https://www.ntechzy.in/api/v1/student-form/form.js"]');
//     const scriptElement = document.querySelector('script[src="http://localhost:4000/api/v1/student-form/form.js"]');
  
//     if (!scriptElement) {
//         console.error('Script element with src="Form.js" not found.');
//         return;
//     }
  
//     const path = scriptElement.getAttribute('path');
//     const courses = scriptElement.getAttribute('courses');
//     const styles = scriptElement.getAttribute('styles');
//     const logo = scriptElement.getAttribute('logo');
//     const contact = scriptElement.getAttribute('contact');
//     const customStylesheets = scriptElement.getAttribute('customStylesheets');
//     if (styles) {
//         const customStylesheet = document.querySelectorAll('link[rel="stylesheet"]');
//         if (customStylesheet > 0) {
//             const styleLink = document.createElement('link');
//             styleLink.rel = 'stylesheet';
//             styleLink.href = "testStyle.css";
//             document.head.prepend(styleLink);
//         } else {
//             const styleLink = document.createElement('link');
//             styleLink.rel = 'stylesheet';
//             styleLink.href = "https://abhigyadufare.github.io/dynamicForm/style.css";
//             document.head.prepend(styleLink);
//         }
//     }
//     if (!path || !courses) {
//         console.error('Custom data attribute not found in script element.');
//         return;
//     }
  
//     const currentPath = window.location.pathname;
  
//     if (JSON.parse(path).includes(currentPath)) {
//         createForm(courses, styles, logo, contact);
//         toggleFormStyle(styles);
//     }
  
//     console.log(path);
//     console.log(courses);
//     console.log(path.includes(currentPath));

//     // const contactNoInput = document.getElementById('contactNo');   /// OTP input
//     // contactNoInput.addEventListener('input', () => {
//     //     const inputValue = contactNoInput.value;
//     //     // Check if input length is 10 digits
//     //     if (inputValue.length === 10) {
//     //         createSendOTPButton();
//     //     } else {
//     //         removeSendOTPButton();
//     //     }
//     // });
//   }

// //   function createSendOTPButton() {
// //     const sendOTPButton = document.createElement('button');
// //     sendOTPButton.textContent = 'Send OTP';
// //     sendOTPButton.id = 'sendOTPButton';
// //     sendOTPButton.addEventListener('click', () => {
// //         // Add your logic to send OTP here
// //     });

// //     // Append the button to a container element
// //     const buttonContainer = document.getElementById('buttonContainer'); // Assuming you have a container element with id 'buttonContainer'
// //     buttonContainer.appendChild(sendOTPButton);
// // }

// // function removeSendOTPButton() {
// //     const sendOTPButton = document.getElementById('sendOTPButton');
// //     if (sendOTPButton) {
// //         sendOTPButton.remove();
// //     }
// // }
  
//   function createFormButton() {
//     const button = document.createElement('button');
//     button.textContent = 'Open Form';
//     button.addEventListener('click', () => {
//         initializeForm();
//         button.style.display = 'none'; 
//     });
//     document.body.appendChild(button);
//   }
//   function createForm(courseOptions, styles, logo, contact) {
//       // const form = document.createElement('form');
//       // form.id = 'studentDetailsForm';
//       // document.body.appendChild(form);
//       // const overlay = document.createElement('div');
//       // overlay.classList.add('overlay');
//       // document.body.appendChild(overlay);
//       const formContainer = document.createElement('div');
//       formContainer.id = 'formContainer';
//       // formContainer.classList.add(styles);
//       formContainer.classList.add('form-container'); 
//       // formContainer.style.backgroundColor = 'blue';
//       document.body.appendChild(formContainer);
      
//       const header = document.createElement('div');
//   header.classList.add('formWrapper');
//   formContainer.insertBefore(header, formContainer.firstChild);
//   const logoAndContactContainer = document.createElement('div');
//   logoAndContactContainer.classList.add('logo-contact-container');
//   header.appendChild(logoAndContactContainer);
  
  
//   const logoElement = document.createElement('img');
//   logoElement.src = logo || 'https://abhigyadufare.github.io/dynamicForm/Careerkick.png'; 
//   logoElement.alt = 'Company Logo';
//   logoElement.classList.add('logo-style'); 
//   logoAndContactContainer.appendChild(logoElement);
  
  
//   const contactElement = document.createElement('div');
//   contactElement.textContent = 'Contact us: ' + contact; 
//   contactElement.classList.add('contact-style'); 
//   logoAndContactContainer.appendChild(contactElement);
//       const form = document.createElement('form');
//       form.id = 'studentDetailsForm';
//       form.classList.add('formWrapper');
//       formContainer.appendChild(form);
     
//       const fieldOptions = [
//           { placeholder: "Student's Name:*", inputType: 'text', inputId: 'studentName', inputName: 'studentName', required: true },
//           { placeholder: "Guardian Name:*", inputType: 'text', inputId: 'guardianName', inputName: 'guardianName', required: true },
//           { placeholder: 'Contact No.:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
//           // { placeholder: 'OTP:', inputType: 'tel', inputId: 'contactOtp', inputName: 'contactOtp', required: true },
//           { placeholder: 'E-mail:', inputType: 'email', inputId: 'email', inputName: 'email', required: true },
//           // { placeholder: 'OTP:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
//           { placeholder:'Whatsapp No.:', inputType: 'tel', inputId: 'whatsappNo', inputName: 'whatsappNo', required: false },
//           { placeholder:'District:', inputType: 'text', inputId: 'district', inputName:'district', required: false },
//           { placeholder:'State:', inputType: 'text', inputId: 'state', inputName:'state', required: false },
//           { placeholder: 'NEET Score:', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true},
//           { placeholder: 'NEET AIR:', inputType: 'number', inputId: 'neetAir', inputName: 'neetAir', required: true},
      
//       ];
    
//       fieldOptions.forEach(option => {
//           createField(form, option);
//       });
//       // const inlineGroup = document.createElement('div');
//       //   inlineGroup.className = 'inline-group';
    
//       //   createField(inlineGroup, { placeholder: 'District:', inputType: 'text', inputId: 'city', inputName: 'city', required: true });
//       //   createField(inlineGroup, { placeholder: 'State:', inputType: 'text', inputId: 'state', inputName: 'state', required: true });
    
//       //   form.appendChild(inlineGroup);
        
    
//       const courseSelectWrapper = document.createElement('div');
//       courseSelectWrapper.className = 'form-group'; 
//       form.appendChild(courseSelectWrapper);
  
      
//       createSelectField(courseSelectWrapper, '', 'courseSelection', 'courseSelection', courseOptions);
  
//       // createField(form, { placeholder: 'NEET Score:', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true});
//       // createField(form, { placeholder: 'NEET AIR:', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true});
      
//       if (window.location.hostname === 'ntechzy.in' || window.location.hostname === 'www.ntechzy.in') {
//         createField(form, { labelText: 'Preferred College:', inputType: 'text', inputId: 'preferredCollege', inputName: 'preferredCollege', required: true });
//     }
    
//     const SelectWrapper = document.createElement('div');
//     SelectWrapper.className = 'form-group';
//       createCheckboxField(form, 'I agree to receive information by signing up on Careerkick services', 'agreeCheckbox');
//       form.appendChild(SelectWrapper);
//       const buttonContainer = document.createElement('div');
//       buttonContainer.className = 'button-container';
//       form.appendChild(buttonContainer);
//       const submitButton = document.createElement('button');
//         submitButton.type = 'submit';
//         submitButton.textContent = 'Submit';
//         submitButton.className = 'submit-button';
//         form.appendChild(submitButton);
//         form.addEventListener('submit', submitForm);
        
  
//     }
//     function toggleFormStyle(styles) {
//       const formContainer = document.getElementById('formContainer');
//       formContainer.className = '';
//       formContainer.classList.add(styles); 
//     }
//     function addLogoAndContact(logo, contact) {
//       const header = document.createElement('div');
//       header.id = 'header';
//       document.body.insertBefore(header, document.body.firstChild);
  
      
//       const logoElement = document.createElement('img');
//       logoElement.src = logo; 
//       logoElement.alt = 'Company Logo';
//       logoElement.classList.add('logo-style'); 
//       header.appendChild(logoElement);
  
    
//       const contactElement = document.createElement('div');
//       contactElement.textContent = 'Contact us: ' + contact; 
//       contactElement.classList.add('contact-style'); 
//       header.appendChild(contactElement);
//   }
//   //   function createField(form, field) {
//   //     // const { labelText, inputType, inputId, inputName, required } = field;
    
//   //     // const wrapper = document.createElement('div');
//   //     // wrapper.className = 'form-group';
    
//   //     // const label = document.createElement('label');
//   //     // label.textContent = labelText;
//   //     // label.htmlFor = inputId;
//   //     // wrapper.appendChild(label);
    
//   //     // let input;
//   //     // if (inputType === 'textarea') {
//   //     //     input = document.createElement('textarea');
//   //     // } else {
//   //     //     input = document.createElement('input');
//   //     //     input.type = inputType;
//   //     // }
//   //     // input.id = inputId;
//   //     // input.name = inputName;
//   //     // input.required = required;
//   //     // wrapper.appendChild(input);
    
//   //     // form.appendChild(wrapper);
      
//   //   }
//   function createField(form, field) {
//       const { placeholder, inputType, inputId, inputName, required } = field;
  
//       const wrapper = document.createElement('div');
//       wrapper.className = 'form-group';
  
//       let input;
//       if (inputType === 'textarea') {
//           input = document.createElement('textarea');
//       } else {
//           input = document.createElement('input');
//           input.type = inputType;
//       }
  
//       input.id = inputId;
//       input.name = inputName;
//       input.placeholder = placeholder; 
//       input.required = required;
  
//       wrapper.appendChild(input);
//       form.appendChild(wrapper);
//   }
  
    
//     function createSelectField(form, labelText, selectId, selectName, options) {
//       const wrapper = document.createElement('div');
//       wrapper.className = 'form-select';
    
//       // const label = document.createElement('label');
//       // label.textContent = labelText;
//       // label.htmlFor = selectId;
//       // wrapper.appendChild(label);
    
//       const select = document.createElement('select');
//       select.id = selectId;
//       select.name = selectName;
//       select.required = true;
  
//       console.log(options);
//       JSON.parse(options).map((optionText) => {
//           const option = document.createElement('option');
//           option.textContent = optionText;
//           option.value = optionText;
//           select.appendChild(option);
//       });
    
//       wrapper.appendChild(select);
//       form.appendChild(wrapper);
//     }
//     function createCheckboxField(form, labelText, checkboxId) {
//       const wrapper = document.createElement('div');
//       wrapper.className = 'checkbox-group'; 
  
//       const checkbox = document.createElement('input');
//       checkbox.type = 'checkbox';
//       checkbox.id = checkboxId;
//       checkbox.classList.add('checkbox-input'); 
  
//       const label = document.createElement('label');
//       label.textContent = labelText;
//       label.htmlFor = checkboxId;
  
//       wrapper.appendChild(checkbox);
//       wrapper.appendChild(label);
  
//       form.appendChild(wrapper);
//   }
  
  
  
//     function getUrlParameter(name) {
//       const urlParams = new URLSearchParams(window.location.search);
//       return urlParams.get(name);
//     }
  
//     // const utmData = {
//     //   source: getUrlParameter('utm_source') ? getUrlParameter('utm_source') : window.location.hostname,
//     //   sourceId: getUrlParameter('campaign_id') ? getUrlParameter('capaign_id') : window.location.href
//     // };
//     const source = getUrlParameter('utm_source') !== null ? getUrlParameter('utm_source') : window.location.hostname;
//     const sourceId = getUrlParameter('campaign_id') !== null ? getUrlParameter('campaign_id') : window.location.href;
  
//     // const mobileOtp = document.getElementById('contactOtp');   1
  
  
//   // mobileOtp.addEventListener('input', function() {
  
//   //   const inputValue = this.value;
  
//   //   if (inputValue.length === 6) {
  
//   //     // Call the function when 6 numbers are typed
  
//   //     myFunction();
  
//   //   }
  
//   // });
  
  
//   // function myFunction() {
  
//   //   console.log('6 numbers typed!');
  
//   //   // Add your code here
  
//   // }
  
//     function submitForm(event) {
//       event.preventDefault(); 
    
//       const formData = {
//           studentName: document.getElementById('studentName').value,
//           contactNo: document.getElementById('contactNo').value,
//           email: document.getElementById('email').value,
//           whatsappNo: document.getElementById('whatsappNo').value,
//           guardianName: document.getElementById('guardianName').value,
//           district: document.getElementById('district').value,
//           state: document.getElementById('state').value,
//           courseSelection: document.getElementById('courseSelection').value,
//           neetScore: document.getElementById('neetScore').value,
//           neetAir: document.getElementById('neetAir').value,
//           preferredCollege: document.getElementById('preferredCollege') ? document.getElementById('preferredCollege').value : source,
//           agreeCheckbox: document.getElementById('agreeCheckbox').checked,
//           source: source,
//           sourceId: sourceId
//       };
    
//       console.log(formData);
    
//       if (formData.courseSelection === "Select Course") {
//           alert("Please select a course.");
//           return;
//       }
      
//       console.log(formData);
//       sendData(formData)
    
//       // const form = document.getElementById('studentDetailsForm');
//       // form.reset();
//     }
  
//   // const url = 'https://www.ntechzy.in/api/v1/form'
//   const url = 'http://localhost:4000/api/v1/form'
  
  
  
  
  
//   const sendData = async (formData) => {
//       const Data = {
//         name: formData.studentName,
//         contactNumber: formData.contactNo,
//         email: formData.email,
//         whatsappNumber: formData.whatsappNo,
//         guardianName: formData.guardianName,
//         district: formData.district,
//         state: formData.state,
//         courseSelected: formData.courseSelection,
//         neetScore: formData.neetScore,
//         neetAIR: formData.neetAir,
//         source: formData.source,
//         sourceId: formData.sourceId,
//         preferredCollege: formData.preferredCollege
//       }
  
//       try {
//           const response = await fetch(url, {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify(Data),
//           });
  
//           if (!response.ok) {
//               const err = await response.json();
//               const errorData = err.message
//               throw new Error(errorData);
//           }
  
//           const result = await response.json();
//           const msg = result.msg
//           alert(msg);
//           const form = document.getElementById('studentDetailsForm');
//           form.reset();
//       } catch (errorData) {
//           console.log(errorData);
//           alert(errorData);
//       }
  
//   }
    
    
// suhani script with modal and button

// document.addEventListener('DOMContentLoaded', () => {
//   // setTimeout(initializeForm, 4000); 
//   createFormButton(); 
//    console.log('DOMContentLoaded event fired');
//   // initializeForm();
// });

// function initializeForm() {
//     console.log('initializeForm called');
//   const scriptElement = document.querySelector('script[src="Form.js"]');

//   if (!scriptElement) {
//       console.error('Script element with src="Form.js" not found.');
//       return;
//   }

//   const path = scriptElement.getAttribute('path');
//   const courses = scriptElement.getAttribute('courses');
//   const styles = scriptElement.getAttribute('styles');
//   const logo = scriptElement.getAttribute('logo');
//   const contact = scriptElement.getAttribute('contact');
//   const customStylesheets = scriptElement.getAttribute('customStylesheets');
//   if (styles) {
//       const customStylesheet = document.querySelectorAll('link[rel="stylesheet"]');
//       if (customStylesheet > 0) {
//           const styleLink = document.createElement('link');
//           styleLink.rel = 'stylesheet';
//           styleLink.href = "testStyle.css";
//           document.head.prepend(styleLink);
//       } else {
//           const styleLink = document.createElement('link');
//           styleLink.rel = 'stylesheet';
//           styleLink.href = "style.css";
//           document.head.prepend(styleLink);
//       }
//   }
//   if (!path || !courses) {
//       console.error('Custom data attribute not found in script element.');
//       return;
//   }

//   const currentPath = window.location.pathname;
// console.log('Current path:', currentPath);
//   try {
//       if (JSON.parse(path).includes(currentPath)) {
//           console.log('Path matches, creating form'); // Debugging log
//           createForm(courses, styles, logo, contact);
//           toggleFormStyle(styles);
//       } else {
//           console.log('Path does not match'); // Debugging log
//       }
//   } catch (e) {
//       console.error('Error parsing path attribute:', e);
//   }
// }

// function createFormButton() {
//   const button = document.createElement('button');
//   button.textContent = 'Open Form';
//   button.addEventListener('click', () => {
//        console.log('Form button clicked');
//       initializeForm();
//       button.style.display = 'none'; 
//   });
//   document.body.appendChild(button);
// }
// function createForm(courseOptions, styles, logo, contact) {
//     // const form = document.createElement('form');
//     // form.id = 'studentDetailsForm';
//     // document.body.appendChild(form);
//     // const overlay = document.createElement('div');
//     // overlay.classList.add('overlay');
//     // document.body.appendChild(overlay);
//     const formContainer = document.createElement('div');
//     formContainer.id = 'formContainer';
//     // formContainer.classList.add(styles);
//     formContainer.classList.add('form-container'); 
//     // formContainer.style.backgroundColor = 'blue';
//     document.body.appendChild(formContainer);
    
//     const header = document.createElement('div');
// header.classList.add('formWrapper');
// formContainer.insertBefore(header, formContainer.firstChild);
// const logoAndContactContainer = document.createElement('div');
// logoAndContactContainer.classList.add('logo-contact-container');
// header.appendChild(logoAndContactContainer);


// const logoElement = document.createElement('img');
// logoElement.src = logo || 'Careerkick.png'; 
// logoElement.alt = 'Company Logo';
// logoElement.classList.add('logo-style'); 
// logoAndContactContainer.appendChild(logoElement);


// const contactElement = document.createElement('div');
// contactElement.textContent = 'Contact us: ' + contact; 
// contactElement.classList.add('contact-style'); 
// logoAndContactContainer.appendChild(contactElement);
//     const form = document.createElement('form');
//     form.id = 'studentDetailsForm';
//     form.classList.add('formWrapper');
//     formContainer.appendChild(form);
   
//     const fieldOptions = [
//         { placeholder: "Student's Name:", inputType: 'text', inputId: 'studentName', inputName: 'studentName', required: true },
//         { placeholder: "Father's Name:", inputType: 'text', inputId: 'fatherName', inputName: 'fatherName', required: true },
//         { placeholder: 'Contact No.:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
//         { placeholder: 'OTP:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
//         { placeholder: 'E-mail:', inputType: 'email', inputId: 'email', inputName: 'email', required: true },
//         // { placeholder: 'OTP:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
//         { placeholder:'Whatsapp No.:', inputType: 'tel', inputId: 'whatsappNo', inputName: 'whatsappNo', required: false },
//         { placeholder:'District:', inputType: 'text', inputId: 'city', inputName:'city', required: false },
//         { placeholder:'State:', inputType: 'text', inputId: 'state', inputName:'state', required: false },
//         { placeholder: 'NEET Score:', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true},
//         { placeholder: 'NEET AIR:', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true},
    
//     ];
  
//     fieldOptions.forEach(option => {
//         createField(form, option);
//     });
//     // const inlineGroup = document.createElement('div');
//     //   inlineGroup.className = 'inline-group';
  
//     //   createField(inlineGroup, { placeholder: 'District:', inputType: 'text', inputId: 'city', inputName: 'city', required: true });
//     //   createField(inlineGroup, { placeholder: 'State:', inputType: 'text', inputId: 'state', inputName: 'state', required: true });
  
//     //   form.appendChild(inlineGroup);
      
  
//     const courseSelectWrapper = document.createElement('div');
//     courseSelectWrapper.className = 'form-group full-width'; 
//     form.appendChild(courseSelectWrapper);

    
//     createSelectField(courseSelectWrapper, '', 'courseSelection', 'courseSelection', courseOptions);

//     // createField(form, { placeholder: 'NEET Score:', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true});
//     // createField(form, { placeholder: 'NEET AIR:', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true});
    
//     if (window.location.hostname === 'abhigyadufare.github.io') {
//       createField(form, { labelText: 'Preferred College:', inputType: 'text', inputId: 'preferredCollege', inputName: 'preferredCollege', required: true });
//   }
  
//   const SelectWrapper = document.createElement('div');
//   SelectWrapper.className = 'form-group';
//     createCheckboxField(form, 'I agree to receive information by signing up on Careerkick services', 'agreeCheckbox');
//     form.appendChild(SelectWrapper);
//     const buttonContainer = document.createElement('div');
//     buttonContainer.className = 'button-container';
//     form.appendChild(buttonContainer);
//     const submitButton = document.createElement('button');
//       submitButton.type = 'submit';
//       submitButton.textContent = 'Submit';
//       submitButton.className = 'submit-button';
//       form.appendChild(submitButton);
//       form.addEventListener('submit', submitForm);
      

//   }
//   function toggleFormStyle(styles) {
//     const formContainer = document.getElementById('formContainer');
//     formContainer.className = '';
//     formContainer.classList.add(styles); 
//   }
//   function addLogoAndContact(logo, contact) {
//     const header = document.createElement('div');
//     header.id = 'header';
//     document.body.insertBefore(header, document.body.firstChild);

    
//     const logoElement = document.createElement('img');
//     logoElement.src = logo; 
//     logoElement.alt = 'Company Logo';
//     logoElement.classList.add('logo-style'); 
//     header.appendChild(logoElement);

  
//     const contactElement = document.createElement('div');
//     contactElement.textContent = 'Contact us: ' + contact; 
//     contactElement.classList.add('contact-style'); 
//     header.appendChild(contactElement);
// }
// //   function createField(form, field) {
// //     // const { labelText, inputType, inputId, inputName, required } = field;
  
// //     // const wrapper = document.createElement('div');
// //     // wrapper.className = 'form-group';
  
// //     // const label = document.createElement('label');
// //     // label.textContent = labelText;
// //     // label.htmlFor = inputId;
// //     // wrapper.appendChild(label);
  
// //     // let input;
// //     // if (inputType === 'textarea') {
// //     //     input = document.createElement('textarea');
// //     // } else {
// //     //     input = document.createElement('input');
// //     //     input.type = inputType;
// //     // }
// //     // input.id = inputId;
// //     // input.name = inputName;
// //     // input.required = required;
// //     // wrapper.appendChild(input);
  
// //     // form.appendChild(wrapper);
    
// //   }
// function createField(form, field) {
//     const { placeholder, inputType, inputId, inputName, required } = field;

//     const wrapper = document.createElement('div');
//     wrapper.className = 'form-group';

//     let input;
//     if (inputType === 'textarea') {
//         input = document.createElement('textarea');
//     } else {
//         input = document.createElement('input');
//         input.type = inputType;
//     }

//     input.id = inputId;
//     input.name = inputName;
//     input.placeholder = placeholder; 
//     input.required = required;

//     wrapper.appendChild(input);
//     form.appendChild(wrapper);
// }

  
//   function createSelectField(form, labelText, selectId, selectName, options) {
//     const wrapper = document.createElement('div');
//     wrapper.className = 'form-select';
  
//     // const label = document.createElement('label');
//     // label.textContent = labelText;
//     // label.htmlFor = selectId;
//     // wrapper.appendChild(label);
  
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
//   }
//   function createCheckboxField(form, labelText, checkboxId) {
//     const wrapper = document.createElement('div');
//     wrapper.className = 'checkbox-group'; 

//     const checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.id = checkboxId;
//     checkbox.classList.add('checkbox-input'); 

//     const label = document.createElement('label');
//     label.textContent = labelText;
//     label.htmlFor = checkboxId;

//     wrapper.appendChild(checkbox);
//     wrapper.appendChild(label);

//     form.appendChild(wrapper);
// }


//   function getUrlParameter(name) {
//     const urlParams = new URLSearchParams(window.location.search);
//     return urlParams.get(name);
//   }

//   const utmData = {
//     source: getUrlParameter('utm_source'),
//     sourceId: getUrlParameter('campaign_id')
//   };

//   function submitForm(event) {
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
//         preferredCollege: document.getElementById('preferredCollege').value,
//         agreeCheckbox: document.getElementById('agreeCheckbox').checked,
//         formSource: utmData
//     };
  
  
//     if (formData.courseSelection === "Select Course") {
//         alert("Please select a course.");
//         return;
//     }
    
//     console.log(formData);
  
//     const form = document.getElementById('studentDetailsForm');
//     form.reset();
//   }

document.addEventListener('DOMContentLoaded', () => {
  const scriptElement = document.querySelector('script[src="https://suhanigupta03.github.io/lms-final/Form.js"]');
  const pattern = scriptElement.getAttribute('pattern');
  if(pattern==='popup')
    {
  setTimeout(() => {                                   
    initializeForm();                       
    openModal();                  
  }, 4000);
  createModal(); 
}
if(pattern==='button-modal')
  {
  createFormButton();
  createModal(); 
  }
  if(pattern==='basic')
    {
  BasicinitializeForm();
    }
  console.log('DOMContentLoaded event fired');
});
 
function createModal() {
  const modalOverlay = document.createElement('div');
  modalOverlay.id = 'modalOverlay';
  modalOverlay.classList.add('modal-overlay');
  modalOverlay.style.display = 'none'; 

  const modalContent = document.createElement('div'); 
  modalContent.id = 'modalContent';
  modalContent.classList.add('modal-content');

  const closeButton = document.createElement('span');
  closeButton.id = 'closeButton';
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', closeModal);

  modalContent.appendChild(closeButton);
  modalOverlay.appendChild(modalContent);
  document.body.appendChild(modalOverlay);
}

function openModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.style.display = 'flex';
}

function closeModal() {
  const modalOverlay = document.getElementById('modalOverlay');
  modalOverlay.style.display = 'none';
}

function initializeForm() {
  console.log('initializeForm called');
  const modalContent = document.getElementById('modalContent');

  
  modalContent.innerHTML = '';

  // Close button
  const closeButton = document.createElement('span');
  closeButton.id = 'closeButton';
  closeButton.classList.add('close-button');
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', closeModal);

  modalContent.appendChild(closeButton);

  const scriptElement = document.querySelector('script[src="https://suhanigupta03.github.io/lms-final/Form.js"]');

  if (!scriptElement) {
    console.error('Script element with src="https://suhanigupta03.github.io/lms-final/Form.js" not found.');
    return;
  }

  const path = scriptElement.getAttribute('path');
  const courses = scriptElement.getAttribute('courses');
  const styles = scriptElement.getAttribute('styles');
  const logo = scriptElement.getAttribute('logo');
  const contact = scriptElement.getAttribute('contact');
  const customStylesheets = scriptElement.getAttribute('customStylesheets');

  if (styles) {
          const customStylesheet = document.querySelectorAll('link[rel="stylesheet"]');
          if (customStylesheet > 0) {
              const styleLink = document.createElement('link');
              styleLink.rel = 'stylesheet';
              styleLink.href = "https://suhanigupta03.github.io/lms-final/testStyle.css";
              document.head.prepend(styleLink);
          } else {
              const styleLink = document.createElement('link');
              styleLink.rel = 'stylesheet';
              styleLink.href = "https://suhanigupta03.github.io/lms-final/style.css";
              document.head.prepend(styleLink);
          }
      }

  if (!path || !courses) {
    console.error('Custom data attribute not found in script element.');
    return;
  }

  const currentPath = window.location.pathname;
  console.log('Current path:', currentPath);

  try {
    if (JSON.parse(path).includes(currentPath)) {
      console.log('Path matches, creating form'); 
      createForm(courses, styles, logo, contact);
      toggleFormStyle(styles);
      openModal(); 
    } else {
      console.log('Path does not match');
    }
  } catch (e) {
    console.error('Error parsing path attribute:', e);
  }
}

function createFormButton() {
  const button = document.createElement('button');
  button.textContent = 'Open Form';
  button.addEventListener('click', () => {
    console.log('Form button clicked');
    initializeForm();
    button.style.display = 'none';
  });
  document.body.appendChild(button);
}

function createForm(courseOptions, styles, logo, contact) {
  const formContainer = document.createElement('div');
  formContainer.id = 'formContainer';
  formContainer.classList.add('form-container');
  document.getElementById('modalContent').appendChild(formContainer); 
  const header = document.createElement('div');
  header.classList.add('formWrapper');
  formContainer.insertBefore(header, formContainer.firstChild);
  const logoAndContactContainer = document.createElement('div');
  logoAndContactContainer.classList.add('logo-contact-container');
  header.appendChild(logoAndContactContainer);

  const logoElement = document.createElement('img');
  logoElement.src = logo || 'https://suhanigupta03.github.io/lms-final/Careerkick.png';
  console.log("careerkick logo");
  logoElement.alt = 'Company Logo';
  logoElement.classList.add('logo-style');
  logoAndContactContainer.appendChild(logoElement);

  const contactElement = document.createElement('div');
  contactElement.textContent = 'Contact us: ' + contact;
  contactElement.classList.add('contact-style');
  logoAndContactContainer.appendChild(contactElement);

  const form = document.createElement('form');
  form.id = 'studentDetailsForm';
  form.classList.add('formWrapper');
  formContainer.appendChild(form);

  const fieldOptions = [
    { placeholder: "Student's Name:", inputType: 'text', inputId: 'studentName', inputName: 'studentName', required: true },
    { placeholder: "Father's Name:", inputType: 'text', inputId: 'fatherName', inputName: 'fatherName', required: true },
    { placeholder: 'Contact No.:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
    { placeholder: 'E-mail:', inputType: 'email', inputId: 'email', inputName: 'email', required: true },
    { placeholder: 'Whatsapp No.:', inputType: 'tel', inputId: 'whatsappNo', inputName: 'whatsappNo', required: false },
    { placeholder: 'District:', inputType: 'text', inputId: 'city', inputName: 'city', required: false },
    { placeholder: 'State:', inputType: 'text', inputId: 'state', inputName: 'state', required: false },
    { placeholder: 'NEET Score:', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true },
    { placeholder: 'NEET AIR:', inputType: 'number', inputId: 'neetAir', inputName: 'neetAir', required: true },
  ];

  fieldOptions.forEach(option => {
    createField(form, option);
  });

  const courseSelectWrapper = document.createElement('div');
  courseSelectWrapper.className = 'form-group full-width';
  form.appendChild(courseSelectWrapper);

  createSelectField(courseSelectWrapper, '', 'courseSelection', 'courseSelection', courseOptions);

  if (window.location.hostname === 'abhigyadufare.github.io') {
    createField(form, { placeholder: 'Preferred College:', inputType: 'text', inputId: 'preferredCollege', inputName: 'preferredCollege', required: true });
  }

  createCheckboxField(form, 'I agree to receive information by signing up on Careerkick services', 'agreeCheckbox');

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
  form.appendChild(buttonContainer);

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

function createSelectField(form, label, inputId, inputName, options) {
  const wrapper = document.createElement('div');
  wrapper.className = 'form-group full-width';

  const select = document.createElement('select');
  select.id = inputId;
  select.name = inputName;

  options = JSON.parse(options);
  options.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.textContent = option;
    select.appendChild(optionElement);
  });

  wrapper.appendChild(select);
  form.appendChild(wrapper);
}

function createCheckboxField(form, label, inputId) {
  const wrapper = document.createElement('div');
  wrapper.className = 'form-group checkbox-group';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = inputId;
  checkbox.name = inputId;
  checkbox.className = 'checkbox-input';

  const checkboxLabel = document.createElement('label');
  checkboxLabel.htmlFor = inputId;
  checkboxLabel.textContent = label;

  wrapper.appendChild(checkbox);
  wrapper.appendChild(checkboxLabel);
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
    neetAir: document.getElementById('neetAir').value,
    preferredCollege: document.getElementById('preferredCollege').value
  };

  

  console.log('Form submitted:', formData);
  closeModal();
}

function BasicinitializeForm() {
  console.log('initializeForm called');

  const scriptElement = document.querySelector('script[src="https://suhanigupta03.github.io/lms-final/Form.js"]');

  if (!scriptElement) {
    console.error('Script element with src="https://suhanigupta03.github.io/lms-final/Form.js" not found.');
    return;
  }

  const path = scriptElement.getAttribute('path');
  const courses = scriptElement.getAttribute('courses');
  const styles = scriptElement.getAttribute('styles');
  const logo = scriptElement.getAttribute('logo');
  const contact = scriptElement.getAttribute('contact');
  const customStylesheets = scriptElement.getAttribute('customStylesheets');
  if (styles) {
          const customStylesheet = document.querySelectorAll('link[rel="stylesheet"]');
          if (customStylesheet > 0) {
              const styleLink = document.createElement('link');
              styleLink.rel = 'stylesheet';
              styleLink.href = "https://suhanigupta03.github.io/lms-final/testStyle.css";
              document.head.prepend(styleLink);
          } else {
              const styleLink = document.createElement('link');
              styleLink.rel = 'stylesheet';
              styleLink.href = "https://suhanigupta03.github.io/lms-final/style.css";
              document.head.prepend(styleLink);
          }
      }

  if (!path || !courses) {
    console.error('Custom data attribute not found in script element.');
    return;
  }

  const currentPath = window.location.pathname;
  console.log('Current path:', currentPath);

  try {
    if (JSON.parse(path).includes(currentPath)) {
      console.log('Path matches, creating form'); 
      BasiccreateForm(courses, styles, logo, contact);
      toggleFormStyle(styles);
    } else {
      console.log('Path does not match');
    }
  } catch (e) {
    console.error('Error parsing path attribute:', e);
  }
}

function BasiccreateForm(courseOptions, styles, logo, contact) {
  const formContainer = document.createElement('div');
  formContainer.id = 'formContainer';
  formContainer.classList.add('form-container');
  document.body.appendChild(formContainer); 
  
  const header = document.createElement('div');
  header.classList.add('formWrapper');
  formContainer.appendChild(header); 
  
  const logoAndContactContainer = document.createElement('div');
  logoAndContactContainer.classList.add('logo-contact-container');
  header.appendChild(logoAndContactContainer);

  const logoElement = document.createElement('img');
  logoElement.src = logo || 'https://suhanigupta03.github.io/lms-final/Careerkick.png';
  console.log("careerkick logo");
  logoElement.alt = 'Company Logo';
  logoElement.classList.add('logo-style');
  logoAndContactContainer.appendChild(logoElement);

  const contactElement = document.createElement('div');
  contactElement.textContent = 'Contact us: ' + contact;
  contactElement.classList.add('contact-style');
  logoAndContactContainer.appendChild(contactElement);

  const form = document.createElement('form');
  form.id = 'studentDetailsForm';
  form.classList.add('formWrapper');
  formContainer.appendChild(form);

  const fieldOptions = [
    { placeholder: "Student's Name:", inputType: 'text', inputId: 'studentName', inputName: 'studentName', required: true },
    { placeholder: "Father's Name:", inputType: 'text', inputId: 'fatherName', inputName: 'fatherName', required: true },
    { placeholder: 'Contact No.:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
    { placeholder: 'E-mail:', inputType: 'email', inputId: 'email', inputName: 'email', required: true },
    { placeholder: 'Whatsapp No.:', inputType: 'tel', inputId: 'whatsappNo', inputName: 'whatsappNo', required: false },
    { placeholder: 'District:', inputType: 'text', inputId: 'city', inputName: 'city', required: false },
    { placeholder: 'State:', inputType: 'text', inputId: 'state', inputName: 'state', required: false },
    { placeholder: 'NEET Score:', inputType: 'number', inputId: 'neetScore', inputName: 'neetScore', required: true },
    { placeholder: 'NEET AIR:', inputType: 'number', inputId: 'neetAir', inputName: 'neetAir', required: true },
  ];

  fieldOptions.forEach(option => {
    createField(form, option);
  });

  const courseSelectWrapper = document.createElement('div');
  courseSelectWrapper.className = 'form-group full-width';
  form.appendChild(courseSelectWrapper);

  createSelectField(courseSelectWrapper, '', 'courseSelection', 'courseSelection', courseOptions);

  if (window.location.hostname === 'abhigyadufare.github.io') {
    createField(form, { placeholder: 'Preferred College:', inputType: 'text', inputId: 'preferredCollege', inputName: 'preferredCollege', required: true });
  }

  createCheckboxField(form, 'I agree to receive information by signing up on Careerkick services', 'agreeCheckbox');

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'button-container';
  form.appendChild(buttonContainer);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Submit';
  submitButton.className = 'submit-button';
  form.appendChild(submitButton);

  form.addEventListener('submit', submitForm);
}