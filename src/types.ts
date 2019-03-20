export type User = {
  displayName?: string;
  photoURL?: string;
  uid?: string;
  status?: Status;
};

type Status = {
  state: string;
  lastchanged: Date;
};
export interface UserProps {
  user: User;
}
export type Channel = {
  id: string;
  topic: string;
};

export type IMessage = {
  id: string;
  text: string;
  createdAt: Date;
  user: any;
};
