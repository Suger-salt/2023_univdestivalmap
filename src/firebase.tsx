// 認証に必要な要素をインポート
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth"; // セッションの設定をインポート
import { getStorage } from "firebase/storage";

// Firebase と連携するための情報
// .envファイルで設定した環境変数をfirebaseConfigに入れる
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_APIKEY,
//   authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
//   projectId: process.env.NEXT_PUBLIC_PROJECTID,
//   storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
//   appId: process.env.NEXT_PUBLIC_APPID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyC7Pok-y3G_4C668wHclhbrLbBKDWdNroE",
  authDomain: "univfestival-98bae.firebaseapp.com",
  projectId: "univfestival-98bae",
  storageBucket: "univfestival-98bae.appspot.com",
  messagingSenderId: "283242507809",
  appId: "1:283242507809:web:561762f8adca4802f43d60",
  measurementId: "G-K00BEV2J62",
};

//  Firebase がすでに初期化されているかチェックして、初期化されていない場合初期化をする関数
if (!getApps()?.length) {
  initializeApp(firebaseConfig);
}

// Firebase の認証と Firebase のデータベースを初期化してエクスポート
// const auth = getAuth();
// export default auth;
export const db = getFirestore();
export const storage = getStorage();
