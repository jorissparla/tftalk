export type User = {
  displayName?: string,
  photoURL?: string,
  uid?: string
};
export interface UserProps {
  user: User;
}
