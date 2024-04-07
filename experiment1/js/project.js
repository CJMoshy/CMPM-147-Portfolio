// project.js - purpose and description here
// Author: Your Name
// Date:

const slotPattern = /\$(\w+)/;

const fillers = {
  person: ["Student", "Xerxseize", "Traveler", "Friend", "Gamer", "Dude", "Friend", "Creature", "Dragonkin", "Night Elf", "Blood Elf", "Young Orc"],
  food: ["Bat-wing Soup", "Troggs Foot", "a delicious birthday cake", "Demons Bread", "Chocolate Covered Gnolls", "in game"],
  silly: ["isn't that just exceptional of you", "shiver me timbers", "i'll be an Illadari in Argus", "look no further", "you should just leave now", "lets get right to it"],
  portion: ["exceptionally large handfull", "2.3754764 mg", "17 second, continuous staredown with death (1/2 cup)", "quite a small ammount", "a pinch", "a dash", "a sprinkle", "a healthy portion"],
  ingredients: ["fish flake", "bear hide", "goat cheese", "bird eye", "etherium", "bitcoin", "lemon zest", "deviously deviled eggs", "stringy wolf meat", "Helscreams Axe", "seamoth suprise"],
  instruction: ["mix well for 3000 years", "knead thoroughly" , "vote in the upcoming elections", "stare at your ingredients until they become uncomfortable"],
  instructions: ["slowly walk around in circles until you start to lose sanity", "preheat the oven to 20 deg kelvin" , "throw half of it away because you definetly messed it up", "begin the ancient technique of fire-breathing", "hope that it doesnt become explosive"],
  fin: ["finished", "completed", "done", "finito", "fin", "over", "finally finished (you took so long)"],
  foods: ["something edible", "a meal", "Gordon Ramseys first michelin starred meal", "something totally different than what you wanted to make (HA!)"]
};

const template = `So, $person, you want to learn how to cook $food? Well, $silly! First, you will need a $portion of $ingredients. Next, get yourself a $portion of $ingredients. Make sure to $instruction, in order to properly combine them. After that, you will need to $instructions. Once this is $fin, you should be left with something that almost closely resembles $foods! There you have it, $person. Thanks for cooking with JavaScript!`

function main() {
  clicker.onclick = generate
  clicker2.onclick = async () => {
    clicker.disabled = true
    clicker2.disabled = true
    try{
      const response = await fetch('https://cjm-cmpm147-exp1-server-9ca07cef651f.herokuapp.com/api/data')
      const data = await response.text()
      box.innerText = data
    } catch (error) {
      console.error('Error:', error);
    } finally {
      clicker2.disabled = false
      clicker.disabled = false
    }
  }
}


//replacer func
function replacer(match, name) { //takes two args, but only one is used... I have had to do this in Phaser before for refrence order reasons or something, but I dont really understand it still
  let options = fillers[name]; // grab an idex out of our fillers array (2d arr)
  if (options) { // does it exist? (did we get a valid index) ?
    return options[Math.floor(Math.random() * options.length)]; // we did! lets get a random index from the sub-array inside of the first arr we just got
  } else {
    return `<UNKNOWN:${name}>`; //uh oh, we probably shouldnt be here
  }
}

function generate() { // generates the actual story
  let story = template; // grab out template string
  while (story.match(slotPattern)) { //regex time! lets walk through the string looking for anything that matches this regex
    story = story.replace(slotPattern, replacer); //once we get a hit on our regex, call javascripts relace method at the appropriate 'slot' and use our replacer() func to grab some text
  }
  /* global box */
  box.innerText = story; //set the story to the screen
}

main(); //everything starts somewhere!

