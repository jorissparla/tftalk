import * as React from "react";
import { db } from "./firebase";

export function useCollection<T>(path: string, orderBy?: string) {
  const initialValue: T[] = [];
  const [values, setValues] = React.useState(initialValue);
  React.useEffect(() => {
    let collection = orderBy ? db.collection(path).orderBy(orderBy) : db.collection(path);

    return collection.onSnapshot(docs => {
      const allDocs: any[] = [];
      docs.forEach(doc => {
        allDocs.push({ ...doc.data(), id: doc.id });
      });
      setValues(allDocs);
    });
  }, [path, orderBy]);

  return values;
}
