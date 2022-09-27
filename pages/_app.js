import { SessionProvider } from "next-auth/react";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
function MyApp({ Component, pageProps, session }) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
