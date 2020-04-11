function setDarkMode() {
  if (localStorage.getItem('mode') === 'dark') {
    localStorage.setItem('mode', 'white');
    location.reload();
  } else {
    localStorage.setItem('mode', 'dark');
    location.reload();
  }
}

if (localStorage.getItem('mode') === 'dark') {
  document.body.classList.toggle('dark-mode');
}