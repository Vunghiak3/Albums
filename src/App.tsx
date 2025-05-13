import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes } from "./routes";
import Header from "./components/Header/Header";
import styles from "./App.module.css";
import MenuBar from "./components/MenuBar/MenuBar";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/albums" replace />} />
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <div className={styles.wrapper}>
                    {isMobile && showMenu && (
                      <div
                        className={styles.overlay}
                        onClick={() => setShowMenu(false)}
                      ></div>
                    )}
                    {!isMobile ? (
                      <MenuBar className={styles.menuBar} />
                    ) : (
                      <>
                        <button
                          className={styles.buttonMenu}
                          onClick={() => setShowMenu(!showMenu)}
                        >
                          <div>
                            <FontAwesomeIcon
                              icon={faListUl}
                              className={styles.icon}
                            />
                          </div>
                        </button>
                        <MenuBar
                          className={`${styles.showMenuBar} ${
                            showMenu && styles.menuBarActive
                          }`}
                          onLinkClick={() => setShowMenu(false)}
                        />
                      </>
                    )}

                    <main className={styles.container}>
                      <Header />
                      <div className={styles.wrapperPage}>
                        <Page />
                      </div>
                    </main>
                  </div>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
