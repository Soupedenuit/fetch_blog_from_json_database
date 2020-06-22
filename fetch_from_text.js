if (!window) {
  const fetch = require('node-fetch');
}

// let url = './text.txt'; // cannot fetch locally
let url_text = 'http://192.168.0.12:8081//text.txt';
// let url_json = 'https://soupedenuit.github.io/json-quotes/Random-Quotes.json';
let url_json = 'https://vue-beta2.firebaseio.com/public/published/blog.json';
let init = {
  // mode: 'no-cors'
  // headers: {
  //   'Content-Type': 'text/plain',
  //   'Access-Control-Allow-Origin': '*'
  // }
};

function populateTarget(urlType, target) {
  let url;
  urlType == 'text' ? url = url_text : url = url_json;
  let request = fetch(url, init);
  request.then(function(result) {
    console.log(target);
    if (urlType == 'text') {
      return result.text()
    } else return result.json()
  })
  .then((data) => {
    console.log(data);
    if (urlType == 'text') {
      addText(data, target); //in this case target element is <article>
    // } else addData1(data, 'quote', target) // Random Quotes API
    } else addData2(data, target) // Firebase API
  })
  .then(lastUpdated)
  .catch((error) => {
    console.log(error);
    // addText(error, 'article')
  })
}

// Configured for Random Quotes API:
function addData1(data, key, target) { 
  let htmlArr = [];
  let text;
  data.forEach((x) => {
    if (key) {
      text = `<p>${x[key]}</p>\n`;
    } else {
      text = `<p>${x}</p>\n`;
    }
    htmlArr.push(text);
  })
  let htmlString = htmlArr.join('');
  document.querySelector(target).innerHTML = htmlString;
}

// Configured for Firebase API:
function addData2(data, target) {
  let htmlString = data;
  document.querySelector(target).innerHTML = htmlString;
}

// Configured for any text file:
function addText(data, target) {
  let lines = data.split('\n');
  let text = [];
  lines.forEach(function(line) {
    text.push(`${line}<br>`)
  });
  let paragraph = `<p>${text.join('')}</p>`;
  document.querySelector(target).innerHTML = paragraph;
}

populateTarget('json', 'article')
// populateTarget('text', 'article')

setInterval(()=> populateTarget('json', 'article'), 1000*60*5)

function lastUpdated() {
  let date = new Date().toString().substring(0,24);
  let display = `Last updated: ${date}`;
  // let fragment = document.createDocumentFragment();
  // let el1 = document.createElement('time');
  // let el2 = document.createTextNode(date);
  // el1.appendChild(el2)
  // fragment.appendChild(el1)
  // document.querySelector('main').appendChild(fragment)
  document.querySelectorAll('time')[1].innerText = display;
}

////////////////////////////////////////////////
// From Stack Overflow (user: Flatlander)
// https://stackoverflow.com/questions/40284338/javascript-fetch-delete-and-put-requests

let profile = {
  firstName: 'Tony',
  lastName: 'Whomever'
};

function createNewProfile(profile) {
  const formData = new FormData();
  formData.append('first_name', profile.firstName);
  formData.append('last_name', profile.lastName);
  // formData.append('email', profile.email);

  return fetch('https://vue-beta2.firebaseio.com/public.json', {
      method: 'POST',
      body: formData
  }).then(response => response.json())
}

function createNewProfile2(profile) {
  const formData = new FormData();
  formData.append('first_name', profile.firstName);
  formData.append('last_name', profile.lastName);
  console.log(formData);
  
  // formData.append('email', profile.email);

  return fetch('https://vue-beta2.firebaseio.com/public.json', {
      method: 'POST',
      body: profile
  }).then(response => response.json())
}

// createNewProfile2(profile)
// .then((json) => {
//   console.log(json)
//   })
// .catch(error => error);

///////////////////////////////////////////////////

// var httpRequest = new XMLHttpRequest();
// httpRequest.open('GET', url, true);
// // httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
// httpRequest.send(null);
// httpRequest.onreadystatechange = function() {
//   console.log(httpRequest.responseText)
//   if (httpRequest.readyState === httpRequest.DONE) {
//     if (httpRequest.status === 200) {
//       console.log('ok');
//     }
//   }
// }