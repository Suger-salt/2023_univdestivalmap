import {
  collection,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../../firebase";
import { dataTypes } from "@/types/types";

// クエリ処理の形で持ってきたい
//名前が必要になる場面でこの関数を使いたい
export const getAllName = async () => {
  try {
    // const shopRef = await getDocs(collection(db, "shop"));
    const shopCollection = collection(db, "data");
    //このコレクションをみましょう
    console.log(shopCollection);
    const shopsQuery = query(shopCollection);
    // ここで実際に取ってきている
    const shopsSnapshot = await getDocs(shopsQuery);

    // これで一個一個見れる
    // console.log(shopsSnapshot.docs[0].data());

    const data: { name: string }[] = [];
    shopsSnapshot.forEach((doc) => {
      const shopData = doc.data();

      const name = shopData.Shop.shopName; // "name" フィールドを取得
      data.push({ name: name });
      const description = shopData.description;
      console.log(doc.id, " => name:", name);
    });
    return data;
  } catch (error) {
    console.error("Firestoreからデータを取得できませんでした:", error);
  }
};

export const getAllClub = async () => {
  try {
    const shopCollection = collection(db, "data");
    const shopsQuery = query(shopCollection);
    const shopsSnapshot = await getDocs(shopsQuery);

    const data: dataTypes[] = [];
    shopsSnapshot.forEach((doc) => {
      const shopData = doc.data() as dataTypes;

      const shopName = shopData.Shop.shopName; // "name" フィールドを取得
      console.log(doc.id, " => name:", shopName);
      // data.push({ shopName: shopName });
      data.push(shopData);
    });
    return data;
  } catch (error) {
    console.error("Firestoreからデータを取得できませんでした:", error);
  }
};
