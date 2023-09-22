import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>this is top page</div>
      <div>-----------------</div>
      <Link href="/shop"> link to shopPage</Link>
      <div>-----------------</div>
      <Link href="/stage"> link to stagePage</Link>
      <div>-----------------</div>
      <Link href="/live"> link to livePage</Link>
    </>
  );
}
