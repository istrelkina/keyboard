const { body } = document;

function showKeyboard(data) {
  const dataArray = [];
  const keyboardWrapper = document.createElement('div');
  keyboardWrapper.classList.add('keyboard-wrapper');
  const keyboardText = document.createElement('div');
  keyboardText.classList.add('keyboard-text');
  const input = document.createElement('textarea');
  keyboardText.append(input);
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
        keyDiv.textContent = key.value;
        keyDiv.dataset.key = key.datasetVal;
        keyboardRow.append(keyDiv);
      });
      keyboard.append(keyboardRow);
    });
    keyboardWrapper.append(keyboard);
    body.append(keyboardWrapper);
  }
}

async function getData() {
  const res = await fetch('data.json');
  const data = await res.json();
  showKeyboard(data);
}

window.onload = getData;
