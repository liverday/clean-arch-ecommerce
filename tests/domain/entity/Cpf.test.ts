import Cpf from '@domain/entity/Cpf';

test('should return true if cpf is valid', () => {
  expect(new Cpf('44976087867')).toBeTruthy()
})

test('should return false if cpf is not valid', () => {
  expect(() => new Cpf('11122233344')).toThrow(new Error('CPF Inválido'))
})

test('should return false if cpf was sent with less than 11 digits', () => {
  expect(() => new Cpf('1')).toThrow(new Error('CPF Inválido'))
})

test('should return false if cpf was sent with all same numbers', () => {
  expect(() => new Cpf('11111111111')).toThrow(new Error('CPF Inválido'));
  expect(() => new Cpf('22222222222')).toThrow(new Error('CPF Inválido'));
  expect(() => new Cpf('33333333333')).toThrow(new Error('CPF Inválido'));
  expect(() => new Cpf('44444444444')).toThrow(new Error('CPF Inválido'));
  expect(() => new Cpf('55555555555')).toThrow(new Error('CPF Inválido'));
  expect(() => new Cpf('66666666666')).toThrow(new Error('CPF Inválido'));
  expect(() => new Cpf('77777777777')).toThrow(new Error('CPF Inválido'));
  expect(() => new Cpf('88888888888')).toThrow(new Error('CPF Inválido'));
  expect(() => new Cpf('99999999999')).toThrow(new Error('CPF Inválido'));
})

test('should return false if cpf was sent with more than 14 digits', () => {
  expect(() => new Cpf('1111111111111111111111111111')).toThrow(new Error('CPF Inválido'));
})

test('should return false if cpf is not valid', () => {
  expect(() => new Cpf(null)).toThrow(new Error('CPF Inválido'));
  expect(() => new Cpf()).toThrow(new Error('CPF Inválido'))
})

test('should return false if cpf was sent with non numeric digits', () => {
  expect(() => new Cpf('123.abc.567-89')).toThrow(new Error('CPF Inválido'));
})

test('should return true if cpf was sent with one of its verifiers as 0', () => {
  expect(new Cpf('91632614804')).toBeTruthy();
})

test('should return true if cpf was sent with dots and signs', () => {
  expect(new Cpf('449.760.878-67')).toBeTruthy()
})

test('should return true if cpf was sent with some dots', () => {
  expect(new Cpf('449.760.87867')).toBeTruthy();
})