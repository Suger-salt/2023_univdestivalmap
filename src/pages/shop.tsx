import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { getAllClub } from "./api/db";
import { dataTypes } from "@/types/types";

function ShopPage() {
  const [data, setData] = useState<dataTypes[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = (await getAllClub()) as dataTypes[]; // getAllName 関数を呼び出してデータを取得
        if (result) {
          setData(result);
          // console.log(data.Shop.shopName);
        } // データをステートにセット
      } catch (error) {
        console.error("Firestoreからデータを取得できませんでした:", error);
      }
    };

    fetchData();
    console.log("data is");
  }, []);

  return (
    <div>
      <h1>商品一覧</h1>
      {/* dataが存在するならmapを回せ */}
      {data ? (
        data.map((item, index) => (
          <button
            key={index}
            className="bg-[red] m-[1rem]"
            onClick={() => {
              console.log("click");
              console.log(index);
              console.log(item.Products);
              console.log("shopName is" + item.Shop.shopName);
            }}
          >
            <div>店舗名: {item.Shop.shopName}</div>
          </button>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

function App() {
  return <ShopPage />;
}

export default App;
