import BigNumber from 'bignumber.js'

export function isNaN(value){
  return new BigNumber(`${value}`).isNaN()
}

export function isNumber(value){
  const isNaNResult = isNaN(value)
  return !isNaNResult
}

export function isInteger(value){
  return new BigNumber(`${value}`).isInteger()
}

export function isPositive(value){
  return new BigNumber(`${value}`).isPositive()
}

export function isNegative(value){
  return new BigNumber(`${value}`).isNegative()
}

export function isZero(value){
  return new BigNumber(`${value}`).isZero()
}

export function countDecimalPlaces(value) {
  return new BigNumber(`${value}`).dp()
}

export function convertNumberToString(value){
  return new BigNumber(`${value}`).toString()
}

export function convertStringToNumber(value) {
  return new BigNumber(`${value}`).toNumber()
}

export function convertHexToString(hex){
  return new BigNumber(`${hex}`).toString()
}

export function convertStringToHex(value){
  return new BigNumber(`${value}`).toString(16)
}

export function greaterThan(numberOne,numberTwo){
  return (
    new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) ===
    1
  )
}

export function greaterThanOrEqual(
  numberOne,
  numberTwo
){
  return (
    new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) >= 0
  )
}

export function smallerThan(
  numberOne,
  numberTwo
){
  return (
    new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) ===
    -1
  )
}

export function smallerThanOrEqual(
  numberOne,
  numberTwo
){
  return (
    new BigNumber(`${numberOne}`).comparedTo(new BigNumber(`${numberTwo}`)) <= 0
  )
}

export function multiply(
  numberOne,
  numberTwo
){
  return new BigNumber(`${numberOne}`)
    .times(new BigNumber(`${numberTwo}`))
    .toString()
}

export function divide(
  numberOne,
  numberTwo
){
  return new BigNumber(`${numberOne}`)
    .dividedBy(new BigNumber(`${numberTwo}`))
    .toString()
}

export function floorDivide(
  numberOne,
  numberTwo
){
  return new BigNumber(`${numberOne}`)
    .dividedToIntegerBy(new BigNumber(`${numberTwo}`))
    .toString()
}

export function mod(
  numberOne,
  numberTwo
){
  return new BigNumber(`${numberOne}`)
    .mod(new BigNumber(`${numberTwo}`))
    .toString()
}

export function add(
  numberOne,
  numberTwo
){
  return new BigNumber(`${numberOne}`)
    .plus(new BigNumber(`${numberTwo}`))
    .toString()
}

export function subtract(
  numberOne,
  numberTwo
){
  return new BigNumber(`${numberOne}`)
    .minus(new BigNumber(`${numberTwo}`))
    .toString()
}

export function convertAmountToRawNumber(
  value,
  decimals = 18
){
  return new BigNumber(`${value}`)
    .times(new BigNumber('10').pow(decimals))
    .toString()
}

export function convertAmountFromRawNumber(
  value,
  decimals = 18
){
  return new BigNumber(`${value}`)
    .dividedBy(new BigNumber('10').pow(decimals))
    .toString()
}

export function handleSignificantDecimals(
  value,
  decimals,
  buffer
){
  if (
    !new BigNumber(`${decimals}`).isInteger() ||
    (buffer && !new BigNumber(`${buffer}`).isInteger())
  ) {
    return null
  }
  buffer = buffer ? convertStringToNumber(buffer) : 3
  decimals = convertStringToNumber(decimals)
  const absolute = new BigNumber(`${value}`).abs().toNumber()
  if (smallerThan(absolute, 1)) {
    decimals = value.slice(2).search(/[^0]/g) + buffer
    decimals = decimals < 8 ? decimals : 8
  } else {
    decimals = decimals < buffer ? decimals : buffer
  }
  let result = new BigNumber(`${value}`).toFixed(decimals)
  result = new BigNumber(`${result}`).toString()
  return new BigNumber(`${result}`).dp() <= 2
    ? new BigNumber(`${result}`).toFormat(2)
    : new BigNumber(`${result}`).toFormat()
}

export function formatFixedDecimals(value, decimals){
  const _value = convertNumberToString(value)
  const _decimals = convertStringToNumber(decimals)
  const result = new BigNumber(
    new BigNumber(_value).toFixed(_decimals)
  ).toString()
  return result
}

export function formatInputDecimals(
  inputOne,
  inputTwo
){
  const _nativeAmountDecimalPlaces = countDecimalPlaces(inputTwo)
  const decimals =
    _nativeAmountDecimalPlaces > 8 ? _nativeAmountDecimalPlaces : 8
  const result = new BigNumber(formatFixedDecimals(inputOne, decimals))
    .toFormat()
    .replace(/,/g, '')
  return result
}

export function forMat(number) {
  return new BigNumber(
    number
  ).multipliedBy(
    new BigNumber(10000)
  ).dividedToIntegerBy(
    new BigNumber(1)
  ).dividedBy(
    new BigNumber(10000)
  ).toNumber()
}

export function byDecimals(number, tokenDecimals = 18){
  const decimals = new BigNumber(10).exponentiatedBy(tokenDecimals);
  return new BigNumber(number).dividedBy(decimals);
}

export function calculateReallyNum(total,sliderNum,formatNum=4){
  if(sliderNum == undefined){
    return byDecimals(0, 0).toFormat(formatNum);
  }
  return byDecimals(sliderNum/100*Number(total), 0).toFormat(formatNum);
}