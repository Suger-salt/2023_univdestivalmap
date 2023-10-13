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
  Box,
} from "@chakra-ui/react";
import styles1 from "@/styles/misada.module.css";
import styles2 from "@/styles/shop.module.css";

function ShopPage() {
  const [data, setData] = useState<ShopData[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [item, setItem] = useState<ShopData | undefined>(undefined);
  const modalProducts = item ? item.Products : [];
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

      <div>
        <div className={styles2.sideFont1}>N棟側</div>
        <div className={styles2.sideFont2}>F棟側</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            overflow: "scroll",
            height: "85vh",
            padding: "30px",
          }}
        >
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
                  <div> {item.Shop.shopName}</div>
                  <img
                    src={item.Shop.shopImage}
                    style={{ borderRadius: "30px" }}
                  />
                </button>
                {/* ここからモーダルの内容を記述 */}
              </div>
              //モーダルここまで
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>

      {item && (
        <Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className="m-[5vw]">
              {/* <ModalHeader>{item.Shop.shopName}</ModalHeader> */}
              <ModalCloseButton />

              <ModalBody>
                {item.Shop.shopName}

                <div className={styles1.sircle_name}>
                  サークル名: {item.User.clubName}
                </div>
                <div>店舗説明: {item.Shop.shopDetail}</div>
                <img
                  src={item.Shop.shopImage}
                  className={styles1.place_photo}
                />
                <div className={styles1.menu}>メニュー</div>
                <Box className="bg-[red] ">
                  <Box className={styles1.container}>
                    {modalProducts.map((product, productIndex) => (
                      <Box key={productIndex} className="bg-[blue]">
                        <img
                          className={styles1.menu_photo}
                          src={product.productImage}
                        />
                        <div className={styles1.menu_name}>
                          商品名: {product.productName}
                        </div>
                        <div className={styles1.menu_name}>
                          商品価格: {product.productPrice}
                        </div>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      )}

      {/* ここまで */}
    </div>
  );
}

function App() {
  return <ShopPage />;
}

export default App;
