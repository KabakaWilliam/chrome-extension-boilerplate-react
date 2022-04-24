import {
  getAuth,
  getIdToken,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { DOMMessage, DOMMessageResponse } from '../../DOMM-Types';
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDocs,
  getFirestore,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
console.log('This is the background page.');
console.log('Put the background scripts here.');

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
try {
  const firebaseConfig = {
    apiKey: 'AIzaSyB1d-EZ1fUSS4CaR7ZGB54UjyyaFyPaaMI',
    authDomain: 'atless-development.firebaseapp.com',
    projectId: 'atless-development',
    storageBucket: 'atless-development.appspot.com',
    messagingSenderId: '788140584389',
    appId: '1:788140584389:web:06d195ffd1c82402b5efac',
    measurementId: 'G-RM663P0KHH',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const fetchListTitles = async () => {
    let listTitles = [];
    const q = query(
      collectionGroup(db, 'Lists'),
      where('author', '==', 'will')
    );

    const temp = await getDocs(q);
    // let sample = temp[0];

    // let listTitles = temp.docs.data();
    // temp.docs.map((doc) => {
    //   listTitles.push(linksToJSON(doc));
    // });
    temp.docs.map((doc) => {
      // listTitles.push(doc.data().title);
      listTitles.push(doc.data());
    });
    console.log(listTitles);
    return listTitles;
  };

  const signInWithCreds = async (credential) => {
    const userCreds = await signInWithCredential(auth, credential);
    console.log('userCreds:', userCreds);
    const user = userCreds.user;
    console.log('user', user);
    chrome.storage.sync.set({ firestoreUserID: user.uid }, () => {
      console.log(`Value is set to` + user.uid);
    });
    // chrome.storage.sync.set({ firestoreUserName: user.displayName }, () => {
    //   console.log(`Value is set to` + user.uid);
    // });
  };
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    console.log('token:', token);
    // console.log('result:', result);
    let credential = GoogleAuthProvider.credential(null, token);
    console.log('credential', credential);
    signInWithCreds(credential);
    // const userCreds = signInWithCredential(auth, credential)

    // console.log('fsToken:', fsToken);
    // getAuth()
    //   .verifyIdToken(token)
    //   .then((decodedToken) => {
    //     const uid = decodedToken.uid;
    //     console.log(uid);
    //     console.log(decodedToken);
    //     // ...
    //   });
  });

  //   const provider = new GoogleAuthProvider();
  // provider.addScope('profile');
  // provider.addScope('email');
  // const result = await signInWithPopup(auth, provider);

  // // The signed-in user info.
  // const user = result.user;
  // // This gives you a Google Access Token.
  // const credential = GoogleAuthProvider.credentialFromResult(result);
  // const token = credential.accessToken;
  const fetchLinkInfo = async (currentLink) => {
    console.log('currentLink in fetchLinkInfo:', currentLink);
    try {
      let linkInfoResponse = await fetch(
        `https://us-central1-atlessfunctions.cloudfunctions.net/getMetaTags/?link=${currentLink}`
      );
      if (linkInfoResponse) {
        let linkInfoBody = await linkInfoResponse.json();
        console.log('linkInfoBody:', linkInfoBody);
        return linkInfoBody;
      } else {
        let linkPreview = await fetch(
          `https://us-central1-atlessfunctions.cloudfunctions.net/getLinkPreview/?link=${currentLink}`
        );
        let linkPreviewBody = await linkPreview.json();
        console.log('linkPreviewBody 2nd option:', linkPreviewBody);
        return linkPreviewBody;
      }
    } catch (e) {
      console.error(e);
    }

    // fetch(
    //   `https://us-central1-atlessfunctions.cloudfunctions.net/getMetaTags/?link=${currentLink}`
    // )
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     return data;
    //   });
  };

  // const sendToFirestore = async (linkData) => {
  //   let loggedInUsername;
  //   chrome.storage.sync.get([`firestoreUserID`], (result) => {
  //     console.log('firestoreUserID', result);
  //     loggedInUsername = result.

  //   })

  //   try {
  //     const docRef = await addDoc(collection(db, "Links"), {
  //       author: loggedInUsername,
  //       linkID: linkDoc.id,
  //       listName: ListTitle,
  //       url: linkData?.url,
  //       title: linkData?.title,
  //       siteName: linkData?.siteName,
  //       description: linkData?.description,
  //       mediaType: linkData?.mediaType,
  //       contentType: linkData?.contentType,
  //       images: linkData?.images,
  //       videos: linkData?.videos,
  //       favicons: linkData.favicons,
  //       likes: 0,
  //     });
  //   } catch (e) {}
  // };

  const getLoggedInUserInfo = async (listData) => {
    // listData.title
    chrome.storage.sync.get([`firestoreUserID`], (result) => {
      const firestoreUserID = result;
      // get username and other list information. save to lcoal storage
      const q = query(
        collection(db, 'users'),
        where('authID', '==', firestoreUserID),
        limit(1)
      );
      getDocs(q).then((docs) => {
        const userDocs = docs[0];
        return userDocs;
      });
    });
  };

  const sendLinkDataToFirestore = async (listData, linkData) => {
    try {
      const docRef = await addDoc(collection(db, 'Links'), {
        author: listData.username,
        // linkID: docRef.id,
        listName: listData.title,
        url: linkData.url,
        title: linkData.title,
        siteName: linkData.siteName,
        description: linkData.description,
        mediaType: linkData.mediaType,
        contentType: linkData.contentType,
        images: linkData.images,
        videos: linkData.videos,
        favicons: linkData.favicons,
        likes: 0,
      });
      console.log('data set to firestore');
      await updateDoc(doc(db, 'Links', docRef.id), {
        linkID: docRef.id,
      });
      console.log('doc in  firestore updated');
    } catch (e) {
      console.error(e);
    }
  };

  chrome.runtime.onMessage.addListener((msg, sender, resp) => {
    if (msg.command === 'fetch') {
      fetchListTitles().then((listData) =>
        resp({
          type: 'result',
          status: 'success',
          data: listData,
          request: msg,
        })
      );
      return true; // keeps the channel open for sendResponse
    }
    if (msg.command === 'fetchLinkInfo') {
      fetchLinkInfo(msg.currentURL).then((linkData) => {
        resp({
          type: 'result',
          status: 'success',
          currentLinkData: linkData,
          request: msg,
        });
        sendLinkDataToFirestore(msg.selectedListData, linkData);
      });
      // sendLinkDataToFirestore function
      console.log('selected list data', msg.selectedListData);

      return true;
    }
  });
} catch (e) {
  console.error(e);
}

// chrome.identity.getAuthToken({},
//   (token)=>{
//     let credential = getAuth()
//     credential.
//   }
//   )
export function linksToJSON(docs) {
  const data = docs.data();
  return {
    ...data,
  };
}
