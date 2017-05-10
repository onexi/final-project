// character list from Ministry of Education of Singapore
// Hanyu Pinyin and English meanings from https://www.mdbg.net/chinese/dictionary

// array of objects
// each object has the Chinese character, the Hanyu Pinyin, and the English meaning
var words = [
    {char: '一', hanyu: 'yī', eng: 'one'},
    {char: '二', hanyu: 'èr', eng: 'two'},
    {char: '三', hanyu: 'sān', eng: 'three'},
    {char: '四', hanyu: 'sì', eng: 'four'},
    {char: '五', hanyu: 'wǔ', eng: 'five'},
    {char: '六', hanyu: 'liù', eng: 'six'},
    {char: '七', hanyu: 'qī', eng: 'seven'},
    {char: '八', hanyu: 'bā', eng: 'eight'},
    {char: '九', hanyu: 'jiǔ', eng: 'nine'},
    {char: '十', hanyu: 'shí', eng: 'ten'},
    {char: '儿', hanyu: 'ér', eng: 'child'},
    {char: '了', hanyu: 'liǎo or lè', eng: 'already'},
    {char: '上', hanyu: 'shàng', eng: 'on top'},
    {char: '个', hanyu: 'gè', eng: 'individual'},
    {char: '开', hanyu: 'kāi', eng: 'open'},
    {char: '文', hanyu: 'wén', eng: 'language'},
    {char: '不', hanyu: 'bù', eng: 'no'},
    {char: '手', hanyu: 'shǒu', eng: 'hand'},
    {char: '天', hanyu: 'tiān', eng: 'sky'},
    {char: '本', hanyu: 'běn', eng: 'book (shū běn)'},
    {char: '在', hanyu: 'zài', eng: 'located at'},
    {char: '又', hanyu: 'yòu', eng: 'again'},
    {char: '问', hanyu: 'wèn', eng: 'ask'},
    {char: '山', hanyu: 'shān', eng: 'mountain'},
    {char: '日', hanyu: 'rì', eng: 'sun'},
    {char: '月', hanyu: 'yuè', eng: 'moon'},
    {char: '水', hanyu: 'shuǐ', eng: 'water'},
    {char: '火', hanyu: 'huǒ', eng: 'fire'},
    {char: '人', hanyu: 'rén', eng: 'person'},
    {char: '口', hanyu: 'kǒu', eng: 'mouth'},
    {char: '女', hanyu: 'nǚ', eng: 'female'},
    {char: '木', hanyu: 'mù', eng: 'wood'},
    {char: '目', hanyu: 'mù', eng: 'eye'},
    {char: '子', hanyu: 'zǐ', eng: 'son'},
    {char: '大', hanyu: 'dà', eng: 'big'},
    {char: '小', hanyu: 'xiǎo', eng: 'small'},
    {char: '巴', hanyu: 'bā', eng: 'bus (bā shì)'},
    {char: '也', hanyu: 'yě', eng: 'also'},
    {char: '他', hanyu: 'tā', eng: 'him'},
    {char: '你', hanyu: 'nǐ', eng: 'you'},
    {char: '我', hanyu: 'wǒ', eng: 'me'},
    {char: '花', hanyu: 'huā', eng: 'flower'},
    {char: '听', hanyu: 'tīng', eng: 'listen'},
    {char: '画', hanyu: 'huà', eng: 'draw'},
    {char: '看', hanyu: 'kàn', eng: 'see'},
    {char: '朋', hanyu: 'péng', eng: 'friend (péng you)'},
    {char: '友', hanyu: 'yǒu', eng: 'friend (péng you)'},
    {char: '有', hanyu: 'yǒu', eng: 'have'},
    {char: '会', hanyu: 'huì', eng: 'will'},
];

// generate random integer between 0 and length of words list
var randomSeed = Math.floor(Math.random() * words.length);

// function to display first word when 'Start Game' button is clicked
// correct answer is also stored in a div for display later on
function startGame(){
    document.getElementById('hanyu').innerHTML = words[randomSeed].hanyu;
    document.getElementById('english').innerHTML = words[randomSeed].eng;
    document.getElementById('imageCorStore').innerHTML = words[randomSeed].char;

    // remove the word from the words list to prevent repetition
    words.splice(randomSeed, 1);
}

// function to display next word when 'Submit' button is clicked
function nextWord(){

    // display alert if all the words have been exhausted
    if(words.length === 0){
        alert('You have attempted all available words. Refresh the page to practice again!');
    }

    // generate new random integer, display word, store correct answer, then remove word from the words list
    var newRandomSeed = Math.floor(Math.random() * words.length);
    document.getElementById('hanyu').innerHTML = words[newRandomSeed].hanyu;
    document.getElementById('english').innerHTML = words[newRandomSeed].eng;
    document.getElementById('imageCorStore').innerHTML = words[newRandomSeed].char;
    words.splice(newRandomSeed, 1); 
}