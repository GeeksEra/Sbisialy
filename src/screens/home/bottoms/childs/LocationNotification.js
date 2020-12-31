import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import firebase from 'react-native-firebase';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import NetInfo from "@react-native-community/netinfo";
import messaging from '@react-native-firebase/messaging';



class LocationNotificationFCM extends Component {

    watchID = null;

    async componentDidMount() {
        // NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectionChange);
        setTimeout(() => {
            this.PushNotificationSetup();
            // install sdk and the implement
            // this.DynamicLinks();
            // Geocoder.fallbackToGoogle('AIzaSyD7HvvWPuPC6h0lo42MPvCANnTHSnf0Jp8');
            // Geolocation.getCurrentPosition(
            //     position => {
            //         Geocoder.geocodePosition({
            //             lat: position.coords.latitude,
            //             lng: position.coords.longitude,
            //         }).then(res => {
            //             // console.log(res);
            //             this.props.actions.locationNotificationFCM.setdefaultLocation({ location: res[0].formattedAddress, geometry: { lat: position.coords.latitude, lng: position.coords.longitude } });
            //         }).catch(err => {// console.log(err)
            //         })
            //     },
            //     error => { Geolocation.requestAuthorization(), this.props.actions.locationNotificationFCM.setdefaultLocation({ location: this.props.data.selectedLocation.location, geometry: { lat: this.props.data.selectedLocation.lat, lng: this.props.data.selectedLocation.lng } }); },
            //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            // );


        }, 500);
    }
    _handleConnectionChange = (isConnected) => {
        // console.log(isConnected)
        this.props.actions.locationNotificationFCM.connectionState({ status: isConnected });
    };


    componentWillUnmount() {
        this.watchID != null && Geolocation.clearWatch(this.watchID);
        // NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectionChange);
        try {
            this.removeNotificationDisplayedListener();
            this.removeNotificationListener();
            this.removeNotificationOpenedListener();
        } catch (Ex) {

        }

    }

    async SaveToken() {
        await this.checkFcmPermission()
    }



    async getToken() {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            this.props.data.userInfo.fcm = fcmToken;
            console.log(this.props.data.userInfo)
            this.props.actions.locationNotificationFCM.updateProfile(this.props.data.userInfo, ((data) => {
                console.log('FCM Stored', data);
            }), ((err) => {
                console.log('FCM Error', err);
            }));
            console.log(fcmToken)
        } else {
            console.log('FCM', ' FCM error');

        } 
    }

    async checkFcmPermission() {

        messaging()
            .hasPermission()
            .then(enabled => {
                if (enabled) {
                    // User has permissions
                    this.getToken();
                } else {
                    // User doesn't have permission
                    messaging()
                        .requestPermission()
                        .then(() => {
                            // User has authorized

                            this.getToken();
                        })
                        .catch(error => {
                            // User has rejected permissions
                            console.log(
                                'PERMISSION REQUEST :: notification permission rejected',
                            );
                        });
                }
            });
    }

    DynamicLinks() {
        firebase.links()
            .getInitialLink()
            .then((url) => {
                if (url) {
                    alert('app is open via dynamic link muhammad please take 2 mints break this is good news lol :)')
                    alert(url)
                    // app opened from a url
                } else {
                    // app NOT opened from a url
                }
            });
    }
    async PushNotificationSetup() {
        console.log('PushNotificationSetup')
        const enabled = await messaging().hasPermission();
        console.log('PushNotificationSetup', enabled)
        if (enabled) {
            // user has permissions
            this.onNotification();
            this.SaveToken();

        } else {
            // user doesn't have permission
            try {
                await messaging().requestPermission();
                this.onNotification();
                this.SaveToken();
            } catch (error) {
                console.log('error while permission notification', error)
            }
        }

    }
    async onNotification() {
        this.removeNotificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
            console.log('removeNotificationDisplayedListener', notification)
            // Process your notification as required
            // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
        });
        this.removeNotificationListener = firebase.notifications().onNotification((notification) => {
            notification.setSound('default');
            firebase.notifications().displayNotification(notification);
            this.props.actions.locationNotificationFCM.refreashOrder([]);
        });
        this.removeNotificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            const notification = notificationOpen.notification;
            console.log('removeNotificationOpenedListener', notification._data.order_id)
            if (notification._data.order_id)
                this.props.navigation.navigate('OrderDetails', { selectedOrder: { order_id: notification._data.order_id } });

        });

        const notificationOpen = await firebase.notifications().getInitialNotification();
        if (notificationOpen) {
            const notification = notificationOpen.notification;
            console.log('notificationOpen', notification._data.order_id)
            if (notification._data.order_id)
                this.props.navigation.navigate('OrderDetails', { selectedOrder: { order_id: notification._data.order_id } });



        }

    }



    render() {
        return null;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.data.RefrashApp !== nextProps.data.RefrashApp) {
            this.props.data.userInfo.fcm = this.props.data.fcm;
            this.props.actions.locationNotificationFCM.updateProfile(this.props.data.userInfo, ((data) => {
                console.log('FCM Stored', data);
            }), ((err) => {
                console.log('FCM Error', err);
            }));
        }
    }
}



const mapStateToProps = (state) => ({
    data: {
        userInfo: state.login.userInfo,
        selectedLocation: state.login.selectedLocation,
        RefrashApp: state.app.RefrashApp,
        fcm: state.app.fcm,
    },
    isConnected: state.connection.isConnected,
})
const mapDispatchToProps = (dispatch) => ({
    actions: {
        locationNotificationFCM: bindActionCreators(loginActions, dispatch)
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(LocationNotificationFCM))

