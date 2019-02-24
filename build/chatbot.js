let chatbot_url = "https://cdn.jsdelivr.net/gh/sathwikmatsa/Chatbot@master";
let SERVER_URL = "http://localhost:5000";
let chatbot_code = `
    <div id="chatbox">
      <div id="chatheader" class="center">
          <img src="${chatbot_url}/assets/chatbot_avatar.png" class="avatar" alt="Avatar">
          <img src="${chatbot_url}/assets/toggle.png" id="toggler" class="toggler" alt="toggler">
      </div>
      <div id=toggle>
      <div id="chat">

      </div>
      <div id="send_message" class="center">
          <textarea id="message" placeholder="Type a message..."></textarea>
          <input type="image" src="https://cdn.jsdelivr.net/gh/sathwikmatsa/Chatbot@master/assets/send.png" id="send" alt="submit">
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
    xmlhttp.open("GET", SERVER_URL+"/?m="+text, false);
    xmlhttp.send();
    if (xmlhttp.status === 200) {
        result = xmlhttp.responseText;
        create_chat_item(result, "bot");
    }
}

function create_chat_item(text, cls){
    let html_template = `
        <div class="conversation `+ cls +`">
            <p class="text">`+ text +`</p>
        </div>
    `;
    let chat_message = createElementFromHTML(html_template);
    let chat = document.getElementById('chat');
    chat.appendChild(chat_message);
    if(cls == "human"){
        send_response(text);
    }
    chat.scrollTop = chat.scrollHeight;
}


(function(){
    document.body.appendChild(createElementFromHTML(chatbot_code));
    document.head.appendChild(createElementFromHTML('<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sathwikmatsa/Chatbot@master/chatbot_styles.css">'));
    document.getElementById('chatheader').addEventListener("click", function(){
        let toggle = document.getElementById('toggle');
        if(toggle.style.display == "none"){
            toggle.style.display = "block";
        } else {
            toggle.style.display = "none";
        }
    });
    document.getElementById('send').addEventListener("click", function(){
        let message_box = document.getElementById('message');
        if(message_box.value){
            create_chat_item(message_box.value, "human");
            message_box.value = ""
        }
    });
})();
