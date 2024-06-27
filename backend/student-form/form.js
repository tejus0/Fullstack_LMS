import { districtData } from "./district.js";
document.addEventListener("DOMContentLoaded", () => {
  // setTimeout(initializeForm, 4000);
  // createFormButton();
  initializeForm();
});

// Initialize Firebase
// const firebaseConfig = {

//   apiKey: "AIzaSyAyRCiW3FdjTZN7KpzWirlALYhwNl1cbMU",
//     authDomain: "lead-9b886.firebaseapp.com",
//     projectId: "lead-9b886",
//     storageBucket: "lead-9b886.appspot.com",
//     messagingSenderId: "299662915818",
//     appId: "1:299662915818:web:84d51f7f351d088a00ff93",
//     measurementId: "G-R53YH8CMSL"
// };

// const firebase= initializeApp(firebaseConfig);
// const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {
  const stateSelect = document.getElementById("state");

  // const stateSelect = document.getElementById('state');
  const districtSelect = document.getElementById("district");

  const defaultStateOption = document.createElement("option");
  defaultStateOption.textContent = "Select State";
  defaultStateOption.value = "";
  stateSelect.appendChild(defaultStateOption);

  const defaultDistrictOption = document.createElement("option");
  defaultDistrictOption.textContent = "Select District";
  defaultDistrictOption.value = "";
  districtSelect.appendChild(defaultDistrictOption);

  districtData.states.forEach((stateObj) => {
    const option = document.createElement("option");
    option.textContent = stateObj.state;
    option.value = stateObj.state;
    stateSelect.appendChild(option);
  });

  // Optional: Add event listener to populate districts based on selected state
  stateSelect.addEventListener("change", () => {
    const selectedState = stateSelect.value;
    // const districtSelect = document.getElementById('district');
    districtSelect.innerHTML = ""; // Clear previous options

    const defaultDistrictOption = document.createElement("option");
    defaultDistrictOption.textContent = "Select District";
    defaultDistrictOption.value = "";
    districtSelect.appendChild(defaultDistrictOption);

    // Populate districts if a state is selected
    if (selectedState) {
      const state = districtData.states.find(
        (stateObj) => stateObj.state === selectedState
      );

      if (state) {
        state.districts.forEach((district) => {
          const option = document.createElement("option");
          option.textContent = district;
          option.value = district;
          districtSelect.appendChild(option);
        });
      }
    }
  });
});

function initializeForm() {
   const scriptElement = document.querySelector('script[src="https://ntechzy.in/api/v1/student-form/form.js"]');
  // const scriptElement = document.querySelector(
    // 'script[src="http://localhost:4000/api/v1/student-form/form.js"]'
  // );

  if (!scriptElement) {
    console.error('Script element with src="Form.js" not found.');
    return;
  }

  const path = scriptElement.getAttribute("path");
  const courses = scriptElement.getAttribute("courses");
  const styles = scriptElement.getAttribute("styles");
  const logo = scriptElement.getAttribute("logo");
  const contact = scriptElement.getAttribute("contact");
  const customStylesheets = scriptElement.getAttribute("customStylesheets");
  const divID = scriptElement.getAttribute("divid");
  if (styles) {
    const customStylesheet = document.querySelectorAll(
      'link[rel="stylesheet"]'
    );
    if (customStylesheet > 0) {
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      styleLink.href = "testStyle.css";
      document.head.prepend(styleLink);
    } else {
      const styleLink = document.createElement("link");
      styleLink.rel = "stylesheet";
      // styleLink.href = "https://abhigyadufare.github.io/dynamicForm/style.css";
      styleLink.href = "https://tejus0.github.io/lmsFormStyle/index.css";

      document.head.prepend(styleLink);
    }
  }
  if (!path || !courses || !divID) {
    console.error("Custom data attribute not found in script element.");
    return;
  }

  const currentPath = window.location.pathname;

  if (JSON.parse(path).includes(currentPath)) {
    createForm(courses, styles, logo, contact, divID);
    toggleFormStyle(styles);
  }

  console.log(path);
  console.log(courses);
  console.log(path.includes(currentPath));
}

function createFormButton() {
  const button = document.createElement("button");
  button.textContent = "Open Form";
  button.addEventListener("click", () => {
    initializeForm();
    button.style.display = "none";
  });
  document.body.appendChild(button);
}

function populateFormFromLocalStorage() {
  const savedFormData = localStorage.getItem("formData");
  if (savedFormData) {
    const formData = JSON.parse(savedFormData);

    document.getElementById("studentName").value = formData.name;
    document.getElementById("contactNo").value = formData.contactNumber;
    document.getElementById("email").value = formData.email;
    document.getElementById("whatsappNo").value = formData.whatsappNumber;
    document.getElementById("guardianName").value = formData.guardianName;
    document.getElementById("district").value = formData.district;
    document.getElementById("state").value = formData.state;
    document.getElementById("courseSelection").value = formData.courseSelected;
    document.getElementById("neetScore").value = formData.neetScore;
    document.getElementById("neetAir").value = formData.neetAIR;
    if (document.getElementById("preferredCollege")) {
      document.getElementById("preferredCollege").value =
        formData.preferredCollege;
    }
    document.getElementById("agreeCheckbox").checked = formData.agreeCheckbox;
  }
}

function createForm(courseOptions, styles, logo, contact, divID) {
  const targetDiv = document.getElementById(divID);
  if (!targetDiv) {
    console.error(`Target div with id=${divID} not found.`);
    return;
  }
  const formContainer = document.createElement("div");
  formContainer.id = "formContainer";
  // formContainer.classList.add(styles);
  formContainer.classList.add("form-container");
  targetDiv.appendChild(formContainer);
  // formContainer.style.backgroundColor = 'blue';
  // document.body.appendChild(formContainer);

  const header = document.createElement("div");
  header.classList.add("formWrapper");
  formContainer.insertBefore(header, formContainer.firstChild);
  const logoAndContactContainer = document.createElement("div");
  logoAndContactContainer.classList.add("logo-contact-container");
  header.appendChild(logoAndContactContainer);

  const logoElement = document.createElement("img");
  logoElement.src =
    logo || "https://abhigyadufare.github.io/dynamicForm/Careerkick.png";
  logoElement.alt = "Company Logo";
  logoElement.classList.add("logo-style");
  logoAndContactContainer.appendChild(logoElement);

  const contactElement = document.createElement("div");
  contactElement.textContent = "Contact us: " + contact;
  contactElement.classList.add("contact-style");
  logoAndContactContainer.appendChild(contactElement);
  const form = document.createElement("form");
  form.id = "studentDetailsForm";
  form.classList.add("formWrapper");
  formContainer.appendChild(form);

  const fieldOptions = [
    {
      placeholder: "Student's Name*",
      inputType: "text",
      inputId: "studentName",
      inputName: "studentName",
      required: true,
    },
    {
      placeholder: "Guardian Name*",
      inputType: "text",
      inputId: "guardianName",
      inputName: "guardianName",
      required: true,
    },
    {
      placeholder: "Contact Number*",
      inputType: "tel",
      inputId: "contactNo",
      inputName: "contactNo",
      required: true,
    },
    // { placeholder: 'OTP:', inputType: 'tel', inputId: 'contactOtp', inputName: 'contactOtp', required: true },
    {
      placeholder: "E-mail*",
      inputType: "email",
      inputId: "email",
      inputName: "email",
      required: true,
    },
    // { placeholder: 'OTP:', inputType: 'tel', inputId: 'contactNo', inputName: 'contactNo', required: true },
    {
      placeholder: "Whatsapp Number*",
      inputType: "tel",
      inputId: "whatsappNo",
      inputName: "whatsappNo",
      required: true,
    },
    {
      placeholder: "State*",
      inputType: "select",
      inputId: "state",
      inputName: "state",
      required: true,
    },
    {
      placeholder: "District*",
      inputType: "select",
      inputId: "district",
      inputName: "district",
      required: true,
    },
    {
      placeholder: "NEET Score*",
      inputType: "number",
      inputId: "neetScore",
      inputName: "neetScore",
      required: true,
    },
    {
      placeholder: "NEET AIR*",
      inputType: "number",
      inputId: "neetAir",
      inputName: "neetAir",
      required: true,
    },
  ];

  fieldOptions.forEach((option) => {
    createField(form, option);
  });

  const courseSelectWrapper = document.createElement("div");
  courseSelectWrapper.className = "form-group";
  form.appendChild(courseSelectWrapper);

  createSelectField(
    courseSelectWrapper,
    "",
    "courseSelection",
    "courseSelection",
    courseOptions
  );

  if (
    window.location.hostname === "ntechzy.in" ||
    window.location.hostname === "localhost" || 
    window.location.hostname === "www.ntechzy.in"
  ) {
    createField(form, {
      placeholder: "Preferred College",
      inputType: "text",
      inputId: "preferredCollege",
      inputName: "preferredCollege",
      required: false,
    });
  }

  const SelectWrapper = document.createElement("div");
  SelectWrapper.className = "form-group";
  createCheckboxField(
    form,
    "I agree to receive information by signing up on Careerkick services",
    "agreeCheckbox"
  );
  form.appendChild(SelectWrapper);
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";
  form.appendChild(buttonContainer);

  //   const sendOtpButton = document.createElement('button');
  // sendOtpButton.textContent = 'Send OTP';
  // sendOtpButton.className = 'send-otp-button';
  // sendOtpButton.addEventListener('click', async () => {
  //   const phoneNumber = document.getElementById('contactNo').value;
  //   try {
  //     await auth.signInWithPhoneNumber(phoneNumber, new firebase.auth.RecaptchaVerifier('recaptcha-container'));
  //     alert('OTP sent!');
  //   } catch (error) {
  //     console.error(error);
  //     alert('Failed to send OTP');
  //   }
  // });
  // form.appendChild(sendOtpButton);

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit";
  submitButton.className = "submit-button";
  form.appendChild(submitButton);
  form.addEventListener("submit", submitForm);

  const neetAIRInput = document.getElementById("neetAir");
  neetAIRInput.addEventListener("input", () => {
    if (neetAIRInput.value < 0) {
      neetAIRInput.value = 0;
    }
  });

  populateFormFromLocalStorage();
}
function toggleFormStyle(styles) {
  const formContainer = document.getElementById("formContainer");
  formContainer.className = "";
  formContainer.classList.add(styles);
}
function addLogoAndContact(logo, contact) {
  const header = document.createElement("div");
  header.id = "header";
  document.body.insertBefore(header, document.body.firstChild);

  const logoElement = document.createElement("img");
  logoElement.src = logo;
  logoElement.alt = "Company Logo";
  logoElement.classList.add("logo-style");
  header.appendChild(logoElement);

  const contactElement = document.createElement("div");
  contactElement.textContent = "Contact us: " + contact;
  contactElement.classList.add("contact-style");
  header.appendChild(contactElement);
}

function createField(form, field) {
  const { placeholder, inputType, inputId, inputName, required } = field;

  const wrapper = document.createElement("div");
  wrapper.className = "form-group";

  if (inputType === "select") {
    const select = document.createElement("select");
    select.id = inputId;
    select.name = inputName;
    select.required = required;

    wrapper.appendChild(select);
  } else {
    const input = document.createElement("input");
    input.type = inputType;
    input.id = inputId;
    input.name = inputName;
    input.placeholder = placeholder;
    input.required = required;

    if (inputType === "number") {
      input.min = "0";
    }

    wrapper.appendChild(input);
  }

  form.appendChild(wrapper);
}

function createSelectField(form, labelText, selectId, selectName, options) {
  const wrapper = document.createElement("div");
  wrapper.className = "form-select";

  const select = document.createElement("select");
  select.id = selectId;
  select.name = selectName;
  select.required = true;

  console.log(options);
  JSON.parse(options).map((optionText) => {
    const option = document.createElement("option");
    option.textContent = optionText;
    option.value = optionText;
    select.appendChild(option);
  });

  wrapper.appendChild(select);
  form.appendChild(wrapper);
}
function createCheckboxField(form, labelText, checkboxId) {
  const wrapper = document.createElement("div");
  wrapper.className = "checkbox-group";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = checkboxId;
  checkbox.classList.add("checkbox-input");

  const label = document.createElement("label");
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

const source =
  getUrlParameter("utm_source") !== null
    ? getUrlParameter("utm_source")
    : window.location.hostname;
const sourceId =
  getUrlParameter("campaign_id") !== null
    ? getUrlParameter("campaign_id")
    : window.location.href;
    const assignedCouns = getUrlParameter("counsId");
    console.log(assignedCouns, "global couns");

async function submitForm(event) {
  event.preventDefault();
  // const counsId = getUrlParameter("counsId");
  // console.log(counsId, 'submitcouns');

  const formData = {
    studentName: document.getElementById("studentName").value,
    contactNo: document.getElementById("contactNo").value,
    email: document.getElementById("email").value,
    whatsappNo: document.getElementById("whatsappNo").value,
    guardianName: document.getElementById("guardianName").value,
    district: document.getElementById("district").value,
    state: document.getElementById("state").value,
    courseSelection: document.getElementById("courseSelection").value,
    neetScore: document.getElementById("neetScore").value,
    neetAir: parseInt(document.getElementById("neetAir").value, 10),
    preferredCollege: document.getElementById("preferredCollege")
      ? document.getElementById("preferredCollege").value
      : source,
    agreeCheckbox: document.getElementById("agreeCheckbox").checked,
    source: source,
    sourceId: sourceId,
    // AssignedCouns: counsId
  };

  if (neetAir < 0) {
    alert("NEET AIR cannot be a negative number.");
    return;
  } else if (formData.courseSelection === "Select Course") {
    alert("Please select a course.");
    return;
  }

  //   const phoneNumber = document.getElementById('contactNo').value;
  // const otp = document.getElementById('otp').value;
  // try {
  //   const confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, new firebase.auth.RecaptchaVerifier('recaptcha-container'));
  //   await confirmationResult.confirm(otp);
  //   alert('OTP verification successful!');
  //   // Continue with your form submission logic
  // } catch (error) {
  //   console.error(error);
  //   alert('Failed to verify OTP');
  // }

  console.log(formData);
  sendData(formData);
}
//  const url = `${window.location.href}/api/v1/form`
// const url = "http://localhost:4000/api/v1/form";


const url = window.location.href.includes('localhost') ? "http://localhost:4000/api/v1/form" : "https://ntechzy.in/api/v1/form"

const sendData = async (formData) => {
  const carlos   = getUrlParameter("counsId");
  console.log(carlos, 'sendcouns');
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
    neetAIR: formData.neetAir,
    source: formData.source,
    sourceId: formData.sourceId,
    preferredCollege: formData.preferredCollege,
    agreeCheckbox: formData.agreeCheckbox,
    AssignedCouns: carlos ===null ? "" : carlos
  };

  // window.localStorage.setItem("")
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Data),
    });

    if (!response.ok) {
      const err = await response.json();
      const errorData = err.message;
      throw new Error(errorData);
    }

    const result = await response.json();
    const msg = result.msg;
    alert(msg, "other in formjs");

    localStorage["formData"] = JSON.stringify(Data);
    // localStorage.setItem('formData', JSON.stringify(formData));

    const form = document.getElementById("studentDetailsForm");
    form.reset();
  } catch (errorData) {
    console.log(errorData);
    alert(errorData, errorData.message);
  }
};
