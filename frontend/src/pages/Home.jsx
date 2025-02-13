import React from "react";
import { VerticalNavBar } from "../components/layouts/VerticalNavBar.jsx";

export function Home() {
  return (
    <VerticalNavBar
      buttons={[
        { text: "Balance", href: "/balance" },
        { text: "Apuestas", href: "/bets" },
      ]}
    ></VerticalNavBar>
  );
}
