import React from "react";
import { db } from "./firebase";
import { U } from "./Messages";

interface CacheType {
  [key: string]: U;
}
export const cache: CacheType = {};

export function useDocWithCache(path: string) {
  const [doc, setDoc] = React.useState<U | undefined>(cache[path]);
  async function getDoc() {
    if (doc) return;
    return await db
      .doc(path)
      .get()
      .then((doc: any) => {
        const user = { ...doc.data(), id: doc.id };
        setDoc(user);
        cache[path] = user;
      });
  }
  React.useEffect(() => {
    getDoc();
  }, [path]);
  return doc;
}

export function useDoc<U>(path: string) {
  const [doc, setDoc] = React.useState<U | undefined>(undefined);

  React.useEffect(() => {
    return db.doc(path).onSnapshot((doc: any) => {
      const user = { ...doc.data(), id: doc.id };
      setDoc(user);
    });
  }, [path]);
  return doc;
}
