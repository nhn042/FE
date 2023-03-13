/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ScreenLayout from '../common/ScreenLayout'
import collaborationcenter from '../../images/collaborationcenter.svg'
import adminCenter from '../../images/admincenter.svg'
import solutionCenter from '../../images/solutioncenter.svg'

const HomePage = (props) => {
  const { siteAdmin, screenDefault, handleSaveScreenDefault } = props
  const { t } = useTranslation()
  const listDescription = [
    {
      key: 'collaboration-center',
      name: t('cardName.collaborationCenter'),
      image: collaborationcenter,
      description: t('homePageDescription.collaborationCenter'),
    },
    {
      key: 'admin-center',
      name: t('cardName.administrationCenter'),
      image: adminCenter,
      description: t('homePageDescription.administrationCenter'),
    },
    {
      key: 'solution-center',
      name: t('cardName.solutionCenter'),
      image: solutionCenter,
      description: t('homePageDescription.solutionCenter'),
    },
  ]
  const keypage = 'home'

  return (
    <ScreenLayout
      screenDefault={screenDefault}
      handleSaveScreenDefault={handleSaveScreenDefault}
      listDescription={listDescription}
      rootPath="/"
      keypage={keypage}
      siteAdmin={siteAdmin}
    />
  )
}

export default HomePage
