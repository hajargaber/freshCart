import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite.min.js";
import CounterContextprovider from "./components/Context/counterContext";
import TokenContextProvider from "./components/Context/tokenContext.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cart from "./components/Cart/Cart.jsx";
import CartContextProvider from "./components/Context/cartContext";
import WishlistContextProvider from "./components/Context/wishContext.jsx";
createRoot(document.getElementById("root")).render(
<StrictMode>
  <TokenContextProvider>
    <CartContextProvider>
      <CounterContextprovider>
        <WishlistContextProvider>  
          <App />
        </WishlistContextProvider>
      </CounterContextprovider>
    </CartContextProvider>
  </TokenContextProvider>
</StrictMode>

);
