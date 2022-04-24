import { atom } from 'recoil';

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

const linkDataAtomState = atom({
  key: 'linkDataAtomState',
  default: {} as LinkPreview,
});

const fetchLinkInfoState = atom({
  key: 'fetchLinkInfoState',
  default: false,
});

export default linkDataAtomState;
export { fetchLinkInfoState };
