export const convertPLNToUSD = (PLN) => {
  switch (typeof PLN) {
    case 'number':  
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    });
    if (PLN <= 0) return formatter.format(0).replace(/\u00a0/g, ' ')
    else {const PLNtoUSD = PLN / 3.5;
    return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
    }
    case 'string': return NaN;
    case 'undefined': return NaN
    default: return 'Error';
  }
}