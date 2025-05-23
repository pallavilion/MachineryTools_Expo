
<!DOCTYPE HTML>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="initiatechat.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<style type="text/css">

		   body{
            font-family: "Roboto", sans-serif;
            background: #F3F3F3;
        }
        p{
            margin: 0;
        }
        .maximizedChat {
            padding: 24px;
            height: 70vh;
            overflow-y: scroll;
            scrollbar-width: none
        }
        .maximizedChat::-webkit-scrollbar {
            display: none;
        }
        .maximizedChat{
            -ms-overflow-style: none;
             scrollbar-width: none;
        }
        .chatSectionContents {
            background-color: #fff;
            display: flex;
            max-width: 1200px;
            margin: auto;
            height:100vh;
        }
        .chatDetails{
            color:#000;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            text-align:center;
            border-bottom:1px solid #F1F1F1;
            padding:24px;
        }
        .senderName{
            color: #1957B0;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
        }
		.receiverName{
			  color: #1957B0;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
		}
        .receiverChat p,.senderChat p{
            color: #000;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            border-radius: 12px;
            background: #F1F1F1;
            padding: 8px 16px;
        }
      .receiverChat {
            display: flex;
            flex-direction: column;
            align-items: start;
        }
        .senderChat {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        .leftChatSection{
            width:30%;
        }
        .mblmaxChat{
            width: 70%;
        }
        .rightChatSection {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-left: 1px solid #F1F1F1;
            height: 98vh;
            overflow-y: scroll;
        }
        .sendSection ::placeholder{
            color:#000;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            opacity:0.4;
        }
        .sendSection input {
            border-radius: 12px;
            border: 2px solid #CACACA;
            background: #FFF;
            padding: 10px 20px;
        }
        .sendSection #submit{
            border-radius: 12px;
			font-size:14px;
            background: #1957B0;
            padding: 8px 21px;
            color:#fff;
            text-decoration:none;
        }
        .sendSection {
            display: flex;
            align-items: center;
            gap: 13px;
            width: 94%;
            padding: 24px;
        }
        .rightChatSection::-webkit-scrollbar {
            display: none;
        }
        .rightChatSection{
            -ms-overflow-style: none;
             scrollbar-width: none;
        }
        .minimizedChats .active {
            border: 1px solid #1957B0;
            background: #E1EDFF;
        }
        .welcomeScreenContents{
            max-width:640px;
            background-color: #fff;
            border-radius: 12px ;
            width: 100%;

        }
        .welcomeScreenContents img{
            padding:12px 0;
        }
        .chatLogo{
            border-bottom: 1px solid #ECECEC;
            text-align: center;
        }
        .chatText{
            color: #000;
            font-size: 20px;
            font-style: normal;
            font-weight: 600;
            padding-top:15px;
        }
        .enterText{
            color: #494949;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            padding:38px 0 11px 0;
        }
        .welcomeScreenText ::placeholder{
            color:#949AA3;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
        }
        .welcomeScreenText input{
            padding:12px 13px;
            width: 100%;
            border-radius: 5px;
            border: 1px solid #CACACA;
        }
        .welcomeScreenText{
            padding:40px 0;
            max-width:400px;
            width: 100%;
            margin: auto;
        }
        #startChatBtn{
            padding: 12px 22px;
            border-radius: 8px;
            background: #1957B0;
            color: #fff;
            text-decoration:none;
            display:flex;
            align-items: center;
            justify-content:center;
            margin:25px 0 15px 0;
            cursor: pointer;
        }
        .welcomeScreen{
            display: flex;
            justify-content: center;
            align-items: center;
            height:100vh;
        }
        .inputClass{
            display:flex;
        }
        .mblmaxChat{
            display:none;
            max-width: 600px;
            margin:auto;
            background-color: #fff;
        }
        @media only screen and (max-width:992px){
		.chatLogo img {
					max-width: 100px;
				}
				 
				.welcomeScreenText {
					padding: 20px 0;
				}
				.enterText {
					padding: 20px 0 11px 0;
				}
		}
		        @media only screen and (max-width:767px){
            .welcomeScreen{
                height:100%;
                margin-top:50px;
            }
            .mblmaxChat{
                width:98%;
            }
            .sendSection input{
                width:100%;
            }
            .sendSection {
                width: unset;
            }
            .maximizedChat,.sendSection{
                padding:0 12px 24px 12px;
            }
            .maximizedChat {
                height: 79vh;
            }
        }
        @media only screen and (max-width:500px){
            .welcomeScreenContents {
                width: 98%;
            }
            .welcomeScreenText {
                width: 90%;
            }
        }

		#chatLog {
			background-color: #FAFAFA ;
			border: 1px solid #D0D0D0 ;
		    border-radius: 16px;
			height: 300px ;
			margin-bottom: 10px ;
			overflow-x: hidden ;
			overflow-y: scroll ;
			padding: 10px 10px 10px 10px ;
			width: 500px ;
			}
#chatLog::-webkit-scrollbar {
    display: none;
}
		#handle {
			float: left ;
			margin-bottom: 5px ;
			}

		#handleLabel {
			font-weight: bold ;
			}

		#handleTools {
			font-size: 90% ;
			font-style: italic ;
			}

		#handleTools a {
			color: #333333 ;
			}

		#typeNote {
			color: #999999 ;
			display: none ;
			float: right ;
			font-style: italic ;
			}

		

		#submit {
			font-size: 12px ;
			width: 80px;
			border-radius:8px

			}

		div.chatItem {
			border-bottom: 5px solid #F0F0F0 ;
			margin: 0px 0px 3px 0px ;
			padding: 0px 0px 3px 0px ;
			}

		div.chatItem span.handle {
			color: blue ;
			font-weight: bold ;
			}

		div.myChatItem span.handle {
			color: red ;
			}

			

	</style>
	<link rel="stylesheet" href="./customerchat.css">
	<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
	<script type="text/javascript" src="https://js.pusher.com/7.0/pusher.min.js"></script>
	<script type="text/javascript" src="channel-subscribe.js"></script>

</head>

<body>
<!--- 
<div id="chat" class="chat-room">
<div class="chat-bg">



<form id="chatForm" class="form-items" style="display: none;">
  <div id="handle" style="display:none">
        <span id="handleLabel">RandomDude</span>
    </div>
	 <div id="businesname">
        <span id="businesname1">RandomDude</span>
    </div>

    <div id="typeNote">
        <span id="typeLabel" rel="">Unknown</span> is typing.
    </div>
	
<br>
 <h5 id="channel" style=""></h5>
    <div id="chatLog"
	>
		
        <!--- To be populated dynamically. --->
    </div>
	--->
<!---     <div id="messageTools">
        <input id="message" type="text" name="message" />
        <input id="submit" type="submit" value="SEND" />
    </div>
	
</form>
</div>
</div>
 --->
<!--- 	  <div class="welcomeScreen">
        <div class="welcomeScreenContents">
            <div class="chatLogo">
                <img src="./uiLogo.png">
            </div>
            <div class="welcomeScreenText">
                <p class="chatText">Chats with <span id="b-name">[Deepika]</span></p>
                <p class="enterText">Please Enter Your Name</p>
                <div class="inputClass">
                    <input type="text" placeholder="Please Enter Your Name" id="name-field" >
                </div>
				<button id="startChatBtn">Start Chat</button>
            </div>
        </div>
    </div> --->
    <div class="mblmaxChat">
        <div class="rightChatSection">
            <div class="rightClassContents">
                <p class="chatDetails"><span class="owner" id="end-name">Akshay</span> chats with <span class="customer" id="v-name">Deepika</span></p>
                <div class="maximizedChat">
                  <!---  <div class="senderChat">
                        <span class="senderName">Akshay</span>
                        <p>Hey Deepika, have you heard about the MTExpo online for machine tools?</p>
                    </div>
                    <div class="receiverChat">
                        <span class="receiverName">Deepika</span>
                        <p>Yeah, I got the invite. When is it?</p>
                    </div>
                    <div class="senderChat">
                        <span class="senderName">Akshay</span>
                        <p>Feb 26th to March 10th. You interested?</p>
                    </div>
                    <div class="receiverChat">
                        <span class="receiverName">Deepika</span>
                        <p>Maybe. What's on?</p>
                    </div>
                    <div class="senderChat">
                        <span class="senderName">Akshay</span>
                        <p>Keynote talks, workshops, and cool machinery displays.</p>
                    </div>
                    <div class="receiverChat">
                        <span class="receiverName">Deepika</span>
                        <p>Sounds good. I'll check my schedule.</p>
                    </div>

                    <div class="senderChat">
                        <span class="senderName">Akshay</span>
                        <p>Cool, let me know if you decide to join!</p>
                    </div> --->
                </div>
            </div>
			<form>
	<div id="handle" style="display:none">
        <span id="handleLabel" STYLE="display:none">RandomDude</span>
    </div>

<!--- 	<div id="businesname"> 
        <span id="businesname1">RandomDude</span>
    </div>
	--->
    <div id="typeNote">
        <span id="typeLabel" rel="">Unknown</span> is typing.
    </div>
            <div class="sendSection">
               
				  <input  id="message" type="text" name="message">
				   <input  id="submit" type="submit" value="Send">

            </div>
			</form>
        </div>
    </div>
</body>
<script type="text/javascript" src="./custom.js"></script>


	<script type="text/javascript">

//WEB_SOCKET_DEBUG= true
		// This is for compatability with browsers that don't yet
		// support Web Sockets, but DO support Flash.
		//
		// NOTE: This SWF can be downloaded from the PusherApp
		// website. It is a Flash proxy to the standard Web
		// Sockets interface.
		WebSocket.__swfLocation = "./WebSocketMain.swf";
    //    console.log(localStorage.getItem('name'))
    //     alert(localStorage.getItem('name'))
		// When the DOM is ready, init the scripts.
		$(function(){
			// This is the user ID. This allows us to track the user
			// outside the context of the handle.
			<cfoutput>
				var stallId =#url.stallid#;
			</cfoutput>
          
			// Create a Pusher server object with your app's key and
			// the channel you want to listen on. Channels are unique
			// to your application.
			Pusher.logToConsole=true;
// Generate a unique ID for each user.
		// var currentUserID ="<cfoutput>#createUUID()#</cfoutput>";
        // localStorage.setItem('currentUserID',currentUserID)
        // alert(localStorage.getItem('currentUserID'))
//         if (!localStorage.getItem('currentUserID')) {
//     var currentUserID ="<cfoutput>#createUUID()#</cfoutput>";
//     localStorage.setItem('currentUserID', currentUserID);
    
// }

// var currentUserID =localStorage.getItem('CustomerID');
// currentUserID=localStorage.getItem('CustomerID');
// alert(localStorage.getItem('currentUserID'));
		console.log(currentUserID)
console.log(business)
console.log(customername)
			var server = new Pusher("1847dd0c5202f9b24097", {
  cluster: "ap2",
  encrypted:false,
  authEndpoint: "auth.cfm",
				auth: {
					params: {
						userID: currentUserID
					}
				}

});
    
// initiatechat();
var cname;
function initiatechat(){
    var name =  customername
	cname = name.trim(); // Removes leading and trailing whitespace from the name and assigns it to cname
    cname = cname.replace(/\s+/g, "_"); // Replaces all spaces with underscores in cname
	console.log(name)
	console.log(cname)
   // cname=name
	var nameRegex = /^[a-zA-Z ]+$/;
    if (name.length >= 3 && nameRegex.test(name)) {
        document.getElementById("handleLabel").textContent = name;
		console.log(document.getElementById("handleLabel").textContent )
        // document.getElementById("chatForm").style.display = "block";
       // document.getElementById("startChatBtn").style.display="none";
      //  document.getElementById("businesname1").textContent= name+" "+"chats with"+" "+ business
        //debugger
		document.getElementById("end-name").textContent = name;	
		 $('.welcomeScreen').css('display','none');
            $('.mblmaxChat').css('display','block');
        // const channaleName="private-"+stallId+"-"+currentUserID+"-"+cname;
		// $("#channel").text("channel:"+channaleName)
		// listenChannel(server,stallId,channaleName)
		// bindChannel(currentUserID,$("form"))//here is loop hole
			//  var data = {
			// 		   user_id:currentUserID,
			// 		   stall_Id:stallId,
			// 		   channel_Name:channaleName,
			// 		   anonymous_Id:currentUserID,
			// 		   anonymous_Name:cname,
			// 		   isclosed:0
			// 		   }
			// 	 $.ajax({
			// 		 type: "POST",
			// 		 url: "https://stage.marketcentral.in/rest/virtualExpo/general/insertChat",
			// 		// dataType: 'json',
			// 		 contentType: 'application/json',
			// 		 data: JSON.stringify(data),// now data come in this function
			// 		 success: function (data, status, jqXHR) {
			// 			 console.log(data);
			// 		 },
			// 		 error: function (jqXHR, status) {
			// 			 // error handler
			// 			 console.log(jqXHR);
			// 			 //alert('fail' + status);
			// 		 }
			// 	  });
                $.ajax({
    url: "https://stage.marketcentral.in/rest/virtualExpo/general/getChatHistory/"+cname+"/0",
    type: 'GET',
    dataType: 'json',
    success: function(response) {
     console.log(response);
     alert(response)
    }
    });
    $.ajax({
    url: "https://stage.marketcentral.in/rest/virtualExpo/general/getChat/0/"+currentUserID+"/0/"+stallId+"",
    type: 'GET',
    dataType: 'json',
    success: function(response) {
        const channels = response.map(channel => channel.CHANNEL_NAME);
        // listenChannels(server, stallId, channels);
        listenChannel(server,stallId,channels[0])
		console.log(response);
        alert("The response is" ,response)
        bindChannel(currentUserID, $("form"));
        let htmlcontent = "";
        var i=0;
        channels.forEach(d=>{
		    const channelParts = d.split('-');
            const customername = channelParts[channelParts.length - 1];
		    var titleCaseCustomer = toTitleCase(customername);
		    var firstTwoCharacters = customername.substring(0, 2).toUpperCase();
            htmlcontent=htmlcontent+"<a  onClick=\"init('"+d+"',"+i+")\"><span>"+firstTwoCharacters+"</span>"+titleCaseCustomer+"</a><br>";
            console.log(d);
            console.log(i);
		    //htmlcontent += "<a data-d='" + d + "'data-i='" + i + "' onClick=\"init('" + d + "'," + i + ")\" ><span>" + firstTwoCharacters + "</span>" + titleCaseCustomer + "</a><br>";
          
		    i++;
           
         })
           init(channels[0], 0);
        
        // $("#channels").html(htmlcontent);
		// $(".minimizedChats").html(htmlcontent)
    }
    

});


 server.bind("error", function (err) {
  console.log(err)
});

			// Get references to our DOM elements.
			

		
			} else {
				// alert("Please enter your name to start the chat.");
				 alert("Name should contain at least 3 alphabetical characters and no special characters.");
    // Optionally, you can focus back on the name field
                // $("name-field").focus();
			}
	
        }
window.onload=initiatechat();
  
	  });
var business = "<cfoutput>#url.bname#</cfoutput>";
var customername ="<cfoutput>#url.name#</cfoutput>";
var currentUserID ="<cfoutput>#url.uid#</cfoutput>";

		
 //document.getElementById("b-name").textContent = business;
  document.getElementById("v-name").textContent = business;
function init(channaleName,index){
console.log("the vhannel name is" + channaleName)
    var cname=channaleName
	console.log(cname)
	var channelParts = cname.split('-');
    var customername = channelParts[channelParts.length - 1];
	var titleCaseCustomer = toTitleCase(customername);
	console.log(titleCaseCustomer)
	//document.getElementById("customer-head").textContent=titleCaseCustomer
     
	clearscreen()
	//To do get history of messages from cf api
	var chatLog = $( ".maximizedChat" );
	$.ajax({
    url: "https://stage.marketcentral.in/rest/virtualExpo/general/getChatHistory/0/"+channaleName,
    type: 'GET',
    dataType: 'json',
    success: function(response) {
     console.log(response);
	 response.forEach(function(chatData) {
	//	var textAlignment = (chatData.USER_ID === business) ? 'right' : 'left';

// var chatItem = $("<div class='senderChat'>").css('text-align', textAlignment).append(
//     $("<span class='handle'>").text(chatData.USER_ID),
//     $("<span class='message'>").text(chatData.MESSAGE)
// );

        // Create a chat item HTML structure for each response item
        // var chatItem = $("<div class='chatItem' >").css('text-align', textAlignment).append(
        //     $("<span class='handle'>").text(chatData.USER_ID),
        //     $("<span class='message'>").text(chatData.MESSAGE)
        // );
		if(chatData.USER_ID === business){
			  var chatItem = $("<div class='senderChat' style='text-align: right;'>" +
							"<span class='senderName'>" +
						   chatData.USER_ID+
							"</span>" + 
							"<p>" +
							chatData.MESSAGE+
						"</p>" +
						"</div>")
		}else{
			 var chatItem = $("<div class='receiverChat' style='text-align: right;'>" +
							"<span class='receiverName'>" +
						   chatData.USER_ID+
							"</span>" + 
							"<p>" +
							chatData.MESSAGE+
						"</p>" +
						"</div>")
		}
        // Append the chat item to the chat log
        chatLog.append(chatItem);
    });

    // Scroll the chat log to the bottom
  
    },
    error: function(xhr, status, error) {
        console.error('Error fetching data:', error);
        // Handle errors
    }
});
selectChannel(channaleName,index)
 }
 function toTitleCase(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
 function clearscreen(){
//	document.getElementById("chatLog").innerHTML = "";
	//document.getElementById("maximizedChatid").innerHTML = "";
	//     $('.maximizedChat').click(function() {
    //     // Remove content from inner classes
    //     $(this).find('.senderChat,.senderName, .receiverChat,.receiverName').remove();
    // });

 }
	</script>

</html>