import ccxt from 'ccxt';
export const fetchHistoricalData = async (symbol, since, limit) => {
    const binance = new ccxt.binance();
    //  const ohlcv = await binance.fetchOHLCV(symbol, '1d', since, limit);-initial code corrected due to limit of 1000
    const ohlcv = [];
    let passedDays = 0;
    while (limit > 0) {
        {
            if (passedDays) {
                since += passedDays * 1000 * 24 * 60 * 60; //binance allows max of 1000 day data in one go
            }
            ohlcv.push(...(await binance.fetchOHLCV(symbol, '1d', since, limit)));
            passedDays += 1000;
            limit -= 1000;
        }
    }

    return ohlcv;
};
