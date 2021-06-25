import React, { Component, useEffect, useState } from "react"
import { Alert, View, TouchableOpacity } from "react-native"

import { Screen, Header, Footer } from "../../components"
import { Copy, CopyBlue } from "../../components/typography"
import AsyncStorage, {useAsyncStorage} from '@react-native-async-storage/async-storage'

const data = [{id: 1, name: "Init Backup"},
              {id: 2, name: "Backup number two"}]

export default function Backup() {

  const [backups, setBackups] = useState([])
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
    await setItem(JSON.stringify(data))
    setBackups(data)
  }

  const clearBackup = async () => {
    await setItem(JSON.stringify([]))
    setBackups([])
  }

  useEffect(() => {
    readItemFromStorage();
  }, []);

    return (
      <Screen>
        <Header title="Backup / Restore" backBtn />
        <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
          <Copy>Previous backups</Copy>
          {
            backups.map((item) => (
              <Copy>{item.name}</Copy>
            ))
          }
        </View>

        <Footer>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity onPress={() => createBackup()}>
              <CopyBlue>Create new backup</CopyBlue>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => clearBackup()}>
              <CopyBlue>Clear backups</CopyBlue>
            </TouchableOpacity>
          </View>
        </Footer>
      </Screen>
    )
  }
