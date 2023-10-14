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
import styles3 from "@/styles/modal.module.css";

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
            padding: "40px",
          }}
        >
          {data ? (
            data.map((item, index) => (
              <div key={index} className="p-[4px] m-[4px]">
                <button
                  className=" "
                  onClick={() => {
                    console.log("click");
                    console.log(index);
                    console.log(item.Products);
                    console.log("shopName is" + item.Shop.shopName);
                    setItem(item);
                    onOpen();
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url('/images/pop2.svg')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      color: "white",
                      padding: "18px",
                      fontSize: "14px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {item.Shop.shopName.length > 6
                      ? item.Shop.shopName.slice(0, 6) + "..."
                      : item.Shop.shopName}
                  </div>
                  <img
                    src={item.Shop.shopImage}
                    style={{ borderRadius: "30px", marginTop: "6px" }}
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
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className="m-[5vw]">
            {/* <ModalHeader>{item.Shop.shopName}</ModalHeader> */}
            <ModalCloseButton />

            <Box className={styles3.container1}>
              <ModalBody>
                <div className={styles3.topcontents}>
                  <div className={styles3.ShopTitle}>
                    店舗名： {item.Shop.shopName}
                  </div>

                  <div className={styles3.ClubTitle}>
                    サークル名: {item.User.clubName}
                  </div>
                  {/* <div>店舗説明: {item.Shop.shopDetail}</div> */}
                  <img
                    src={item.Shop.shopImage}
                    className={styles1.place_photo}
                  />
                </div>

                <div className={styles3.Menu}>
                  <p className={styles3.MenuText}>メニュー</p>
                </div>

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
                  閉じる
                </Button>
              </ModalFooter>
            </Box>
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
