const selectedLanguage = localStorage.getItem('languageselection');
const translations = {
  english: {
    urlText: 'Link',
    inviteText: 'Share Link',
    chattext: 'Note: Click here to chat'
  },
  hindi: {
    urlText: 'उत्पाद लिंक',
    inviteText: 'उत्पाद लिंक साझा करें',
    chattext: 'नोट: चैट करने के लिए यहां क्लिक करें'
  },
  marathi: {
    urlText: 'उत्पाद लिंक',
    inviteText: 'उत्पाद लिंक सामायिक करा',
    chattext: 'टीप: चॅट करण्यासाठी इथे क्लिक करा'
  },
  gujarati: {
    urlText: 'ઉત્પાદ લિંક',
    inviteText: 'ઉત્પાદ લિંક શેર કરો',
    chattext: 'લાખનું: ચેટ કરવા માટે અહીં ક્લિક કરો'
  },
  bengali: {
    urlText: 'পণ্য লিংক',
    inviteText: 'পণ্য লিংক শেয়ার করুন',
    chattext: 'লক্ষ্য করুন: চ্যাট করার জন্য এখানে ক্লিক করুন'
  },
  telugu: {
    
    urlText: 'ఉత్పత్తి లింక్',
    inviteText: 'ఉత్పత్తి లింక్ భాగస్వామ్యం చేయండి',
    chattext: 'గమనిక: చాట్ చేయడానికి ఇక్కడ నొక్కండి'
  }
};
function changebusinessid(bussinessId, custid) {
  MyBusinessCardPlugin.openUploadcard('root', false, bussinessId, custid);
}

//urlendpoint
var urlendpoint = '';
var selectedLanguages = localStorage.getItem('languageselection');
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
const endpoint_ExhibitionId = '6';

var overalloverlay = document.getElementById('overallOverLay');

// Get the query string from the current URL

// calling apis on onload and unload

const queryString = window.location.search;
let c;
// Create a new URLSearchParams object from the query string
const urlParams = new URLSearchParams(queryString);
var startValue = urlParams.get('start');
var endValue = urlParams.get('end');
var hallnum = urlParams.get('hallnum');
// Get the value of a specific parameter
var categoryparam = decrypt(urlParams.get('category'));
checkurlparm(categoryparam);
if (categoryparam.includes('||')) {
  // Replace '||' with another string
  categoryparam = categoryparam.replace(/\|\|/g, '&');
}
document.title = `Explore India's Finest Machine Tools businesses at the Expo Hall`;

//console.log(`the categoryparam is ${categoryparam}`)

if (!localStorage.getItem('UserName')) {
  window.location.replace('index.html');
}

let b = 1;
//  categoryparam = categoryparam.replace(/\s/g, '');
var networkcategory = categoryparam.replace(/[,\s&:/]/g, '').substring(0, 12);
//console.log(`the networked param is ${networkcategory}`)
var parser = new UAParser();
var result = parser.getResult();
var useragent = result.device.type;
var os = result.os.name;

function markStallVisited(stallId) {
  let visitedStalls = JSON.parse(localStorage.getItem('visitedStalls')) || [];
  visitedStalls.push(stallId);
  localStorage.setItem('visitedStalls', JSON.stringify(visitedStalls));
}

function markStallVisitedforchat(stallId) {
  let visitedStalls = JSON.parse(localStorage.getItem('visitedStallschat')) || [];
  visitedStalls.push(stallId);
  localStorage.setItem('visitedStallschat', JSON.stringify(visitedStalls));
}

function isStallVisitedforchat(stallId) {
  let visitedStalls = JSON.parse(localStorage.getItem('visitedStallschat')) || [];
  return visitedStalls.includes(stallId);
}
// Function to check if a stall has been visited
function isStallVisited(stallId) {
  let visitedStalls = JSON.parse(localStorage.getItem('visitedStalls')) || [];
  return visitedStalls.includes(stallId);
}
function share(uno, name) {
  var currentURL1 = window.location.href;
  var baseURL = currentURL1.substr(0, currentURL1.lastIndexOf('/') + 1); // Extracts the base URL
  //console.log(typeof uno)
  //console.log(uno)
  var newURL = `${baseURL}sharestall.html?uno=${encryptWithCasePreservation(uno.toString())}&stallno=${name}`;

  //console.log(newURL)
  var popupOverlay = document.getElementById('popup-overlay');
  var currentURLInput = document.getElementById('currentURL');
  // if(selectedLanguages=='hindi'){
  //     document.getElementById('urlText').textContent = "स्टाल लिंक"
  //     document.querySelector('.inviteText').textContent = "Share Stall Link"
  // }else{
  //     document.getElementById('urlText').textContent = "Stall Link"
  //     document.querySelector('.inviteText').textContent = "Share Stall Link"
  // }
  setTextContent(selectedLanguage);

  currentURLInput.value = newURL;
  popupOverlay.style.display = 'flex';
  tracking(uno, 'share-stall', '');
}

function copyToClipboard() {
  // Get the current URL
  var currentURL = document.getElementById('currentURL').value;
  // Copy the URL to the clipboard
  navigator.clipboard
    .writeText(currentURL)
    .then(function () {
      // alert('URL copied to clipboard!');
      document.getElementById('url-copied-alert-txt').style.display = 'block';
    })
    .catch(function (err) {
      console.error('Unable to copy to clipboard', err);
    });
}

function closePopup1() {
  // Close the popup
  var popupOverlay = document.getElementById('popup-overlay');
  document.getElementById('url-copied-alert-txt').style.display = 'none';
  popupOverlay.style.display = 'none';
  document.getElementById('popup').style.opacity = 1;
}
// remove entities
function removeEntities(stalls) {
  stalls.forEach((stall, stallIndex) => {
    let numberOfImages = stall.products.length;
    const stallContainerId = `stall${stallIndex + 1}`;
    document.getElementById(`stall${stallIndex + 1}`).removeAttribute('instanced-mesh-member');
    document.getElementById(`stall-avatar${stallIndex + 1}`).removeAttribute('instanced-mesh-member');
    document.getElementById(`stall${stallIndex + 1}`).setAttribute('visible', 'false');
    document.getElementById(`stall-avatar${stallIndex + 1}`).setAttribute('visible', 'false');
    document.getElementById(`bubble${stallIndex + 1}`).removeAttribute('activate-on-approach');
    document.getElementById(`moveup${stallIndex + 1}`).setAttribute('visible', 'false');
    document.getElementById(`bubble${stallIndex + 1}`).setAttribute('visible', 'false');
    document.getElementById('moveup51').setAttribute('visible', 'false');
    // entity removal and adjust code
    const containerEntityb = document.createElement('a-entity');
    containerEntityb.setAttribute('position', '4.2 3.4 -6.87');
    containerEntityb.setAttribute('rotation', '0 90 0');
    containerEntityb.setAttribute('id', `broucher-dum1${stallIndex + 1}`);
    const planedummy = document.createElement('a-plane');
    planedummy.setAttribute('position', '0 0 0');
    planedummy.setAttribute('visible', 'false');
    planedummy.setAttribute('color', 'red');
    planedummy.setAttribute('height', '0.85');
    planedummy.setAttribute('width', '1.05');

    document.getElementById(stallContainerId).appendChild(containerEntityb);
    containerEntityb.appendChild(planedummy);

    // end of entity adjustment
    // document.getElementById(`vendorname${stallIndex + 1}`).setAttribute("visible","false");
    // document.getElementById(`stall${stallIndex + 1}`).setAttribute("visible","false");
    for (let imageIndex = 0; imageIndex < numberOfImages; imageIndex++) {
      let containerEntityId = `container${imageIndex + 1}_${stallContainerId}`;
      let parentElement = document.getElementById(stallContainerId);
      let entityToRemove = document.getElementById(containerEntityId);
      //document.getElementById(`popupcard${stallIndex + 1}`).setAttribute("visible", false);
      if (parentElement && entityToRemove) {
        // Remove the entity from the parent element
        parentElement.removeChild(entityToRemove);

        //         let popupCardElement = document.getElementById(`popup${stallIndex + 1}`);
        // if (popupCardElement) {
        //     popupCardElement.setAttribute("visible", false);
        // } else {
        //    // console.warn(`Popup card with ID '${popupCardId}' not found.`);
        // }
      } else {
        console.warn(`Entity with ID '${containerEntityId}' not found in parent with ID '${stallContainerId}'.`);
      }
    }
  });
}
// document.getElementById('fullscreenButton').addEventListener('click', function () {
//   toggleFullScreen();
// });
// Function to fetch data from the API and update the scene
let requestBody = {
  exhibition_ID: '6',
  start: '1',
  end: '10',
  category: '0',
  businesscategorylevel1: categoryparam,
  uno: '0'
};
// category map body!!
if (startValue) {
  c = hallnum;
  //console.log(`The value of c is ${c}`)
  requestBody.start = startValue;
  requestBody.end = endValue;
}

//console.log(requestBody)
let apivariable;
const fetchDataFromAPI = () => {
  let apiurl = `${urlendpoint}/rest/virtualExpo/general/virtualExhibitionDetails`;
  fetch(apiurl, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  })
    .then((response) => {
      if (response.ok) {
        const urlObject = new URL(apiurl);
        //console.log(`before api change url :${apiurl}`);

        return response.json();
      } else {
        //console.log(`failed url is :${apiurl}`)
        throw new Error(`Network response was not ok.and failed url is :${apiurl}`);
      }
    })

    .then((data) => {
      //console.log('Fetched-data123:', data);

      if (data.data) {
        //console.log(data.data.message);
        if (data.data.message === 'No records found') {
          window.location.replace('categorymapdynmic.html');
        }
      } else {
        apivariable = data;

        // new next previous
        if (apivariable.Hallcount.nextHall == 'yes') {
          document.getElementById('next-hall').setAttribute('visible', 'true');
          document.getElementById('next-hall').setAttribute('position', '9.2 3.2 27');
        } else {
          document.getElementById('next-hall').setAttribute('visible', 'true');
          document.getElementById('next-hall').setAttribute('position', '9.2 5 28');
        }
        if (apivariable.Hallcount.PrevHall == 'yes') {
          document.getElementById('prev-hall').setAttribute('visible', 'true');
          document.getElementById('prev-hall').setAttribute('position', '13.31 3.2 27');
        } else {
          document.getElementById('prev-hall').setAttribute('visible', 'false');
          document.getElementById('prev-hall').setAttribute('position', '13.31 3.2 32');
        }
        // end next previous new
        //console.log(apivariable)
        // banners logic
        if (c) {

          c = parseInt(c);
          var bannerElements = document.getElementById('ban');
          bannerElements.setAttribute('gltf-model', `assetsnew/hallNumbers/banner${c}.glb`);

        } else {
          //console.log("switch case odd is behaving")
          if (b >= 1) {
            var bannerElements = document.getElementById('ban');
            bannerElements.setAttribute('gltf-model', `assetsnew/hallNumbers/banner${b}.glb`);
          }
          // checkhallfive(apivariable.stalls.length);
        }

        // banners logic end
        data.stalls.forEach((stall, stallIndex) => {
          const stallContainerId = `stall${stallIndex + 1}`;
          document.getElementById(`txtval${stallIndex + 1}`).setAttribute('value', stall.uno);
          document.getElementById(`stall${stallIndex + 1}`).setAttribute('visible', 'true');
          document.getElementById(`moveup${stallIndex + 1}`).setAttribute('visible', 'true');
          document.getElementById('moveup51').setAttribute('visible', 'false');
          document.getElementById(`stall${stallIndex + 1}`).setAttribute('instanced-mesh-member', 'mesh:#mesh1');
          document.getElementById(`stall-avatar${stallIndex + 1}`).setAttribute('visible', 'true');
          document.getElementById(`stall-avatar${stallIndex + 1}`).setAttribute('instanced-mesh-member', 'mesh:#mesh2');
          document.getElementById(`bubble${stallIndex + 1}`).setAttribute('activate-on-approach', {
            isSubscribed: 'Y' // stall.vendorInfo.ExpoChatSubscribed
          });

          // document.getElementById(`bubble${stallIndex + 1}`).setAttribute('activate-on-approach', 'true')

          // if(halllang=='hindi'){
          //     document.getElementById(`notetext${stallIndex + 1}`).setAttribute('value',"नोट: चैट करने के लिए यहां क्लिक करें")
          // }else{

          //     document.querySelector(`#notetext${stallIndex + 1}`).setAttribute('value',"Note: Click here to chat")
          // }
          if (document.getElementById(`broucher-dum1${stallIndex + 1}`)) {
            document.getElementById(`broucher-dum1${stallIndex + 1}`).remove();
          }
          setTextchatContent(selectedLanguage, stallIndex + 1);
          document.getElementById(`bubble${stallIndex + 1}`).addEventListener('click', function () {
            tracking(stall.uno, 'chat', '', '');
            console.log('trackdone');
            chattracking_ga(stall.vendorInfo.companyname);
          });
          document.getElementById(`bname${stallIndex + 1}`).setAttribute('value', stall.vendorInfo.companyname);
          if (stall.websiteLink) {
            document
              .getElementById(`website${stallIndex + 1}`)
              .setAttribute(
                'cursor-listener',
                `targetPage:${stall.websiteLink};uno:${stall.uno};type:websitevisit;websitename:${stall.vendorInfo.companyname}`
              );
          }
          if (stall.vendorInfo.email) {
            document
              .getElementById(`email${stallIndex + 1}`)
              .setAttribute(
                'cursor-listener',
                `targetPage:mailto:${stall.vendorInfo.email};uno:${stall.uno};type:email`
              );
          }
          if (stall.broucherlinkAvailable == 'yes') {
            let dumimAage = document.getElementById(`broucher-dum${stallIndex + 1}`);
            if (dumimAage) {
              dumimAage.remove();
            }
            document
              .getElementById(`broucher${stallIndex + 1}`)
              .setAttribute('cursor-listener', `targetPage:${stall.broucherlink}`);
          } else {
            const containerEntityb = document.createElement('a-entity');
            containerEntityb.setAttribute('position', '4.2 3.4 -6.87');
            containerEntityb.setAttribute('rotation', '0 90 0');

            containerEntityb.setAttribute('id', `broucher-dum${stallIndex + 1}`);
            const planedummy = document.createElement('a-plane');

            planedummy.setAttribute('position', '0 0 0');
            planedummy.setAttribute('visible', 'false');

            planedummy.setAttribute('color', 'red');
            planedummy.setAttribute('height', '0.85');
            planedummy.setAttribute('width', '1.05');

            document.getElementById(stallContainerId).appendChild(containerEntityb);
            containerEntityb.appendChild(planedummy);
            planedummy.addEventListener('mouseenter', function () {
              document.getElementById(`broucherinfo${stallIndex + 1}`).setAttribute('visible', 'true');
            });
            planedummy.addEventListener('mouseleave', function () {
              document.getElementById(`broucherinfo${stallIndex + 1}`).setAttribute('visible', 'false');
            });
            document.getElementById(`broucher${stallIndex + 1}`).removeAttribute('cursor-listener');
            document.getElementById(`brouchertext${stallIndex + 1}`).setAttribute('value', 'No Broucher');
            document.getElementById(`broucherinfo${stallIndex + 1}`).addEventListener('click', function () {
              document.getElementById(`broucherinfo${stallIndex + 1}`).setAttribute('visible', 'true');
            });

            // document.getElementById(`broucher${stallIndex + 1}`).addEventListener('click', function () {
            //     document.getElementById(`broucherinfo${stallIndex + 1}`).setAttribute('visible', 'true')
            // })
            // document.getElementById(`broucher${stallIndex + 1}`).addEventListener('mouseleave', function () {
            //     document.getElementById(`broucherinfo${stallIndex + 1}`).setAttribute('visible', 'false')
            // })
          }
          if (stall.businesscard) {
            document
              .getElementById(`businesscard${stallIndex + 1}`)
              .setAttribute('cursor-listener', `targetPage:${stall.businesscard};uno:${stall.uno};type:businesscard`);
          }
          if (stall.vendorInfo.contactNumber) {
            document
              .getElementById(`phone${stallIndex + 1}`)
              .setAttribute(
                'cursor-listener',
                `targetPage:tel:91+${stall.vendorInfo.contactNumber};uno:${stall.uno};type:conatctnumber`
              );
          }

          //document.getElementById(`stall${stallIndex + 1}`).setAttribute("visible", "true");
          document.getElementById(`vendorname${stallIndex + 1}`).setAttribute('value', stall.vendorInfo.vendorName);
          //  document.getElementById(`vendorname${stallIndex + 1}`).setAttribute("visible", "true");
          document
            .getElementById(`vendorphoneno${stallIndex + 1}`)
            .setAttribute('value', stall.vendorInfo.contactNumber);
          document.getElementById(`vendorimage${stallIndex + 1}`).setAttribute('src', stall.vendorInfo.vendorimage);
          document
            .getElementById(`vendorbusinessname${stallIndex + 1}`)
            .setAttribute('value', stall.vendorInfo.companyname);
          document.getElementById(`vendorlogo${stallIndex + 1}`).setAttribute('src', stall.logo);
          document.getElementById(`vendorlogo2${stallIndex + 1}`).setAttribute('src', stall.logo);
          document.getElementById(`stallno${stallIndex + 1}`).setAttribute('value', stall.name);
          // document.getElementById(`board-name`).setAttribute('value', categoryparam)
          document.getElementById('five-hall').setAttribute('visible', 'false');
          // ----
          document.getElementById('stall5').setAttribute('rotation', '0 0 0');
          document.getElementById('stall5').setAttribute('position', '-27.857 -0.05 -71.2');
          document.getElementById('bubble5').setAttribute('rotation', '0 90 0');
          document.getElementById('bubble5').setAttribute('position', '-28 6.08 -66');

          //
          document.getElementById(`sharebutton${stallIndex + 1}`).addEventListener('click', function () {
            share(stall.uno, stall.name);
          });
          //business card
          document.getElementById(`stall${stallIndex + 1}-businessCard`).addEventListener('click', function () {
            changebusinessid(stall.uno, localStorage.getItem('UserName'));
            console.log(`button clicked ${stallIndex + 1}`);
          });

          // if (apivariable.Hallcount.nextHall == "yes") {
          //     document.getElementById("next-hall").setAttribute('visible', 'true')
          //     //   document.getElementById("next-hall1").setAttribute('visible','true')
          //     //     document.getElementById("next-hall2").setAttribute('visible','true')
          // }
          // else {
          //     document.getElementById("next-hall").setAttribute('visible', 'false')
          //     //  document.getElementById("next-hall1").setAttribute('visible','false')
          //     //     document.getElementById("next-hall2").setAttribute('visible','false')
          // }
          if (stall.products && stall.products.length) {
            let numberOfImages = stall.products.length; //10
            ////console.log(numberOfImages)

            // Create a unique ID for each stall
            //  const stallContainerId = `stall${stallIndex + 1}`;
            // Loop through images in the current stall
            for (let imageIndex = 0; imageIndex < numberOfImages; imageIndex++) {
              const imageUrl = stall.products[imageIndex].producturl;
              // //console.log(imageUrl)
              const imageDescription = stall.products[imageIndex].productname;

              // Define positions based on image index using a switch statement
              let position;
              let width;
              let height;
              switch (imageIndex) {
                case 0:
                  position = '2.362 2.6 3';
                  width = '1.6';
                  height = '1.6';
                  break;
                //center second row
                case 1:
                  position = '1.5 3.17 1';
                  width = '1.6';
                  height = '1.6';
                  break;
                //left second row
                case 2:
                  position = '0.5 3.8 -0.8';
                  width = '1.6';
                  height = '1.6';
                  break;
                //right second row
                case 3:
                  position = '1.5 3.2 -2.7';
                  width = '1.6';
                  height = '1.6';
                  break;
                //first layer rightsidemiddle
                case 4:
                  position = '2.362 2.6 -4.7';
                  width = '1.6';
                  height = '1.6';
                  break;

                // first layer leftside right
                // Add more cases for additional images
                // ...
                default:
                  // Default case for handling unexpected image indices
                  // console.error(`Unhandled image index: ${imageIndex}`);
                  break;
              }
              const containerEntity = document.createElement('a-entity');
              containerEntity.setAttribute('position', position);
              containerEntity.setAttribute('rotation', '0 0 0');
              containerEntity.setAttribute('id', `container${imageIndex + 1}_${stallContainerId}`);
              // Create sphere entity (ball)
              // Create image element
              const imageElement = document.createElement('a-image');
              imageElement.setAttribute('id', `img${imageIndex + 1}_${stallContainerId}`); //img1 img2 img3 img4 img5 img6 img7 img8 img9
              imageElement.setAttribute('width', width);
              imageElement.setAttribute('height', height);

              imageElement.setAttribute('src', imageUrl);
              imageElement.setAttribute('rotation', '0 90 0');
              // imageElement.addEventListener('click', function () {
              //   overalloverlay.style.display = 'flex';
              //   document.getElementById('popup').style.display = 'flex';

              //   document.getElementById('productimge').setAttribute('src', imageUrl);
              //   document.getElementById('prdt-name').textContent = imageDescription;
              //   document.getElementById('cost').textContent = stall.products[imageIndex].price;
              //   document.getElementById('prdt-units').textContent = stall.products[imageIndex].unit;
              //   document.getElementById('visit-prdt-btn').setAttribute('href', stall.products[imageIndex].productlink);

              //   document
              //     .getElementById('visit-prdt-btn')
              //     .setAttribute('onclick', `tracking(${stall.uno}, "visit-product-website",''); return true;`);

              //   document.getElementById('share-prdt').addEventListener('click', function showPopup() {
              //     document.getElementById('popup').style.opacity = 0;
              //     // var currentURL1 = window.location.href;
              //     // var baseURL = currentURL1.substr(0, currentURL1.lastIndexOf('/') + 1); // Extracts the base URL
              //     var newURL = `${stall.products[imageIndex].productlink}`;
              //     var popupOverlay = document.getElementById('popup-overlay');
              //     var currentURLInput = document.getElementById('currentURL');
              //     currentURLInput.value = newURL;
              //     // if(selectedLanguages=='hindi'){
              //     //     document.getElementById('urlText').textContent = "उत्पाद लिंक"
              //     // document.querySelector('.inviteText').textContent = "उत्पाद लिंक साझा करें"
              //     // }else{
              //     // document.getElementById('urlText').textContent = "Product Link"
              //     // document.querySelector('.inviteText').textContent = "Share Product Link"
              //     // }
              //     setTextContent(selectedLanguage);
              //     popupOverlay.style.display = 'flex';
              //     // trackExpo(stall.uno, "share-product", imageDescription, ipAddress);
              //     tracking(stall.uno, 'share-product', imageDescription);
              //     // gtag("event", "share-stall", { 'page_title': "Hall-Page" });
              //   });
              //   tracking(stall.uno, 'product', imageDescription);
              //   trackinga('product', 'hallpage');
              // });



              // imageElement.addEventListener('mouseenter', function () {
              //   overalloverlay.style.display = 'flex';
              //   document.getElementById('vidpopup').style.display = 'flex';

              //   // Update product details
              //   document.getElementById('productimge').setAttribute('src', imageUrl);
              //   document.getElementById('prdt-name').textContent = imageDescription;
              //   document.getElementById('cost').textContent = stall.products[imageIndex].price;
              //   document.getElementById('prdt-units').textContent = stall.products[imageIndex].unit;
              //   document.getElementById('visit-prdt-btn-1').setAttribute('href', stall.products[imageIndex].productlink);
              //   console.log("product link")
              //   console.log(stall.products[imageIndex].productlink)

              //   // Retrieve the dynamic video URL from your data
              //   var videoUrl = stall.products[imageIndex].videoUrl; // Make sure your data includes this property

              //   // Get the Video.js player instance and update its source
              //   var player = videojs('youtubePlayer');
              //   player.src({ type: 'video/youtube', src: "https://youtu.be/R-Lf7T7wg3A?si=AKc2MqWpEcbm8_o3" });

              //   // Optionally, start playing the video if autoplay is desired
              //   player.play();

              //   tracking(stall.uno, 'product', imageDescription);
              //   trackinga('product', 'hallpage');
              // });
              // var videoUrl = "https://youtu.be/R-Lf7T7wg3A?si=AKc2MqWpEcbm8_o3"
              if (stall.products[imageIndex].product_youtube_link != "") {
                // If a video link exists, use the mouseenter event to show the video popup
                imageElement.addEventListener('click', function () {
                  overalloverlay.style.display = 'flex';
                  document.getElementById('vidpopup').style.display = 'flex';

                  // Update product details
                  document.getElementById('productimge').setAttribute('src', imageUrl);
                  document.getElementById('prdt-name').textContent = imageDescription;
                  document.getElementById('cost').textContent = stall.products[imageIndex].price;
                  document.getElementById('prdt-units').textContent = stall.products[imageIndex].unit;
                  document.getElementById('visit-prdt-btn-1').setAttribute('href', stall.products[imageIndex].productlink);
                  console.log("product link", stall.products[imageIndex].productlink);

                  // Retrieve the dynamic video URL and update the Video.js player
                  // var videoUrl = stall.products[imageIndex].videoUrl;
                  var player = videojs('youtubePlayer');
                  player.src({ type: 'video/youtube', src: stall.products[imageIndex].product_youtube_link });
                  player.play();

                  tracking(stall.uno, 'product', imageDescription);
                  trackinga('product', 'hallpage');
                });
              } else {
                // If no video link exists, use the click event to show the product details popup
                imageElement.addEventListener('click', function () {
                  overalloverlay.style.display = 'flex';
                  document.getElementById('popup').style.display = 'flex';

                  // Update product details
                  document.getElementById('productimge').setAttribute('src', imageUrl);
                  document.getElementById('prdt-name').textContent = imageDescription;
                  document.getElementById('cost').textContent = stall.products[imageIndex].price;
                  document.getElementById('prdt-units').textContent = stall.products[imageIndex].unit;
                  document.getElementById('visit-prdt-btn').setAttribute('href', stall.products[imageIndex].productlink);

                  document.getElementById('visit-prdt-btn').setAttribute('onclick', `tracking(${stall.uno}, "visit-product-website",''); return true;`);

                  document.getElementById('share-prdt').addEventListener('click', function showPopup() {
                    document.getElementById('popup').style.opacity = 0;
                    var newURL = `${stall.products[imageIndex].productlink}`;
                    var popupOverlay = document.getElementById('popup-overlay');
                    var currentURLInput = document.getElementById('currentURL');
                    currentURLInput.value = newURL;
                    setTextContent(selectedLanguage);
                    popupOverlay.style.display = 'flex';
                    tracking(stall.uno, 'share-product', imageDescription);
                  });

                  tracking(stall.uno, 'product', imageDescription);
                  trackinga('product', 'hallpage');
                });
              }


              // // Create popup element
              const popupElement = document.createElement('a-entity');

              popupElement.setAttribute('id', `popup-img${imageIndex + 1}_${stallContainerId}`);

              // Create the content inside the popup
              const popupContent = `
                                            <a-plane color="#333" width="5" height="2"></a-plane>
                                            <a-text value="${imageDescription}" align="center" color="white" width="5" height="5" wrap-count="25" position="0 0 0.25"></a-text>
                                        `;

              popupElement.innerHTML = popupContent;
              // Append image and popup to the container
              containerEntity.appendChild(imageElement);
              containerEntity.appendChild(popupElement);
              popupElement.setAttribute('position', '0.8 1.5 0');
              popupElement.setAttribute('rotation', '0 90 0');
              popupElement.setAttribute('scale', '0.5 0.5 0.5');
              // popupElement.setAttribute("width","0.1")
              // popupElement.setAttribute("height","0.1")
              popupElement.setAttribute('visible', 'false');
              //popupElement.setAttribute("visible", "false");
              // //console.log("the popup is the following");
              // //console.log(popupElement); 8
              // Append container entity to the
              document.getElementById(stallContainerId).appendChild(containerEntity);

              imageElement.addEventListener('mouseenter', function () {
                document
                  .getElementById(`popup-img${imageIndex + 1}_${stallContainerId}`)
                  .setAttribute('visible', 'true');
              });

              imageElement.addEventListener('mouseleave', function () {
                document
                  .getElementById(`popup-img${imageIndex + 1}_${stallContainerId}`)
                  .setAttribute('visible', 'false');
              });
            }
          } else {
            // Log a message if the products array is missing or empty for the current stall
            console.error(`Products array missing or empty for stall ${stallIndex + 1}`);
          }
        });
      }
      checkhallfive(apivariable.stalls.length);
      document.getElementById(`stall${data.stalls.length}-next`).setAttribute('visible', 'false');
    })
    .catch((error) => {
      // Handle fetch errors
      tracking(0, `Error in Hall-${error}`);
      document.getElementById('overLaySection').style.display = 'flex';
      document.querySelector('h3').textContent = 'Something Went Wrong Please Try Again Later';
      console.error('Error fetching data:', error);
    });
};
fetchDataFromAPI();

document.addEventListener('DOMContentLoaded', function () {
  updatestatus();
  const previousbutton = document.getElementById('prev-hall');
  document.getElementById('next-hall').addEventListener('click', function () {
    autoclosechat();
    removeEntities(apivariable.stalls);
    //console.log(apivariable.stalls);
    let start1 = apivariable.stalls[0].start;
    //console.log(start1)
    let end1 = apivariable.stalls[0].end;
    //console.log(end1)
    //removeEntities(apivariable.stalls);
    let start = parseInt(end1) + 1;
    //console.log(`the next start is ${start}`)
    let end = parseInt(start) + 9;
    //console.log(`the next start is ${start}`)
    //console.log(end)
    //console.log('Start:', start); // Output: 1
    //console.log('End:', end);
    requestBody = {
      exhibition_ID: '6',
      start: `${start}`,
      end: `${end}`,
      category: '0',
      businesscategorylevel1: categoryparam,
      uno: '0'
    };
    b = b + 1;
    if (c) {
      // //console.log(`the c value is ${c}`)
      c = c + 1;
    }
    // posistioning the camera to original
    var stallPosition = document.getElementById('stall1').getAttribute('position');
    // Assuming 'stall1' has attributes x, y, and z
    var stallX = stallPosition.x;
    //console.log(`posistion-of-stall is ${stallX}`)
    var stallY = stallPosition.y;
    //console.log(`posistion-of-stall is ${stallY}`)
    var stallZ = stallPosition.z;

    //console.log(`posistion-of-stall is ${stallZ}`)

    // Perform some math operations on stallX, stallY, stallZ
    var newX = stallX + 23; // for example, adding 2 to the x position
    var newY = stallY + 1; // subtracting 1 from the y position
    var newZ = stallZ + 5; // multiplying the z position by 2
    document.getElementById('player').removeAttribute('look-controls');

    document.getElementById('rig').setAttribute('rotation', {
      x: 0,
      y: 0,
      z: 0
    });
    // Set the new position to the 'camera'
    document.getElementById('rig').setAttribute('position', { x: newX, y: newY, z: newZ });

    fetchDataFromAPI();
    document.getElementById('player').setAttribute('look-controls', 'magicWindowTrackingEnabled:false');
    trackinga('next-hall', 'next-hallButton');
  });

  previousbutton.addEventListener('click', function () {
    autoclosechat();
    removeEntities(apivariable.stalls);
    //console.log("button is clicked for nex button")
    let start1 = apivariable.stalls[0].start;
    //console.log(start1)
    let end1 = apivariable.stalls[0].end;
    start = parseInt(start1) - 10;
    end = parseInt(start) + 9;
    //console.log('Start:', start1); // Output: 1
    //console.log('End:', end1);
    //    debugger
    requestBody = {
      exhibition_ID: '6',
      start: `${start}`,
      end: `${end}`,
      category: '0',
      businesscategorylevel1: categoryparam,
      uno: '0'
      // Add other data as needed
    };
    if (c) {
      //console.log(`the c value is ${c}`)
      c = c - 1;
    }
    b = b - 1;
    var stallPosition = document.getElementById('stall1').getAttribute('position');
    // Assuming 'stall1' has attributes x, y, and z
    var stallX = stallPosition.x;
    //console.log(`posistion-of-stall is ${stallX}`)
    var stallY = stallPosition.y;
    //console.log(`posistion-of-stall is ${stallY}`)
    var stallZ = stallPosition.z;
    // Perform some math operations on stallX, stallY, stallZ
    var newX = stallX + 23; // for example, adding 2 to the x position
    var newY = stallY; // subtracting 1 from the y position
    var newZ = stallZ + 5; // multiplying the z position by 2
    document.getElementById('player').removeAttribute('look-controls');

    document.getElementById('rig').setAttribute('rotation', {
      x: 0,
      y: 0,
      z: 0
    });
    // Set the new position to the 'camera'
    document.getElementById('rig').setAttribute('position', { x: newX, y: newY, z: newZ });
    fetchDataFromAPI();
    document.getElementById('player').setAttribute('look-controls', 'magicWindowTrackingEnabled:false');
    trackinga('previous-hall', 'previous-hallButton');
  });
});

document.querySelector('.iframeImg').addEventListener('click', function () {
  overalloverlay.style.display = 'none';
});
// if (useragent == 'mobile') {
//   // document.getElementById('chat-icon123').style.display = 'none';
//   //   document.querySelector('.switch').style.display="block"
//   document.querySelector('.tooltiptwo').addEventListener('click', function () {
//     overalloverlay.style.display = 'flex';
//     document.querySelector('.loading-container1').style.visibility = 'visible';
//     document.querySelector('.loading-text1').style.visibility = 'visible';
//     document.getElementById('iframe-expoDir').setAttribute('src', `https://expo1.marketcentral.in/expoDirectoryMobile.cfm`);
//     document.getElementById('iframe-expoDir').onload = function () {
//       // Hide the loading animation once the iframe is loaded
//       document.querySelector('.loading-container1').style.visibility = 'hidden';
//       document.querySelector('.loading-text1').style.visibility = 'hidden';
//     };
//   });
// } else {
//   document.getElementById('stick').style.display = 'none';
//   //  document.querySelector('.switch').style.display="none"
//   document.querySelector('.tooltiptwo').addEventListener('click', function () {
//     overalloverlay.style.display = 'flex';
//     document.querySelector('.loading-container1').style.visibility = 'visible';
//     document.querySelector('.loading-text1').style.visibility = 'visible';

//     document.getElementById('iframe-expoDir').setAttribute('src', `https://expo1.marketcentral.in/expoDirectory.cfm`);
//     document.getElementById('iframe-expoDir').onload = function () {
//       // Hide the loading animation once the iframe is loaded
//       document.querySelector('.loading-container1').style.visibility = 'hidden';
//       document.querySelector('.loading-text1').style.visibility = 'hidden';
//     };
//   });
// }

var bgContainer = document.getElementById('mapText');
var cards = [];
var currentIndex = 0;
let buttonid = 0;
// // category map js
// async function getcategorymapdata (){
//     try{
//         fetch(`https://www.marketcentral.in/rest/virtualExpo/general/getBusinesses/${endpoint_ExhibitionId}`)
//         const response = await response.json()
//         await
//        (apiData => {
//            data = apiData; // Assign data from API to the global variable
//            //console.log(data);
//            createCards(data);

//        })
//     }catch(error){
//         console.error(error)
//     }

// }

let categoryData = null; // Variable to store the fetched data

async function getcategorymapdata() {
  if (!categoryData) {
    // Check if the data has already been fetched
    // alert("first")
    overalloverlay.style.display = 'flex';
    try {
      const response = await fetch(
        `https://www.marketcentral.in/rest/virtualExpo/general/getBusinesses/${endpoint_ExhibitionId}`
      );
      categoryData = await response.json(); // Store the fetched data
      console.log(categoryData);
      document.querySelector('.categoryloading').style.display = 'none';
      // Use the fetched data
      createCards(categoryData);
    } catch (error) {
      console.error(error);
    } finally {
      overalloverlay.style.display = 'none';
    }
  } else {
    // alert("second")
    // Use the previously fetched data
    // createCards(categoryData);
  }
}

document.querySelector('.tooltipone').addEventListener('click', getcategorymapdata);

// async function getcategorymapdata() {
//     overalloverlay.style.display='flex'
//     try {
//         const response = await fetch(`https://www.marketcentral.in/rest/virtualExpo/general/getBusinesses/${endpoint_ExhibitionId}`);
//          data = await response.json(); // Await the response and parse it as JSON

//         // Use the fetched data
//         createCards(data);
//     } catch (error) {
//         console.error(error);
//     }
// }

// document.querySelector('.tooltipone').addEventListener('click',getcategorymapdata)
///-------------------------------------------------------OLD CODE ---------------------------------------
document.getElementById('mapbutton1').addEventListener('click', showPrevious);
document.getElementById('mapbutton2').addEventListener('click', showNext);

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
  console.log('Dynamic point is now defined:', dynamicpoint);
  // Further actions here
}

async function sendnavdropdown(category, startpoint, endpoint, hallnum) {
  window.location.href = `prototype.html?category=${encrypt(
    category
  )}&start=${startpoint}&end=${endpoint}&hallnum=${hallnum}`;

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
    var h3 = document.createElement('h3');
    h3.id = `categoryname${i + 1}`;
    console.log(selectedLanguage);
    switch (selectedLanguage) {
      case 'hindi':
        h3.textContent = data[i].CATEGORY_LEVEL_1_HINDI;
        break;
      case 'marathi':
        h3.textContent = data[i].CATEGORY_LEVEL_1_MARATHI;
        break;
      case 'gujarati':
        h3.textContent = data[i].CATEGORY_LEVEL_1_GUJARATI;
        break;
      case 'telugu':
        h3.textContent = data[i].CATEGORY_LEVEL_1_TELUGU;
        break;
      case 'bengali':
        h3.textContent = data[i].CATEGORY_LEVEL_1_BENGALI;
        break;
      default:
        h3.textContent = data[i].CATEGORY; // Assuming you want to default to English
        break;
    }
    // if (halllang == "hindi") {
    //     h3.textContent = data[i].CATEGORY_LEVEL_1_HINDI;
    // } else {
    //     h3.textContent = data[i].CATEGORY;
    // }

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
    cards[i].style.display = 'none';
  }

  for (var i = 0; i < 10; i++) {
    if ([index + i] < cards.length) {
      cards[index + i].style.display = 'flex';
      document.getElementById('mapbutton2').style.display = 'flex';
    } else {
      document.getElementById('mapbutton2').style.display = 'none';
    }
  }
}

function showNext() {
  currentIndex = (currentIndex + 10) % cards.length;
  //console.log(currentIndex)
  buttonid += 1;
  //console.log(`the button is ${buttonid}`)
  if (buttonid >= 1) {
    //console.log("before execution")
    document.getElementById('mapbutton1').style.display = 'flex';
  }
  showCard(currentIndex);
}

function showPrevious() {
  currentIndex = (currentIndex - 10 + cards.length) % cards.length;
  //console.log(`the before button index is ${currentIndex}`)
  buttonid -= 1;
  if (buttonid == 0) {
    //console.log("before execution")
    document.getElementById('mapbutton1').style.display = 'none';
    document.getElementById('mapbutton2').style.display = 'flex';
  }
  showCard(currentIndex);
}

function closePopup() {
  overalloverlay.style.display = 'none';
  var popupcontainer = document.getElementById('mappopup');
  popupcontainer.style.display = 'none';
}

document.getElementById('closeIcon').addEventListener('click', closePopup);

function openLink(event) {
  var index = event.currentTarget.dataset.categoryIndex;

  // Assuming 'data' is the array obtained from the API
  var categories = categoryData.map((item) => item.CATEGORY);

  // Generate links based on categories
  var links = categories.map((category) => `prototype.html?category=${encrypt(category.replace(/&/g, '||'))}`);
  var categoriesselect = categories.map((category) => category);
  //database
  trackinga(categoriesselect[index], 'prototype');
  sendbeaconapi(0, categoriesselect[index], '');

  window.location.href = links[index];
}

function checkhallfive(x) {
  if (x <= 5) {
    // alert("satisfied")
    document.getElementById('five-hall').setAttribute('gltf-model', './assetsnew/hallModel/Hall_with_lighting5.glb');
    document.getElementById('five-hall').setAttribute('visible', 'true');
    document.getElementById('five-hall').setAttribute('position', '0 0 0');
    // document.getElementById('area5').setAttribute('rotation','90 -90 0')
    // document.getElementById('area5').removeAttribute('position')
    // document.getElementById(`stall5`).setAttribute("instanced-mesh-member","mesh:#mesh1");
    document.getElementById('stall-avatar5').setAttribute('position', '1 0 -66');
    document.getElementById('stall-avatar5').setAttribute('rotation', '0 -90 0');
    document.getElementById('stall5').setAttribute('rotation', '0 -90 0');

    // if (document.getElementById('stall5').getAttribute('visible') === true) {

    //     document.getElementById('moveup51').setAttribute('visible', 'true')
    // }

    if (x == 5) {
      document.getElementById('moveup5').setAttribute('visible', 'false');
    }

    // document.getElementById('stall5').setAttribute('visible','true')
    document.getElementById('stall5').setAttribute('position', '1.109 0.000 -65');
    document.getElementById('bubble5').setAttribute('rotation', '0 0 0');
    document.getElementById('bubble5').setAttribute('position', '-4 6 -65');
    document.getElementById('navmeshmodel_10').removeAttribute('gltf-model');
    document.getElementById('navmeshmodel_10').setAttribute('gltf-model', 'url(./assetsnew/navmesh/Hall @5 navmesh.glb)');
    document.getElementById('navmeshmodel_10').setAttribute('position', '0 0 0');
    document.getElementById('navmeshmodel_10').setAttribute('visible', 'false');
  } else {
    document.getElementById('navmeshmodel_10').removeAttribute('gltf-model');
    document.getElementById('navmeshmodel_10').setAttribute('gltf-model', 'url(./assetsnew/navmesh/Hall @10 navmesh.glb)');
    document.getElementById('navmeshmodel_10').setAttribute('position', '0 0 0');
    document.getElementById('navmeshmodel_10').setAttribute('visible', 'false');
    document.getElementById('bubble5').setAttribute('rotation', '0 90 0');
    document.getElementById('bubble5').setAttribute('position', '-25.5 6.08 -66');
    document.getElementById('stall-avatar5').setAttribute('position', '-28 0 -71');
    document.getElementById('stall-avatar5').setAttribute('rotation', '0 0 0');
    // document.getElementById(`stall5`).setAttribute("instanced-mesh-member","mesh:#mesh1");
    document.getElementById('stall5').setAttribute('visible', 'true');
    document.getElementById('stall5').setAttribute('position', '-26.677 -0.05 -71.2');

    // alert("not satisfied")
  }
}
function checkurlparm(urlparameter) {
  //console.log("triggerd checkurlparam")
  if (!urlparameter) {
    if (!localStorage.getItem('UserName')) {
      window.location.replace('index.html');
    } else {
      //   window.location.replace("categorymapdynmic.html")
    }
  }
}

function setTextContent(language) {
  if (language in translations) {
    const translation = translations[language];
    document.getElementById('urlText').textContent = translation.urlText;
    document.querySelector('.inviteText').textContent = translation.inviteText;
    // document.getElementById(`notetext${index + 1}`).setAttribute('value',translation.)
  } else {
    // Default to English if the selected language is not found
    document.getElementById('urlText').textContent = translations.english.urlText;
    document.querySelector('.inviteText').textContent = translations.english.inviteText;
    // document.getElementById(`notetext${index + 1}`).setAttribute('value',)
  }
}
function setTextchatContent(language, index) {
  if (language in translations) {
    const translation = translations[language];
    document.getElementById(`notetext${index}`).setAttribute('value', translation.chattext);
  } else {
    document.getElementById(`notetext${index}`).setAttribute('value', translations.english.chattext);
  }
}

function autoclosechat() {
  // alert("pass")
  // Get the element
  var element = document.getElementById('chat-ui-room');

  // Get the computed style of the element
  var style = window.getComputedStyle(element);
  // alert(style)
  if (style.display === 'block') {
    element.style.display = 'none';
  }
}

function clearPopupData() {
  document.getElementById('productimge').setAttribute('src', ''); // or a placeholder image URL
  document.getElementById('prdt-name').textContent = '';
  document.getElementById('cost').textContent = '';
  document.getElementById('prdt-units').textContent = '';
  document.getElementById('visit-prdt-btn').setAttribute('href', '#');
  document.getElementById('visit-prdt-btn').removeAttribute('onclick');
}

function closeInstruction() {
  document.getElementById('overallOverLayinst').style.display = 'none';
}
function openInstruction() {
  document.getElementById('overallOverLayinst').style.display = 'flex';
}

document.getElementById('Help-icon').addEventListener('click', function () {
  // document.getElementById('help-overlay').style.display='flex'
  openuguide();
  $('#hallButtons, #mblchatplaceholder, #chat-icon123').addClass('initial_guide');
  tracking('', 'Help-guide', '');
  // trackinga("next-hall", "next-hallButton")
});
document.getElementById('mblhelpicon').addEventListener('click', function () {
  // document.getElementById('help-overlay').style.display='flex'
  openuguide();
  $('#hallButtons, #mblchatplaceholder, #chat-icon123').addClass('initial_guide');
});

document.querySelector('.help-close-button').addEventListener('click', function () {
  document.getElementById('help-overlay').style.display = 'none';
});

// document.querySelector('.closevideo').addEventListener('click', function () {
//   // Hide the popup
//   document.getElementById('vidpopup').style.display = 'none';

//   // Get the Video.js player instance and pause it
//   var player = videojs('youtubePlayer');
//   player.pause();
// });

