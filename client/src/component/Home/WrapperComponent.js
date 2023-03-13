/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    height: 'calc(100vh)',
  },
  circle: {
    width: '235%',
    minHeight: '100%',
    aspectRatio: '1/1',
    borderRadius: '50%',
    position: 'absolute',
    left: '-140%',
    background:
      'linear-gradient(140.17deg, rgba(236, 100, 35, 0.8) 28.8%, rgba(250, 209, 0, 0.69) 75.48%)',
  },

  leftPart: {
    height: '100%',
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },

  textLeft: {
    display: 'flex',
    flexDirection: 'column',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '35px',
    lineHeight: '48px',
    color: '#FAFBFC',
    zIndex: 1,
    marginBottom: 70,
  },
  dot: {
    position: 'relative',
    bottom: '-20px',
    letterSpacing: '10px',
  },
  rightPart: {
    height: '100%',
    width: '50%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  policyField: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: '20px',
    fontWeight: '500',
    fontSize: '12px',
  },
  policyInfo: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '11px',
    '& a': {
      color: '#000',
      padding: '0px 3px',
      textDecoration: 'none',
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  policyInfoItem: {
    textAlign: 'center',
  },
  company: {
    fontWeight: '500',
    fontSize: '12px',
    textAlign: 'center',
  },
}))

const WrapperComponent = ({ children }) => {
  const currentLanguage = i18next.language

  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <div className={classes.container}>
      <div className={classes.leftPart}>
        <div className={classes.circle} />
        <div className={classes.textLeft}>
          <span
            className={classes.dot}
            // style={
            //   currentLanguage === 'ja' ? { left: '113px' } : { left: '190px' }
            // }
          >
            {t('auth.title')}
          </span>
        </div>
      </div>
      <div className={classes.rightPart}>
        {children}
        <div className={classes.policyField}>
          <div className={classes.policyInfo}>
                  aa
          </div>
          <span className={classes.company}>
            2022 © Ricksoft Co., Ltd. All Rights Reserved.
          </span>
        </div>
      </div>
    </div>
  )
}

export default WrapperComponent
