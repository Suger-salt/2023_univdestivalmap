import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

const ShopPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "data"));

        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
      } catch (error) {
        console.error("Firestoreからデータを取得できませんでした:", error);
      }
    };

    fetchData();
  }, []);

  return <div>this is ShopPage</div>;
};

export default ShopPage;
