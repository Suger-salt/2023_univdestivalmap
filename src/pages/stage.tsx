import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./header";
import styles from "@/styles/stage.module.css";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent, {
  timelineContentClasses,
} from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Components } from "@mui/material/styles";
import { get } from "http";
import { background } from "@chakra-ui/react";

declare module "@mui/material/styles" {
  interface Components {
    MuiTimeline?: {
      styleOverrides?: {
        root?: {
          minHeight?: string;
          padding?: string;
          "&:before"?: {
            display?: string;
          };
        };
      };
    };
    MuiTimelineDot?: {
      styleOverrides?: {
        root?: {
          borderColor?: string;
        };
      };
    };
  }
}

const schedules: ScheduleData = {
  button1: [
    { time: "09:45", event: "開会式", startTime: 9 * 60 + 45 },
    {
      time: "10:00",
      event: "バラバラアンサー",
      startTime: 10 * 60,
    },
    { time: "11:00", event: "手話コーラス ", startTime: 11 * 60 },
    { time: "11:30", event: "休憩", startTime: 11 * 60 + 30 },
    { time: "01:00", event: "川口春奈 トークショー", startTime: 13 * 60 },
    { time: "03:30", event: "アカペラサークル", startTime: 15 * 60 + 30 },
    { time: "04:30", event: "イントロクイズ", startTime: 16 * 60 + 30 },
  ],
  button2: [
    {
      time: "10:00",
      event: "ファイブリーグ",
      startTime: 10 * 60,
    },
    { time: "11:00", event: "箱の中身はなんだろな", startTime: 11 * 60 },
    { time: "12:00", event: "休憩", startTime: 12 * 60 },
    { time: "12:30", event: "青年の主張", startTime: 12 * 60 + 30 },
    { time: "01:30", event: "休憩", startTime: 13 * 60 + 30 },
    { time: "02:00", event: "お笑い芸人ライブ", startTime: 14 * 60 },
    { time: "03:00", event: "ダンスサークル", startTime: 15 * 60 },
    { time: "04:30", event: "後夜祭", startTime: 16 * 60 + 30 },
  ],
};

interface Event {
  time: string;
  event: string;
  startTime: number;
}

interface ScheduleData {
  button1: Event[];
  button2: Event[];
}

// 現在時間フン
const getCurrentTimeInMinutes = () => {
  const japanTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Tokyo",
  });
  const timeArray = japanTime.split(", ")[1].split(":");
  const currentHour = parseInt(timeArray[0]);
  const currentMinute = parseInt(timeArray[1]);
  console.log(currentHour * 60 + currentMinute);
  // return currentHour * 60 + currentMinute;
  return 11 * 60 + 30;
};

const getActiveEventIndex = (currentTime: number, events: Event[]) => {
  for (let i = 0; i < events.length; i++) {
    const event = events[i];
    const startTime = event.startTime;
    const endTime =
      i < events.length - 1 ? events[i + 1].startTime : event.startTime + 60; // 次のイベントの開始時刻を取得（なければ現在のイベントの終了時刻+60分）

    if (currentTime >= startTime && currentTime < endTime) {
      return i;
    }
  }

  return -1;
};

const Stage = () => {
  const [selectedImage, setSelectedImage] = useState("21sche.svg");
  const [opacity, setOpacity] = useState(0); // 透明度を0から始める
  const [activeButton, setActiveButton] = useState<"button1" | "button2">(
    "button1"
  );
  // 現在時刻フン
  const [currentTime, setCurrentTime] = useState(getCurrentTimeInMinutes());

  const theme = createTheme({
    components: {
      MuiTimelineItem: {
        styleOverrides: {
          root: {},
        },
      },
      MuiTimelineDot: {
        styleOverrides: {
          root: {
            borderColor: "#FABB91",
          },
        },
      },
    },
  });

  useEffect(() => {
    // 透明度を徐々に増加させる処理
    const increaseOpacity = () => {
      if (opacity < 1) {
        setOpacity((prevOpacity) => prevOpacity + 0.1); // 0.1ずつ透明度を増加
      }
    };
    // インターバルをクリアする関数
    let interval: NodeJS.Timeout;
    if (activeButton == "button1" || activeButton == "button2") {
      interval = setInterval(increaseOpacity, 100); // 100ミリ秒ごとに透明度を増加
    }
    return () => {
      clearInterval(interval);
    };
  }, [activeButton]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTimeInMinutes);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleImageClick = (
    imageName: string,
    buttonType: "button1" | "button2"
  ) => {
    setSelectedImage(imageName);
    setOpacity(0);
    setActiveButton(buttonType as "button1" | "button2");
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <div className={styles.container}>
          <img src="/images/mike.svg" className={styles.leftImage} />
          <div className={`text ${styles.title}`}>
            ステージ
            <br />
            スケジュール
          </div>
          <div className={`flex ${styles.imageContainer}`}>
            {Object.keys(schedules).map((buttonType) => (
              <div
                key={buttonType}
                onClick={() =>
                  handleImageClick(
                    "21sche.svg",
                    buttonType as "button1" | "button2"
                  )
                }
                className={` ${
                  styles.text
                } border-2 border-black m-[4px] text-center w-[32vw] ${
                  activeButton === buttonType ? "bg-[#FABB91]" : ""
                }`}
                style={{
                  borderRadius:
                    buttonType === "button1"
                      ? "30px 0 0 30px"
                      : "0 30px 30px 0",
                }}
              >
                {buttonType === "button1" ? "21日 (土)" : "22日 (日)"}
              </div>
            ))}
          </div>

          <div style={{ opacity: opacity }}>
            <Timeline>
              {schedules[activeButton].map((item, index) => {
                const activeEventIndex = getActiveEventIndex(
                  currentTime,
                  schedules[activeButton]
                );
                console.log(activeEventIndex);

                return (
                  <TimelineItem key={index} className={styles.timelineItem}>
                    <TimelineOppositeContent
                      style={{
                        fontSize: "20px",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {item.time}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot
                        className={styles.timelineDot}
                        variant={
                          index === activeEventIndex ? "filled" : "outlined"
                        }
                        color={
                          index === activeEventIndex ? "primary" : "inherit"
                        }
                        style={{
                          background:
                            index === activeEventIndex ? "#FABB91" : "white",
                        }}
                      />
                      {index < schedules[activeButton].length - 1 && (
                        <TimelineConnector />
                      )}
                    </TimelineSeparator>
                    <TimelineContent
                      className={styles.timelineContent}
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {item.event}
                    </TimelineContent>
                  </TimelineItem>
                );
              })}
            </Timeline>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Stage;
