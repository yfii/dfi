import BigNumber from "bignumber.js";

const byDecimals = (number, tokenDecimals = 18) => {
    const decimals = new BigNumber(10).exponentiatedBy(tokenDecimals);
    return new BigNumber(number).dividedBy(decimals);
}

const calculateReallyNum = (total,sliderNum) => {
    if(sliderNum == undefined){
       return byDecimals(0, 0).toFormat(4);
    }
    return byDecimals(sliderNum/100*Number(total), 0).toFormat(4);
}

export {byDecimals,calculateReallyNum};