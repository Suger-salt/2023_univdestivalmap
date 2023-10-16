import Header from "./header";
import styles from "@/styles/live.module.css";

const Live = () => {
  return (
    <>
      <Header />

      <div className={styles.text}>
        食堂では以下のスケジュールで
        <br />
        ライブが行われています！！
      </div>

      <div className="m-[1rem]">
        <img src="/images/liveSchedule.svg" />
      </div>
    </>
  );
};

export default Live;
