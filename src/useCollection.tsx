import * as React from "react";
import { db } from "./firebase";

export function useCollection<T>(path: string, orderBy?: string) {
  const initialValue: T[] = [];
  console.log("Entering Channels");
  const [values, setValues] = React.useState(initialValue);
  React.useEffect(() => {
    return db
      .collection(path)
      .orderBy(orderBy || "id")
      .onSnapshot(docs => {
        const allMessages: any = [];
        docs.forEach(doc => {
          if (path === "channels") {
            console.log(doc.data());
          }
          allMessages.push({ ...doc.data(), id: doc.id });
        });
        setValues(allMessages);
      });
  }, []);

  return values;
}
