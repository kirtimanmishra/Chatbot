let chatbot_url = "https://cdn.jsdelivr.net/gh/sathwikmatsa/Chatbot@master";
let SERVER_URL = "http://localhost:5000";
let UID = "None";
let chatbot_code = `
    <div id="chatbox_iittp">
      <div id="chatheader_iittp" class="center-iittp">
          <img src="${chatbot_url}/assets/chatbot_avatar.png" class="avatar-iittp" alt="Avatar">
          <img src="${chatbot_url}/assets/toggle.png" id="toggler_iittp" class="toggler-iittp" alt="toggler">
      </div>
      <div id="toggle">
      <div id="chat_iittp">

      </div>
      <div id="send_message_iittp" class="center">
          <textarea id="message_iittp" placeholder="Type a message..."></textarea>
          <input type="image" src="https://cdn.jsdelivr.net/gh/sathwikmatsa/Chatbot@master/assets/send.png" id="send_iittp" alt="submit">
      </div>
      </div>
  </div>`;

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function send_response(text){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", SERVER_URL+"/?id="+UID+"&m="+text, false);
    xmlhttp.send();
    if (xmlhttp.status === 200) {
        result = xmlhttp.responseText;
        create_chat_item(result, "bot-iittp");
    }
}

function create_chat_item(text, cls){
    let html_template = `
        <div class="conversation-iittp `+ cls +`">
            <p class="text-iittp">`+ text +`</p>
        </div>
    `;
    let chat_message = createElementFromHTML(html_template);
    let chat = document.getElementById('chat_iittp');
    chat.appendChild(chat_message);
    if(cls == "human-iittp"){
        send_response(text);
    }
    chat.scrollTop = chat.scrollHeight;
}

function initiate_chat(){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost:5000/?getid=true", false);
    xmlhttp.send();
    if (xmlhttp.status === 200) {
        result = xmlhttp.responseText;
        UID = result;
        create_chat_item("Do you need any help?", "bot-iittp");
    }
}

(function(){
    document.body.appendChild(createElementFromHTML(chatbot_code));
    document.head.appendChild(createElementFromHTML('<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sathwikmatsa/Chatbot@master/chatbot_styles.css">'));
    document.getElementById('chatheader_iittp').addEventListener("click", function(){
        let toggle = document.getElementById('toggle_iittp');
        if(toggle.style.display == "none"){
            toggle.style.display = "block";
        } else {
            toggle.style.display = "none";
        }
    });
    document.getElementById('send_iittp').addEventListener("click", function(){
        let message_box = document.getElementById('message_iittp');
        if(message_box.value){
            create_chat_item(message_box.value, "human-iittp");
            message_box.value = ""
        }
    });
    initiate_chat();
})();
