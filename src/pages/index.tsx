import Link from "next/link";
import Image from "next/image";
import { useBuilds } from "./api/db";
import { useRouter } from "next/router";

export default function Home() {
  const { builds, moveToFloor } = useBuilds();
  // const router = useRouter();
  console.log(builds);

  // const moveFloor= (buildName: string )=>{
  //   router.push(${buildName})
  // }
  return (
    <>
      <div>this is top page</div>
      {/* <div>-----------------</div>
      <Link href="/shop"> link to shopPage</Link>
      <div>-----------------</div>
      <Link href="/stage"> link to stagePage</Link>
      <div>-----------------</div>
      <Link href="/live"> link to livePage</Link> */}

      {/* 画像を表示 */}
      <div>-----------------</div>
      <div style={{ overflow: "scroll", position: "relative" }}>
        <img
          src="/images/map_new.svg"
          alt="map"
          useMap="#buildMap"
          style={{
            width: 953,
            maxHeight: 1000,
            maxWidth: 1000,
            objectFit: "cover",
          }}
        />
        <map name="buildMap">
          {builds.map((build) => (
            <area
              key={"build " + build.name}
              shape="poly"
              coords={build.clickableArea}
              onClick={() => {
                moveToFloor(build.name);
                console.log("click" + build.name);
              }}
              href="#"
            />
          ))}
        </map>
      </div>
    </>
  );
}
