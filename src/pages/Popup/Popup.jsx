import React, { useEffect, useState } from 'react';

// import logo from '../../assets/img/logo.svg';
import Home from '../../containers/Home';
import { DOMMessage, DOMMessageResponse } from '../../DOMM-Types';

const Popup = () => {
  const [currentLink, setCurrentLink] = useState('');
  const [listTitles, setListTitles] = useState([]);
  const [fetchLinkInfo, setFetchLinkInfo] = useState(false);
  const [linkData, setLinkData] = useState({});
  const [listData, setListData] = useState({});

  useEffect(() => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
          var url = tabs[0].url;
          setCurrentLink(url);
        }
      );
  }, []);

  useEffect(() => {
    if (fetchLinkInfo) {
      console.log('fetchLinkInfo popup:', fetchLinkInfo);
      chrome.runtime
        .sendMessage({
          command: 'fetchLinkInfo',
          currentURL: currentLink,
          selectedListData: listData,
        })
        .then((response) => {
          setLinkData(response.currentLinkData);
          // console.log('currentLinkData', linkData);
        });
      setFetchLinkInfo(false);
    }
  }, [fetchLinkInfo]);

  useEffect(() => {
    chrome.runtime.sendMessage({ command: 'fetch' }).then((response) => {
      if (response.data) {
        console.log('popup', response);
        console.log('popup data', response.data);
        console.log('popup data', response.data);
        setListTitles(response.data);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.get([`firestoreUserID`], (result) => {
      console.log('firestoreUserID', result);
    });
  }, []);
  console.log('currentLinkData', linkData);
  return (
    <Home
      title={currentLink}
      setTitle={setCurrentLink}
      listTitles={listTitles}
      fetchLinkInfo={fetchLinkInfo}
      setFetchLinkInfo={setFetchLinkInfo}
      linkData={linkData}
      setLinkData={setLinkData}
      listData={listData}
      setListData={setListData}
    />
  );
};

export default Popup;
