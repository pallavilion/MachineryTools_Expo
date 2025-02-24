const selectedLanguage = localStorage.getItem('languageselection');
//urlendpoint 
var urlendpoint = '';
if (window.location.href.includes('digiexpodev.marketcentral')) {
  urlendpoint = 'https://www.marketcentral.in';
}
// Check if the URL contains "www" or "expodev"
else if (window.location.href.includes('www') || window.location.href.includes('expodev')) {
  urlendpoint = 'https://www.marketcentral.in';
}
else if (window.location.href.includes('localhost')) {
  urlendpoint = 'https://www.marketcentral.in';
}
// Default to some other URL
else {
  urlendpoint = 'https://www.marketcentral.in';
}
var lobbylanguage = localStorage.getItem('languageselection')
const endpoint_ExhibitionId = 4;
var bgContainer = document.getElementById("bg");

var ang = 0;
var currentIndex = 0;
var cards = [];
var data;
let buttonid = 0; // Declare data outside the function
let apicall = 0;
AFRAME.registerComponent("cursor-listener3", {
  init: function () {
    var el = this.el;
    this.el.addEventListener("click", function () {
      // alert("component called")
      // Extract button ID from the element
      fetch(
        `${urlendpoint}/rest/virtualExpo/general/getBusinesses/${endpoint_ExhibitionId}`
      )
        .then((response) => response.json())
        .then((apiData) => {
          data = apiData;
          if (apicall === 0) {
            // Assign data from API to the global variable
            createCards(data);
            //alert("test")
            //console.log(apicall)
            document.getElementById('apiloadcategory').style.display = 'none'

          }
          apicall += 1
        })
        .catch((error) => console.error("Error fetching data:", error));
      var buttonId = el.id;
      //console.log("Button clicked:", buttonId);

      // Call your custom function with the button name
      tracking(0, buttonId, "");
      //console.log(`the ip at second is :${ipAddress}`)
      const bgContainer1 = document.getElementById("mappopup");
      bgContainer1.style.display = "flex";
      const closebtn = document.getElementById("close");
      closebtn.style.display = "block";
      // console.log("Click event triggered! for category");
      //  alert("test fail")
    });
  },
});

AFRAME.registerComponent("cursor-listeneriframe", {

  init: function () {
    var el = this.el;
    this.el.addEventListener("click", function () {
      //  const bgContainer1 = document.getElementById('mappopup');
      //   bgContainer1.style.display='flex'
      //     const closebtn=document.getElementById("close")
      //     closebtn.style.display='block'

      var buttonId = el.id;

      document.getElementById("totalIframe").style.display = "flex";
      //console.log("Click event triggered! for category");


      // trackExpo(0, buttonId, "",ipAddress);
      tracking(0, "lobby-expoDirectory", "")
      //console.log(`the ip at third  is :${ipAddress}`)
    });
  },
});
document
  .getElementById("mapbutton1")
  .addEventListener("click", showPrevious);
document.getElementById("mapbutton2").addEventListener("click", showNext);
var halllang = localStorage.getItem('languageselection')
var dynamicpoint;

async function checkDynamicPoint() {
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      if (typeof dynamicpoint !== 'undefined') {
        clearInterval(interval);
        resolve(dynamicpoint);
      }
    }, 1000); // Check every second
  });
}

async function waitForDynamicPoint() {
  // dynamicpoint = undefined; // Reset dynamicpoint
  await checkDynamicPoint();
  // Dynamic point is now defined, do something
  console.log("Dynamic point is now defined:", dynamicpoint);
  // Further actions here
}

async function sendnavdropdown(category, startpoint, endpoint, hallnum) {


  window.location.href = `prototype.html?category=${encrypt(category)}&start=${startpoint}&end=${endpoint}&hallnum=${hallnum}`;


  // sendbeaconapi(0, `${category}`, '');
  // trackinga(`${category}`, 'category_page');

}
function createCards(data) {
  for (let i = 0; i < data.length; i++) {
    var card = document.createElement('div');
    card.className = 'card';
    card.id = 'card' + (i + 1);

    // Image element
    var img = document.createElement('img');
    img.id = 'img' + (i + 1);
    img.src = `./assetsnew/categorymap_images/${categoryName}.png`;
    img.style.width = '50px';
    img.style.height = '50px';

    // Category name (hindi or default)

    // if (halllang == "hindi") {
    //     h3.textContent = data[i].CATEGORY_LEVEL_1_HINDI;
    // } else {
    //     h3.textContent = data[i].CATEGORY;
    // }

    var h3 = document.createElement('h3');

    switch (selectedLanguage) {
      case "hindi":
        h3.textContent = data[i].CATEGORY_LEVEL_1_HINDI;
        break;
      case "marathi":
        h3.textContent = data[i].CATEGORY_LEVEL_1_MARATHI;
        break;
      case "gujarati":
        h3.textContent = data[i].CATEGORY_LEVEL_1_GUJARATI;
        break;
      case "telugu":
        h3.textContent = data[i].CATEGORY_LEVEL_1_TELUGU;
        break;
      case "bengali":
        h3.textContent = data[i].CATEGORY_LEVEL_1_BENGALI;
        break;
      default:
        h3.textContent = data[i].CATEGORY; // Assuming you want to default to English
        break;
    }
    h3.id = `categoryname${i + 1}`;
    // Visit button
    var button = document.createElement('button');
    button.id = 'button' + (i + 1);
    button.textContent = 'Visit';
    button.dataset.categoryIndex = i;
    button.addEventListener('click', openLink);

    // Dropdown button
    var dropdownButton = document.createElement('button');
    dropdownButton.className = 'btn btn-primary numberToggle dropdown-toggle';
    dropdownButton.setAttribute('type', 'button');
    dropdownButton.setAttribute('data-toggle', 'dropdown');
    dropdownButton.textContent = '1';

    // Dropdown menu
    var dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'dropdown-menu';

    // Populate dropdown items
    var hallCount = data[i].HALL_COUNT;
    // Assuming this value is in the data array
    // console.log("newdata cards")
    // console.log(hallCount)
    // console.log(data)
    for (let j = 0; j < hallCount; j++) {
      let startpoint = j * 10 + 1;
      let endpoint = (j + 1) * 10;
      let dropdownItem = document.createElement('a');
      dropdownItem.className = 'dropdown-item';
      dropdownItem.textContent = `Hall ${j + 1}`;
      dropdownItem.onclick = function () {
        sendnavdropdown(data[i].CATEGORY, startpoint, endpoint, j + 1);
      };
      dropdownMenu.appendChild(dropdownItem);
    }

    // Dropdown section
    var dropdownSection = document.createElement('div');
    dropdownSection.className = 'dropdownSection';

    var visitHallButton = document.createElement('div');
    visitHallButton.className = 'visitHallButton';
    visitHallButton.style.display = 'flex';
    visitHallButton.appendChild(button);

    var dropdownDiv = document.createElement('div');
    dropdownDiv.className = 'dropdown';
    dropdownDiv.appendChild(dropdownButton);
    dropdownDiv.appendChild(dropdownMenu);

    dropdownSection.appendChild(visitHallButton);
    dropdownSection.appendChild(dropdownDiv);

    // Append elements to card
    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(dropdownSection);

    // Append card to container
    bgContainer.appendChild(card);
    cards.push(card);
  }

  showCard(currentIndex);
}
function showCard(index) {
  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  for (var i = 0; i < 10; i++) {
    if ([index + i] < cards.length) {
      cards[index + i].style.display = "flex";
      document.getElementById("mapbutton2").style.display = "flex";
    } else {
      document.getElementById("mapbutton2").style.display = "none";
    }
  }
}
function showNext() {
  currentIndex = (currentIndex + 10) % cards.length;
  //console.log(currentIndex);
  buttonid += 1;
  //console.log(`the button is ${buttonid}`);
  if (buttonid >= 1) {
    //console.log("before execution");
    document.getElementById("mapbutton1").style.display = "flex";
  }
  showCard(currentIndex);
}

function showPrevious() {
  currentIndex = (currentIndex - 10 + cards.length) % cards.length;
  //console.log(`the before button index is ${currentIndex}`);
  buttonid -= 1;
  if (buttonid == 0) {
    //console.log("before execution");
    document.getElementById("mapbutton1").style.display = "none";
    document.getElementById("mapbutton2").style.display = "flex";
  }
  showCard(currentIndex);
}

function closePopup() {
  var popupcontainer = document.getElementById("mappopup");
  popupcontainer.style.display = "none";
}

document.getElementById("close").addEventListener("click", closePopup);
//   document.getElementById('visit-expo-btn').addEventListener('click',
//   function (){
//  $(".webinarAndExpocard").css("display", "none")
//   }
//   )

function openLink(event) {
  var index = event.currentTarget.dataset.categoryIndex;
  // trackExpo(0,index,"");
  // Assuming 'data' is the array obtained from the API
  var categories = data.map((item) => item.CATEGORY);

  // Generate links based on categories
  var links = categories.map(
    (category) => `prototype.html?category=${encrypt(category.replace(/&/g, '||'))}`
  );
  var categoriesselect = categories.map((category) => category);
  sendbeaconapi(0, categoriesselect[index], "")
  //console.log(`the categories select is ${categoriesselect}`);
  //console.log(categoriesselect);
  //console.log(links);
  //console.log(categoriesselect[index]);
  //  trackExpo(0,categoriesselect[index],"")
  // gtag("event",categoriesselect[index], {
  //      'page_title':"lobby-Page"
  //   });
  //  trackExpoCategory(0, categoriesselect[index], "", links[index],ipAddress);
  // sendBeaconapicategorylb(0,categoriesselect[index],"",links[index])

  //console.log(`the ip at fourth is :${ipAddress}`)
  //Open the link in the same window
  window.location.href = links[index];
}

//   $(document).ready(function () {
//     // Show loading icon on page load or refresh
//     showLoadingIcon();

//     // After 3 seconds, hide the loading icon
//     // setTimeout(function () {
//     //   hideLoadingIcon();
//     // }, 10000);
//   });
// here the iframe 
var parser = new UAParser();
var result = parser.getResult();
var useragent = result.device.type
var browser = result.browser.name
var os = result.os.name
var userAgent = navigator.userAgent;

//console.log(`the device type is ${useragent}`)
//console.log(`the os type is ${os}`)
//console.log(`the device type is ${useragent}`)
// alert(browser)
if (useragent == "mobile") {
  document.getElementById("iframe-expo").setAttribute("src", `https://expo1.marketcentral.in/expoDirectoryMobile.cfm`)
  // $(".webinarAndExpocard").css("display", "flex");
} else {
  document.getElementById("iframe-expo").setAttribute("src", `https://expo1.marketcentral.in/expoDirectory.cfm`)
  // $(".webinarAndExpocard").css("display", "none");
}
if (os == "iOS" || os == "Mac OS") {
  document.getElementById("fullscreenButton").style.display = "none"
  ////console.log("os code executed")
}

$(".iframeImg").click(function () {
  $(".iframetag").css("display", "none");
});

document.getElementById('fullscreenButton').addEventListener('click', function () {
  toggleFullScreen();
});

function toggleFullScreen() {
  var elem = document.documentElement;
  var fullscreenButton = document.getElementById('fullscreenButton');

  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
    // Enter fullscreen mode
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    fullscreenButton.textContent = 'Exit Full Screen';
  } else {
    // Exit fullscreen mode
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    fullscreenButton.textContent = 'Enter Full Screen';
  }
}



// Update button text based on full-screen state
function updateButton() {
  var fullscreenButton = document.getElementById('fullscreenButton');
  if (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
    fullscreenButton.textContent = 'Exit Full Screen';
  } else {
    fullscreenButton.textContent = 'Enter Full Screen';
  }
}

// Event listeners for fullscreen change and visibility change
document.addEventListener('fullscreenchange', updateButton);
document.addEventListener('mozfullscreenchange', updateButton);
document.addEventListener('webkitfullscreenchange', updateButton);
document.addEventListener('MSFullscreenChange', updateButton);
document.addEventListener('visibilitychange', updateButton);
// full screen and exit full screen code
//console.log(`The os is ${os}`)

if (os == "iOS" || os == "Mac OS") {
  document.getElementById("fullscreenButton").style.display = "none"
  //   console.log("os code executed")
}

document.getElementById('helpdeskplane').addEventListener('click', function () {
  tracking(0, "helpdeskplane", "")
  document.querySelector('.helpPopUpMainContent').style.display = 'flex'

})

let sponsorcards = [1, 2, 3];

function shufflecards() {
  let j = 0; // Start with the first card
  setInterval(() => {
    // Loop through each card
    for (let i = 0; i < sponsorcards.length; i++) {
      let index = (i + j) % sponsorcards.length; // Calculate the index for the card in the current cycle
      document.getElementById(`sponsor${i + 1}`).setAttribute('src', `./assetsnew/lobby/Placeholder ${sponsorcards[index]}.png`);
      console.log(`Card ${i + 1} updated to Placeholder ${sponsorcards[index]}`);
    }
    j = (j + 1) % sponsorcards.length; // Increment and wrap around `j` to rotate starting point
  }, 10000); // Shuffle every 5 seconds
}

shufflecards();