let state = 'select-menu';

const backButton = document.getElementById('back-btn');
const exitButton = document.getElementById('exit-btn');
const optionsContainer = document.querySelector('.options-container');

const setBackBtn = () => {
  if (state !== 'select-menu') {
    backButton.style.display = 'block';
  } else if (state === 'select-menu') {
    backButton.style.display = 'none';
  }
};

const postEvent = (eventName, data) => {
  fetch(`https://action-menu/${eventName}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data)
  }).then(resp => resp.json()).then((resp) => {return;});
};

// NUI Events

const toggleEngine = () => {
  postEvent('toggle-engine', { toggleEngine: true })
};

const toggleHood = () => {
  postEvent('toggle-hood', { toggleHood: true })
};

const toggleTrunk = () => {
  postEvent('toggle-trunk', { toggleTrunk: true })
};

const toggleFrontLeftDoor = () => {
  postEvent('toggle-fldoor', { toggleFLDoor: true })
};

const toggleFrontRightDoor = () => {
  postEvent('toggle-frdoor', { toggleFRDoor: true })
};

const toggleBackLeftDoor = () => {
  postEvent('toggle-bldoor', { toggleBLDoor: true })
};

const toggleBackRightDoor = () => {
  postEvent('toggle-brdoor', { toggleBRDoor: true })
};


// States
const onStateChange = () => {
  if (state === 'leo') {
    setLEOMenu();
  } else if (state === 'vehicle') {
    setVehicleMenu();
  } else if (state === 'general') {
    setGeneralMenu();
  } else if (state === 'select-menu') {
    setStartMenu();
  }

  setBackBtn();
  console.log(state);
};

const clearOptions = () => {
  optionsContainer.innerHTML = '';
};

const setStartMenu = () => {
  clearOptions();

  const html = `
    <div class="btn" id="general-btn">
      <h3>General</h3>
    </div>
    <div class="btn" id="vehicle-btn">
      <h3>Vehicle</h3>
    </div>
    <div class="btn" id="leo-btn">
      <h3>Law Enforcement</h3>
    </div>
  `;

  optionsContainer.innerHTML = html;
};

const setGeneralMenu = () => {
  clearOptions();

  const html = `
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
  `;

  optionsContainer.innerHTML = html;
};

const setVehicleMenu = () => {
  clearOptions();

  const html = `
    <div class="btn" id="engine-btn">
      <h3>Toggle Engine</h3>
    </div>
    <div class="btn" id="hood-btn">
      <h3>Toogle Hood</h3>
    </div>
    <div class="btn" id="trunk-btn">
      <h3>Toggle Trunk</h3>
    </div>
    <div class="btn" id="fldoor-btn">
      <h3>Toggle Drivers Door</h3>
    </div>
    <div class="btn" id="frdoor-btn">
      <h3>Toggle Passengers Door</h3>
    </div>
    <div class="btn" id="bldoor-btn">
      <h3>Toggle Back Left Door</h3>
    </div>
    <div class="btn" id="brdoor-btn">
      <h3>Toggle Back Right Door</h3>
    </div>
  `;

  optionsContainer.innerHTML = html;
};

const setLEOMenu = () => {
  clearOptions();

  const html = `
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
    <div class="btn" id="placeholder-btn">
      <h3>Place Holder Option</h3>
    </div>
  `;

  optionsContainer.innerHTML = html;
};

window.addEventListener('load', (e) => {
  setBackBtn();
});

optionsContainer.addEventListener('click', (e) => {
  const el = e.target;

  if (el.id === 'general-btn' || el.parentElement.id === 'general-btn') {
    state = 'general';
    onStateChange();
  } else if (el.id === 'vehicle-btn' || el.parentElement.id === 'vehicle-btn') {
    state = 'vehicle';
    onStateChange();
  } else if (el.id === 'leo-btn' || el.parentElement.id === 'leo-btn') {
    state = 'leo';
    onStateChange();
  } else if (el.id === 'engine-btn' || el.parentElement.id === 'engine-btn') {
    toggleEngine();
  } else if (el.id === 'hood-btn' || el.parentElement.id === 'hood-btn') {
    toggleHood();
  } else if (el.id === 'trunk-btn' || el.parentElement.id === 'trunk-btn') {
    toggleTrunk();
  } else if (el.id === 'fldoor-btn' || el.parentElement.id === 'fldoor-btn') {
    toggleFrontLeftDoor();
  } else if (el.id === 'frdoor-btn' || el.parentElement.id === 'frdoor-btn') {
    toggleFrontRightDoor();
  } else if (el.id === 'bldoor-btn' || el.parentElement.id === 'bldoor-btn') {
    toggleBackLeftDoor();
  } else if (el.id === 'brdoor-btn' || el.parentElement.id === 'brdoor-btn') {
    toggleBackRightDoor();
  }

  e.preventDefault();
});

backButton.addEventListener('click', (e) => {
  state = 'select-menu';
  onStateChange();

  e.preventDefault();
});

const exitMenu = () => {
  postEvent('exit-menu', { exit: true });
  state = 'select-menu';
  onStateChange();
};

const escPressed = e => {
  if(e.keyCode === 8){
    console.log('pressed')
    exitMenu();
  };
}

document.onkeydown = escPressed;

exitButton.addEventListener('click', (e) => {
  exitMenu();
  e.preventDefault();
});

window.addEventListener('message', (e) => {
  if (e.data.type === 'action-menu' && e.data.on) {
    document.querySelector('.menu-container').style.display = 'flex';
  } else if (e.data.type === 'action-menu' && !e.data.on) {
    document.querySelector('.menu-container').style.display = 'none';
  }
});