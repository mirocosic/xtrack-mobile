import React, { Component, useEffect, useState } from "react"
import { Alert, View, TouchableOpacity, Touchable, FlatList } from "react-native"
import { connect } from "react-redux";
import { get } from "lodash"

import { Screen, Header, Footer } from "../../components"
import { Copy, CopyBlue } from "../../components/typography"
import AsyncStorage, {useAsyncStorage} from '@react-native-async-storage/async-storage'

import { store } from "../../store"
import { makeUUID } from "../../utils/helper-gnomes"
import moment from "moment"

const data = [{id: 1, name: "Init Backup", data: {}},
              {id: 2, name: "Backup number two", data: {}}]

export function Backup(props) {

  const [backups, setBackups] = useState([])
  const { getItem, setItem } = useAsyncStorage('@backups')

  const loadBackupsFromStorage = async () => {
    const backups = await getItem()
    const parsedBackups = JSON.parse(backups)
    
    if (parsedBackups && parsedBackups.length > 0) {
      setBackups(parsedBackups)
    } else {
      console.log("not")
    }
  }

  // const writeItemToStorage = async newValue => {
  //   await setItem(newValue);
  //   setValue(newValue);
  // };

  const createBackup = async () => {
    // get current backups from storage
    const backups = await getItem()
    const parsedBackups = JSON.parse(backups)

    //get current state
    const state = store.getState()

    //append state to backups
    const newBackups = [
      ...parsedBackups,
      {id: makeUUID(),
       name: moment().format("DD/MM/yyyy HH:MM:ss ") + props.appVersion,
       data: state
      }
    ]

    //save to storage
    await setItem(JSON.stringify(newBackups))
    setBackups(newBackups.map(bkp => ({id: bkp.id, name: bkp.name}))) //clear data from local state
  }

  const getBackupsAndPrint = async () => {
    const backups = await getItem()
    const parsedBackups = JSON.parse(backups)

    console.log(parsedBackups)
  }

  const clearAll = async () => {
    await setItem(JSON.stringify([]))
    setBackups([])
  }

  const loadBackup = async (id) => {
    const backups = await getItem()
    const parsedBackups = JSON.parse(backups)
    const backupToRestore = parsedBackups.find(bkp => bkp.id === id)

    console.log(backupToRestore)

    Alert.alert(
      "Are you sure?",
      "Do you want to restore this backup? Make sure you have the current state backed up or it will be lost.",
      [{
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Restore backup",
        onPress: () => { props.restoreBackup(get(backupToRestore, "data"))},
      }]
    )
  }

  const confirmDeleteBackup = (id) => {
    Alert.alert(
      "Are you sure?",
      "Do you want to delete this backup? This action cannot be undone.",
      [{
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => deleteBackup(id),
      }]
    )
  }

  const deleteBackup = async (id) => {
    const backups = await getItem()
    const parsedBackups = JSON.parse(backups)
    const filteredBkps = parsedBackups.filter(bkp => bkp.id !== id)

    await setItem(JSON.stringify(filteredBkps)) 
    setBackups(filteredBkps.map(bkp => ({id: bkp.id, name: bkp.name}))) //clear data from local state
  }

  useEffect(() => {
    loadBackupsFromStorage();
  }, []);

    return (
      <Screen>
        <Header title="Backup / Restore" backBtn withInsets />
        <View style={{ flex: 1, padding: 20 }}>
          {
            backups.map((item) => (
              <View key={item.id} style={{justifyContent: "space-between", flexDirection: "row", alignItems: "center"}}>
                <TouchableOpacity onPress={() => loadBackup(item.id)} style={{padding: 10}}>
                  <Copy key={item.id}>{item.name}</Copy>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => confirmDeleteBackup(item.id)}>
                  <Copy style={{color: "red"}}>DEL</Copy>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>


        <Footer>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => createBackup()} style={{padding: 10}}>
              <CopyBlue>Create new backup</CopyBlue>
            </TouchableOpacity>
          </View>
        </Footer>
      </Screen>
    )
  }

  export default connect(
    state => ({
      transactions: state.transactions.entries,
      categories: state.categories.items,
      darkMode: state.common.darkMode,
      appVersion: state.common.appVersion
    }),
  
    dispatch => ({
      restoreBackup: data => dispatch({ type: "RESTORE_BACKUP", data }),
    }),
  )(Backup);
  
