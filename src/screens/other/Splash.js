import React, { Component } from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import { clearUser, setUser, getToken } from '../../utils/storage';
import { setToken } from '../..//services/api';
import * as loginActions from '../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions, StackActions } from 'react-navigation';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";


class Splash extends Component {

    componentDidMount() {
        this.checkSignInStatus();
    }

    onSuccess = (response) => {
        console.log('SplashOnresponse', response)
        let routeName = 'home';
        setUser(response);
        setTimeout(() => {
            const options = {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: false
            };

            ReactNativeHapticFeedback.trigger("impactLight", options);
            const { navigation } = this.props;
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: routeName }),
                ],
            });
            navigation.dispatch(resetAction);
        }, 1000);
    }

    onError = (error) => {
        console.log('SplashOnError', error)
        try {
            const options = {
                enableVibrateFallback: true,
                ignoreAndroidSystemSettings: false
            };

            ReactNativeHapticFeedback.trigger("impactLight", options);
            clearUser();
            const { navigation } = this.props;
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'home' }),
                ],
            });
            navigation.dispatch(resetAction);
        } catch (e) {
            this.setState({});
        }
    }

    checkSignInStatus() {
        setTimeout(() => {
            getToken().then((token) => {
                if (token && token !== '') {
                    setToken(token)
                    this.props.actions.user.fetchUserInfo(this.onSuccess, this.onError)
                } else {
                    this.props.actions.user.fetchUserInfo(this.onSuccess, this.onError)
                }
            });
        }, 3000);
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('app/assets/assets/splash.gif')} style={{ width: '100%', height: '100%' }}></ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
})

const mapDispatchToProps = (dispatch) => ({
    actions: {
        user: bindActionCreators(loginActions, dispatch)
    }
})
export default connect(null, mapDispatchToProps)(Splash)


