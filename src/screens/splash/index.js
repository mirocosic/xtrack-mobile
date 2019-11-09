import React from "react"
import { View, Button } from "react-native"
import { withNavigation } from "react-navigation"
import Screen from "../../components/screen"
import { Copy, Title } from "../../components/typography"
import translate from "../../utils/translations"

const Splash = props => (
  <Screen>
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Title style={{ fontSize: 24 }}>{translate("Welcome to XTrack!")}</Title>
      <Copy style={{ fontSize: 18, marginTop: 30 }}>Probably the best expense tracking app...</Copy>
      <Copy style={{ fontSize: 18, marginTop: 10, marginBottom: 40 }}>...in the world!</Copy>
      <Button title={translate("Go to app")} onPress={() => props.navigation.navigate("Main")} />
    </View>
  </Screen>
)

export default withNavigation(Splash);
