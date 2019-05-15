import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { LocaleProvider } from 'antd';
import { i18nClient } from './locale';
import ruRU from 'antd/lib/locale-provider/ru_RU';
import enUS from 'antd/lib/locale-provider/en_US';

const antResources = {
    ru: ruRU,
    'ru-RU': ruRU,
    en: enUS,
    'en-US': enUS,
};

ReactDOM.render(
<LocaleProvider locale={antResources[i18nClient.language]}>
        <App />
</LocaleProvider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
