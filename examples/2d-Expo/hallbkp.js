function checkurlparm(urlparameter) {
  if (!urlparameter) {
    if (!localStorage.getItem('UserName')) {
      window.location.replace('index.html');
    } else {
      window.location.replace('categorymapdynmic.html');
    }
  }
}
import { io } from 'https://cdn.socket.io/4.5.4/socket.io.esm.min.js';
const socket = io('https://mcexpochatserver.marketcentral.in/');

// Function to call your API and create a chat room
const Postroom = async function (businessID, businessName) {
  try {
    const userName = localStorage.getItem('UserName');
    const response = await fetch(`https://mcexpochatapis.marketcentral.in/api/ExpoChat/PostChatRoom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        roomId: `room_${userName}_${businessID}`,
        customerId: userName,
        vendorId: businessID,
        vendorName: businessName,
        exhibitionId: 6
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.sucess) {
      console.log(`Chat room created successfully for: business: ${businessID} - customer: ${userName}`);
      console.log(data);
    }
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

let stallsData;
let urlendpoint = '';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var startValue = urlParams.get('start');
var endValue = urlParams.get('end');
var hallnum = urlParams.get('hallnum');
var categoryparam = decrypt(urlParams.get('category'));
checkurlparm(categoryparam);
if (categoryparam.includes('||')) {
  categoryparam = categoryparam.replace(/\|\|/g, '&');
}

if (window.location.href.includes('digiexpodev.marketcentral')) {
  urlendpoint = 'https://www.marketcentral.in';
} else if (window.location.href.includes('www') || window.location.href.includes('expodev')) {
  urlendpoint = 'https://www.marketcentral.in';
} else if (window.location.href.includes('localhost')) {
  urlendpoint = 'https://www.marketcentral.in';
} else {
  urlendpoint = 'https://www.marketcentral.in';
}

let requestBody = {
  exhibition_ID: '2',
  start: '1',
  end: '10',
  category: '0',
  businesscategorylevel1: categoryparam,
  uno: '0'
};
if (startValue && endValue && hallnum) {
  requestBody.start = startValue;
  requestBody.end = endValue;
}
let url = `${urlendpoint}/rest/virtualExpo/general/virtualExhibitionDetails`;

// Get a reference to the container where stalls will be rendered.
const expoContainer = document.getElementById('expo-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentStallIndex = 0;

// Fetch stall data from your endpoint and call renderStalls()
// Modified to return the promise from fetch
const fetchdata = () => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(requestBody)
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Network response was not ok. Failed URL: ${url}`);
      }
    })
    .then((data) => {
      if (data.data) {
        if (data.data.message === 'No records found') {
          window.location.replace('categorymapdynmic.html');
        }
      } else {
        stallsData = data;
        console.log(stallsData);
        renderStalls();
      }
      return data;
    })
    .catch((error) => {
      console.error('Fetch Error:', error);
    });
};

// Render the stall UI with each stall’s details
function renderStalls() {
  // Clear the container before re-rendering
  expoContainer.innerHTML = '';

  stallsData.stalls.forEach((stall, index) => {
    const stallElement = document.createElement('div');
    stallElement.classList.add('stall');
    stallElement.innerHTML = `
      <div class="stallHeader">
        <div class="toggler">
          <div class="dropdown">
            <button type="button" data-toggle="dropdown">
              <p><img src="./assetsnew/icons/menu.svg"  class='menu-icon'> Stalls</p>
            </button>
            <div class="dropdown-menu" id="dropdownid">
              ${(() => {
                let dropdownItems = '';
                for (let i = 1; i <= stallsData.stalls.length; i++) {
                  dropdownItems += `<a class="dropdown-item" data-index="${i}" onclick="showStall(${
                    i - 1
                  })">Stall ${i}</a>`;
                }
                return dropdownItems;
              })()}
            </div>
          </div>
        </div>
        <div class="expoHeading">
          <p class="expoHeadinng">MT Expo</p>
        </div>
        <div class="lobbyClass" onclick="navigatetolobby()">
          <p class="lobbyName">Lobby</p>
        </div>
      </div>
      <div class="stallPage">
        <div class="stallPageBg"></div>
        <div class="stallContent" id="stallcontent">
          <div class="stallContentInner">
            <div class="custDetails">
              <img class="custImg" src="${stall.vendorInfo.vendorimage}">
              <div class="custNameDetails">
                <p class="custName">${stall.vendorInfo.vendorName}</p>
                <p class="custNum">${stall.vendorInfo.contactNumber}</p>
              </div>
              <div class="mediaIconsSection">
                <img class="mediaIcons" id="sharestall_${index}" onClick="shaerestall(${stall.uno}, ${
      index + 1
    }, ${index})" src="./assetsnew/icons/share stall.png">
                <!-- Chat button calls our new handleStallChat function -->
                <img class="mediaIcons" id="chaticon_${index}" onclick="handleStallChat(${stall.uno}, '${
      stall.vendorInfo.companyname
    }', ${index})" src="./assetsnew/icons/msg.png">
              </div>
            </div>
            <div class="companyNameContents">
              <img src="${stall.logo}" alt="${stall.vendorInfo.vendorName}">
              <p class="companyName">${stall.vendorInfo.companyname}</p>
            </div>
            <div class="agriProducts">
              <div class="agriProductsContents">
                <div class="productSection" id="productSection_${index}"></div>
                <div class="hallNum">
                  <p class="stallNum">Stall No:<span>${index + 1}</span></p>
                  <div class="icons">
                    <a href="${stall.websiteLink}" target="_blank"><img src="./assetsnew/icons/web.png"></a>
                    ${
                      stall.broucherlinkAvailable === 'yes'
                        ? `<a href="${stall.broucherlink}" target="_blank" id="broucher${
                            index + 1
                          }"><img src="./assetsnew/icons/pdf.png"></a>`
                        : '<a target="_blank" onclick="alertbroucher()"><img src="./assetsnew/icons/pdf.png"></a>'
                    }
                    <a href="${stall.businesscard}" target="_blank"><img src="./assetsnew/icons/contact.png"></a>
                    <!-- New icon for triggering changebusinessid -->
                    <a href="javascript:void(0)" onclick="changebusinessid(${stall.uno}, '${localStorage.getItem(
      'UserName'
    )}')">
                      <img src="../assetsnew/icons/business-card.png" alt="Upload Business Card">
                    </a>
                    <a href="mailto:${
                      stall.vendorInfo.email
                    }" target="_blank"><img src="./assetsnew/icons/Mail.png"></a>
                    <a href="tel:+91${
                      stall.vendorInfo.contactNumber
                    }" target="_blank"><img src="./assetsnew/icons/call.png"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="digitalPopUp" id="digitalPopUp_${index}">
        <div class="digitalPopUpContents">
          <img class="closeImg" src="./assetsnew/icons/blueCloseIcon.png" onclick="closepopup(${index})">
          <div class="productDetailsSection">
            <img class="productImg" id="productImgid_${index}" src="">
            <div class="productDetails">
              <p class="productName" id="productnameid_${index}">Discover Hidden Treasures:</p>
              <p class="productPrice" id="productpriceid_${index}">Price : <span>₹2,795/kilogram(kg)</span></p>
              <div class="productButtons d-flex">
                <a class="visitButton" id="visitButtonid_${index}">Visit Product</a>
                <a class="shareButton" id="shareButtonid_${index}">Share Product</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="popup-overlay_${index}" class="digitalcopyPopUp">
        <div id="popup-card">
          <h6 class="inviteText">Share Stall Link</h6>
          <div class="copySection">
            <p id="urlText">Stall Link</p>
            <div class="copyButtonSection">
              <input type="text" id="currentURL_${index}" class="currentURL" readonly />
              <img class="global" src="./assetsnew/icons/global.png" />
              <button id="copyButton" onClick="copyToClipboard(${index})">Copy</button>
            </div>
            <p class="url-copied-alert" id="url-copied-alert-txt_${index}">URL copied to clipboard!</p>
          </div>
          <button class="whiteCloseIcon" onClick="closePopup1(${index})"><img src="./assetsnew/icons/blueCloseIcon.png" /></button>
        </div>
      </div>
      <div class="footer">
        <div class="footerContents">
          <!-- Next/Prev buttons call showStalls with -1 or 1 -->
          <img src="./assetsnew/icons/leftArrow.png" onclick="showStalls(-1)">
          <div class="hallNumbers">
            <p class="hallHeading">Hall no:</p>
            <div class="numbersMain">
              ${(() => {
                let numberitems = '';
                for (let i = 1; i <= stallsData.Hallcount.Total; i++) {
                  numberitems += `<p class="numbers" data-index="${i}" onclick="changehall(${i})">${i}</p>`;
                }
                return numberitems;
              })()}
            </div>
          </div>
          <img src="./assetsnew/icons/rightArrow.png" onclick="showStalls(1)">
        </div>
      </div>
      <div id="chat-visitorpanel-room2_${index}" class="chat-ui-room2">
        <img class="toDClose" id="toDCloseone_${index}" onclick="closechatone(${index})" src="./assetsnew/icons/blueCloseIcon.png">
        <iframe class="chatClassone" id="chatui3_${index}" src="" width="800px" height="100%" allowfullscreen></iframe>
        <div class="indidualChatIcons">
          <img class="individualChatClose" src="./assetsnew/icons/blueCloseIcon.png">
        </div>
      </div>
    `;
    expoContainer.appendChild(stallElement);

    // Render product images for this stall
    const productSection = document.getElementById(`productSection_${index}`);
    if (productSection) {
      productSection.innerHTML = '';
      stall.products.slice(0, 5).forEach((product) => {
        const productImage = document.createElement('img');
        productImage.src = product.producturl;
        productImage.alt = product.productname;
        productImage.addEventListener('click', function () {
          showpopup(product.productname, product.price, product.producturl, product.productlink, index);
          console.log(product.productname);
        });
        productSection.appendChild(productImage);
      });
    } else {
      console.error(`Product section not found for stall ${index}`);
    }
  });

  if (selectedHallNumber !== null) {
    const hallElement = document.querySelector(`.hallNumbers .numbers[data-index="${selectedHallNumber}"]`);
    if (hallElement) {
      hallElement.classList.add('highlighted-button');
    }
  }
  // After rendering, trigger the showStall for the currentStallIndex (default 0)
  showStall(currentStallIndex);
}

async function showStall(index) {
  const stalls = document.querySelectorAll('.stall');
  stalls.forEach((stall) => {
    stall.classList.remove('active');
  });
  currentStallIndex = (index + stalls.length) % stalls.length;
  stalls[currentStallIndex].classList.add('active');

  const currentStallData = stallsData.stalls[currentStallIndex];
  const stallId = currentStallData.uno;

  // If the stall hasn't been visited, call Postroom and emit the event
  if (!isStallVisited(stallId)) {
    console.log('inside showStall check for stall:', stallId);
    markStallVisited(stallId);
    try {
      const data = await Postroom(stallId, currentStallData.vendorInfo.companyname);
      const userName = localStorage.getItem('UserName');
      const room = `room_${userName}_${stallId}`;
      socket.emit('stallVisited', { stallnum: stallId, bname: currentStallData.vendorInfo.companyname, room });
    } catch (error) {
      console.error(error);
    }
  }
}

// Next/Previous function: pass a delta (1 for next, -1 for prev)
function showStalls(delta) {
  const stalls = document.querySelectorAll('.stall');
  if (stalls.length === 0) return;

  // Remove active class from current stall
  if (stalls[currentStallIndex]) {
    stalls[currentStallIndex].classList.remove('active');
  }

  // Update currentStallIndex using modulo arithmetic
  currentStallIndex = (currentStallIndex + delta + stalls.length) % stalls.length;

  // Add active class to the new stall
  if (stalls[currentStallIndex]) {
    stalls[currentStallIndex].classList.add('active');
  }

  // Optionally, trigger join logic if needed:
  const currentStallData = stallsData.stalls[currentStallIndex];
  if (currentStallData && !isStallVisited(currentStallData.uno)) {
    Postroom(currentStallData.uno, currentStallData.vendorInfo.companyname);
    markStallVisited(currentStallData.uno);
    const userName = localStorage.getItem('UserName');
    const room = `room_${userName}_${currentStallData.uno}`;
    socket.emit('stallVisited', {
      stallnum: currentStallData.uno,
      bname: currentStallData.vendorInfo.companyname,
      room
    });
  }
  // (Optional: you could also call showStall(currentStallIndex) to perform additional logic.)
}

// Updated changehall function:
// Now, after clearing the expo container and resetting currentStallIndex,
// we fetch new hall data and then explicitly trigger showStall(0) so that
// the API is called for the first stall of the new hall.
function changehall(indexvalue) {
  selectedHallNumber = indexvalue;
  const allHalls = document.querySelectorAll('.hallNumbers .numbers');
  allHalls.forEach((hall) => hall.classList.remove('highlighted-hall'));
  const selectedHall = document.querySelector(`.hallNumbers .numbers[data-index="${indexvalue}"]`);
  if (selectedHall) {
    selectedHall.classList.add('highlighted-hall');
  }
  // Clear only the expo container
  expoContainer.innerHTML = '';
  requestBody.start = (indexvalue - 1) * 10 + 1;
  requestBody.end = indexvalue * 10;
  currentStallIndex = 0;

  // Fetch new hall data and then, once rendered, trigger showStall for the first stall.
  fetchdata().then(() => {
    showStall(currentStallIndex);
  });
}

fetchdata();

// Function to show product details popup
function showpopup(prdname, prdprice, prdlink, prdurl, index) {
  document.getElementById(`productnameid_${index}`).textContent = prdname;
  document.getElementById(`productpriceid_${index}`).textContent = `Price: ${prdprice}`;
  document.getElementById(`productImgid_${index}`).src = prdlink;
  document.getElementById(`visitButtonid_${index}`).addEventListener('click', function () {
    window.open(prdurl, '_blank');
  });
  document.getElementById(`shareButtonid_${index}`).addEventListener('click', function () {
    document.getElementById(`digitalPopUp_${index}`).style.display = 'none';
    document.getElementById(`popup-overlay_${index}`).style.display = 'flex';
    document.getElementById(`currentURL_${index}`).value = prdurl;
    document.getElementById('urlText').textContent = 'Product Link';
    document.body.classList.add('overlay');
  });
  document.querySelector(`#digitalPopUp_${index}`).style.display = 'flex';
}

let selectedHallNumber = null;
function shaerestall(uno, name, index) {
  var currentURL1 = window.location.href;
  var baseURL = currentURL1.substr(0, currentURL1.lastIndexOf('/') + 1);
  var newURL = `${baseURL}sharestall.html?uno=${encryptWithCasePreservation(uno.toString())}&stallno=${name}`;
  document.getElementById(`popup-overlay_${index}`).style.display = 'flex';
  document.getElementById(`currentURL_${index}`).value = newURL;
  document.getElementById('urlText').textContent = 'Stall Link';
  document.body.classList.add('overlay');
}

function closepopup(index) {
  document.querySelector(`#digitalPopUp_${index}`).style.display = 'none';
}

function openlink(value) {
  window.open(value, '_blank');
}

function closePopup1(index) {
  document.body.classList.remove('overlay');
  document.getElementById(`popup-overlay_${index}`).style.display = 'none';
  document.querySelector(`.url-copied-alert`).style.display = 'none';
  if (document.getElementById('urlText').textContent === 'Product Link') {
    document.getElementById(`digitalPopUp_${index}`).style.display = 'flex';
  }
}

function copyToClipboard(inex) {
  var currentURL = document.getElementById(`currentURL_${inex}`).value;
  navigator.clipboard
    .writeText(currentURL)
    .then(function () {
      document.getElementById(`url-copied-alert-txt_${inex}`).style.display = 'block';
    })
    .catch(function (err) {
      console.error('Unable to copy to clipboard', err);
    });
}

function showindividualchat(index, uid, bname) {
  var usernamelocal = localStorage.getItem('UserName');
  var guidd = localStorage.getItem('GUID');
  document.getElementById(`chat-visitorpanel-room2_${index}`).style.display = 'flex';
  document
    .getElementById(`chatui3_${index}`)
    .setAttribute(
      'src',
      `https://expo1.marketcentral.in/CHAT/visitorpannel.cfm?stallid=12&name=${usernamelocal}&bname=${localStorage.getItem(
        'UserName'
      )}&name=${localStorage.getItem('UserName')}&uid=${guidd}`
    );
}

function alertbroucher() {
  alert('No Broucher Available');
}

function navigatetolobby() {
  window.location.href = 'lobby.html';
}

function closechat(index) {
  document.getElementById(`chat-ui-room2_${index}`).style.display = 'none';
}

function closechatone(index) {
  document.getElementById(`chat-visitorpanel-room2_${index}`).style.display = 'none';
}

/* 
  New function to handle the stall chat:
  - Checks if the stall has been visited and creates the chat room if not.
  - Emits socket events only once.
  - Finally, opens the chat modal using your provided methods.
*/
async function handleStallChat(stallnum, bname, index) {
  const userName = localStorage.getItem('UserName');
  const room = `room_${userName}_${stallnum}`;
  console.log(room);
  if (!isStallVisited(stallnum)) {
    markStallVisited(stallnum);
    socket.emit('stallVisited', { stallnum, bname, room });
  }
  if (!isStallVisitedforchat(stallnum)) {
    markStallVisitedforchat(stallnum);
    socket.emit('customerJoin', {
      roomId: room,
      customerId: userName
    });
  }
  if (stallnum) {
    console.log('Setting vendor');
    window.ExpoCustomerChat.setVendor(stallnum);

    console.log('Opening chat modal');
    window.ExpoCustomerChat.openChatModal();
    console.log('openChatModal called');
  }
}

// Helper functions for tracking visited stalls
function markStallVisited(stallId) {
  let visitedStalls = JSON.parse(localStorage.getItem('visitedStalls')) || [];
  if (!visitedStalls.includes(stallId)) {
    visitedStalls.push(stallId);
    localStorage.setItem('visitedStalls', JSON.stringify(visitedStalls));
  }
}

function isStallVisited(stallId) {
  let visitedStalls = JSON.parse(localStorage.getItem('visitedStalls')) || [];
  return visitedStalls.includes(stallId);
}

function markStallVisitedforchat(stallId) {
  let visitedStalls = JSON.parse(localStorage.getItem('visitedStallschat')) || [];
  if (!visitedStalls.includes(stallId)) {
    visitedStalls.push(stallId);
    localStorage.setItem('visitedStallschat', JSON.stringify(visitedStalls));
  }
}

function isStallVisitedforchat(stallId) {
  let visitedStalls = JSON.parse(localStorage.getItem('visitedStallschat')) || [];
  return visitedStalls.includes(stallId);
}

function changebusinessid(bussinessId, custid) {
  MyBusinessCardPlugin.openUploadcard('root', false, bussinessId, custid);
}

window.handleStallChat = handleStallChat;
window.showStall = showStall;
window.showStalls = showStalls;
window.changebusinessid = changebusinessid;
window.changehall = changehall;
window.copyToClipboard = copyToClipboard;
window.shaerestall = shaerestall;
window.closePopup1 = closePopup1;
window.closepopup = closepopup;
window.alertbroucher = alertbroucher;
window.navigatetolobby = navigatetolobby;
window.closechat = closechat;
window.closechatone = closechatone;
