/* eslint-disable no-underscore-dangle, no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Tooltip, { TooltipPrimitive } from '@atlaskit/tooltip'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'
import { v4 as uuidv4 } from 'uuid'
import { LogginCheckStatus } from '@root/utils'
import { actions } from '../../redux'
import pin from '../../images/pin.svg'
import unpin from '../../images/unpin.svg'
import ProjectContentLoader from '../sitelist/components/ProjectContentLoader'
import { ViewTypeComponent } from '../sitelist/SiteList'
import { AuthContext } from '../AuthPages/AuthProvider'

const InlineDialog = styled(TooltipPrimitive)`
  background: #253858;
  color: #fff;
  border-radius: 4px;
  box-sizing: content-box;
  padding: 2px 7px 3px;
  font-size: 12px;
`

const useStyles = makeStyles(() => ({
  main: {
    display: 'block',
    width: '100%',
    marginTop: '10rem',
    padding: '0 5rem',
    color: '#303952',
  },
  listContent: {
    width: '95%',
    margin: '2rem auto',
    marginBottom: '0',
  },
  listCard: {
    width: '90%',
    margin: '2rem auto',
    marginBottom: '0',
    borderRadius: '1rem',
    backgroundColor: 'whitesmoke',
    height: '400px',
    padding: '2rem 0',
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    visibility: 'hidden',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#10e810',
  },
  pinIcon: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    visibility: 'hidden',
    width: '30px',
    height: '30px',
    boxSizing: 'border-box',
    padding: '2px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      border: '1px solid transparent',
      borderRadius: '50%',
      backgroundColor: 'rgba(95,99,104,0.157)',
    },
    '&:hover + a': {
      border: 'none',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    },
  },
  active: {
    visibility: 'visible',
  },
  navItem: {
    position: 'relative',
    marginLeft: '8%',
    width: '18%',
    height: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  navItem_: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    borderRadius: '15px',
    textDecoration: 'none',
    color: 'black',
    border: '1px solid #B9B9B9',
    backgroundColor: '#FAFAFA',
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      border: 'none',
    },
  },
  item: {
    width: '100%',
    height: '100%',
  },
  titleItem: {
    fontSize: '17px',
    padding: '0 5px',
    margin: '1.5rem 0',
    boxSizing: 'border-box',
    width: '100%',
    '& h4': {
      margin: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  titleItemSolution: {
    margin: '-0.5rem 0 !important',
  },
  circleAvatar: {
    height: '200px',
    width: '200px',
    backgroundColor: '#ec6424',
    borderRadius: '50%',
    border: '1px solid transparent',
    overflow: 'hidden',
  },
  image: {
    width: '80%',
    height: '70%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 auto',
  },
  description: {
    width: '80%',
    margin: '0 auto',
    fontSize: '16px',
    padding: '0',
  },
  '@media screen and (min-width: 1900px)': {
    listCard: {
      height: '550px',
    },
    circleAvatar: {
      height: '200px',
      width: '200px',
    },
    navItem: {
      width: '24%',
    },
    titleItem: {
      fontSize: '25px',
    },
  },
  '@media screen and (max-width: 1900px)': {
    listCard: {
      height: '450px',
    },
    titleItem: {
      fontSize: '23px',
      margin: '0.5rem 0',
    },
    navItem: {
      width: '23%',
    },
    circleAvatar: {
      height: '170px',
      width: '170px',
    },
  },
  '@media screen and (max-width: 1600px)': {
    listCard: {
      height: '400px',
    },
    navItem: {
      width: '20%',
    },
    titleItem: {
      margin: '1rem 0',
      fontSize: '17px',
    },
    circleAvatar: {
      height: '150px',
      width: '150px',
    },
  },
  '@media screen and (max-width: 1400px)': {
    circleAvatar: {
      height: '120px',
      width: '120px',
    },
    navItem: {
      width: '23%',
    },
    description: {
      fontSize: '14px',
    },
  },
  '@media screen and (max-width: 1200px)': {
    listCard: {
      height: '350px',
    },
    circleAvatar: {
      height: '100px',
      width: '100px',
    },
    description: {
      fontSize: '14px',
    },
    titleItem: {
      margin: '0',
      fontSize: '15px',
    },
  },
  '@media screen and (max-width: 1000px)': {
    listCard: {
      height: '300px',
    },
    circleAvatar: {
      height: '90px',
      width: '90px',
    },
    titleItem: {
      margin: '0',
      fontSize: '13px',
    },
  },
}))

const ScreenLayout = (props) => {
  const {
    siteAdmin,
    listDescription,
    rootPath,
    keypage,
    screenDefault,
    handleSaveScreenDefault,
  } = props
  const classes = useStyles()
  const dispatch = useDispatch()
  const { loggedIn } = useContext(AuthContext)
  const { siteList } = useSelector((appState) => appState.site)
  const [description, setDescription] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    if (loggedIn === LogginCheckStatus.SUCCESS)
      dispatch(actions.getSites({ viewTypeComponent: ViewTypeComponent.home }))
  }, [])

  const renderDescription = (key) => {
    const description1 = listDescription.find((dc) => dc.key === key)
    if (description1) {
      setDescription(description1)
    } else {
      setDescription('')
    }
  }

  const renderPinIcon = (ld) => {
    if (ld.key === 'collaboration-center' || ld.key === 'admin-center') {
      if (`/${ld.key}` === screenDefault) {
        return (
          <>
            <Tooltip
              content={<span>{t('navBar.descriptionUnpin')}</span>}
              component={InlineDialog}
              position="bottom"
              delay={0}
            >
              {(tooltipProps) => (
                // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
                <div
                  className={
                    description.key === ld.key
                      ? `${classes.pinIcon} ${classes.active}`
                      : classes.pinIcon
                  }
                  onMouseOver={() => {
                    renderDescription(ld.key)
                  }}
                  onMouseOut={() => {
                    renderDescription('')
                  }}
                  onClick={() => handleSaveScreenDefault(`/${ld.key}`)}
                >
                  <img
                    {...tooltipProps}
                    style={{ cursor: 'pointer' }}
                    width="23px"
                    height="23px"
                    src={unpin}
                    alt="unpin icon"
                  />
                </div>
              )}
            </Tooltip>
          </>
        )
      }
      return (
        <>
          <Tooltip
            content={<span>{t('navBar.descriptionPin')}</span>}
            position="bottom"
            component={InlineDialog}
            delay={0}
          >
            {(tooltipProps) => (
              // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
              <div
                className={
                  description.key === ld.key
                    ? `${classes.pinIcon} ${classes.active}`
                    : classes.pinIcon
                }
                onMouseOver={() => {
                  renderDescription(ld.key)
                }}
                onMouseOut={() => {
                  renderDescription('')
                }}
                onClick={() => handleSaveScreenDefault(`/${ld.key}`)}
              >
                <img
                  {...tooltipProps}
                  style={{ cursor: 'pointer' }}
                  width="23px"
                  height="23px"
                  src={pin}
                  alt="pin icon"
                />
              </div>
            )}
          </Tooltip>
        </>
      )
    }
    return ''
  }

  const renderCard = () => {
    if (keypage === 'admin') {
      return listDescription.map((ld, key) => (
        <div
          className={classes.navItem}
          style={{ marginLeft: key === 0 ? '0' : '8%' }}
          key={ld.key}
        >
          <NavLink
            end
            to={rootPath !== '/' ? `${rootPath}/${ld.key}` : `/${ld.key}`}
            className={classes.navItem_}
          >
            <div
              className={`${classes.item}`}
              onMouseMove={() => {
                renderDescription(ld.key)
              }}
              onMouseLeave={() => {
                renderDescription('')
              }}
            >
              <div className={classes.image}>
                <div className={classes.circleAvatar}>
                  <img
                    width="100%"
                    height="100%"
                    alt={ld.name}
                    src={ld.image}
                  />
                </div>
              </div>
              <div className={classes.titleItem}>
                <h4>{ld.name}</h4>
              </div>
            </div>
          </NavLink>
        </div>
      ))
    }
    if (keypage === 'solution') {
      return listDescription.map((ld, key) => (
        <div
          className={classes.navItem}
          style={{ marginLeft: key === 0 ? '0' : '8%' }}
          key={`${ld.key} ${ld.name}`}
        >
          <NavLink
            end
            to={rootPath !== '/' ? `${rootPath}/${ld.key}` : `/${ld.key}`}
            className={classes.navItem_}
          >
            <div
              className={`${classes.item}`}
              onMouseMove={() => {
                renderDescription(ld.key)
              }}
              onMouseLeave={() => {
                renderDescription('')
              }}
            >
              <div className={classes.image}>
                <div className={classes.circleAvatar}>
                  <img
                    width="100%"
                    height="100%"
                    alt={ld.name}
                    src={ld.image}
                  />
                </div>
              </div>
              <div
                className={`${classes.titleItem} ${classes.titleItemSolution}`}
              >
                <h4>{ld.name}</h4>
                {ld?.subName !== null && <h4>{ld.subName}</h4>}
              </div>
            </div>
          </NavLink>
        </div>
      ))
    }
    if (keypage === 'home') {
      if (siteAdmin.length !== 0) {
        return listDescription.map((ld, key) => (
          <div
            className={classes.navItem}
            style={{ marginLeft: key === 0 ? '0' : '8%' }}
            key={ld.key}
          >
            {renderPinIcon(ld)}
            <NavLink
              end
              to={rootPath !== '/' ? `${rootPath}/${ld.key}` : `/${ld.key}`}
              className={classes.navItem_}
            >
              <div
                className={`${classes.item}`}
                onMouseMove={() => {
                  renderDescription(ld.key)
                }}
                onMouseLeave={() => {
                  renderDescription('')
                }}
              >
                <div className={classes.image}>
                  <div className={classes.circleAvatar}>
                    <img
                      width="100%"
                      height="100%"
                      alt={ld.name}
                      src={ld.image}
                    />
                  </div>
                </div>
                <div className={classes.titleItem}>
                  <h4>
                    {ld.name.split('\\n').map((line) => (
                      <span key={uuidv4()}>{line}</span>
                    ))}
                  </h4>
                </div>
              </div>
            </NavLink>
          </div>
        ))
      }
      if (siteAdmin.length === 0) {
        return listDescription.map((ld, key) => {
          if (ld.key !== 'admin-center') {
            return (
              <div
                className={classes.navItem}
                style={{ marginLeft: key === 0 ? '0' : '8%' }}
                key={ld.key}
              >
                {ld.key === 'collaboration-center' && renderPinIcon(ld)}
                <NavLink
                  end
                  to={rootPath !== '/' ? `${rootPath}/${ld.key}` : `/${ld.key}`}
                  className={classes.navItem_}
                >
                  <div
                    className={`${classes.item}`}
                    onMouseMove={() => {
                      renderDescription(ld.key)
                    }}
                    onMouseLeave={() => {
                      renderDescription('')
                    }}
                  >
                    <div className={classes.image}>
                      <div className={classes.circleAvatar}>
                        <img
                          width="100%"
                          height="100%"
                          alt={ld.name}
                          src={ld.image}
                        />
                      </div>
                    </div>
                    <div className={classes.titleItem}>
                      <h4>
                        {ld.name.split('\\n').map((line) => (
                          <span key={uuidv4()}>{line}</span>
                        ))}
                      </h4>
                    </div>
                  </div>
                </NavLink>
              </div>
            )
          }
          return ''
        })
      }
    }
    return ''
  }

  const renderAdminCenter = () => {
    if (siteList?.length === 0) {
      return <ProjectContentLoader />
    }
    return (
      <div className={classes.main}>
        <div className={classes.listContent}>
          <div className={classes.listCard}>{renderCard()}</div>
          <div className={classes.description}>
            <p>{description?.description}</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <AuthContext.Consumer>
      {(value) => (
        <div className={classes.container}>{renderAdminCenter()}</div>
      )}
    </AuthContext.Consumer>
  )
}

export default ScreenLayout
