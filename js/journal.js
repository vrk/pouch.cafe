const PROD_ENDPOINT = 'https://lively-phoenix-d82365.netlify.app/.netlify/functions/journalsubmit';
// const DEV_ENDPOINT = 'http://localhost:8888/.netlify/functions/journalsubmit'

const ENDPOINT = PROD_ENDPOINT;

const MB_IN_BYTES = 1000000;
const MAX_FILE_SIZE_IN_BYTES = 5 * MB_IN_BYTES; // 5 mb


const form = document.getElementById('journalsubmit');
const spinner = document.getElementById('submitting');
const formError = document.getElementById('submitting-error');
form.addEventListener('submit', async (event) => {  
  event.preventDefault();
  spinner.hidden = false;
  formError.hidden = true;

  const journallayout = document.getElementById("journal-img-input");
  const formData  = new FormData();
  formData.append('name', document.getElementById('name').value);
  formData.append('email', document.getElementById('email').value);
  formData.append("journallayout", journallayout.files[0]);
  const desc = document.getElementById('layout-description').value;
  if (desc && desc.trim().length > 0) {
    formData.append('layoutdescription', desc);
  }
  const social = document.getElementById('social-media').value;
  if (social && social.trim().length > 0) {
    formData.append('socialmedia', social);
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      body: formData
    });
    if (response.status === 200) {
      spinner.hidden = true;
      localStorage.clear();
      window.location.href = '/success';
    } else {
      const data = await response.json();
      formError.innerHTML = `
        There was an error submitting your form :( <br>
        Error message: "${data.error}" <br>
        Please email your submission to hello@pouch.cafe!
      `;
      formError.hidden = false;
    }
  } catch (error) {
    formError.innerHTML = `
      There was an error submitting your form :( <br>
      Error message: "${error}" <br>
      Please email your submission to hello@pouch.cafe!
    `;
    formError.hidden = false;
  }
  spinner.hidden = true;
})


const chooseJournal = document.getElementById('upload-photo');
const resetJournal = document.getElementById('reset-photo');
const fileInput = document.getElementById('journal-img-input');
const fileInputError = document.querySelector(`#upload-photo + span.error`);
const canvas = document.getElementById('preview-journal');
const context = canvas.getContext("2d"); 

fileInput.onchange = e => { 
  fileInputError.innerHTML = '';
  const file = e.target.files[0]; 
  if (file.type.match('image.*')) {
    const reader = new FileReader();
    const img = new Image()
    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
    reader.onload = function(evt){
      if (evt.target.readyState == FileReader.DONE) {
        if (file.size > MAX_FILE_SIZE_IN_BYTES) {
          fileInput.value = '';
          fileInputError.innerHTML = `File too large (${(file.size / MB_IN_BYTES).toFixed(1)} MB, max 5 MB)`;
          return;
        }
        img.src = evt.target.result;
        img.onload = () => {
          canvas.height = img.height;
          canvas.width = img.width;
          context.drawImage(img, 0, 0, img.width, img.height);
        }
        chooseJournal.hidden = true;
        resetJournal.hidden = false;
      }
    }
  } else {
    fileInput.value = '';
    fileInputError.innerHTML = 'Must select an image.';
  }
}

canvas.addEventListener('click', () => {
  fileInput.click();
});

resetJournal.addEventListener('click', () => {
  canvas.height = 0;
  canvas.width = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  chooseJournal.hidden = false;
  resetJournal.hidden = true;
  fileInput.value = "";
});


/** validation */

const addValidationListenersFor = (id, validityCheck) => {
  const input = document.getElementById(id);
  let noBlur = true;

  const errorHandler = (event) => {
    noBlur = false;
    validityCheck();
  };

  input.addEventListener('blur', errorHandler);
  input.addEventListener('input', (event) => {
    if (noBlur) { return };
    return errorHandler(event);
  });
}

function createValidityCheckFor(id, errorMsg) {
  const input = document.getElementById(id);
  const inputError = document.querySelector(`#${id} + span.error`);
  return () => {
    if (input.validity.valid) {
      input.classList.remove('error');
      inputError.innerHTML = '';
      return true;
    } else {
      input.classList.add('error');
      inputError.innerHTML = errorMsg;
      return false;
    }
  }
}
const emailValidityCheck = createValidityCheckFor('email', 'A valid email is required');
const nameValidityCheck = createValidityCheckFor('name', 'Name is required');

addValidationListenersFor("email", emailValidityCheck);
addValidationListenersFor("name", nameValidityCheck);

setupLocalStorageSavingFor('layout-description');
setupLocalStorageSavingFor('social-media');
setupLocalStorageSavingFor('name');
setupLocalStorageSavingFor('email');

function setupLocalStorageSavingFor(id) {
  const inputEl = document.getElementById(id);
  const savedText = localStorage.getItem(id);
  if (savedText) {
    inputEl.value = savedText;
  }

  const save = () => { 
    localStorage.setItem(id, inputEl.value);
  }
  let timeout;
  inputEl.addEventListener('input', () => {
    clearTimeout(timeout);
    timeout = setTimeout(save, 1000);
  });
}
