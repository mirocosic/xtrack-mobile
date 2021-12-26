import React, { useEffect, useState } from "react"
import { Alert, View, ScrollView, TouchableOpacity } from "react-native"
import { get } from "lodash"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Swipeable from "react-native-gesture-handler/Swipeable"
import { RectButton } from "react-native-gesture-handler"
import moment from "moment"
import Share from "react-native-share"
import { storage } from "../../store/async-storage"

import { Screen, Header, Icon, Copy } from "../../components"
import { store } from "../../store"
import { makeUUID } from "../../utils/helper-gnomes"
import { isAndroid } from "../../utils/os-utils"
import styles from "./styles"
import { useDarkTheme } from "../../utils/ui-utils"
import palette from "../../utils/palette"
import __ from "../../utils/translations"

export default (props) => {

  const [backups, setBackups] = useState([])
  //const { getItem, setItem } = useAsyncStorage('@backups')
  const insets = useSafeAreaInsets()
  const darkMode = useDarkTheme()

  const loadBackupsFromStorage = async () => {
    //const backups = await getItem()
    const backups = storage.getString("backups")
    const parsedBackups = JSON.parse(backups)
    
    if (parsedBackups && parsedBackups.length > 0) {
      setBackups(parsedBackups)
    } else {
      console.log("not")
    }
  }

  const createBackup = async () => {
    // get current backups from storage
    //const backups = await getItem()
    const backups = storage.getString("backups")
    

    const parsedBackups = backups ? JSON.parse(backups) : []

    //get current state
    const state = store.getState()

    //append state to backups
    const newBackups = [
      ...parsedBackups,
      {id: makeUUID(),
       name: moment().format("DD/MM/yyyy HH:MM:ss") + " - " + props.appVersion,
       data: state
      }
    ]

    //save to storage
    //await setItem(JSON.stringify(newBackups))
    storage.set("backups", JSON.stringify(newBackups))
    setBackups(newBackups.map(bkp => ({id: bkp.id, name: bkp.name}))) //clear data from local state
  }

  const loadBackup = async (id) => {
    //const backups = await getItem()
    const backups = storage.getString("backups")
    const parsedBackups = JSON.parse(backups)
    const backupToRestore = parsedBackups.find(bkp => bkp.id === id)

    Alert.alert(
      __("Are you sure?"),
      __("Do you want to restore this backup? Make sure you have the current state backed up or it will be lost."),
      [{
        text: __("Cancel"),
        style: "cancel",
      },
      {
        text: __("Restore backup"),
        onPress: () => { props.restoreBackup(get(backupToRestore, "data"))},
      }]
    )
  }



  const confirmDeleteBackup = (id) => {
    Alert.alert(
      __("Are you sure?"),
      __("Do you want to delete this backup? This action cannot be undone."),
      [{
        text: __("Cancel"),
        style: "cancel",
      },
      {
        text: __("Delete"),
        onPress: () => deleteBackup(id),
      }]
    )
  }

  const deleteBackup = async (id) => {
    //const backups = await getItem()
    const backups = storage.getString("backups")
    const parsedBackups = JSON.parse(backups)
    const filteredBkps = parsedBackups.filter(bkp => bkp.id !== id)

    //await setItem(JSON.stringify(filteredBkps))
    storage.set("backups", JSON.stringify(filteredBkps))
    setBackups(filteredBkps.map(bkp => ({id: bkp.id, name: bkp.name}))) //clear data from local state
  }

  const handleExport = () => {
    Share.open({url: "https://mirocosic.dev"})
    .then((res) => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const renderActions = (id) => {
    return (
      <View style={{flexDirection: "row"}}>
        <View style={{ width: 70 }}>
          <RectButton style={styles.exportButton} onPress={() => handleExport()}>
            <Icon type="upload" />
          </RectButton>
        </View>

        <View style={{ width: 70 }}>
          <RectButton style={styles.deleteButton} onPress={() => confirmDeleteBackup(id)}>
            <Icon type="trash-alt" />
          </RectButton>
        </View>

      </View>
      
    )
  }

  useEffect(() => {
    loadBackupsFromStorage();
  }, []);

    return (
      <Screen>
        <Header title="Backup / Restore" backBtn withInsets />
        <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 50 }}>
          {
            backups.map((item) => (

              <Swipeable key={item.id} renderRightActions={() => renderActions(item.id)} containerStyle={styles.swiperWrap}>
                <RectButton 
                  onPress={() => loadBackup(item.id)}
                  activeOpacity={darkMode ? 0.5 : 0.1}
                  style={[styles.wrap, darkMode && styles.wrapDark]}
                  rippleColor={darkMode ? palette.darkGray : palette.lightBlue}>
                    <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                      <Copy key={item.id}>{item.name}</Copy>
                    </View>
                </RectButton>
              </Swipeable>
            ))
          }
        </ScrollView>

        <View style={[isAndroid && { paddingBottom: 10 }, { width: "80%", left: "10%", bottom: insets.bottom, position: "absolute" }]}>
          <TouchableOpacity onPress={createBackup} style={styles.addWrap}>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#2292f4", "#2031f4"]} style={[{ height: 50, width: 200 }, styles.add]}>
              <Copy style={{ color: "white" }}>Create Backup</Copy>
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </Screen>
    )
  }
