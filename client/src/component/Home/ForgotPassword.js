/* eslint-disable no-unused-vars */
// import WarningIcon from '@atlaskit/icon/glyph/warning'
// import Spinner from '@atlaskit/spinner'
import { IconButton, InputAdornment } from '@material-ui/core'
import Input from '@material-ui/core/Input'
import { makeStyles } from '@material-ui/core/styles'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import i18next from 'i18next'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/d_accel_yoko.png'
// import { AuthContext } from './AuthProvider'

const ScreenMode = {
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
}

const useStyles = makeStyles(() => ({
  forgotPasswordForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '364px',
    height: '100%',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    width: '200px',
  },

  formTitle: {
    fontWeight: '600',
    fontSize: '24px',
    color: '#091E42',
    marginTop: '16px',
  },
  forgotPasswordField: {
    display: 'flex',
    flexDirection: 'column',
    width: '97.5%',
    marginTop: '26px',
  },
  messageContainer: {
    marginTop: '59px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  message: {
    fontWeight: '400',
    fontSize: '14px',
    color: '#8E8E8E',
    textAlign: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: '16px',
    color: '#6D6E6F',
  },
  codeField: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '34px',
    width: '91.2%',
  },
  newPasswordField: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '28px',
    width: '91.2%',
  },
  input: {
    '& > input': {
      marginTop: '13px',
      color: '#000',
      border: ' 1px solid #C1C7D0',
      height: '40px',
      fontSize: '14px',
      background: ' #F5F5F5',
      boxSizing: 'border-box',
      fontWeight: 500,
      borderRadius: '20px',
      padding: '0 10px 1px 18px',
      '-webkitBoxShadow': '0 0 0px 1000px #F5F5F5 inset',
      '&:focus': {
        border: '1px solid #FAD100',
      },
      '&:-webkit-autofill': {
        '&:focus': {
          WebkitBoxShadow: '0 0 0px 1000px #F5F5F5 inset !important',
        },
        WebkitBoxShadow: '0 0 0px 1000px #F5F5F5 inset !important',
      },
    },
    '& > select': {
      '&:-webkit-autofill': {
        '&:focus': {
          WebkitBoxShadow: '0 0 0px 1000px #F5F5F5 inset !important',
        },
        WebkitBoxShadow: '0 0 0px 1000px #F5F5F5 inset !important',
      },
    },
  },
  eyesIcon: {
    position: 'absolute',
    right: '11px',
    top: '62%',
  },
  backToLogIn: {
    display: 'flex',
    fontWeight: '500',
    fontSize: '14px',
    marginTop: '36px',
    color: '#8E8E8E',
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': {
      opacity: '0.8',
    },
  },

  modalTitle: {
    fontSize: '18px',
    fontWeight: '650',
    display: 'flex',
    alignItems: 'center',
  },

  notification: {
    fontSize: '14px',
    fontWeight: 400,
    marginTop: '34px',
    color: '#8E8E8E',
    display: 'flex',
    flexDirection: 'column',
    '& span': {
      textAlign: 'center',
    },
  },
  formBtn: {
    cursor: 'pointer',
    background: 'linear-gradient(92.7deg, #EC6423 -20.42%, #FAD100 114.43%)',
    borderRadius: '20px',
    border: 'none',
    fontWeight: 700,
    fontSize: '20px',
    display: 'flex',
    justifyContent: 'center',
    height: '47px',
    alignItems: 'center',
    marginTop: '24px',
    transition: 'opacity 0.5s',
    '&:hover': {
      opacity: '0.85',
      color: '#FFFFFF',
    },
    color: '#F0FFF0',
  },
  errorMessageContainer: {
    color: 'red',
    fontSize: '16px',
    width: '100%',
    marginTop: '10px',
    display: 'flex',
  },
  errorMessage: {
    marginLeft: '5px',
    color: '#D92929',
  },
}))
const ForgotPassword = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  // const {
  //   forgotPassword,
  //   confirmPassword,
  //   setShowSuccessfulChangePasswordNoti,
  // } = useContext(AuthContext)
  const navigate = useNavigate()
  const currentLanguage = i18next.language

  const [screenMode, setScreenMode] = useState(ScreenMode.FORGOT_PASSWORD)
  const [email, setEmail] = useState('')
  const [verifiedCode, setVerifiedCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [checkMail, setcheckMail] = useState(true)
  const [destination, setDestination] = useState('')
  const [errorForgotMessage, setErrorForgotMessage] = useState(null)
  const [errorChangeMessage, setErrorChangeMessage] = useState(null)
  const [isShowPassword, setIsShowPassword] = useState(false)

  const handleClickShowPassWord = (event) => {
    event.preventDefault()
    setIsShowPassword(!isShowPassword)
  }
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const handleConfirmPassword = (event) => {
    // event.preventDefault()
    // setIsLoading(true)
    // confirmPassword(email, verifiedCode, newPassword)
    //   .then((data) => {
    //     setIsLoading(false)
    //     setShowSuccessfulChangePasswordNoti(true)
    //     navigate('/login', { replace: true })
    //   })
    //   .catch((error) => {
    //     if (
    //       error.code === 'CodeMismatchException' ||
    //       'InvalidParameterException'
    //     ) {
    //       setErrorChangeMessage(t('auth.forgotPassword.invalidCodeError'))
    //     }
    //     if (error.code === 'InvalidPasswordException') {
    //       setErrorChangeMessage(t('auth.login.passwordFormatError'))
    //     }
    //     if (error.code === 'LimitExceededException') {
    //       setErrorChangeMessage(t('auth.forgotPassword.limitTimeError'))
    //     }
    //   })
    //   .finally(() => setIsLoading(false))
  }

  const handleResetPassword = (event) => {
    // event.preventDefault()
    // setIsLoading(true)
    // forgotPassword(email)
    //   .then((data) => {
    //     if (regex.test(email) === true) {
    //       setScreenMode(ScreenMode.CHANGE_PASSWORD)
    //     } else {
    //       setcheckMail(true)
    //     }
    //     setDestination(data.CodeDeliveryDetails.Destination)
    //     setIsLoading(false)
    //   })
    //   .catch((err) => {
    //     console.log(err)

    //     if (err.code === 'LimitExceededException') {
    //       setErrorForgotMessage(t('auth.forgotPassword.limitTimeError'))
    //     }
    //   })
    //   .finally(() => setIsLoading(false))
  }

  const backToLogIn = (event) => {
    event.preventDefault()
    navigate('/login', { replace: true })
  }

  const handleOnchangeEmail = (event) => {
    setEmail(event.target.value)
    setcheckMail(false)
  }

  const onSubmit =
    screenMode === ScreenMode.FORGOT_PASSWORD
      ? handleResetPassword
      : handleConfirmPassword

  return (
    <form onSubmit={onSubmit} className={classes.forgotPasswordForm}>
      <div className={classes.logoContainer}>
        <img className={classes.logo} alt="Daccel" src={logo} />
      </div>

      {screenMode === ScreenMode.FORGOT_PASSWORD && (
        <>
          <span className={classes.formTitle}>
            {t('auth.forgotPassword.forgotPasswordTitle')}
          </span>
          <div className={classes.messageContainer}>
            <span className={classes.message}>
              {t('auth.forgotPassword.message1')}
            </span>
            <span className={classes.message}>
              {t('auth.forgotPassword.message2')}
            </span>
          </div>
          <div className={classes.forgotPasswordField}>
            <span className={classes.title}>
              {t('auth.forgotPassword.emailTitle')}
            </span>
            <Input
              required
              className={classes.input}
              disabled={isLoading}
              disableUnderline
              value={email}
              onChange={handleOnchangeEmail}
              placeholder={t('auth.login.workEmailPlaceholder')}
            />
            {checkMail && regex.test(email) === false && email !== '' && (
              <span className={classes.errorMessageContainer}>
                {/* <WarningIcon /> */}
                <span className={classes.errorMessage}>
                  {t('auth.forgotPassword.checkEmail')}
                </span>
              </span>
            )}
          </div>

          {errorForgotMessage && (
            <div className={classes.errorMessageContainer}>
              {/* <WarningIcon /> */}
              <span className={classes.errorMessage}>{errorForgotMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className={classes.formBtn}
            disabled={isLoading}
            style={{
              cursor: isLoading ? 'not-allowed' : 'pointer',
              width: '97.5%',
              marginTop: '24px',
            }}
          >
            {t('auth.forgotPassword.continue')}
            {/* {isLoading ? <Spinner /> : t('auth.forgotPassword.continue')} */}
          </button>
          <span onClick={backToLogIn} className={classes.backToLogIn}>
            {t('auth.forgotPassword.backLogIn')}
          </span>
        </>
      )}
      {screenMode === ScreenMode.CHANGE_PASSWORD && (
        <>
          <span className={classes.formTitle}>
            {t('auth.forgotPassword.changePassword')}
          </span>
          <div className={classes.notification}>
            {currentLanguage === 'ja' ? (
              <>
                <span>
                  {destination} {t('auth.forgotPassword.notificationSentMail1')}
                </span>
                <span>{t('auth.forgotPassword.notificationSentMail2')}</span>
              </>
            ) : (
              <>
                <span>
                  {t('auth.forgotPassword.notificationSentMail1')} {destination}
                </span>
                <span>{t('auth.forgotPassword.notificationSentMail2')}</span>
              </>
            )}
          </div>
          <div className={classes.codeField}>
            <span className={classes.title}>
              {t('auth.forgotPassword.code')}
            </span>
            <Input
              required
              className={classes.input}
              disabled={isLoading}
              disableUnderline
              value={verifiedCode}
              onChange={(event) => setVerifiedCode(event.target.value)}
              placeholder={t('auth.forgotPassword.code')}
            />
          </div>
          <div className={classes.newPasswordField}>
            <span className={classes.title}>
              {t('auth.forgotPassword.newPassword')}
            </span>
            <Input
              required
              className={classes.input}
              disabled={isLoading}
              disableUnderline
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder={t('auth.forgotPassword.newPasswordPlaceholder')}
              type={isShowPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end" className={classes.eyesIcon}>
                  <IconButton onClick={handleClickShowPassWord} size="small">
                    {isShowPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>
          {errorChangeMessage && (
            <div className={classes.errorMessageContainer}>
              {/* <WarningIcon /> */}
              <span className={classes.errorMessage}>{errorChangeMessage}</span>
            </div>
          )}
          <button
            type="submit"
            className={classes.formBtn}
            disabled={isLoading}
            style={{
              cursor: isLoading ? 'not-allowed' : 'pointer',
              width: '91.2%',
              marginTop: '31px',
            }}
          >
            {/* {isLoading ? <Spinner /> : t('auth.forgotPassword.save')} */}
          </button>
        </>
      )}
    </form>
  )
}

export default ForgotPassword
