const CURRENT_VERSION = '1.0.0';
const VERSION_KEY = 'appVersion';

function checkForVersionChange() {
  const storedVersion = localStorage.getItem(VERSION_KEY);
  if (storedVersion && storedVersion !== CURRENT_VERSION) {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
    window.location.reload();
    
  } else {
    localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
  }
}

checkForVersionChange();
