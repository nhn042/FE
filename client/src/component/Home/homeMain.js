/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import ResponsiveAppBar from '../homepage/Appbar'

const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      height: '100%',
    },
    appBar: {
      top: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      'background-color': '#fff',
      borderBottom: '4px solid orange',
    },
    footer: {
      height: '10%',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'orange',
    },
    circle: {
      width: '100%',
      minHeight: '100%',
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
    content: {
      height: '92%',
      width: '100%',
      margin: 'auto',
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

const HomeMain = ({ children }) => {
    const currentLanguage = i18next.language
  
    const classes = useStyles()
    const { t } = useTranslation()
    return (
      <div className={classes.container}>
        {/* <div className={classes.footer}>
          <div className={classes.circle} />
        </div> */}
        <ResponsiveAppBar className={classes.appBar}/>
        <div className={classes.content}>
          {children}
        </div>
      </div>
    )
  }
  
  export default HomeMain
  