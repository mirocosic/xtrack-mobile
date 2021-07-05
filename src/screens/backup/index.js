import React, { Component, useEffect, useState } from "react"
import { Alert, View, TouchableOpacity } from "react-native"
import { connect } from "react-redux";

import { Screen, Header, Footer } from "../../components"
import { Copy, CopyBlue } from "../../components/typography"
import AsyncStorage, {useAsyncStorage} from '@react-native-async-storage/async-storage'

import { store } from "../../store"

const data = [{id: 1, name: "Init Backup"},
              {id: 2, name: "Backup number two"}]

export function Backup(props) {

  const [backups, setBackups] = useState(data)
  const { getItem, setItem } = useAsyncStorage('@backups')

  const readItemFromStorage = async () => {
    const item = await getItem()
    const parsedItem = JSON.parse(item)
    console.log(parsedItem)
    
    if (parsedItem && parsedItem.length > 0) {
      
      setBackups(JSON.parse(item))
    } else {
      console.log("not")
    }
  }

  // const writeItemToStorage = async newValue => {
  //   await setItem(newValue);
  //   setValue(newValue);
  // };

  const createBackup = async () => {
    //await setItem(JSON.stringify(data))
    //setBackups(data)
    await setItem(JSON.stringify(store.getState()))
  }

  const clearBackup = async () => {
    // await setItem(JSON.stringify([]))
    //setBackups([])

    console.log(store.getState())
    

  }

  const restoreBackup = async () => {
    // await setItem(JSON.stringify([]))
    //setBackups([])

    //console.log(store.getState())
    const state = await getItem()
    props.restoreBackup(JSON.parse(state))


  }

  useEffect(() => {
    readItemFromStorage();
  }, []);

    return (
      <Screen>
        <Header title="Backup / Restore" backBtn />
        <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
          {
            backups.map((item) => (
              <Copy key={item.id}>{item.name}</Copy>
            ))
          }
        </View>

        <Footer>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => createBackup()} style={{padding: 10}}>
              <CopyBlue>Create new backup</CopyBlue>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => clearBackup()} style={{padding: 10}}>
              <CopyBlue>Print state</CopyBlue>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => restoreBackup()} style={{padding: 10}}>
              <CopyBlue>Restore</CopyBlue>
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
    }),
  
    dispatch => ({
      restoreBackup: payload => dispatch({ type: "RESTORE_BACKUP", payload }),
    }),
  )(Backup);
  
