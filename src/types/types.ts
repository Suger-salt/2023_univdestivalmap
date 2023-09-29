// export type dataTypes = {
//   Products: {
//     productImage: string;
//     productName: string;
//     productPrice: number;
//   };
//   Shop: {
//     shopDetail: string;
//     shopImage: string;
//     shopName: string;
//   };
//   User: {
//     clubName: string;
//   };
// };

// タイプを追加
export type Product = {
  productImage: string;
  productName: string;
  productPrice: number;
};

export type ShopData = {
  Products: Product[];
  Shop: {
    shopDetail: string;
    shopImage: string;
    shopName: string;
  };
  User: {
    clubName: string;
  };
};
