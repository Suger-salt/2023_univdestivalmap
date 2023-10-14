import React, { useState, useEffect } from "react";
import Header from "./header";
import styles from "@/styles/stage.module.css"; // スタイルシートのインポート

const Stage = () => {
  const [selectedImage, setSelectedImage] = useState("21sche.svg");
  const [opacity, setOpacity] = useState(0); // 透明度を0から始める

  useEffect(() => {
    // 透明度を徐々に増加させる処理
    const increaseOpacity = () => {
      if (opacity < 1) {
        setOpacity((prevOpacity) => prevOpacity + 0.1); // 0.1ずつ透明度を増加
      }
    };

    // ボタンが押されたら透明度を増加させる処理を実行
    const interval = setInterval(increaseOpacity, 100); // 100ミリ秒ごとに透明度を増加

    // コンポーネントがアンマウントされたときにクリーンアップ
    return () => {
      clearInterval(interval);
    };
  }, [selectedImage]); // selectedImageが変化したときのみ実行

  const handleImageClick = (imageName: string) => {
    // 画像を切り替える
    setSelectedImage(imageName);
    setOpacity(0); // 透明度をリセット
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <img src="/images/mike.svg" className={styles.leftImage} />
        <div className={`text ${styles.text}`}>
          ステージ
          <br />
          スケジュール
        </div>
        <div className={`flex ${styles.imageContainer}`}>
          <img
            className=""
            src="/images/21.svg"
            onClick={() => handleImageClick("21sche.svg")}
          />
          <img
            src="/images/22.svg"
            onClick={() => handleImageClick("22sche.svg")}
          />
        </div>

        {selectedImage && (
          <img
            className={`${styles.selectedImage}`}
            src={`/images/${selectedImage}`}
            alt="selected"
            style={{ opacity: opacity }} // 透明度をスタイル属性で設定
          />
        )}
      </div>
    </>
  );
};

export default Stage;
