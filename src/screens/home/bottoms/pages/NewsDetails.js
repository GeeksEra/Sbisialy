import React, { Component } from 'react';
import { StyleSheet, StatusBar, View, Image, ScrollView, Dimensions, useWindowDimensions } from 'react-native'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../childs/Header';
import { moderateScale } from 'react-native-size-matters';
import { translate } from '../../../../utils/utils';
import { BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';
import Icon from 'react-native-vector-icons/FontAwesome'
import HTML from 'react-native-render-html';
import moment from 'moment'
import WebView from 'react-native-webview';
import { getParentsTagsRecursively } from 'react-native-render-html/src/HTMLUtils';
import { Linking } from 'react-native';
import { SliderBox } from '../../../../components/react-native-image-slider-box';



const injectedScript = function () {
    function waitForBridge() {
        if (this.WebViewBridge) {
            let height = 0;
            if (document.documentElement.clientHeight > document.body.clientHeight) {
                height = document.documentElement.clientHeight
            }
            else {
                height = document.body.clientHeight
            }
            this.WebViewBridge.send(height.toString())
        } else {
            setTimeout(waitForBridge, 600);
        }
    }
    waitForBridge()
};


class NewsDetails extends Component {


    videoPlayer = [];
    GiftvideoPlayer = [];


    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, selectedtab: 4, celebraty: this.props.navigation.state.params.item,
            webViewHeight: this.props.defaultHeight

        }

        this._onMessage = this._onMessage.bind(this);



    }


    componentDidMount() {
        for (let k in this.state.celebraty.videos) {
            this.state.celebraty.videos[k].isLoading = true;
            this.state.celebraty.videos[k].play = true;
        }
        for (let k in this.state.celebraty.giftVideos) {
            this.state.celebraty.giftVideos[k].isLoading = true;
            this.state.celebraty.giftVideos[k].play = true;
        }
        this.setState({ celebraty: this.state.celebraty })
    }


    static defaultProps = {
        autoHeight: true,
    }



    _onMessage(e) {
        this.setState({
            webViewHeight: parseInt(e.nativeEvent.data)
        });
    }

    stopLoading() {
        this.webview.stopLoading();
    }


    render() {


        var images = [];
        for (let k in this.props.navigation.state.params.item.images) {
            images.push(BASE_API_URL_IMAEG_ORIGINAL + this.props.navigation.state.params.item.images[k])
        }
        var item = this.props.navigation.state.params.item;
        return (
            <Block>
                <StatusBar backgroundColor="transparent" barStyle="light-content" />
                <Header search={false} back={false} back={true} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} Text={translate('News Details')} />


                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View showsVerticalScrollIndicator={false} style={{ flexDirection: 'column' }}>
                        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: moderateScale(20), height: moderateScale(200) }}>
                            <SliderBox resizeMode="cover" style={{
                                height: moderateScale(200),
                                backgroundColor: 'white', width: '90%', alignSelf: 'center', borderRadius: moderateScale(10)
                            }}
                                images={images} pagination={true}
                            />
                            <Icon size={moderateScale(30)} name="share-square" color={theme.colors.primary} style={{
                                height: moderateScale(30), width: moderateScale(30), marginEnd: moderateScale(15), position: 'absolute', zIndex: 10, right: moderateScale(10), top: moderateScale(10)
                            }} />
                        </View>
                        <View style={{ width: '100%', zIndex: 0, marginTop: moderateScale(10), height: moderateScale(140), marginHorizontal: moderateScale(20) }}>

                            <View style={{
                                flex: 1, flexDirection: 'row',
                                alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(0), borderBottomWidth: moderateScale(0.5), borderBottomColor: theme.colors.gray05, paddingBottom: moderateScale(5)
                            }}>
                                <Image resizeMode="contain"
                                    style={{
                                        height: moderateScale(15), width: moderateScale(15), marginEnd: moderateScale(5)
                                    }}
                                    source={require('app/assets/assets/link.png')}
                                />
                                <Text style={[{
                                    fontWeight: 'bold',
                                    fontSize: moderateScale(10),
                                }]}>{item.source_name}</Text>
                            </View>
                            <Text style={[{
                                fontWeight: 'bold',
                                fontSize: moderateScale(20), marginTop: moderateScale(10),
                                marginHorizontal: moderateScale(5),
                            }]}>{item.title}</Text>
                            <View style={{ borderBottomWidth: moderateScale(0.5), borderBottomColor: theme.colors.gray05, paddingBottom: moderateScale(10) }} />

                            <View style={{
                                flex: 1, flexDirection: 'row',
                                alignItems: 'center', alignContent: 'center', marginBottom: moderateScale(5), marginTop: moderateScale(10)
                            }}>


                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(5), borderRadius: moderateScale(5), borderWidth: moderateScale(0.5), padding: moderateScale(2), paddingHorizontal: moderateScale(5)
                                }}>
                                    <Image resizeMode="contain"
                                        style={{
                                            height: moderateScale(20), width: moderateScale(20), marginEnd: moderateScale(5)
                                        }}
                                        source={require('app/assets/assets/time.png')}
                                    />
                                    <Text style={[{
                                        fontWeight: 'bold',
                                        fontSize: moderateScale(10),
                                    }]}>{moment(new Date(item.createdAt)).format('d MMM YYYY')}</Text>
                                </View>


                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center', alignContent: 'center', marginHorizontal: moderateScale(5), marginBottom: moderateScale(5), borderRadius: moderateScale(5), borderWidth: moderateScale(0.5), padding: moderateScale(2), paddingHorizontal: moderateScale(5)
                                }}>
                                    <Icon size={moderateScale(20)} name="eye" color={'#3f729b'} style={{
                                        height: moderateScale(20), width: moderateScale(20), marginEnd: moderateScale(5)
                                    }} />

                                    <Text style={[{
                                        fontWeight: 'bold',
                                        fontSize: moderateScale(10),
                                    }]}>{'11 views'}</Text>
                                </View>




                            </View>
                        </View>
                    </View>
                    <WebView
                        onNavigationStateChange={(event) => {
                            console.log(event)
                            // if (event.url !== uri) {
                            //     Linking.openURL(event.url)
                            // }
                        }}
                        onLoadStart={() => {
                            this.setState({ showWebView: false })
                        }}

                        onLoadEnd={() => {
                            if (!this.state.showWebView) {
                                this.setState({ showWebView: true })
                            }
                        }}

                        javaScriptEnabled={true} source={{ html: '<div style="    direction: rtl;">' + this.decodeHTMLEntities(item.description) + '</div>' }} style={{ marginHorizontal: moderateScale(20), marginTop: moderateScale(20), textAlign: 'justify' }} />
                </ScrollView>

            </Block >
        )

    }

    decodeHTMLEntities(text) {
        var entities = [
            ['amp', '&'],
            ['apos', '\''],
            ['#x27', '\''],
            ['#x2F', '/'],
            ['#39', '\''],
            ['#47', '/'],
            ['lt', '<'],
            ['gt', '>'],
            ['nbsp', ' '],
            ['quot', '"']
        ];

        for (var i = 0, max = entities.length; i < max; ++i)
            text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);

        return text;
    }

}
const mapStateToProps = (state) => ({
    data: {
        userInfo: state.login.userInfo
    },
})
const mapDispatchToProps = (dispatch) => ({
    actions: {
        about: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: '#fff',
    },

});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(NewsDetails))