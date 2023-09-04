import ccxt from 'ccxt';
export const fetchHistoricalData = async (symbol, since, limit) => {
    const binance = new ccxt.binance();
    const ohlcv = await binance.fetchOHLCV(symbol, '1d', since, limit);
    return ohlcv;
};
