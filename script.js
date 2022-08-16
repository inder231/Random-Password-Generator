const charactersAmountRange = document.getElementById("charactersAmountRange");
const charactersAmountNumber = document.getElementById(
  "charactersAmountNumber"
);
const form = document.getElementById("passwordGeneratorForm");
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");
const passwordDisplay = document.getElementById("passwordDisplay");
const LOWER_CASE_CODES = arrayFormLowTOHigh(97, 122);
const UPPER_CASE_CODES = arrayFormLowTOHigh(65, 90);
const NUMBER_CASE_CODES = arrayFormLowTOHigh(48, 57);
const SYMBOLS_CASE_CODES = arrayFormLowTOHigh(33, 47)
  .concat(arrayFormLowTOHigh(58, 64))
  .concat(arrayFormLowTOHigh(91, 96))
  .concat(arrayFormLowTOHigh(123, 126));
// console.log(SYMBOLS_CASE_CODES);
charactersAmountNumber.addEventListener("input", syncCharacterAmount);
charactersAmountRange.addEventListener("input", syncCharacterAmount);

// functions
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const characterAmount = charactersAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  console.log(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  passwordDisplay.innerText = password;
});
function arrayFormLowTOHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}
function syncCharacterAmount(e) {
  const value = e.target.value;
  charactersAmountNumber.value = value;
  charactersAmountRange.value = value;
}
function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  let charCodes = LOWER_CASE_CODES;
  if (includeUppercase) charCodes = charCodes.concat(UPPER_CASE_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CASE_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOLS_CASE_CODES);
  let passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const character = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(character));
  }
  return passwordCharacters.join("");
}

const btnCopy = document.getElementById("btnCopy");
passwordDisplay.addEventListener("click", () => {
  document.execCommand("Copy");
  alert("Password Copied to clipboard");
});
