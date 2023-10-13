import {
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
// import { dataTypes } from "@/types/types";
import { Product, ShopData } from "@/types/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

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

    const data: ShopData[] = [];
    shopsSnapshot.forEach((doc) => {
      const shopData = doc.data() as ShopData;

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

// export const getBuild = (): Build[] => {
//   const [builds, setBuilds] = useState<Build[]>([]);
//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "builds"), (snapshot) => {
//       const buildData: Build[] = snapshot.docs.map((doc) => ({
//         name: doc.id,
//         clickableArea: doc.data().clickableArea as string,
//       }));
//       setBuilds(buildData);
//     });

//     return unsubscribe;
//   }, []);

//   return builds;
// };

type Build = {
  clickableArea: string;
  name: string;
};

type BuildsHook = {
  builds: Build[];
  moveToFloor: (name: string) => void;
};

export const useBuilds = (): BuildsHook => {
  const [builds, setBuilds] = useState<Build[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "builds"), (snapshot) => {
      const buildData: Build[] = snapshot.docs.map((doc) => ({
        name: doc.id,
        clickableArea: doc.data().clickableArea as string,
      }));
      setBuilds(buildData);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const moveToFloor = (name: string) => {
    router.push(`/${name}`);
  };

  return { builds, moveToFloor };
};
