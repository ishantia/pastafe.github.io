const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value !== undefined) {
      appendToDisplay(value);
    } else if (action === 'clear') {
      clearDisplay();
    } else if (action === 'delete') {
      deleteLast();
    } else if (action === 'equals') {
      calculate();
    }
  });
});

function appendToDisplay(value) {
  // Prevent multiple decimals in the same number
  if (value === '.' && display.value.split(/[\+\-\*\/]/).pop().includes('.')) {
    return;
  }
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value.replace(/×/g, '*');
    // Prevent invalid patterns
    if (/[\+\-\*\/]{2,}/.test(expression) || /[\/\*]$/.test(expression)) {
      throw new Error('Invalid');
    }
    const result = eval(expression);
    display.value = result;
  } catch (err) {
    display.value = 'Error';
    setTimeout(clearDisplay, 1500);
  }
}

// Keyboard support
document.addEventListener('keydown', e => {
  if (e.key >= '0' && e.key <= '9') appendToDisplay(e.key);
  if (e.key === '.') appendToDisplay('.');
  if (['+', '-', '*', '/'].includes(e.key)) {
    appendToDisplay(e.key === '*' ? '×' : e.key);
  }
  if (e.key === 'Enter') calculate();
  if (e.key === 'Backspace') deleteLast();
  if (e.key === 'Escape') clearDisplay();
});
