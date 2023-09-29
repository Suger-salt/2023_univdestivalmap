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
// import { dataTypes } from "@/types/types";
import { Product, ShopData } from "@/types/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

function ShopPage() {
  const [data, setData] = useState<ShopData[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [item, setItem] = useState<ShopData | undefined>(undefined);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = (await getAllClub()) as ShopData[]; // getAllName 関数を呼び出してデータを取得
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
          <div key={index}>
            <button
              className="bg-[red] m-[1rem]"
              onClick={() => {
                console.log("click");
                console.log(index);
                console.log(item.Products);
                console.log("shopName is" + item.Shop.shopName);
                setItem(item);
                onOpen();
              }}
            >
              <div>店舗名: {item.Shop.shopName}</div>
            </button>
            {/* ここからモーダルの内容を記述 */}
          </div>
          //モーダルここまで
        ))
      ) : (
        <div>Loading...</div>
      )}

      {item && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>商品詳細画面です</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>店舗名: {item.Shop.shopName}</div>
              <div>店舗説明: {item.Shop.shopDetail}</div>
              <img src={item.Shop.shopImage} />
              <div>部活名: {item.User.clubName}</div>

              {item.Products.map((product, productIndex) => (
                <div key={productIndex}>
                  <div>商品名: {product.productName}</div>

                  <img src={product.productImage} />
                  <div>商品価格: {product.productPrice}</div>
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* ここまで */}
    </div>
  );
}

function App() {
  return <ShopPage />;
}

export default App;

//
