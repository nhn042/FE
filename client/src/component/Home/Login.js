/* eslint-disable no-param-reassign */
// import CheckboxIcon from '@atlaskit/icon/glyph/checkbox'
// import EditorCloseIcon from '@atlaskit/icon/glyph/editor/close'
import WarningIcon from "@atlaskit/icon/glyph/warning";
// import Spinner from '@atlaskit/spinner'
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
// import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@root/utils'
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import logo from "../../images/d_accel_yoko.png";
// import screenDefaultApis from '../../services/screenDefaultApis'
// import { AuthContext } from './AuthProvider'

const useStyles = makeStyles(() => ({
  loginForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "332px",
    height: "100%",
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: "192px",
  },

  loginTitle: {
    fontWeight: "600",
    fontSize: "24px",
    color: "#091E42",
    marginTop: "17px",
  },

  wordEmailField: {
    display: "flex",
    flexDirection: "column",
    marginTop: "60px",
    width: "100%",
  },

  messageCheckPass: {
    borderRadius: "0",
    position: "fixed",
    top: "0",
    width: "100%",
    background: "green",
    left: "0",
    color: "#fff",
    textAlign: "left",
    alignItems: "center",
    fontWeight: "normal",
    fontSize: "16px",
    display: "flex",
    padding: "5px 15px",
    justifyContent: "space-between",
  },

  wordEmailTitle: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#6D6E6F",
  },
  input: {
    "& > input": {
      marginTop: "13px",
      color: "#000",
      border: "1px solid #C1C7D0",
      height: "40px",
      fontSize: "14px",
      background: " #F5F5F5",
      boxSizing: "border-box",
      fontWeight: 500,
      borderRadius: "20px",
      padding: "0 10px 1px 18px",
      "&:focus": {
        border: "1px solid #FAD100",
        background: "#F5F5F5 !important",
      },
      "&:-webkit-autofill": {
        "&:focus": {
          WebkitBoxShadow: "0 0 0px 1000px #F5F5F5 inset !important",
        },
        WebkitBoxShadow: "0 0 0px 1000px #F5F5F5 inset !important",
      },
    },
    "& > select": {
      "&:-webkit-autofill": {
        "&:focus": {
          WebkitBoxShadow: "0 0 0px 1000px #F5F5F5 inset !important",
          boxShadow: "0 0 0 2px #fad10042 !important",
        },
        WebkitBoxShadow: "0 0 0px 1000px #F5F5F5 inset !important",
      },
    },
  },

  passwordField: {
    display: "flex",
    flexDirection: "column",
    marginTop: "28px",
    width: "100%",
  },
  passwordTitle: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#6D6E6F",
  },
  eyesIcon: {
    position: "absolute",
    right: "11px",
    top: "62%",
  },
  forgotPassword: {
    display: "flex",
    width: "100%",
    fontWeight: "500",
    fontSize: "14px",
    color: "#6D6E6F",
    marginTop: "10px",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.8",
      textDecoration: "underline",
    },
  },
  messSignUp: {
    marginTop: "10px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  signUp: {
    marginLeft: "10px",
    fontWeight: "500",
    fontSize: "14px",
    color: "#fad100",
    cursor: "pointer",
    "&:hover": {
      opacity: "0.8",
      textDecoration: "underline",
    },
  },
  errorMessageContainer: {
    color: '#D92929',
    fontSize: '16px',
    width: '100%',
    marginTop: '10px',
    display: 'flex',
  },
  loginButton: {
    cursor: "pointer",
    background: "linear-gradient(92.7deg, #EC6423 -20.42%, #FAD100 114.43%)",
    borderRadius: "20px",
    border: "none",
    fontWeight: 700,
    fontSize: "20px",
    display: "flex",
    width: "100%",
    justifyContent: "center",
    height: "47px",
    alignItems: "center",
    marginTop: "48px",
    transition: "opacity 0.5s",
    "&:hover": {
      opacity: "0.85",
      color: "#FFFFFF",
    },
    color: "#F0FFF0",
  },
  errorMessageContainer: {
    color: "#D92929",
    fontSize: "16px",
    width: "100%",
    marginTop: "10px",
    display: "flex",
  },
  errorMessage: {
    marginLeft: "5px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  //   const {
  //     authenticate,
  //     completeNewPasswordChallenge,
  //     showSuccessfulChangePasswordNoti,
  //     setShowSuccessfulChangePasswordNoti,
  //   } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [userAttr, setUserAttr] = useState(null);
  const [mesError, setMesError] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [buttonTitle, setButtonTitle] = useState("auth.login.loginTitle");

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const navigate = useNavigate();

  const handleClickShowPassWord = (event) => {
    event.preventDefault();
    setIsShowPassword(!isShowPassword);
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    navigate("/forgotPassword", { replace: true });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate("/signUp", { replace: true });
  };

  const handleAfterLogin = (data) => {
    // localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken.jwtToken)
    // localStorage.setItem(REFRESH_TOKEN_KEY, data.refreshToken.token)
    // const urlParams = new URLSearchParams(window.location.search)
    // if (urlParams.get('state')) {
    //   window.location.href = urlParams.get('state')
    //   console.log(window.location.href)
    // } else {
    //   screenDefaultApis
    //     .getDefaultScreen()
    //     .then(async (response) => {
    //       const path =
    //         response?.data?.raw?.path_default_screen ||
    //         response?.data?.raw?.pathDefaultScreen
    //       if (path) {
    //         window.location.href = `${window.origin}${path}`
    //       } else {
    //         window.location.href = `${window.origin}`
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //       window.location.href = `${window.origin}`
    //     })
    // }
  };

  const handleLogin = () => {
    navigate("/checkOut", { replace: true });
    // try {
    //   // e.preventDefault();
    //   axios
    //     .get(`http://localhost:8080/dictionary/${category}?query=${word}`, word)
    //     .then((res) => {
    //       console.log(res.data);
    //       if (res.status === 200) {
    //         navigate("/checkOut", { replace: true });
    //       }
    //     });
    // } catch (err) {
    //   console.log(err);
    //   setMesError(true);
    //   setIsLoading(false);
    // }
  };
  // const handleLogin = () => {
  // setIsLoading(true)
  // authenticate(email, password)
  //   .then((result) => {
  //     console.log('Logged in!')
  //     if (result.newPasswordRequired) {
  //       delete result.data.email_verified
  //       delete result.data.email
  //       setUserAttr(result.data)
  //       setLoggedInUser(result.user)
  //       setScreenMode(ScreenMode.FIRST_LOGIN)
  //       setIsLoading(false)
  //     } else {
  //       handleAfterLogin(result.data)
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //     console.log(err.code)
  //     console.error('Failed to login!')
  //     setIsLoading(false)
  //     if (err.code === 'NotAuthorizedException' || !regex.test(email)) {
  //       setErrorMessage(t('auth.login.incorrectAccountError'))
  //     } else {
  //       setErrorMessage(t('auth.login.serverError'))
  //     }
  //   })
  // };

  const handleChangePassword = () => {
    // setIsLoading(true)
    // completeNewPasswordChallenge(loggedInUser, newPassword, userAttr)
    //   .then((data) => {
    //     console.log('New password completed!')
    //     handleAfterLogin(data)
    //   })
    //   .catch((err) => {
    //     console.log('Fail to change password!')
    //     console.log(err)
    //     setIsLoading(false)
    //     if (err.code === 'InvalidPasswordException') {
    //       setErrorMessage(t('auth.login.passwordFormatError'))
    //     }
    //   })
  };

  const closeMessage = () => {
    // setShowSuccessfulChangePasswordNoti(false)
  };
  const onSubmit = (event) => {
    handleLogin();
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSuccessfulChangePasswordNoti(false)
  //   }, 4000)
  //   return () => clearTimeout(timer)
  // }, [])

  return (
    <>
      <form onSubmit={onSubmit} className={classes.loginForm}>
        <div className={classes.logoContainer}>
          <img className={classes.logo} alt="Daccel" src={logo} />
        </div>
        <span className={classes.loginTitle}>{t("auth.login.loginTitle")}</span>
        <>
          <div className={classes.wordEmailField}>
            <span className={classes.wordEmailTitle}>
              {t("auth.login.workEmailFormTitle")}
            </span>
            <Input
              onFocus={() => setErrorMessage(null)}
              required
              disabled={isLoading}
              className={classes.input}
              disableUnderline
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t("auth.login.workEmailPlaceholder")}
            />
          </div>
          <div className={classes.passwordField}>
            <span className={classes.passwordTitle}>
              {t("auth.login.passwordTitle")}
            </span>
            <Input
              onFocus={() => setErrorMessage(null)}
              required
              disabled={isLoading}
              type={isShowPassword ? "text" : "password"}
              className={classes.input}
              disableUnderline
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t("auth.login.passwordPlaceholder")}
              endAdornment={
                <InputAdornment position="end" className={classes.eyesIcon}>
                  <IconButton onClick={handleClickShowPassWord} size="small">
                    {isShowPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          <div
            onClick={handleForgotPassword}
            className={classes.forgotPassword}
          >
            {t("auth.login.forgotPassword")}
          </div>
        </>
        {errorMessage && (
          <div className={classes.errorMessageContainer}>
            {/* <WarningIcon /> */}
            <span className={classes.errorMessage}>{errorMessage}</span>
          </div>
        )}
        <button
          type="submit"
          className={classes.loginButton}
          disabled={isLoading}
          style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
        >
          {/* {isLoading ? <Spinner /> : t(buttonTitle)} */}
          {t("auth.login.loginTitle")}
        </button>
        {!mesError && (
          <div className={classes.errorMessageContainer}>
            <WarningIcon />
            <span>fail</span>
          </div>
        )}
        <div onClick={handleSignUp} className={classes.messSignUp}>
          <span
            style={{
              fontWeight: "500",
              fontSize: "14px",
              color: "#6D6E6F",
            }}
          >
            {t("auth.login.Register")}
          </span>
          <span className={classes.signUp}>{t("auth.login.signUp")} </span>
        </div>
        {/* {showSuccessfulChangePasswordNoti && (
          <div className={classes.messageCheckPass}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CheckboxIcon
                size="large"
                primaryColor="#FFFFFF"
                secondaryColor="#008000"
              />
              <span style={{ marginLeft: '5px' }}>
                {t('auth.forgotPassword.changePassSuccess')}
              </span>
            </div>
            <div>
              <button
                type="button"
                onClick={closeMessage}
                style={{
                  background: 'green',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <EditorCloseIcon primaryColor="#FFFFFF" />
              </button>
            </div>
          </div>
        )} */}
      </form>
    </>
  );
};

export default Login;
