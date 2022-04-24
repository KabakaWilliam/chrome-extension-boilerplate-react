import { PlusIcon } from '@heroicons/react/outline';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react';

interface props {
  listTitle: string;
  listData: userData;
  fetchLinkInfo: boolean;
  setFetchLinkInfo: Function;
  setLinkData: Function;
  linkData: LinkPreview;
  setListData: Function;
  selectedListData: userData;
}
const ListBubble = ({
  listTitle,
  listData,
  fetchLinkInfo,
  setFetchLinkInfo,
  setLinkData,
  linkData,
  setListData,
  selectedListData,
}: props) => {
  let link = `https://atless-production-git-atless-development-kabakawilliam.vercel.app/${selectedListData.username}/${listTitle}`;
  const sendToPage = () => {
    chrome.tabs.create({
      url: link,
    });
  };

  const sendToFirestore = (e: any) => {
    e.stopPropagation();
    if (!fetchLinkInfo) {
      setFetchLinkInfo(true);
      setListData(selectedListData);
      console.log('linkInfo is', true);

      // addDoc(collection(db, "Links"), {})
    } else {
      setFetchLinkInfo(false);
      console.log('linkInfo is', false);
    }
  };
  return (
    <div
      onClick={() => sendToPage()}
      className="w-[300px] h-[50px] flex items-center justify-center mb-5 "
    >
      <div className="w-[95%] h-[100%] bg-gray-700 rounded-lg cursor-pointer flex hover:text-purple-500 hover:bg-gray-600 shadow shadow-black hover:shadow-lg">
        <div
          onClick={(e) => sendToFirestore(e)}
          className="w-[20%] h-[100%] flex items-center justify-center border-r-[10px] border-r-[#12181B] hover:bg-[#b0cfd1] rounded-l-lg hover:shadow-lg"
        >
          <PlusIcon className="h-6  hover:animate-spin hover:text-green-600 text-white " />
        </div>
        {/* <Link className=" w-[100%]" to="/List"> */}
        <div className="w-[80%] h-[100%] flex items-center  ">
          <span className="text-[16px] font-bold ml-3 ">{listTitle}</span>
        </div>
        {/* </Link> */}
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default ListBubble;
