# Random Joke Generator 😂

A fun and interactive joke generator web application that fetches random jokes from an external API. Choose from different joke categories and enjoy endless laughs!

## Features

✨ **Random Joke Fetching**
- Fetches jokes from the JokeAPI (https://jokeapi.dev/)
- Supports multiple joke categories

✨ **Joke Categories**
- **Any**: Random jokes from all categories
- **General**: General-purpose jokes
- **Programming**: Developer jokes and programming humor
- **Knock-Knock**: Classic knock-knock jokes

✨ **Two Types of Jokes**
- Single-line jokes
- Two-part jokes (setup + delivery)

✨ **Additional Features**
- 📋 Copy joke to clipboard with one click
- 📜 Recent jokes history (last 5 jokes)
- ⚡ Keyboard shortcut: Press Space to get a new joke
- 🎨 Beautiful, responsive UI with smooth animations
- 🛡️ XSS protection with HTML escaping
- ⏳ Loading indicator while fetching jokes
- ❌ Error handling with user-friendly messages

## How to Use

1. **Get a Joke**: Click the "Get Random Joke" button
2. **Choose Category**: Select a joke type from the dropdown
3. **Copy**: Click the "Copy Joke" button to copy the joke to your clipboard
4. **Keyboard Shortcut**: Press the Space bar to fetch another joke quickly
5. **View History**: Check recent jokes at the bottom of the page

## Installation

1. Clone the repository or download the files
2. Make sure you have these files in the `joke-generator` folder:
   - `index.html`
   - `styles.css`
   - `script.js`
3. Open `index.html` in your web browser
4. Start generating jokes!

## API Used

**JokeAPI** - https://v2.jokeapi.dev/

This project uses the free JokeAPI which provides:
- No authentication required
- 400+ jokes in the database
- Support for multiple languages
- Two response formats (single & two-part)

### API Endpoints Used:
- `https://v2.jokeapi.dev/joke/Any` - Random joke from any category
- `https://v2.jokeapi.dev/joke/General` - General jokes
- `https://v2.jokeapi.dev/joke/Programming` - Programming jokes
- `https://v2.jokeapi.dev/joke/Knock-Knock` - Knock-knock jokes

## Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: 
  - Async/Await for API calls
  - DOM manipulation
  - Event handling
  - Local state management

## Features Explained

### Error Handling
- Network errors are caught and displayed to the user
- Invalid API responses are handled gracefully
- User-friendly error messages

### Security
- HTML escaping prevents XSS attacks
- Safe DOM manipulation with textContent and innerHTML sanitization

### UX Enhancements
- Loading spinner shows API request status
- Copy button provides visual feedback ("✓ Copied!")
- Recent jokes can be clicked to view again
- Keyboard shortcuts for power users
- Responsive design for mobile devices

## Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- Mobile browsers

## Future Enhancements

- Dark mode support
- Search/filter jokes
- Favorite jokes bookmarking
- Share jokes on social media
- Joke difficulty rating
- Multi-language support
- Offline mode with cached jokes

## License

Free to use and modify for personal and educational purposes.

## Notes

- The JokeAPI is free and has rate limiting (30 requests per second per IP)
- No API key required
- All jokes are public domain or community-submitted
- For production use, consider implementing rate limiting on the client side

Enjoy the laughs! 😂
