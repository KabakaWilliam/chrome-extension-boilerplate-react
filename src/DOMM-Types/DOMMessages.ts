import { UserCredential } from 'firebase/auth';

export type DOMMessage = {
  type: 'GET_DOM';
};

export type DOMMessageResponse = {
  title: string;
  headlines: string[];
};

export type DOMMUserCredsResponse = {
  userCred: UserCredential | undefined | null;
};
