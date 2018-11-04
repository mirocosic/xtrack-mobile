import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { navigatorRef } from '../../App.js';
import { delay } from 'redux-saga';
import { all, takeEvery, takeLatest, put, call, select} from 'redux-saga/effects';
import actions from './actions';
import asyncStorage from '../../lib/asyncStorage';
import DeviceInfo from 'react-native-device-info';
import { getNotificationData } from '../../services/push-notifications';
import API from '../../api';

function* registerDeviceToken() {
  yield takeLatest(actions.REGISTER_DEVICE_TOKEN, function*(action) {

    yield call(delay, 100);
    const existingToken = yield call(asyncStorage.getDeviceToken);

    if ( !existingToken || existingToken !== action.deviceToken) {
      const deviceInfo = {
        "device_id": DeviceInfo.getUniqueID(),
        "device_token": action.deviceToken,
        "app_name": DeviceInfo.getApplicationName(),
        "app_version": DeviceInfo.getVersion(),
        "device_platform": DeviceInfo.getSystemName(),
        "device_name": DeviceInfo.getBrand(),
        "device_version": DeviceInfo.getSystemVersion(),
        "device_model": DeviceInfo.getModel()
      }

      const response = yield call( API.registerDeviceToken, deviceInfo);

      if ( !response.success ) {
        Alert.alert('Blimey!', 'Error registering device. \n Error code: '+response.errorCode+'\n'+response.errorMsg ,[{text:'Close'}]);
      }

      yield call(asyncStorage.setDeviceToken, action.deviceToken);

    }

  })
}

function* handleNotification() {
  yield takeEvery(actions.HANDLE_PUSH_NOTIFICATION, function*({notification}) {

    const data = getNotificationData(notification);

    if (!notification.foreground) {  // app is in background, redirect to proper screen

      switch(data.type){

        case 'message':
          yield put({type: 'START_CONVERSATION_REQUEST', bookingId: data.bookingId})
          navigatorRef.dispatch(NavigationActions.navigate({key: 'Conversation', routeName: 'Conversation', params:{bookingId: data.bookingId}}));
          break;
        case 'booking':
          const bookingDetailsResponse = yield call( API.getBookingDetails, data.bookingId );
          navigatorRef.dispatch(NavigationActions.navigate({key: 'Itinerary', routeName: 'Itinerary', params:{id: data.bookingId, booking: bookingDetailsResponse.data}}));
          break;
        default:
          return;
      }
    }

    if (data.type === 'message') { yield put({type: 'GET_USER_MESSAGES'}); }

    const newBookingsCount = yield call( API.getNewBookingsCount );

    if ( newBookingsCount ) {
      const activeFilter = yield select(state=>state.bookings.activeFilter);
      const sortBy = yield select(state=>state.bookings.sortBy);

      const [ trips, newBookings ] = yield all([
        call( API.getUserTrips, true, activeFilter.id, sortBy),
        call( API.getNewBookings )
      ])

      yield put({type: 'UPDATE_NEW_BOOKINGS_COUNT', count: newBookingsCount });

      if ( trips.success ) {
        yield put({type: 'BOOKINGS_REQUEST_SUCCESS', payload: trips.data, total: trips.total});
        yield put({type: 'MARK_UNREAD_BOOKINGS', bookings: newBookings.data })
      }
    }


  })
}

export default function* commonSaga() {
  yield all([
    registerDeviceToken(),
    handleNotification()
  ])
}
