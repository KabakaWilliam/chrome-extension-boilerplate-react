import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/outline';
import ListBubble from './ListBubble';
import { Timestamp } from 'firebase/firestore';
declare global {
  interface userData {
    author: string;
    createdAt: Timestamp;
    description: string;
    heartCount: number;
    id: string;
    id2: string;
    linkCount: number;
    public: true;
    shareCount: number;
    title: string;
    updatedAt: Timestamp;
    username: string;
  }
}

declare global {
  interface LinkPreview {
    url: string;
    title: string;
    siteName: string;
    description: string;
    mediaType: string;
    contentType: string;
    images: Array<String>;
    videos: Array<String>;
    favicons: Array<String>;
    linkID: string;
  }
}

interface props {
  title: string;
  setTitle: Function;
  listTitles: [userData];
  fetchLinkInfo: boolean;
  setFetchLinkInfo: Function;
  setLinkData: Function;
  linkData: LinkPreview;
  setListData: Function;
  listData: userData;
}
const Home = ({
  title,
  setTitle,
  listTitles,
  fetchLinkInfo,
  setFetchLinkInfo,
  setLinkData,
  linkData,
  setListData,
  listData,
}: props) => {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <div className="w-[300px] h-[500px]  bg-[#12181B] flex flex-col items-center  text-white text-[40px] gap-x-4 overflow-hidden">
      {/* <LoginButton />
      <SignUpButton /> */}

      <div className="w-[300px]   h-[15%] mt-3 flex flex-col justify-start">
        <span className="text-sm pl-2 font-bold">✨Current URL✨</span>
        <form className=" w-[300px] h-[60px] flex justify-center " action="">
          <input
            // className="w-[285px] h-[40px] bg-[#1d282d] outline-none text-[14px] "
            className="w-[285px] h-[40px] bg-[#12181B] border-b-[3px] border-b-green-300 outline-none text-[14px] "
            type="text"
            defaultValue={title}
            // onChange={(e) => {}}
          />
        </form>
      </div>
      {/* add to new list form */}
      <div className="w-[100%] h-[10%] flex items-center justify-center hover:text-purple-400">
        {!isEditable ? (
          <div
            onClick={() => setIsEditable(true)}
            className="w-[95%] h-[100%] bg-gray-600 rounded-lg cursor-pointer flex shadow-xl shadow-black"
          >
            <div className="w-[20%] h-[100%] flex items-center justify-center">
              <PlusIcon className="h-6 " />
            </div>
            <div className="w-[80%] h-[100%] flex items-center pl-[40px]">
              <span className="text-[16px] font-bold">Add to new list</span>
            </div>
          </div>
        ) : (
          <div className="w-[95%] h-[100%] bg-gray-600 rounded-lg cursor-pointer flex items-center justify-center  shadow-xl shadow-black">
            <form className="w-[100%] h-[100%] flex items-center justify-center">
              <input
                className="w-[100%] h-[100%] flex items-center justify-center rounded-lg bg-transparent text-purple-400 text-[22px] pl-3 "
                type="text"
                placeholder="enter a title"
              />
            </form>
            <div className="w-[300px] h-[30px]   absolute top-[139px] ">
              <div className="w-[97%] h-[100%] flex items-center justify-end ">
                <button className="w-[20%] h-[90%] bg-green-300 hover:bg-green-200 text-[13px] text-black">
                  submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* other lists */}
      <div className="w-[300px] h-[350px]  overflow-hidden ">
        <span className="text-sm pl-2 font-bold">Your Lists</span>
        {/* list widget */}
        <div className="overflow-auto w-[300px] h-[300px]">
          {listTitles.map((list) => (
            <ListBubble
              listTitle={list.title}
              key={list.id}
              listData={listData}
              setListData={setListData}
              fetchLinkInfo={fetchLinkInfo}
              setFetchLinkInfo={setFetchLinkInfo}
              setLinkData={setLinkData}
              linkData={linkData}
              selectedListData={list}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
