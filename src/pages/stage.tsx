import React, { useState, useEffect } from "react";
import Header from "./header";
import styles from "@/styles/stage.module.css"; // スタイルシートのインポート

const Stage = () => {
  const [selectedImage, setSelectedImage] = useState("21sche.svg");
  const [opacity, setOpacity] = useState(0); // 透明度を0から始める
  const [activeButton, setActiveButton] = useState("button1"); // クリックされているボタンの状態を管理

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

  const handleImageClick = (imageName: string, buttonType: string) => {
    // 画像を切り替える
    setSelectedImage(imageName);
    setOpacity(0); // 透明度をリセット
    setActiveButton(buttonType); // クリックされたボタンの状態を設定
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <img src="/images/mike.svg" className={styles.leftImage} />
        <div className={`text ${styles.title}`}>
          ステージ
          <br />
          スケジュール
        </div>
        <div className={`flex ${styles.imageContainer}`}>
          <div
            onClick={() => handleImageClick("21sche.svg", "button1")}
            className={` ${
              styles.text
            } border-2 border-black m-[4px] text-center w-[32vw] ${
              activeButton === "button1" ? "bg-[#FABB91]" : ""
            }`}
            style={{ borderRadius: "30px 0 0 30px" }}
          >
            21日 (土)
          </div>

          <div
            onClick={() => handleImageClick("22sche.svg", "button2")}
            className={` ${
              styles.text
            } border-2 border-black m-[4px] text-center w-[32vw] ${
              activeButton === "button2" ? "bg-[#FABB91]" : ""
            }`}
            style={{ borderRadius: "0 30px 30px 0" }}
          >
            22日 (日)
          </div>
        </div>

        {selectedImage && (
          <img
            className={`${styles.selectedImage} w-[80vw] `}
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
