export default class Cpf {
  readonly value: string;
  private NUMBER_OF_DIGITS_OF_CPF = 11
  private ONLY_NUMBERS_REGEX = /[^\d]/g;
  private MIN_VERIFIER = 2;
  private MIN_VERIFIER_FALLBACK = 0;
  private START_RANGE_VERIFIER_CALCULATION = 0
  private END_RANGE_VERIFIER_CALCULATION = 9;
  private SLICE_PATTERN_TO_EXTRACT_VERIFIERS = -2;

  constructor(value?: string | null) {
    if (!this.validate(value)) {
      throw new Error('CPF Inválido');
    }

    this.value = value!;
  }

  private isValidInput(input?: string | null) {
    return input !== null && input !== undefined
  }
  
  private hasValidLength(length: number) {
    return length === this.NUMBER_OF_DIGITS_OF_CPF
  }
  
  private removeSignsAndDots(input: string) {
    return input.replace(this.ONLY_NUMBERS_REGEX, '')
  }
  
  private convertStringToArrayOfChars(input: string) {
    return Array.from(input);
  }
  
  private isEqualDigits(input: string) {
    const firstDigit = input[0]
    return this.convertStringToArrayOfChars(input).every(digit => digit === firstDigit);
  }
  
  private sumDigits(digits: number[]) {
    const endIndexToCalculateVerifier = digits.length + 1
    return digits.reduce((accumulator, current, index) => {
      return accumulator + ((endIndexToCalculateVerifier - index) * current);
    }, 0);
  }
  
  private calculateVerifier(input: string) {
    const inputAsArray = this.convertStringToArrayOfChars(input);
    const sumOfInputArray = this.sumDigits(inputAsArray.map(digit => parseInt(digit)));
    const restOfSumDividedByLength = sumOfInputArray % this.NUMBER_OF_DIGITS_OF_CPF;
    return restOfSumDividedByLength < this.MIN_VERIFIER ? this.MIN_VERIFIER_FALLBACK : this.NUMBER_OF_DIGITS_OF_CPF - restOfSumDividedByLength;
  }
  
  private extractVerifiers(cpf: string): string {
    return cpf.slice(this.SLICE_PATTERN_TO_EXTRACT_VERIFIERS);
  }
  
  validate(rawCpfString?: string | null) {
    if (!this.isValidInput(rawCpfString)) return false;
    const cpfWithoutDotsAndSigns = this.removeSignsAndDots(rawCpfString!);
    if (!this.hasValidLength(cpfWithoutDotsAndSigns.length)) return false;
    if (this.isEqualDigits(cpfWithoutDotsAndSigns)) return false;
  
    const digitsForValidation = cpfWithoutDotsAndSigns.slice(this.START_RANGE_VERIFIER_CALCULATION, this.END_RANGE_VERIFIER_CALCULATION);
    const firstVerifier = this.calculateVerifier(digitsForValidation);
    const lastVerifier = this.calculateVerifier(`${digitsForValidation}${firstVerifier}`);
  
    const verifiers = this.extractVerifiers(cpfWithoutDotsAndSigns);
  
    return `${firstVerifier}${lastVerifier}` === verifiers;
  }
}