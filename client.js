console.log("running js");

function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

function send_response(text){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://localhost:5000/?m="+text, false);
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

document.onload = function(){ getElementById('send').addEventListener("click", function(){
    let message_box = document.getElementById('message');
    if(message_box.value){
        create_chat_item(message_box.value, "human");
        message_box.value = ""
    }
});
}