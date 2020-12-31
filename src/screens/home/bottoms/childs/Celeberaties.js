import React, { Component } from 'react';
import { View, StyleSheet, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../../../actions/Actions';
import { theme } from "../../../../core/theme";
import { moderateScale, scale } from 'react-native-size-matters';
import { Text } from '../../../../components/widget';
import { I18nManager } from 'react-native';
import { BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';
import Carousel from 'react-native-snap-carousel';



class Celeberaties extends Component {


    constructor(props) {
        super(props);

    }



    _renderItem({ item, index }) {
        return (
            <TouchableOpacity key={'main-category2' + index} style={[{
                marginTop: moderateScale(0), marginEnd: moderateScale(20), borderRadius: moderateScale(10)
            }]} onPress={() => { this.props.navigation.navigate('CeleberateDetails', { item: item }) }}>
                <View style={{ paddingVertical: moderateScale(10), }}>

                    <Image source={{ uri: (BASE_API_URL_IMAEG_ORIGINAL + (item.cover_image)) }} resizeMode={'cover'} style={{
                        height: moderateScale(220), width: '100%', borderRadius: moderateScale(0), marginTop: moderateScale(10), borderRadius: moderateScale(10), zIndex: 2,
                    }} />


                    <View style={{ paddingTop: moderateScale(20), top: moderateScale(-20), zIndex: 0, }}>
                        <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: moderateScale(5), justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingTop: moderateScale(5) }}>

                            <View style={{ flexDirection: 'row', paddingStart: moderateScale(10), flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', width: '100%' }}>
                                {item.verified === 0 &&
                                    <Image source={require('app/assets/assets/verified.png')} resizeMode={'cover'} style={{
                                        height: moderateScale(12), width: moderateScale(12), borderRadius: moderateScale(50)
                                    }} />}
                                <Text numberOfLines={1} style={[styles.heading, {
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'left',
                                    color: theme.colors.secondary, fontSize: moderateScale(11),
                                    marginHorizontal: moderateScale(5), marginEnd: moderateScale(10)
                                }]}>{item.first_name + ' ' + item.last_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderRadius: moderateScale(10), borderWidth: moderateScale(0.5), backgroundColor: theme.colors.white, padding: moderateScale(3) }}>
                                <Text style={[{
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'right',
                                    color: theme.colors.secondary, fontSize: moderateScale(7), paddingHorizontal: moderateScale(5)
                                }]}>{item.profession}</Text>

                                <Image source={{ uri: (BASE_API_URL_IMAEG_ORIGINAL + item.country.image) }} resizeMode={'cover'} style={{
                                    height: moderateScale(10), width: moderateScale(10), borderRadius: moderateScale(20),
                                }} />
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row', paddingHorizontal: moderateScale(0), marginTop: moderateScale(10),
                            borderRadius: moderateScale(10), paddingBottom: moderateScale(10), justifyContent: 'center', alignItems: 'center'
                        }}>


                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('CeleberateBooking', { item: item }) }} style={{
                                marginHorizontal: moderateScale(0), backgroundColor: theme.colors.secondary,
                                width: moderateScale(75), height: moderateScale(20), alignItems: 'center', borderRadius: moderateScale(10), justifyContent: 'center', borderColor: theme.colors.secondary, borderWidth: moderateScale(0.5)
                            }}>
                                <Text style={[styles.heading, {
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'center',
                                    color: theme.colors.white, fontSize: moderateScale(9),

                                }]}>{'Book Now'}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ flexDirection: 'row', paddingHorizontal: moderateScale(10), flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'flex-end' }}>
                                <Image source={require('app/assets/assets/heart.png')} resizeMode={'contain'} style={{
                                    height: moderateScale(25), width: moderateScale(25), borderRadius: moderateScale(50), ...item.isLike ? { tintColor: theme.colors.red } : { tintColor: theme.colors.primary }
                                }} />
                                <Text style={[{
                                    ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold', textAlign: 'right',
                                    color: theme.colors.secondary, fontSize: moderateScale(12), marginStart: moderateScale(5)
                                }]}>{item.likes}</Text>
                            </TouchableOpacity>
                            
                        </View>
                    </View>

                </View>

            </TouchableOpacity>
        )
    }





    render() {

        console.log(this.props.navigation)

        return (
            <View style={{
                backgroundColor: theme.colors.white
            }}>
                <FlatList
                    data={this.props.celeberatiesWithCategory}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: moderateScale(50) }}
                    renderItem={({ item, index }) => (
                        <View key={'main-category1' + index}
                            style={[{
                                marginTop: moderateScale(0), borderRadius: moderateScale(10)
                            }]}>
                            <View
                                style={{ paddingHorizontal: moderateScale(0) }} >
                                <View style={{ width: '100%', flexDirection: 'row' }}>

                                    <Text style={[{
                                        fontWeight: 'bold', paddingStart: moderateScale(10),
                                        color: theme.colors.secondary, fontSize: moderateScale(25), paddingVertical: moderateScale(0),
                                        marginHorizontal: moderateScale(10),
                                    }]}>{ }{String(item.title)}</Text>
                                    {index === 0 &&
                                        <Image source={require('app/assets/assets/star.png')} resizeMode={'contain'} style={{
                                            height: moderateScale(20), width: moderateScale(20), borderRadius: moderateScale(50), marginTop: moderateScale(-5), marginStart: moderateScale(-5)
                                        }} />
                                    }
                                </View>

                                <View style={{ marginStart: moderateScale(0), marginTop: moderateScale(-5) }}>
                                    <Carousel
                                        layout={'default'}
                                        data={item.celeberities}
                                        loop={true}
                                        renderItem={(item, index) => this._renderItem(item, index)}
                                        itemWidth={Dimensions.get('screen').width / 1.8}
                                        sliderWidth={Dimensions.get('screen').width}
                                        inactiveSlideScale={0.95}
                                        inactiveSlideOpacity={1}
                                        enableMomentum={true}
                                        activeSlideAlignment={'center'}
                                        containerCustomStyle={styles.slider}
                                        contentContainerCustomStyle={styles.sliderContentContainer}
                                        activeAnimationType={'timing'}
                                        activeAnimationOptions={{
                                            friction: 4,
                                            tension: 40
                                        }}
                                    />
                                </View>
                            </View>
                        </View>


                    )}
                    showsVerticalScrollIndicator={false}

                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container_scrolling: {
        flex: 1,
        backgroundColor: theme.colors.white,

    },
    wrapper: {
        flex: 1,
        backgroundColor: theme.colors.gray06
    },
    wrapperCategory: {
        paddingRight: 0,
        paddingStart: scale(8),
        flex: 1
    },

    exampleContainer: {
        paddingVertical: moderateScale(15),
    },
    sliderContentContainer: {
        paddingVertical: 0,
    },
    slider: {
        marginTop: 0,
        overflow: 'visible',
    },
    card: {
        width: '100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    heading: {
        fontSize: moderateScale(14),
        color: theme.colors.primary,
        width: '100%', fontWeight: '500', alignSelf: 'flex-start'
    }
});



const mapStateToProps = (state) => ({
    data: {
        cart: state.app.cart,
        userInfo: state.login.userInfo,
    },
})
const mapDispatchToProps = (dispatch) => ({
    actions: {
        product: bindActionCreators(loginActions, dispatch)
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Celeberaties))


