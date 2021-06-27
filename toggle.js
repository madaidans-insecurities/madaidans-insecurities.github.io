function setDarkMode() {
  if (localStorage.getItem('mode') === 'dark') {
    localStorage.setItem('mode', 'white');
    document.body.classList.remove('dark-mode');
  } else {
    localStorage.setItem('mode', 'dark');
    document.body.classList.add('dark-mode');
  }
}

if (localStorage.getItem('mode') === 'dark') {
  document.body.classList.add('dark-mode');
}

const button = document.querySelector('button');

button.addEventListener('click', event => {
  setDarkMode();
});
