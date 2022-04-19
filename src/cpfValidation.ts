const NUMBER_OF_DIGITS_OF_CPF = 11
const MIN_VERIFIER = 2;
const ONLY_NUMBERS_REGEX = /[^\d]/g

function isValidInput(input?: string | null) {
  return input !== null && input !== undefined
}

function hasValidLength(length: number) {
  return length >= 11 || length === 14
}

function removeSignsAndDots(input: string) {
  return input.replace(ONLY_NUMBERS_REGEX, '')
}

function convertStringToArrayOfChars(input: string) {
  return input.split('');
}

function isAllEntriesSameDigits(input: string) {
  const firstDigit = input[0]
  return convertStringToArrayOfChars(input).every(digit => digit === firstDigit);
}

function sumDigits(digits: number[]) {
  const endIndexToCalculateVerifier = digits.length + 1
  return digits.reduce((accumulator, current, index) => {
    return accumulator + ((endIndexToCalculateVerifier - index) * current);
  }, 0);
}

function calculateVerifier(input: string) {
  const inputAsArray = convertStringToArrayOfChars(input);
  const sumOfInputArray = sumDigits(inputAsArray.map(digit => parseInt(digit)));
  const restOfSumDividedByLength = sumOfInputArray % NUMBER_OF_DIGITS_OF_CPF;
  return restOfSumDividedByLength < MIN_VERIFIER ? 0 : NUMBER_OF_DIGITS_OF_CPF - restOfSumDividedByLength;
}

export function cpfValidation(rawCpfString?: string | null) {
  if (!isValidInput(rawCpfString)) return false;
  const cpfWithoutDotsAndSigns = removeSignsAndDots(rawCpfString!);
  if (!hasValidLength(cpfWithoutDotsAndSigns.length)) return false;
  if (isAllEntriesSameDigits(cpfWithoutDotsAndSigns)) return false;

  let parsedCpf = cpfWithoutDotsAndSigns.slice(0, 9);
  parsedCpf += calculateVerifier(parsedCpf);
  parsedCpf += calculateVerifier(parsedCpf);

  return parsedCpf.slice(-2) === cpfWithoutDotsAndSigns.slice(-2);
}