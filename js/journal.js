const PROD_ENDPOINT = 'https://lively-phoenix-d82365.netlify.app/.netlify/functions/journalsubmit';
const DEV_ENDPOINT = 'http://localhost:8888/.netlify/functions/journalsubmit'


const form = document.getElementById('journalsubmit');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('hi');
  const postData = {
    from: "vrk"
  }
  const response = await fetch(PROD_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(postData)
  });
  const data = await response.json();
  console.log(data);
} )