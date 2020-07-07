const synth = window.speechSynthesis;
//console.log(synth);

const select = document.getElementById('select');
const textInput = document.getElementById('textarea');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const form = document.querySelector('form');
let rateValue = document.querySelector('#rate__value');
let pitchValue = document.querySelector('#pitch__value');
const wave = document.getElementById('wave');

let voices = [];


const voiceList = () => {
    voices = synth.getVoices();
    //console.log(voices);
    
    voices.forEach(voice => {
     const option = document.createElement('option');
     option.textContent = voice.name+'('+voice.lang+')';
     option.setAttribute('data-name', voice.name);
     option.setAttribute('data-lang', voice.lang);
     
     select.appendChild(option);
     
     
    })
};

voiceList();

if(synth.onvoiceschanged !== undefined) {
synth.onvoiceschanged = voiceList;

}

const speak = () => {
    
    
    
    if(synth.speaking) {
        
        alert('Already speaking ...');
        return;
    }
    if(textInput.value !== '') {
        wave.style.display = 'block';
const speakText = new SpeechSynthesisUtterance(textInput.value);


speakText.onend = e => {
    wave.style.display = 'none';
    
}

speakText.onerror = e => {
    wave.style.display = 'none';
    console.error('error: ' + e);
    
    alert('Something went wrong!');
}

const selectedVoice = select.selectedOptions[0].getAttribute('data-name');

voices.forEach(voice => {
    if(voice.name === selectedVoice) {
        speakText.voice = voice;
        
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        
        synth.speak(speakText);
    }
})

    } 
}

form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('it works');
    speak();
    textInput.blur();
})


rate.addEventListener('change', e => rateValue.textContent = rate.value );

pitch.addEventListener('change', e => pitchValue.textContent = pitch.value  );

select.addEventListener('change',speak());