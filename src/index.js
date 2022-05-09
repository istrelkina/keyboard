const { body } = document;
const script = document.querySelector('script');
let keys;
let textarea;
let isCapsLock = false;
let lang = 'en';
const arrLettersEn = Array(26).fill().map((v, i) => String.fromCharCode(i + 65));
arrLettersEn.push('`');
const arrLettersRu = Array(32).fill().map((v, i) => String.fromCharCode(i + 192));
arrLettersRu.push('Ё');
const arrLang = ['ShiftLeft', 'AltLeft'];
const setLang = new Set(arrLang);
const pressed = new Set();
const objLangRu = {
  Backquote: 'Ё',
  KeyQ: 'Й',
  KeyW: 'Ц',
  KeyE: 'У',
  KeyR: 'К',
  KeyT: 'Е',
  KeyY: 'Н',
  KeyU: 'Г',
  KeyI: 'Ш',
  KeyO: 'Щ',
  KeyP: 'З',
  BracketLeft: 'Х',
  BracketRight: 'Ъ',
  KeyA: 'Ф',
  KeyS: 'Ы',
  KeyD: 'В',
  KeyF: 'А',
  KeyG: 'П',
  KeyH: 'Р',
  KeyJ: 'О',
  KeyK: 'Л',
  KeyL: 'Д',
  Semicolon: 'Ж',
  Quote: 'Э',
  KeyZ: 'Я',
  KeyX: 'Ч',
  KeyC: 'С',
  KeyV: 'М',
  KeyB: 'И',
  KeyN: 'Т',
  KeyM: 'Ь',
  Comma: 'Б',
  Period: 'Ю',
};
const objLangEn = {
  Backquote: '`',
  KeyQ: 'Q',
  KeyW: 'W',
  KeyE: 'E',
  KeyR: 'R',
  KeyT: 'T',
  KeyY: 'Y',
  KeyU: 'U',
  KeyI: 'I',
  KeyO: 'O',
  KeyP: 'P',
  BracketLeft: '[',
  BracketRight: ']',
  KeyA: 'A',
  KeyS: 'S',
  KeyD: 'D',
  KeyF: 'F',
  KeyG: 'G',
  KeyH: 'H',
  KeyJ: 'J',
  KeyK: 'K',
  KeyL: 'L',
  Semicolon: ';',
  Quote: "'",
  KeyZ: 'Z',
  KeyX: 'X',
  KeyC: 'C',
  KeyV: 'V',
  KeyB: 'B',
  KeyN: 'N',
  KeyM: 'M',
  Comma: ',',
  Period: '.',
};
function setLocalStorage() {
  localStorage.setItem('lang', lang);
}
function getLocalStorage() {
  if (localStorage.getItem('lang')) lang = localStorage.getItem('lang');
}
function changeLang() {
  if (lang === 'ru') {
    for (const element of keys) {
      if (objLangEn[element.dataset.key]) {
        if (isCapsLock) {
          element.textContent = objLangRu[element.dataset.key];
        } else {
          element.textContent = objLangRu[element.dataset.key].toLowerCase();
        }
      }
    }
  } else {
    for (const element of keys) {
      if (objLangEn[element.dataset.key]) {
        if (isCapsLock) {
          element.textContent = objLangEn[element.dataset.key];
        } else {
          element.textContent = objLangEn[element.dataset.key].toLowerCase();
        }
      }
    }
  }
}
function showKeyboard(data) {
  const dataArray = [];
  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard-wrapper');
  const keyboardText = document.createElement('div');
  keyboardText.classList.add('keyboard-text');
  textarea = document.createElement('textarea');
  keyboardText.append(textarea);
  keyboardWrapper.append(keyboardText);

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  if (!data) {
    body.append('No results. Please try again.');
  } else {
    dataArray.push(data.row1);
    dataArray.push(data.row2);
    dataArray.push(data.row3);
    dataArray.push(data.row4);
    dataArray.push(data.row5);
    dataArray.forEach((element) => {
      const keyboardRow = document.createElement('div');
      keyboardRow.classList.add('keyboard-row');
      element.forEach((key) => {
        const keyDiv = document.createElement('div');
        keyDiv.classList.add('keys');
        if (key.class) keyDiv.classList.add(key.class);
        if (arrLettersEn.includes(key.value)) {
          keyDiv.textContent = key.value.toLowerCase();
        } else {
          keyDiv.textContent = key.value;
        }
        keyDiv.dataset.key = key.datasetVal;
        keyboardRow.append(keyDiv);
      });
      keyboard.append(keyboardRow);
    });
    const aboutOS = document.createElement('p');
    aboutOS.textContent = 'The keyboard was created in Windows';
    aboutOS.classList.add('lang');
    keyboard.append(aboutOS);
    const aboutLang = document.createElement('p');
    aboutLang.textContent = 'Press left Shift + Alt to change language';
    aboutLang.classList.add('lang');
    keyboard.append(aboutLang);

    keyboardWrapper.append(keyboard);
    script.before(keyboardWrapper);
    keys = document.querySelectorAll('.keys');
  }
  getLocalStorage();
  if (lang === 'ru') changeLang();
}

async function getData() {
  fetch('data.json')
    .then((response) => response.json())
    .then((result) => {
      showKeyboard(result);
      textarea = document.querySelector('textarea');
      textarea.focus();
    });
}

(getData());

function getKeyActive(event) {
  if (!textarea.hasFocus) textarea.focus();
  keys.forEach((element) => {
    if (element.dataset.key === event.code) {
      element.classList.add('active');
      if (event.code === 'MetaLeft' || event.code === 'Tab') event.preventDefault();
      if (element.dataset.key === 'CapsLock') {
        if (isCapsLock) {
          isCapsLock = false;
          element.classList.remove('active');

          for (const el of keys) {
            if (objLangEn[el.dataset.key]) {
              el.textContent = el.textContent.toLowerCase();
            }
          }
        } else {
          isCapsLock = true;
          for (const el of keys) {
            if (objLangEn[el.dataset.key]) {
              el.textContent = el.textContent.toUpperCase();
            }
          }
        }
      }
    }
  });
  pressed.add(event.code);
  for (const code of setLang) {
    if (!pressed.has(code)) {
      return;
    }
  }
  pressed.clear();
  if (lang === 'en') {
    lang = 'ru';
  } else {
    lang = 'en';
  }
  setLocalStorage();
  changeLang();
}

function getKeyRemove(event) {
  keys.forEach((element) => {
    if (element.dataset.key === event.code) {
      if (element.dataset.key !== 'CapsLock') {
        element.classList.remove('active');
        element.classList.add('remove');
      }
    }
    setTimeout(() => {
      element.classList.remove('remove');
    });
  });
  pressed.delete(event.code);
}
document.addEventListener('keydown', getKeyActive);
document.addEventListener('keyup', getKeyRemove);

const arrSpecial = ['Backspace', 'Tab', 'Delete', 'CapsLock', 'Enter', 'ShiftLeft', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
function printKey(event) {
  keys.forEach((element) => {
    if (event.target === element) {
      element.classList.add('active');
      setTimeout(() => {
        if (element.dataset.key !== 'CapsLock') element.classList.remove('active');
      }, 200);

      let letter = element.textContent;
      if (element.dataset.key === 'CapsLock') {
        if (isCapsLock) {
          isCapsLock = false;
          element.classList.remove('active');

          for (const el of keys) {
            if (objLangEn[el.dataset.key]) {
              el.textContent = el.textContent.toLowerCase();
            }
          }
        } else {
          isCapsLock = true;
          element.classList.add('active');
          for (const el of keys) {
            if (objLangEn[el.dataset.key]) {
              el.textContent = el.textContent.toUpperCase();
            }
          }
        }
      }
      if (!isCapsLock) {
        letter = letter.toLowerCase();
      }

      const text = textarea.value;
      if (!arrSpecial.includes(element.dataset.key)) {
        textarea.value = text + letter;
      }
      if (element.dataset.key === 'Enter') {
        textarea.value = `${text}\n`;
      }
      if (element.dataset.key === 'Backspace') {
        const cursorStart = textarea.selectionStart;
        if (cursorStart === textarea.value.length) {
          textarea.value = textarea.value.substring(0, cursorStart - 1);
        } else if (cursorStart > 0) {
          textarea.value = textarea.value.substring(0, cursorStart - 1)
            + textarea.value.substring(cursorStart);
          textarea.selectionStart = cursorStart - 1;
          textarea.selectionEnd = cursorStart - 1;
        }
      }
      if (element.dataset.key === 'Delete') {
        const cursorStart = textarea.selectionStart;
        if (cursorStart < textarea.value.length) {
          textarea.value = textarea.value.substring(0, cursorStart)
            + textarea.value.substring(cursorStart + 1);
          textarea.selectionStart = cursorStart;
          textarea.selectionEnd = cursorStart;
        }
      }
      if (element.dataset.key === 'Tab') {
        textarea.value = `${text}  `;
      }
      if (element.dataset.key === 'ArrowLeft') {
        textarea.value = text + String.fromCharCode(0x25C4);
      }
      if (element.dataset.key === 'ArrowDown') {
        textarea.value = text + String.fromCharCode(0x25BC);
      }
      if (element.dataset.key === 'ArrowUp') {
        textarea.value = text + String.fromCharCode(0x25B2);
      }

      if (element.dataset.key === 'ArrowRight') {
        textarea.value = text + String.fromCharCode(0x25BA);
      }

      textarea.focus();
    }
  });
}
window.addEventListener('click', printKey);
