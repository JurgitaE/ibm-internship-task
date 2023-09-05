import ccxt from 'ccxt';
export const fetchHistoricalData = async (symbol, since, limit) => {
    const binance = new ccxt.binance();
    //  const ohlcv = await binance.fetchOHLCV(symbol, '1d', since, limit);-initial code corrected due to limit of 1000
    let ohlcv = [];
    let initEnd = since + limit * 24 * 60 * 60 * 1000; //end date in e query
    let passedDays = 0;
    while (limit > 0) {
        {
            if (passedDays) {
                since += passedDays * 1000 * 24 * 60 * 60; //binance allows max of 1000 day data in one go
            }
            const data = await binance.fetchOHLCV(symbol, '1d', since, limit);

            ohlcv.push(...data);
            passedDays += 1000;
            limit -= 1000;
        }
    }
    //if part of historical data not available, missing days add on top of endDate, prevent by filter
    return ohlcv.filter(item => item[0] <= initEnd - 1000 * 60 * 60 * 24);
};
