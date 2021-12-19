import React from "react"

import { Screen, Header, Icon } from "../../components"
import { isAndroid } from "../../utils/os-utils"

export default ({accounts, navigation, route: { params: {accountId}}}) => {

  const account = accounts.find((acc) => acc.id === accountId)

  return (
    <Screen>
        <Header
          icon={<Icon type={account.icon} textStyle={{ color: account.color }} />}
          title={account.name}
          backBtn={isAndroid}/>
    </Screen>
  )
}