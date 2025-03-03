var parser = new UAParser();
var result = parser.getResult();
var deviceType = result.device.type;
function generateGUID() {
  // Generate random hexadecimal digits
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  // Concatenate random hexadecimal digits to form a GUID
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// Function to generate a random 4-digit number
function generateRandomNumber() {
  return Math.floor(1000 + Math.random() * 900000); // Generate a random number between 1000 and 9999
}

// Set to store used visitor IDs
let usedVisitorIDs = new Set();

// Function to generate a unique visitor ID
function generateUniqueVisitorID() {
  let visitorID;
  do {
    const randomNumber = generateRandomNumber(); // Generate a random number
    visitorID = `User${randomNumber}`; // Concatenate "visitor-" with the random number
  } while (usedVisitorIDs.has(visitorID)); // Check if the ID has been used before

  usedVisitorIDs.add(visitorID); // Add the ID to the set of used IDs
  return visitorID;
}

const visitorID1 = generateUniqueVisitorID();
console.log('Visitor 1 ID:', visitorID1);
//alert("Visitor 1 ID:", visitorID1);

//
var urlendpoint = '';

if (window.location.href.includes('digiexpodev.marketcentral')) {
  urlendpoint = 'https://www.marketcentral.in';
}
// Check if the URL contains "www" or "expodev"
else if (window.location.href.includes('www') || window.location.href.includes('expodev')) {
  urlendpoint = 'https://www.marketcentral.in';
} else if (window.location.href.includes('localhost')) {
  urlendpoint = 'https://www.marketcentral.in';
}
// Default to some other URL
else {
  urlendpoint = 'https://www.marketcentral.in';
}
// API CALLLLLLLL

//
var guid;
guid = generateGUID();
// console.log(guid)
if (!localStorage.getItem('GUID')) {
  localStorage.setItem('GUID', guid);
  localStorage.setItem(
    'sessionActive',
    JSON.stringify({
      active: true,
      startTime: new Date().getTime()
    })
  );
}
guid = localStorage.getItem('GUID');
//console.log(guid);
var languageselectionitem = localStorage.getItem('languageselection');
console.log(languageselectionitem);



// var apiname=localStorage.getItem('UserName')
// console.log(apiname)
var addvisitorurl = `${urlendpoint}/rest/virtualExpo/general/AddVisitors`;

//  console.log(requestBody)
function postData(url, data) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then((response) => {
      console.log(response);
      //alert(response.ok);
      if (!response.ok) {
        //throw new Error('Network response was not ok');
        // need to add to error log
        if (deviceType !== "mobile") {
          sendbeaconapi(0, "desktop", '', '');
          window.location.href = 'categorymapdynmic.html';
        
        }
        else {
          sendbeaconapi(0, "mobile", '', '');
          window.location.href = 'screenSelection.html';
        
         }

      } else {

        if (deviceType !== "mobile") {
          window.location.href = 'categorymapdynmic.html';
        }
        else { window.location.href = 'screenSelection.html'; }
      }
    })
    .catch((error) => {
      console.error('There was a problem with the request:', error);
      // alert(error)
    });
}

// if (!localStorage.getItem('UserName')) {
document.getElementById('enterExpo-btn').addEventListener('click', function () {
  if (!localStorage.getItem('UserName')) {
    localStorage.setItem('UserName', visitorID1);
  }
  console.log(localStorage.getItem('languageselection'));
  sendbeaconapi(0, localStorage.getItem('languageselection'), '', '');
  sendbeaconapi(0, 'Enter-expo-button', '', '');
  trackinga('Enter-expo', 'indexpage');
  const requestBody = {
    exhibition_ID: 6,
    visitor_guid: guid,
    visitor_name: localStorage.getItem('UserName'),
    ipaddress: ipAddress
  };
  console.log(requestBody);
  postData(addvisitorurl, requestBody);

});

document.querySelector('.termc').addEventListener('click', function () {
  trackinga('terms&conditions', 'terms&conditions');
});

