import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../actions/Actions';
import Constants from 'expo-constants';
//view
import {
    View,
    StyleSheet, Image, I18nManager
} from 'react-native';
import Header from './childs/Header';
import { theme } from '../../../core/theme';
import { Text } from '../../../components/widget';
import { moderateScale } from 'react-native-size-matters';
import { translate } from '../../../utils/utils';
import CeleberatyHeader from './childs/CeleberatyHeader';

import * as Apis from '../../../services/Apis';
import Events from './childs/Events';
import Loader from '../../../components/widget/loader';
import { getStatusBarHeight } from 'react-native-status-bar-height';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, events: []

        }


        this.fetchRequests();


    }



    fetchRequests() {
        this.setState({ isLoading: true })
        Apis.Get('events').then((data) => {
            console.log('data', data.results)
            this.setState({ isLoading: false, events: data.results })
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }


    render() {


        return (
            <View style={styles.container_scrolling}>
                <View style={{ backgroundColor: 'transparent', position: 'absolute', zIndex: 100, width: '100%', backgroundColor: theme.colors.primary }}>
                    <Header logoleft={true} navigation={this.props.navigation} search={true} notification={true} />
                </View>
                <View style={{ marginTop: getStatusBarHeight() + moderateScale(50) }} />
                <CeleberatyHeader {...this.props} />
                <Loader isLoading={this.state.isLoading} />
                <Events onRefresh={() => { this.fetchRequests(); }} isLoading={this.state.isLoading} {...this.props} events={this.state.events} />


            </View >
        );
    }


}

const mapStateToProps = (state) => ({
    data: {


    },
})
const mapDispatchToProps = (dispatch) => ({
    actions: {
    }
})


const styles = StyleSheet.create({
    container_scrolling: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: 'white'
    },
    wrapper: {
        flex: 1,
    },
    heading: {
        fontSize: moderateScale(14),
        color: theme.colors.primary,
        width: '100%', fontWeight: '500', alignSelf: 'flex-start'
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Cart))
