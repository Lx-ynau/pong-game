// DOM Elements
const getJokeBtn = document.getElementById('getJokeBtn');
const copyBtn = document.getElementById('copyBtn');
const jokeContent = document.getElementById('jokeContent');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const jokeTypeSelect = document.getElementById('jokeType');
const historyList = document.getElementById('historyList');

// State
let currentJoke = null;
let jokeHistory = [];
const MAX_HISTORY = 5;

// API Configuration
const API_URL = 'https://v2.jokeapi.dev/joke/';

// Event Listeners
getJokeBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyJoke);
jokeTypeSelect.addEventListener('change', fetchJoke);

// Fetch joke from API
async function fetchJoke() {
    const jokeType = jokeTypeSelect.value;
    const url = jokeType === 'any' 
        ? `${API_URL}Any` 
        : `${API_URL}${jokeType}`;

    // Show loading state
    showLoading(true);
    hideError();
    copyBtn.style.display = 'none';

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.message || 'Failed to fetch joke');
        }

        // Handle different joke formats
        if (data.type === 'twopart') {
            currentJoke = {
                setup: data.setup,
                delivery: data.delivery,
                type: data.category
            };
            displayTwoPartJoke(data);
        } else if (data.type === 'single') {
            currentJoke = {
                text: data.joke,
                type: data.category
            };
            displaySingleJoke(data);
        }

        // Add to history
        addToHistory(currentJoke);
        copyBtn.style.display = 'block';

    } catch (err) {
        showError(`Oops! ${err.message}. Please try again.`);
        console.error('Error fetching joke:', err);
    } finally {
        showLoading(false);
    }
}

// Display two-part joke (setup + delivery)
function displayTwoPartJoke(joke) {
    jokeContent.innerHTML = `
        <div>
            <p class="setup">${escapeHtml(joke.setup)}</p>
            <p class="delivery">${escapeHtml(joke.delivery)}</p>
        </div>
    `;
}

// Display single-part joke
function displaySingleJoke(joke) {
    jokeContent.innerHTML = `
        <p>${escapeHtml(joke.joke)}</p>
    `;
}

// Copy joke to clipboard
function copyJoke() {
    let jokeText = '';

    if (currentJoke.setup && currentJoke.delivery) {
        jokeText = `${currentJoke.setup}\n\n${currentJoke.delivery}`;
    } else {
        jokeText = currentJoke.text;
    }

    navigator.clipboard.writeText(jokeText).then(() => {
        // Show feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        showError('Failed to copy joke to clipboard');
    });
}

// Add joke to history
function addToHistory(joke) {
    let jokeText = '';

    if (joke.setup && joke.delivery) {
        jokeText = `${joke.setup} - ${joke.delivery}`;
    } else {
        jokeText = joke.text;
    }

    // Add to beginning of array
    jokeHistory.unshift({
        text: jokeText.substring(0, 100) + (jokeText.length > 100 ? '...' : ''),
        fullText: jokeText,
        timestamp: new Date().toLocaleTimeString()
    });

    // Keep only recent jokes
    if (jokeHistory.length > MAX_HISTORY) {
        jokeHistory.pop();
    }

    updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
    if (jokeHistory.length === 0) {
        historyList.innerHTML = '<li class="empty">No jokes yet. Get one to start!</li>';
        return;
    }

    historyList.innerHTML = jokeHistory.map((joke, index) => `
        <li title="${escapeHtml(joke.fullText)}" onclick="showFromHistory('${index}')">
            <strong>${joke.timestamp}</strong><br>
            ${escapeHtml(joke.text)}
        </li>
    `).join('');
}

// Show joke from history
function showFromHistory(index) {
    const joke = jokeHistory[index];
    jokeContent.innerHTML = `<p>${escapeHtml(joke.fullText)}</p>`;
    copyBtn.style.display = 'block';
    currentJoke = { text: joke.fullText };
}

// Show/hide loading state
function showLoading(show) {
    loading.style.display = show ? 'block' : 'none';
    getJokeBtn.disabled = show;
}

// Show/hide error
function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
}

function hideError() {
    error.style.display = 'none';
    error.textContent = '';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, char => map[char]);
}

// Initialize history display
updateHistoryDisplay();

// Fetch a joke when page loads
window.addEventListener('load', () => {
    // Optional: Uncomment to auto-fetch a joke on page load
    // fetchJoke();
});

// Keyboard shortcut: Press Space to get a new joke
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        fetchJoke();
    }
});
