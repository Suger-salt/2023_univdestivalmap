import Header from "./header";
import styles from "@/styles/live.module.css";

const Live = () => {
  return (
    <>
      <Header />

      <div className="">
        <img src="/images/liveSchedule.svg" />
      </div>
      {/* <div className={styles.text}>
        食堂では以下のスケジュールで
        <br />
        ライブが行われています！！
      </div> */}
    </>
  );
};

export default Live;
