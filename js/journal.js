const PROD_ENDPOINT = 'https://lively-phoenix-d82365.netlify.app/.netlify/functions/journalsubmit';
const DEV_ENDPOINT = 'http://localhost:8888/.netlify/functions/journalsubmit'

const form = document.getElementById('journalsubmit');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('hi');
  const postData = {
    from: "vrk"
  }
  const journallayout = document.getElementById("journallayout");
  const formData  = new FormData();
  formData.append("journallayout", journallayout.files[0]);
  const response = await fetch(DEV_ENDPOINT, {
    method: "POST",
    body: formData
  });
  const data = await response.json();
  console.log(data);
})


const chooseJournal = document.getElementById('upload-photo');
const resetJournal = document.getElementById('reset-photo');
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept="image/*";
const canvas = document.getElementById('preview-journal');
const context = canvas.getContext("2d"); 

fileInput.onchange = e => { 
  const file = e.target.files[0]; 
  console.log(file);
  if (file.type.match('image.*')) {
    const reader = new FileReader();
    const img = new Image()
    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
    reader.onload = function(evt){
      if (evt.target.readyState == FileReader.DONE) {
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
  }
}

canvas.addEventListener('click', () => {
  fileInput.click();
});

chooseJournal.addEventListener('click', () => {
  fileInput.click();
});

resetJournal.addEventListener('click', () => {
  canvas.height = 0;
  canvas.width = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);
  chooseJournal.hidden = false;
  resetJournal.hidden = true;
})