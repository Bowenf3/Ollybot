// document.addEventListener('DOMContentLoaded', () => { //event to trigger js once the DOM has loaded.
//     updateDisplay('Hello, my name is Ollybot. What would you like to know?', 'Bot'); //initialise the conversation each time the page is loaded.   
//     document.getElementById('entry').addEventListener('keydown', function(e) { //listen for the enter key -> submission of data
//         if (e.code === 'Enter') {
//             event.preventDefault(); //stop enter from triggering return in text area
//             let input = entry.value;
//             console.log(input);
//             updateDisplay(input, 'User'); 
//             entry.value = ''; //reset text area
//             setTimeout(() => {botResponse(input)}, 2000); //simulate delay of bot typing by 2 secs then call for the bot to respond to user input
//         }
//     })
// });

$(document).ready(function() { //same as above but using jquery as just realised i had to include jquery usage in project!
    updateDisplay('Hello, my name is Ollybot. What would you like to know?', 'Bot'); //initialise the conversation each time the page is loaded.   
    $('#entry').keydown(function(e) { //listen for the enter key -> submission of data
        if (e.code === 'Enter') {
            event.preventDefault(); //stop enter from triggering return in text area
            let input = entry.value;
            console.log(input);
            updateDisplay(input, 'User'); 
            entry.value = ''; //reset text area
            setTimeout(() => {botResponse(input)}, 2000); //simulate delay of bot typing by 2 secs then call for the bot to respond to user input
        }
    })
});

function botResponse(input) {
    input = input.toLowerCase().replace(/[^a-zA-Z 0-9]+/g,''); //filter out non alphanumeric characters so matching phrases can be less specific ie. a question doesnt need a ? mark to get correct respose.
    let output = '';
    if(input === 'hello' || input === 'hi' || input === 'hey') {
        output = 'Hello, how may I be of service?';
    } else if(input === 'how are you' || input === "hows it going" || input === 'whats up' || input === 'how are you today?') {
        output = 'I am very well. Thank you.';
    } else if(input === "where did you go to school" || input === "what school did you go to" ) {
        output = "The Leys, Cambridge.";
    } else if(input === "what university did you go to" || input === "where did you go to university" ) {
        output = "Exeter";
    } else if(input === "what did you study at university" || input === "what subject did you do" ) {
        output = "Biology";
    } else if(input === "what work experience have you had" || input === "where have you worked previously" || input === "what other jobs have you had" || input === "what do you do" || input === "what do you do for a living" ) {
        output = "I started out in It Recruitment, then moved to Hospitality before joining the Police where I worked for four years in various roles. I was then offered a job at Deloitte as a management consultant - unfortunately, after passing the probationary period, I decided I didn't enjoy the work. I then retrained as an English Language Teacher and taught for a year at Wimbledon School of English. However, Corona caused the school to lay off staff and I lost my job. I decided to retrain again into Software Development.";
    } else if(input === "what software languages do you know" || input === "what programming skills do you have" ) {
        output = "I have learnt HTML, CSS and JavaScript to an intermediate level through various online resources such as Codeacademy, Udemy, and Youtube tutorials(The Coding Train). I have learnt some Command Line and Node.js as well as some React - but I need more experience on these technologies. I have not started learning back-end development properly as yet but am keen to do so.";
    } else if(input === "how old are you" || input === "what is your age" ) {
        output = "I am 28 years old.";
    } else if(input === "where are you from" || input === "where were you born" ) {
        output = "I was born in Boston, England. I am somewhat of a nomad as my parents moved alot as I was growing up.";
    } else if(input === "where do you live") {
        output = "I live in Tooting, South London.";
    } else if(input === "Tell me about yourself" || input === "Who are you" ) {
        output = "My name is Olly. What would you like to know?";
    } else if(input === "why do you want to learn software development" || input === "why do you code" || input === "why programming") {
        output = "I have always liked building things. I find great satisfaction in completing something and knowing it exists because I made it. I think programming appeals to both my logical thinking and my creative side - the sky pretty much is the limit given enough time and knowledge.";
    } else if(input === "whats the answer to life the universe and everything" || input === "what is the ultimate answer" || input === "what is the meaning of life" || input === "42") {
        output = "Forty-Two. But I'm not sure what the question really is...";
    } 
    else {
        output = 'Can you rephrase the question?';
    }
    speak(output);
    updateDisplay(output, 'Bot'); //call for the display to be updated with bot's repsonse
};

function updateDisplay(input, who) {
    const displayWindow = document.getElementById('display_window');
    let contentDiv = document.createElement('div'); //make a div to hold the message bubble
    contentDiv.id = 'message_container_div';
    let updateDiv = document.createElement('div'); //make message bubble 
    updateDiv.id = who; //id either user or bot -> in css this is used to position and color the message correctly
    let date = new Date; //make a new date object
    let dateDiv = document.createElement('div'); 
    dateDiv.id = 'date_div';
    dateDiv.innerText = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    updateDiv.innerText = `${who}: ${input}`; //use innerText instead of innerHTML to avoid inherint security risks. 
    contentDiv.appendChild(updateDiv); //append the message bubble into the container div
    updateDiv.appendChild(dateDiv); //append the date to the message bubble - seperately so I can add style in CSS
    displayWindow.appendChild(contentDiv); //append the container into the display window
    updateDiv.scrollIntoView(); //scroll down to latest message bubble
};

function speak(output) { //a bit of fun using the browser text to speech functions
    let msg = new SpeechSynthesisUtterance();
    let available_voices = window.speechSynthesis.getVoices();
    msg.lang = 'en-US';
    msg.voiceURI = "native";
    msg.voice = available_voices[1];
    msg.pitch = 1;
    msg.volume = 1;
    msg.rate = 1;
    msg.text = output;
    window.speechSynthesis.speak(msg);
    console.log('spoken');
}


$(window).resize(function () { //scrolls the window to the bottom when window is rezised
    $('html, body').scrollTop( $(document).height() - $(window).height() );
});