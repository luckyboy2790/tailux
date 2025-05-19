// Import Dependencies
import { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

// Local Imports
import axios from "utils/axios";
import { AuthContext } from "./context";
import { useCookies } from "react-cookie";

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
  const [cookies, setCookie, removeCookie] = useCookies(["authToken"]);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const init = async () => {
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
        dispatch({
          type: "INITIALIZE",
          payload: { isAuthenticated: false, user: null },
        });
      }
    };

    init();
  }, [cookies.authToken]);

  const login = async ({ username, password }) => {
    dispatch({ type: "LOGIN_REQUEST" });

    try {
      const { data } = await axios.post("/api/auth/login", {
        username,
        password,
      });

      const { authToken, user, expires_in } = data;

      if (user?.enable_google2fa) {
        localStorage.setItem("pending2FAUser", JSON.stringify(user));
        localStorage.setItem(
          "pendingUserToken",
          JSON.stringify({ authToken, expires_in }),
        );
        window.location.href = "/verification";
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

      console.log(response);

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

      console.log(authToken, expires_in);

      setCookie("authToken", authToken, {
        path: "/",
        maxAge: expires_in,
      });

      axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;

      dispatch({ type: "LOGIN_SUCCESS", payload: { user } });

      localStorage.removeItem("pending2FAUser");
      localStorage.removeItem("pendingUserToken");

      window.location.href = "/";
    } catch (err) {
      console.log(err);

      dispatch({
        type: "LOGIN_ERROR",
        payload: { errorMessage: err.error },
      });
    }
  };

  const logout = () => {
    removeCookie("authToken");
    delete axios.defaults.headers.common.Authorization;
    dispatch({ type: "LOGOUT" });
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
