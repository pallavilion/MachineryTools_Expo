let stallsData;
var urlendpoint = '';
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
//var selectedLanguages = localStorage.getItem('languageselection')
if (window.location.href.includes('digiexpodev.marketcentral')) {
    urlendpoint = 'https://www.marketcentral.in';
}
// Check if the URL contains "www" or "expodev"
else if (window.location.href.includes('www') || window.location.href.includes('expodev')) {
    urlendpoint = 'https://www.marketcentral.in';
}
else if(window.location.href.includes('localhost')){
    urlendpoint = 'https://www.marketcentral.in';
}
// Default to some other URL
else {
    urlendpoint = 'https://www.marketcentral.in';
}
let requestBody = {
        exhibition_ID: '2',
        start: '1',
        end: '10',
        category: "0",
        businesscategorylevel1:categoryparam,
        uno: '0'
    };
if(startValue&&endValue&&hallnum){
    requestBody.start=startValue;
    requestBody.end=endValue
}
    let url = `${urlendpoint}/rest/virtualExpo/general/virtualExhibitionDetails`;

    const fetchdata = () => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Network response was not ok.and failed url is :${url}`);
            }
        })
        .then(data => {
            if (data.data) {
                if (data.data.message === 'No records found') {
                    window.location.replace("categorymapdynmic.html");
                }
            } else {
                stallsData = data;
                console.log(stallsData); // Log stallsData to see what it contains
                renderStalls(); // Call renderStalls after successfully fetching data
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
        });
    };

    const expoContainer = document.getElementById("expo-container");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentStallIndex = 0;

    // Function to render stalls
    function renderStalls() {
        expoContainer.innerHTML = "";
        if (!Array.isArray(stallsData.stalls)) {
            console.error('stallsData.stalls is not an array:', stallsData.stalls);
            return;
        }
        stallsData.stalls.forEach(stall => {
            const stallElement = document.createElement("div");
            stallElement.classList.add("stall");
            stallElement.innerHTML = `
                <h2>${stall.name}</h2>
                <img src="${stall.vendorInfo.vendorimage}" alt="${stall.vendorInfo.vendorName}">
                <p><strong>Vendor Name:</strong> ${stall.vendorInfo.vendorName}</p>
                <p><strong>Company Name:</strong> ${stall.vendorInfo.companyname}</p>
                <p><strong>Contact:</strong> ${stall.vendorInfo.contactNumber}</p>
                <p><strong>Email:</strong> <a href="mailto:${stall.vendorInfo.email}">${stall.vendorInfo.email}</a></p>
                <h3>Products:</h3>
                <ul>
                    ${stall.products.slice(0, 5).map(product => `
                        <li>
                        <img  src="${product.producturl}" alt="${product.productname}" onclick="showpopup('${product.productname}', '${product.price}', '${product.producturl}')" >
                        </li>
                    `).join('')}
                </ul>
            `;
            expoContainer.appendChild(stallElement);
           
        });
        // Show the first stall by default
        showStall(currentStallIndex);

        const stallButtonsContainer = document.getElementById("stall-buttons");
        stallButtonsContainer.innerHTML = "";
        // Loop to create 10 buttons
        for (let i = 1; i <= stallsData.stalls.length; i++) {
            // Create a new button div
            const buttonDiv = document.createElement("div");
            buttonDiv.classList.add("stall-button");
    
            // Set the button text dynamically
            buttonDiv.textContent = `Stall ${i}`;
    
            // Set onclick event to each button
            buttonDiv.addEventListener("click", function() {
               
                // Handle click event, you can do something when button is clicked
                console.log(`Button ${i} clicked!`);
                showStall(i-1)
            });
    
            // Append the button div to the container
            stallButtonsContainer.appendChild(buttonDiv);
        }
    
        const HallButtonsContainer = document.getElementById("hall-buttons");
    }

    
 function showStalls(index) {
        const stalls = document.querySelectorAll('.stall');
        stalls[currentStallIndex].classList.remove('active');
        currentStallIndex = (currentStallIndex + index + stalls.length) % stalls.length;
        stalls[currentStallIndex].classList.add('active');
    }
    // Call function to fetch data
    fetchdata();


function showpopup(prdname,prdprice,prdlink){
    document.getElementById('prd-name').textContent  =prdname
  document.getElementById('prd-price').textContent  =prdprice
  document.getElementById('prd-link').textContent  =prdlink
  document.getElementById('popup').style.display='block'
}

function changehall(indexvalue){ 
  requestBody.start=(indexvalue-1)*10+1,
  requestBody.end=(indexvalue)*10,
fetchdata();
}
function checkurlparm(urlparameter){
    //console.log("triggerd checkurlparam")
    if (!urlparameter) {
        if (!localStorage.getItem('UserName')) {
            window.location.replace("index.html")
        }
        else {
            window.location.replace("categorymapdynmic.html")
        }
 }
}

let hallbtndata;
let filterdata
let hallbtnurl="https://www.marketcentral.in/rest/virtualExpo/general/getBusinesses/3"
fetch(hallbtnurl)
      .then(response => response.json())
      .then(data => {
        hallbtndata=data
        filterdata = hallbtndata.filter(item=>item.CATEGORY===categoryparam)
        console.log(filterdata)
        const HallButtonsContainer = document.getElementById("hall-buttons");
    // Loop to create 10 buttons
    for (let i = 1; i <= filterdata[0].HALL_COUNT; i++) {
        // Create a new button div
        const buttonDiv1 = document.createElement("div");
        buttonDiv1.classList.add("Hall-button");
    
        // Set the button text dynamically
        buttonDiv1.textContent = `Hall ${i}`;
    
        // Set onclick event to each button
        buttonDiv1.addEventListener("click", function() {
            // Handle click event, you can do something when button is clicked
         //   alert("hallchange")
         //   highlightHallButton(buttonDiv1);
            console.log(`Hall ${i} clicked!`);
            changehall(i)
        });
    
        // Append the button div to the container
        HallButtonsContainer.appendChild(buttonDiv1);
    }
      })
      .catch(error => console.error('Error fetching data:', error))
      console.log(categoryparam)
      

