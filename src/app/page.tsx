"use client";

import { RecoilRoot, useRecoilState } from "recoil";
import Main from "./components/Main/page";

export default function Home() {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  );
}
