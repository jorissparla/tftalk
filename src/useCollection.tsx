import * as React from "react";
import { db } from "./firebase";

type WhereClause = [string, firebase.firestore.WhereFilterOp, string | number | boolean];

export function useCollection<T>(path: string, orderBy?: string, where: WhereClause = ["", "==", ""]) {
  const initialValue: T[] = [];
  const [values, setValues] = React.useState(initialValue);

  const [queryField, queryOperator, queryValue] = where;

  React.useEffect(() => {
    let collection = orderBy ? db.collection(path).orderBy(orderBy) : db.collection(path);

    if (queryField) {
      collection = collection.where(queryField, queryOperator, queryValue);
    }
    return collection.onSnapshot(docs => {
      const allDocs: any[] = [];
      docs.forEach(doc => {
        allDocs.push({ ...doc.data(), id: doc.id });
      });
      setValues(allDocs);
    });
  }, [path, orderBy, queryField, queryOperator, queryValue]);

  return values;
}
