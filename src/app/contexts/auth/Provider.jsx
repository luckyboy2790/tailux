// Import Dependencies
import { useCallback, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { DateTime } from "luxon";

// Local Imports
import axios from "utils/axios";
import { AuthContext } from "./context";
import { useCookies } from "react-cookie";
import { toast } from "sonner";

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  errorMessage: null,
  user: null,
};

const reducerHandlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  LOGIN_REQUEST: (state) => {
    return {
      ...state,
      isLoading: true,
    };
  },

  LOGIN_SUCCESS: (state, action) => {
    const { user } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user,
    };
  },

  LOGIN_ERROR: (state, action) => {
    const { errorMessage } = action.payload;

    return {
      ...state,
      errorMessage,
      isLoading: false,
    };
  },

  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
};

const reducer = (state, action) => {
  const handler = reducerHandlers[action.type];
  if (handler) {
    return handler(state, action);
  }
  return state;
};

export function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [state, dispatch] = useReducer(reducer, initialState);

  const logout = useCallback(() => {
    try {
      dispatch({ type: "LOGOUT" });
      removeCookie("authToken", { path: "/" });
      delete axios.defaults.headers.common.Authorization;
    } catch (err) {
      console.error(err);
    }
  }, [removeCookie]);

  useEffect(() => {
    const init = async () => {
      const path = window.location.pathname;
      const route = path.split("/")[1];

      try {
        const { data } = await axios.get("/api/site_setting/status");

        if (data.data === "disabled") {
          if (route !== "activate" && route !== "disabled") {
            logout();
            window.location.replace("/disabled");
            return;
          }

          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: false, user: null },
          });

          return;
        }
      } catch (err) {
        console.error("Failed to fetch site status", err);
        return;
      }

      const token = cookies.authToken;
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        try {
          const { data } = await axios.get("/api/auth/user/profile");

          dispatch({
            type: "INITIALIZE",
            payload: { isAuthenticated: true, user: data },
          });
        } catch {
          logout();
        }
      } else {
        if (route !== "login" && route !== "qr" && route !== "verification") {
          window.location.replace("/login");

          return;
        }

        dispatch({
          type: "INITIALIZE",
          payload: { isAuthenticated: false, user: null },
        });
      }
    };

    init();
  }, [cookies.authToken, logout]);

  const login = async ({ username, password }) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const { data } = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const { authToken, user, expires_in } = data;

      if (user?.role === "secretary") {
        const { data } = await axios.get("/api/site_setting/disable_time");

        const disabledTimes = JSON.parse(data.data);

        const nowBogota = DateTime.now().setZone("America/Bogota");
        const nowMinutes = nowBogota.hour * 60 + nowBogota.minute;

        console.log(nowBogota.toString(), nowMinutes);

        for (const { start, end } of disabledTimes) {
          const [startH, startM] = start.split(":").map(Number);
          const [endH, endM] = end.split(":").map(Number);

          const startMinutes = startH * 60 + startM;
          const endMinutes = endH * 60 + endM;

          let inRange = false;

          if (endMinutes > startMinutes) {
            inRange = nowMinutes >= startMinutes && nowMinutes <= endMinutes;
          } else {
            inRange = nowMinutes >= startMinutes || nowMinutes <= endMinutes;
          }

          if (inRange) {
            toast.error("The site is disabled, please try to login later.");

            return;
          }
        }
      }

      const queryParams = new URLSearchParams(window.location.search);
      const redirect = queryParams.get("redirect");

      if (user?.enable_google2fa && user?.google2fa_secret) {
        localStorage.setItem("pending2FAUser", JSON.stringify(user));
        localStorage.setItem(
          "pendingUserToken",
          JSON.stringify({ authToken, expires_in }),
        );

        const verificationURL = redirect
          ? `/verification?redirect=${encodeURIComponent(redirect)}`
          : "/verification";

        window.location.href = verificationURL;
        return;
      } else if (!user?.google2fa_secret && user?.enable_google2fa) {
        localStorage.setItem("pending2FAUser", JSON.stringify(user));
        localStorage.setItem(
          "pendingUserToken",
          JSON.stringify({ authToken, expires_in }),
        );

        const qrURL = redirect
          ? `/qr?redirect=${encodeURIComponent(redirect)}`
          : "/qr";

        window.location.href = qrURL;
        return;
      } else {
        setCookie("authToken", authToken, {
          path: "/",
          maxAge: expires_in,
        });

        axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;

        dispatch({ type: "LOGIN_SUCCESS", payload: { user } });
      }
    } catch (err) {
      console.log(err);

      dispatch({
        type: "LOGIN_ERROR",
        payload: { errorMessage: err.error },
      });
    }
  };

  const checkOTP = async ({ one_time_password, google2fa_secret, user }) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const response = await axios.post("/api/auth/2fa", {
        one_time_password,
        google2fa_secret,
      });

      if (response.status !== 200) {
        dispatch({
          type: "LOGIN_ERROR",
          payload: { errorMessage: "Invalid OTP" },
        });

        return;
      }

      const { authToken, expires_in } = JSON.parse(
        localStorage.getItem("pendingUserToken"),
      );

      setCookie("authToken", authToken, {
        path: "/",
        maxAge: expires_in,
      });

      axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;

      dispatch({ type: "LOGIN_SUCCESS", payload: { user } });

      localStorage.removeItem("pending2FAUser");
      localStorage.removeItem("pendingUserToken");
    } catch (err) {
      console.log(err);

      dispatch({
        type: "LOGIN_ERROR",
        payload: { errorMessage: err.error },
      });
    }
  };

  if (!children) {
    return null;
  }

  return (
    <AuthContext
      value={{
        ...state,
        login,
        checkOTP,
        logout,
      }}
    >
      {children}
    </AuthContext>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
