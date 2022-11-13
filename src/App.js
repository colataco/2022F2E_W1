import React, { useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import { GlobalContext } from './store/appStore';
import { intl, getMessage, getAntdMessage } from './assets/i18n';
import Routes from './routes';
// import './App.css';

function App() {
  const { lang } = useContext(GlobalContext);
  return (
    <ConfigProvider
      locale={{
        ...getAntdMessage(lang),
      }}
    >
      <div className="App">
        <Routes />
      </div>
    </ConfigProvider>
  );
}

export default App;
