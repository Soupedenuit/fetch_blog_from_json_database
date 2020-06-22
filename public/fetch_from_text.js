if (!window) {
  const fetch = require('node-fetch');
}

// let url = './text.txt'; // cannot fetch locally
let url_text = 'http://192.168.0.12:8081//text.txt';
// let url_json = 'https://soupedenuit.github.io/json-quotes/Random-Quotes.json';
let url_json = 'https://vue-beta2.firebaseio.com/public/published/blog.json';

if(!window.fetch) {
  populateTargetUsingXMLHttp('article')
  setInterval(function() {
    populateTargetUsingXMLHttp('article')
  }, 1000*60*5) 
} 
else {
  populateTarget('json', 'article')
  setInterval(function() {
    populateTarget('json','article')
  }, 1000*60*5) 
}

function populateTarget(urlType, target) {
  let url;
  urlType == 'text' ? url = url_text : url = url_json;
  let request = fetch(url);
  request.then(function(result) {
    if (urlType == 'text') {
      return result.text()
    } else return result.json()
  })
  .then(function(data) {
    if (urlType == 'text') {
      addText(data, target); //in this case target element is <article>
    // } else addData1(data, 'quote', target) // Random Quotes API
    } else addData2(data, target) // Firebase API
  })
  .then(lastUpdated)
  .catch(function(error) {
    console.log(error);
  })
}

function populateTargetUsingXMLHttp(target) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.open('GET', url_json, true)
  // httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
  httpRequest.send(null)
  httpRequest.onreadystatechange = function() {
    // console.log(httpRequest.responseText)
    if (httpRequest.readyState === httpRequest.DONE) {
      if (httpRequest.status === 200) {
        console.log('ok, status 200');
        let data = JSON.parse(httpRequest.responseText);
        addData2(data, target)
        lastUpdated()
      }
    }
  }
}

// Configured for Random Quotes API:
function addData1(data, key, target) { 
  let htmlArr = [];
  let text;
  data.forEach(function(x) {
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

function lastUpdated() {
  let date = new Date().toString().substring(0,24);
  let display = `Last updated: ${date}`;
  document.querySelectorAll('time')[1].innerText = display;
}
