const NUMBER_OF_DIGITS_OF_CPF = 11
const ONLY_NUMBERS_REGEX = /[^\d]/g;
const MIN_VERIFIER = 2;
const MIN_VERIFIER_FALLBACK = 0;
const START_RANGE_VERIFIER_CALCULATION = 0
const END_RANGE_VERIFIER_CALCULATION = 9;
const SLICE_PATTERN_TO_EXTRACT_VERIFIERS = -2;

function isValidInput(input?: string | null) {
  return input !== null && input !== undefined
}

function hasValidLength(length: number) {
  return length === NUMBER_OF_DIGITS_OF_CPF
}

function removeSignsAndDots(input: string) {
  return input.replace(ONLY_NUMBERS_REGEX, '')
}

function convertStringToArrayOfChars(input: string) {
  return Array.from(input);
}

function isEqualDigits(input: string) {
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
  return restOfSumDividedByLength < MIN_VERIFIER ? MIN_VERIFIER_FALLBACK : NUMBER_OF_DIGITS_OF_CPF - restOfSumDividedByLength;
}

function extractVerifiers(cpf: string): string {
  return cpf.slice(SLICE_PATTERN_TO_EXTRACT_VERIFIERS);
}

export function validate(rawCpfString?: string | null) {
  if (!isValidInput(rawCpfString)) return false;
  const cpfWithoutDotsAndSigns = removeSignsAndDots(rawCpfString!);
  if (!hasValidLength(cpfWithoutDotsAndSigns.length)) return false;
  if (isEqualDigits(cpfWithoutDotsAndSigns)) return false;

  const digitsForValidation = cpfWithoutDotsAndSigns.slice(START_RANGE_VERIFIER_CALCULATION, END_RANGE_VERIFIER_CALCULATION);
  const firstVerifier = calculateVerifier(digitsForValidation);
  const lastVerifier = calculateVerifier(`${digitsForValidation}${firstVerifier}`);

  const verifiers = extractVerifiers(cpfWithoutDotsAndSigns);

  return `${firstVerifier}${lastVerifier}` === verifiers;
}
