import { useState, useEffect, useMemo } from "react";
import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "./firebase";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase";
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// react-router components
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme"
import routes from "routes";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logos/logo2.png";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const navigate = useNavigate()
  const isToken = localStorage.getItem('token')
  useEffect(() => {
    if (isToken == null) {
      navigate('/login')
    }
  }, [])

  useEffect(() => {
    const getFCMToken = async () => {
      const messaging = getMessaging();
      getToken(messaging, { vapidKey: 'BFoNQjIbGWBwD1ta5iObFy3D5F61sVcjrbw8aUYHALmzmbaNTjUabGIr03vR1yTF-ByTEwPV9tDXSlqIKpzC-Ps' }).then((currentToken) => {
        if (currentToken) {
          console.log("FCM Token from React Component:", currentToken);
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });
      // try {
      //   console.log("Firebase token function...");
      //   const currentToken = await messaging.getToken({
      //     vapidKey: `BFoNQjIbGWBwD1ta5iObFy3D5F61sVcjrbw8aUYHALmzmbaNTjUabGIr03vR1yTF-ByTEwPV9tDXSlqIKpzC-Ps`,
      //   });

      //   if (currentToken) {
      //     console.log("FCM Token from React Component:", currentToken);
      //     // Send the token to your server for further handling
      //   } else {
      //     console.log("No registration token available.");
      //   }
      // } catch (error) {
      //   console.error("Error getting FCM token:", error);
      // }
    };

    getFCMToken();

  }, [])

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Thali App"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />

          {configsButton}
        </>
      )}

      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
