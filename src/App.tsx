import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import React from "react";
import AssetReport from "./pages/Report/AssetReport";
import LayoutMarketWatch from "./components/layoutMarketwat/LayoutMarketWatch";
import Menu from "./pages/Report/Menu";
import ListMenuApp from "./pages/Report/ListMenu";
function App() {
  const { t } = useTranslation(["home", "report"]);
  return (
    <div>
  
      <Routes>
        <Route path="/" element={<LayoutMarketWatch />} >
          <Route path=":id" element={<LayoutMarketWatch />} />
        </Route>
      {/* <Route path="/services" element={<AssetReport />} > 
          <Route path=":id" element={<AssetReport />} />
      </Route> */}
      <Route path="/menu" element={<ListMenuApp />} > 
          <Route path=":id" element={<ListMenuApp />} />
      </Route>
        {/* <Route path="/marketwatch-hsx" element={<HSXMarketWatch />} />
        <Route path="/marketwatch-vn30" element={<VN30MarketWatch />} />
        <Route path="/marketwatch-hnx30" element={<HNX30MarketWatch />} />
     
        {/* <Route path="/HNI" element={<HNIMarketWatch />} />
        <Route path="/Table" element={<LayoutMarketWatch />} /> */}
        {/* <Route path="/hnx" element={<IndexMarketW/>}/> */}
      </Routes>
      {/* <IndexMarketW/> */}
    </div>
  );
}

export default App;
