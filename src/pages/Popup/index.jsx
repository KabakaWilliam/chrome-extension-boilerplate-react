import React from 'react';
import { render } from 'react-dom';
import '../../assets/styles/tailwind.css';
import { RecoilRoot } from 'recoil';
import Popup from './Popup';

render(
  <RecoilRoot>
    <Popup />
  </RecoilRoot>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
