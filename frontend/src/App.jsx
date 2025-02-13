import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { NotFound } from "./pages/NotFound.jsx";
import { Login } from "./pages/Login.jsx";
import React from "react";
import { Balance } from "./pages/Balance.jsx";
import ConfigProvider from "antd/es/config-provider";
import { COLORS } from "./constants/colors.js";

function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: COLORS.GREEN,
              headerBg: COLORS.BACKGROUND,
              colorText: COLORS.GREEN,
              colorTextHeading: COLORS.WHITE,
              fontSize: 12,
              cellPaddingInline: 8,
              cellPaddingBlock: 14,
              colorBgContainer: COLORS.GREY,
            },
          },
          token: {
            colorText: COLORS.GREEN,
            colorWarning: COLORS.GREEN,
            lineWidth: 2,
          },
        }}
      >
        <div className="h-screen w-screen flex justify-center items-center bg-bg-menu">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </ConfigProvider>
    </>
  );
}

export default App;
