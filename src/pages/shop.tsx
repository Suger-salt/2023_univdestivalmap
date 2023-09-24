import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase";

// データの型を定義
interface Product {
  productName: string;
  productPrice: number;
}

interface Shop {
  shopName: string;
}

interface User {
  clubName: string;
}

interface DataItem {
  Products: Product;
  Shop: Shop;
  User: User;
}

const DataFetchingContext = createContext<{
  data: DataItem[];
  loading: boolean;
}>({
  data: [],
  loading: true,
});

export function DataFetchingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "data"));
        const data: DataItem[] = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data() as DataItem);
        });
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Firestoreからデータを取得できませんでした:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DataFetchingContext.Provider value={{ data, loading }}>
      {children}
    </DataFetchingContext.Provider>
  );
}

export function useDataFetching() {
  return useContext(DataFetchingContext);
}

function ShopPage() {
  const { data, loading } = useDataFetching();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>商品一覧</h1>
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item.Products.productName}</h2>
          <p>価格: {item.Products.productPrice}円</p>
          <div>店舗名: {item.Shop.shopName}</div>
          <div>クラブ名: {item.User.clubName}</div>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <DataFetchingProvider>
      <ShopPage />
    </DataFetchingProvider>
  );
}

export default App;
