// --- CATEGORIZED TOPICS ---
// You need to add more words to these lists (45 per topic as requested)
const categories = {
    Bollywood: [
        "Shah Rukh Khan",
        "Deepika Padukone",
        "Sholay (Movie)",
        "Dabangg (Movie)",
        "Ranbir Kapoor",
        // Add 40 more Bollywood topics here...
    ],
    Anime: [
        "Pikachu (Pokemon)",
        "Naruto Uzumaki",
        "Dragon Ball Z",
        "Studio Ghibli",
        "Sailor Moon",
        // Add 40 more Anime topics here...
    ],
    Fruits: [
        "Apple",
        "Banana",
        "Watermelon",
        "Mango",
        "Strawberry",
        // Add 40 more Fruits topics here...
    ],
    "Indian Actors": [
        "Amitabh Bachchan",
        "Rajinikanth",
        "Allu Arjun",
        "Irrfan Khan",
        "Priyanka Chopra",
        // Add 40 more Indian Actors topics here...
    ],
    // Add more categories here following the same format (Vegetables, Foods, Sports, etc.)
};

let timerInterval;
let timeLeft = 180; // 3 minutes in seconds
let score = 0;
let currentTopicList = [];
let currentWordIndex = -1;

const timerEl = document.getElementById('timer');
const wordDisplayEl = document.getElementById('wordDisplay');
const skipButton = document.getElementById('skipButton');
const correctButton = document.getElementById('correctButton');
const resultEl = document.getElementById('result');
const topicSelectionEl = document.getElementById('topic-selection');
const gameAreaEl = document.getElementById('game-area');
const scoreDisplayEl = document.getElementById('scoreDisplay');


// Function to create topic selection buttons dynamically
function createTopicButtons() {
    for (const topicName in categories) {
        const button = document.createElement("button");
        button.textContent = topicName;
        button.onclick = () => selectTopic(topicName);
        topicSelectionEl.appendChild(button);
    }
}

// Function to select a topic and start the game area
function selectTopic(topicName) {
    currentTopicList = categories[topicName];
    // Shuffle the list for variety
    currentTopicList = currentTopicList.sort(() => Math.random() - 0.5); 
    
    topicSelectionEl.style.display = 'none';
    gameAreaEl.style.display = 'block';
    
    startGameLogic();
}

function startGameLogic() {
    timerInterval = setInterval(updateTimer, 1000);
    showNewWord();
}

function updateTimer() {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerEl.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft <= 0) {
        endGame();
    }
}

function showNewWord() {
    if (currentWordIndex >= currentTopicList.length - 1) {
        // If we run out of words in that topic, end the game
        endGame();
        return;
    }
    currentWordIndex++;
    wordDisplayEl.textContent = currentTopicList[currentWordIndex];
}

function endGame() {
    clearInterval(timerInterval);
    gameAreaEl.style.display = 'none';
    resultEl.style.display = 'block';
    scoreDisplayEl.textContent = score;
}

correctButton.addEventListener('click', () => {
    score++;
    showNewWord();
});

skipButton.addEventListener('click', () => {
    showNewWord();
});

// Initialize the topic buttons on page load
createTopicButtons();
/// --- CATEGORIZED TOPICS ---
constcategories = {
    "Indian Actors": [
        "Shah Rukh Khan", "Amitabh Bachchan", "Deepika Padukone", "Ranbir Kapoor", 
        "Priyanka Chopra", "Irrfan Khan", "Rajinikanth", "Allu Arjun", 
        "Akshay Kumar", "Kareena Kapoor", "Ayushmann Khurrana", "Vicky Kaushal", 
        "Alia Bhatt", "Ranveer Singh", "Hrithik Roshan", "Tiger Shroff", 
        "Kangana Ranaut", "Sushant Singh Rajput", "Saif Ali Khan", "Anushka Sharma"
    ],
    "Indian Singers": [
        "Lata Mangeshkar", "Arijit Singh", "Shreya Ghoshal", "Kishore Kumar", 
        "A.R. Rahman", "Sonu Nigam", "Neha Kakkar", "Udit Narayan", 
        "Sunidhi Chauhan", "Mohit Chauhan", "Atif Aslam", "Tulsi Kumar",
        "Darshan Raval", "Badshah", "Honey Singh", "Kumar Sanu",
        "Palak Muchhal", "Armaan Malik", "Kanika Kapoor", "Sukhwinder Singh"
    ],
    "Historical Monuments": [
        "Taj Mahal", "Red Fort", "Qutub Minar", "Gateway of India", 
        "Amber Fort", "Victoria Memorial", "Hampi", "Konark Sun Temple",
        "Sanchi Stupa", "Ajanta Caves", "Ellora Caves", "Mysore Palace",
        "Charminar", "Hawa Mahal", "Jaisalmer Fort", "Mahabodhi Temple",
        "Golden Temple", "India Gate", "Fatehpur Sikri", "Agra Fort"
    ],
    Fruits: [
        "Apple", "Banana", "Watermelon", "Mango", "Strawberry", "Orange", 
        "Grapes", "Pineapple", "Kiwi", "Avocado", "Blueberry", "Raspberry",
        "Cherry", "Lemon", "Lime", "Peach", "Plum", "Pomegranate",
        "Coconut", "Papaya"
    ],
    Vegetables: [
        "Potato", "Tomato", "Onion", "Carrot", "Broccoli", "Spinach", 
        "Cucumber", "Bell Pepper", "Cauliflower", "Lettuce", "Zucchini", 
        "Eggplant", "Cabbage", "Peas", "Green Bean", "Corn", 
        "Sweet Potato", "Mushroom", "Radish", "Asparagus"
    ],
    Foods: [
        "Pizza", "Pasta", "Biryani", "Tacos", "Sushi", "Burger", 
        "Dosa", "Curry", "Steak", "Salad", "Sandwich", "Soup", 
        "Noodles", "Manchurian", "Momos", "Chow Mein", "Pani Puri",
        "Samosa", "Jalebi", "Gulab Jamun", "Burrito", "Hamburger", 
        "Hot Dog", "French Fries", "Donut", "Chocolate Cake", "Ice Cream", 
        "Brownie"
    ],
    Sports: [
        "Football", "Cricket", "Basketball", "Tennis", "Swimming", "Running", 
        "Hockey", "Kabaddi", "Table Tennis", "Judo", "Karate", "Surfing", 
        "Skateboarding", "Horse Riding", "Badminton", "Volleyball", 
        "Baseball", "Golf", "Boxing", "Wrestling", "Archery", "Cycling", 
        "Yoga", "Gymnastics", "Rugby", "Snooker", "Chess", "Ice Hockey"
    ],
    Cartoon: [
        "Mickey Mouse", "SpongeBob SquarePants", "Tom and Jerry", "Scooby-Doo", 
        "The Simpsons", "Doraemon", "Chota Bheem", "Oggy and the Cockroaches",
        "Ben 10", "Dora the Explorer", "Paw Patrol", "Peppa Pig",
        "Bugs Bunny", "Donald Duck", "Popeye", "Johnny Bravo",
        "Dexter's Laboratory", "Powerpuff Girls", "Heidi", "Pokemon (Original)"
    ],
    Anime: [
        "Pokemon", "Naruto", "Dragon Ball Z", "Attack on Titan", "One Piece", 
        "Sailor Moon", "Death Note", "My Hero Academia", "Demon Slayer",
        "Jujutsu Kaisen", "Fullmetal Alchemist", "Spirited Away", 
        "Grave of the Fireflies", "Cowboy Bebop", "Gundam", "Bleach",
        "Hunter x Hunter", "One Punch Man", "Tokyo Ghoul", "Code Geass"
    ],
    "General Mix": [
        // Historical Monuments/Festivals/General
        "Diwali", "Holi", "Dussehra", "Navaratri", "Ganesh Chaturthi",
        "Mahakumbh Mela", "Gateway of India", "Lotus Temple", "Ajanta Caves", 
        "Elephanta Caves", "Bodh Gaya", "Konark Sun Temple", "Hawa Mahal",
        "Red Fort (Delhi)", "Agra Fort", "Mysore Palace", "Golden Temple",
        "India Gate", "Fatehpur Sikri", "Sanchi Stupa", "Charminar",
        // Sports/Food/Skincare/Trees
        "Cricket Bat", "Soccer Ball", "Tennis Racquet", "Yoga Mat", 
        "Basketball Hoop", "Dosa", "Biryani Rice", "Curry Leaves", 
        "Samosa", "Gulab Jamun", "Face Wash", "Sunscreen Lotion", 
        "Moisturizer Cream", "Toner Spray", "Face Mask", "Serum Drops",
        "Goku (DBZ)", "SpongeBob SquarePants", "Pikachu", "Naruto Headband",
        "Oak Tree", "Banyan Tree", "Neem Tree", "Mango Tree", "Coconut Tree"
    ]
};
 
// Initialize the topic buttons on page load
createTopicButtons(); 
