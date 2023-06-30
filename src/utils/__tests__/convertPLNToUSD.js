import { convertPLNToUSD } from "../convertPLNToUSD";

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
  it('should return NaN when input is text', () => {
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('6')).toBeNaN();
  });
  it('should return NaN when input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });
  it('should return Error when input is not number or text', () => {
    expect(convertPLNToUSD({1: 1, 2: 2})).toBe('Error')
    expect(convertPLNToUSD([1,2,3])).toBe('Error')
    expect(convertPLNToUSD(true)).toBe('Error')
  })
  it('should return $0.00 if input is less than 0', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00')
    expect(convertPLNToUSD(-7)).toBe('$0.00')
    expect(convertPLNToUSD(-0.55)).toBe('$0.00')
    expect(convertPLNToUSD(-3750)).toBe('$0.00')
  })
});