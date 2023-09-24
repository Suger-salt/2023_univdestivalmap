import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const ShopPage = () => {
  // 商品データを格納するステート変数
  const [products, setProducts] = useState<
    {
      productName: string;
      productPrice: number;
      productImage: string;
    }[]
  >([]);
  //店舗情報データを格納するステート変数
  // const [shopInfo, setShopInfo] = useState<{
  //   shopName: string;
  //   shopImage: string;
  //   shopDetail: string;
  // }>({
  //   shopName: "",
  //   shopImage: "",
  //   shopDetail: "",
  // });

  // const [userInfo, setUserInfo] = useState<{
  //   clubName: string;
  // }>({
  //   clubName: "",
  // });

  const [shopName, setshopName] = useState("");
  const [shopImage, setshopImage] = useState("");
  const [shopDetail, setshopDetail] = useState("");
  const [clubName, setclubName] = useState("");
  const [documentIds, setDocumentIds] = useState<string[]>([]);

  // 全てのデータを引っ張ってきたい
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "data"));
        const ids: string[] = [];
        querySnapshot.forEach((doc) => {
          console.log("dataId is " + doc.id);

          ids.push(doc.id);
          const data = doc.data(); // データを data 変数に代入

          console.log("data is" + data);

          setProducts(data.Products || []);
          setshopName(data.Shop.shopName || "");
          setshopImage(data.Shop.shopImage || "");
          setshopDetail(data.Shop.shopDetail || "");
          setclubName(data.User.clubName || "");
        });
        setDocumentIds(ids);
      } catch (error) {
        console.error("Firestoreからデータを取得できませんでした:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>商品一覧</h1>
      <div className="flex  gap-4 bg-[orange]">
        <div>F棟</div>
        {documentIds.map((documentId, index) => (
          <div
            key={index}
            className="bg-[red]"
            onClick={() => {
              console.log("clicked");
              console.log("documentId is" + documentId);
            }}
          >
            <div>documentId is {documentId} </div>
            <div>index is {index} </div>
          </div>
        ))}

        <div>N棟</div>
      </div>
    </div>
  );
};

export default ShopPage;

// こいつ中身出せる
// {products.map((product, index) => (
//   <div key={index} className="m-[10px] bg-[red] p-4">
//     <h2>{product.productName}</h2>
//     <p>価格: {product.productPrice}円</p>
//   </div>
// ))}
