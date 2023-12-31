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
import styles4 from "@/styles/menu.module.css";
import Header from "@/pages/header";

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
      {/* <h1>商品一覧</h1> */}
      {/* dataが存在するならmapを回せ */}
      <Header />
      <div>
        <div className={styles2.sideFont1}>N棟側</div>
        <div className={styles2.sideFont2}>F棟側</div>
        <div
          style={{
            // display: "grid",
            // gridTemplateColumns: "repeat(2, 1fr)",
            // display: "flex",
            // overflow: "scroll",
            // height: "85vh",
            // marginLeft: "40px",
            // marginRight: "38px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between", // グリッドの間隔を均等に配置
            overflowY: "scroll",
            height: "85vh",
            marginLeft: "40px",
            marginRight: "40px",
          }}
        >
          {data ? (
            data.map((item, index) => (
              <div key={index} className="text-center">
                <button
                  className="w-[18vh] h-[26vh] text-center"
                  onClick={() => {
                    console.log("click");
                    console.log(index);
                    console.log(item.Products);
                    console.log("shopName is" + item.Shop.shopName);
                    setItem(item);
                    onOpen();
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      backgroundImage: `url('/images/pop3.svg')`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      color: "white",
                      padding: "5vw",
                      height: "40px",

                      fontSize: "14px",
                      whiteSpace: "nowrap",
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
                    style={{
                      borderRadius: "20px",
                      width: "12vh",
                      height: "12vh",
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </button>

                {/* ここからモーダルの内容を記述 */}
              </div>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>

      {item && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className="m-[14px] ">
            {/* <ModalHeader>{item.Shop.shopName}</ModalHeader> */}
            {/* <ModalCloseButton /> */}

            <Box className={styles3.container1}>
              <ModalBody>
                <div className={styles3.topcontents}>
                  <div className={styles3.ShopTitle}>{item.Shop.shopName}</div>

                  <div className={styles3.ClubTitle}>{item.User.clubName}</div>
                  {/* <div>店舗説明: {item.Shop.shopDetail}</div> */}
                  <img
                    src={item.Shop.shopImage}
                    style={{
                      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
                      width: "100%",
                      aspectRatio: "16 / 9",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className={styles3.Menu}>
                  <p className={styles3.MenuText}>メニュー</p>
                </div>

                {/* 商品の表示 */}

                {item.Products.length > 0 ? (
                  <Box className={styles4.menu_contents}>
                    {modalProducts.map((product, productIndex) => (
                      <Box key={productIndex}>
                        <img
                          className={styles4.menu_image}
                          src={product.productImage}
                        />
                        <div className={styles4.menu_title}>
                          {product.productName}
                        </div>
                        <div className={styles4.menu_price}>
                          ￥{product.productPrice}
                        </div>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    メニューが登録されていません
                  </div>
                )}
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={onClose}
                  colorScheme="blue"
                  style={{ backgroundColor: "#3598DB" }}
                  boxShadow="lg"
                >
                  閉じる
                </Button>

                {/* 他のボタンを追加できます */}
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
