import { validate } from "../src/cpf"

test('should return true if cpf is valid', () => {
  expect(validate('44976087867')).toBe(true)
})

test('should return false if cpf is not valid', () => {
  expect(validate('11122233344')).toBe(false)
})

test('should return false if cpf was sent with less than 11 digits', () => {
  expect(validate('1')).toBe(false)
})

test('should return false if cpf was sent with all same numbers', () => {
  expect(validate('11111111111')).toBe(false);
  expect(validate('22222222222')).toBe(false);
  expect(validate('33333333333')).toBe(false);
  expect(validate('44444444444')).toBe(false);
  expect(validate('55555555555')).toBe(false);
  expect(validate('66666666666')).toBe(false);
  expect(validate('77777777777')).toBe(false);
  expect(validate('88888888888')).toBe(false);
  expect(validate('99999999999')).toBe(false);
})

test('should return false if cpf was sent with more than 14 digits', () => {
  expect(validate('1111111111111111111111111111')).toBe(false);
})

test('should return false if cpf is not valid', () => {
  expect(validate(null)).toBe(false);
  expect(validate()).toBe(false)
})

test('should return false if cpf was sent with non numeric digits', () => {
  expect(validate('123.abc.567-89')).toBe(false);
})

test('should return true if cpf was sent with one of its verifiers as 0', () => {
  expect(validate('91632614804')).toBe(true);
})

test('should return true if cpf was sent with dots and signs', () => {
  expect(validate('449.760.878-67')).toBe(true)
})

test('should return true if cpf was sent with some dots', () => {
  expect(validate('449.760.87867')).toBe(true);
})