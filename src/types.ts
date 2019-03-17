export type User = {
  displayName?: string;
  photoURL?: string;
  uid?: string;
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
