document.addEventListener('DOMContentLoaded', () => {
  const jokeEl = document.querySelector('.joke');
  const authorEl = document.querySelector('.author');
  const nextButton = document.getElementById('nextButton');

  if (!nextButton) {
    console.error('Next button not found');
    return;
  }

  const loadJoke = () => {
    nextButton.disabled = true;
    nextButton.textContent = 'Loading...';

    fetch('https://official-joke-api.appspot.com/random_joke')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((joke) => {
        jokeEl.textContent = joke.setup || 'No joke available.';
        authorEl.textContent = joke.punchline ? `🤣 ${joke.punchline}` : '';
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        jokeEl.textContent = 'Unable to load a joke at the moment.';
        authorEl.textContent = '';
      })
      .finally(() => {
        nextButton.disabled = false;
        nextButton.textContent = 'Next Joke';
      });
  };

  nextButton.addEventListener('click', () => {
    loadJoke();
  });

  loadJoke();
});