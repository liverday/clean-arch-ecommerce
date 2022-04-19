import { cpfValidation } from "../src/cpfValidation"

test('should return true if cpf is valid', () => {
  expect(cpfValidation('44976087867')).toBe(true)
})

test('should return false if cpf is not valid', () => {
  expect(cpfValidation('11122233344')).toBe(false)
})

test('should return false if cpf was sent with less than 11 digits', () => {
  expect(cpfValidation('1')).toBe(false)
})

test('should return false if cpf was sent with all same numbers', () => {
  expect(cpfValidation('11111111111')).toBe(false);
  expect(cpfValidation('22222222222')).toBe(false);
  expect(cpfValidation('33333333333')).toBe(false);
  expect(cpfValidation('44444444444')).toBe(false);
  expect(cpfValidation('55555555555')).toBe(false);
  expect(cpfValidation('66666666666')).toBe(false);
  expect(cpfValidation('77777777777')).toBe(false);
  expect(cpfValidation('88888888888')).toBe(false);
  expect(cpfValidation('99999999999')).toBe(false);
})

test('should return false if cpf was sent with more than 14 digits', () => {
  expect(cpfValidation('1111111111111111111111111111')).toBe(false);
})

test('should return false if cpf is not valid', () => {
  expect(cpfValidation(null)).toBe(false);
  expect(cpfValidation()).toBe(false)
})

test('should return false if cpf was sent with non numeric digits', () => {
  expect(cpfValidation('123.abc.567-89')).toBe(false);
})

test('should return true if cpf was sent with one of its verifiers as 0', () => {
  expect(cpfValidation('91632614804')).toBe(true);
})