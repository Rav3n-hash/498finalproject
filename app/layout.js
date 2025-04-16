import "./globals.css";
import NavBar from "./Components/NavBar";
import { Provider } from "./Components/MyContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <NavBar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
