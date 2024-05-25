import React, { useEffect } from 'react';
import './TradingViewWidget.css';

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500 Index' },
        { proName: 'FOREXCOM:NSXUSD', title: 'US 100 Cash CFD' },
        { proName: 'FX_IDC:EURUSD', title: 'EUR to USD' },
        { proName: 'BITSTAMP:BTCUSD', title: 'Bitcoin' },
        { proName: 'BITSTAMP:ETHUSD', title: 'Ethereum' },
        { description: 'apple', proName: 'NASDAQ:AAPL' },
        { description: 'Gold to USD', proName: 'OANDA:XAUUSD' },
        { description: 'GBP to USD', proName: 'FX:GBPUSD' },
        { description: 'Amazon', proName: 'NASDAQ:AMZN' },
        { description: 'SOL to USD', proName: 'COINBASE:SOLUSD' },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: 'light',
      locale: 'en',
    });

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener noreferrer" target="_blank">TradingView</a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
