import React from 'react'
import {View, Switch, TouchableOpacity} from 'react-native'
import Collapsible from "react-native-collapsible"
import { BorderlessButton } from 'react-native-gesture-handler'
import moment from "moment"

import { Copy, CopyBlue } from "../typography"
import { Label, PrimaryButton } from "../../components"
import Icon from "../icon"
import styles from './styles'
import { useDarkTheme } from '../../utils/ui-utils'
import palette from '../../utils/palette'
import __ from "../../utils/translations"

export default (props) => {

  const darkMode = useDarkTheme()

    const { toggleRecuring, transaction, selectSchedule, submitForm, 
            deleteTransaction, closeMoreOptions, onRemoveLabel, labelsModalRef, recurringCalendarModalRef} = props

    return (
      <View>
        <View style={[styles.formFieldWrap, { alignItems: "center" }]}>
            <Copy>Recurring</Copy>
            <Switch value={!!transaction.recurring} onValueChange={toggleRecuring} />
        </View>

        <Collapsible collapsed={!!transaction.recurring === false} style={{ padding: 20, paddingTop: 10 }}>
            <View style={styles.inlineBetween}>
                <Copy>Every</Copy>
                <TouchableOpacity onPress={selectSchedule}>
                    <Copy>{ (transaction.recurring && transaction.recurring.frequency) || "Month"}</Copy>
                </TouchableOpacity>
            </View>

            <View style={styles.inlineBetween}>
                <Copy>End Date</Copy>
                <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => recurringCalendarModalRef.current.open()}>
                    <Icon type="calendar-alt" textStyle={{ color: "teal" }} style={{ marginLeft: 0 }} />
                    <Copy style={{ margin: 0 }}>
                    { transaction.recurring && moment(transaction.recurring.endTimestamp).format("MMM Do YYYY")}
                    </Copy>
                </TouchableOpacity>
            </View>
        </Collapsible>

        <View style={styles.formFieldWrap}>
            <TouchableOpacity
                style={{ backgroundColor: "teal", padding: 5, paddingLeft: 10, paddingRight: 10, borderRadius: 20 }}
                onPress={() => labelsModalRef.current.open()}>
                <Copy style={{ color: "white", fontSize: 12 }}>Add Tags</Copy>
            </TouchableOpacity>
            <View style={styles.labels}>
                {transaction?.labels?.map(label => (
                    <Label key={label.uuid} label={label} removeLabel={() => onRemoveLabel(label)} />
                ))}
            </View>
        </View>

        <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{ alignItems: "center", margin: 20 }}
            onPress={closeMoreOptions}>
            <CopyBlue>Less Options</CopyBlue>
        </TouchableOpacity>

        <View style={{flexDirection: "row", alignItems: "center"}}>
          <BorderlessButton onPress={deleteTransaction}>
            <Icon type="trash-alt" style={{marginRight: 10}} 
                        textStyle={{color: darkMode ? palette.light : palette.dark}}
                        />
          </BorderlessButton>
          <PrimaryButton label="Save" onPress={submitForm} style={{ borderRadius: 5, flex: 1 }} />
        </View>
    </View>
    )
}