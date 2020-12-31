import React, { Component } from 'react';
import { StyleSheet, View, StatusBar, I18nManager } from 'react-native'

import { setUser } from '../../../../utils/storage'
import { theme } from '../../../../core/theme';
import { Block, Text, } from '../../../../components/widget';
import * as loginActions from '../../../../actions/Actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSuccess, showDanger, translate } from '../../../../utils/utils';
import ImagePicker from 'react-native-image-picker'
import { BASE_API_URL_IMAEG_ORIGINAL } from '../../../../services/config';
import ImageView from 'react-native-image-view';
import Button from 'apsl-react-native-button'
import { Input } from 'react-native-elements';
import { moderateScale } from 'react-native-size-matters';
import Header from '../childs/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from "react-native-vector-icons/FontAwesome";
import { SliderBox } from '../../../../components/react-native-image-slider-box';
import RNPickerSelect from 'react-native-picker-select';
import * as Apis from '../../../../services/Apis';
import DatePicker from 'react-native-date-picker'




class Profile extends Component {

    state = {
        notifications: true, language: false, profileUrl: {}, settings: {}, user: {}, isImageViewVisible: false, isLoading: false, SaveprofileLoading: false, Countries: [], country: this.props.data.userInfo.country
    }

    constructor(props) {
        super(props);
    }

    onSuccess = (response) => {
        this.setState({ isLoading: false });
        console.log(response);
        if (response.code === 200) {
            var url = response.data.urls[0];
            if (url) {
                this.state.user.profile = url;
                this.setState({ user: this.state.user })
                this.props.actions.settings.updateProfile(this.state.user, this.ProfileonSuccess, this.ProfileonError);
            }
        }

    }

    onError = (error) => {
        this.setState({ isLoading: false });
        console.log(error);
        showSuccess('Try Again');
    }



    getCountry() {
        Apis.Get('country?isPagination=false',).then((data) => {
            for (let k in data.results) {
                this.state.Countries.push({ label: data.results[k].title, value: data.results[k]._id })
            }
            this.setState({ isLoading: false, Countries: this.state.Countries })
        }).catch((error) => {
            console.log(error);
            this.setState({ isLoading: false })
        })
    }


    onSuccessProfile = (user) => {
        this.setState({ isLoading: false });
        this.setState({ country: this.props.data.userInfo.country })
        this.setState({ user: this.props.data.userInfo })


    }

    onErrorProfile = (error) => {
        this.setState({ isLoading: false });
        console.log(error);
        showDanger(translate('Error'));
    }

    ProfileonSuccess = (response) => {
        this.setState({ isLoading: false, SaveprofileLoading: false });
        console.log('Profile', response);
        this.props.actions.settings.setProfileUpdates(this.state.user);
    }

    ProfileonError = (error) => {
        this.setState({ isLoading: false, SaveprofileLoading: false });
        console.log('Profile', error);
        showDanger(translate('Error'));
    }


    componentDidMount() {

        this.setState({ isLoading: true, user: this.props.data.userInfo })
        setTimeout(() => {
            this.getCountry();
            this.props.actions.settings.fetchUserInfo(this.onSuccessProfile, this.onErrorProfile)
        }, 500);

    }


    selectImage() {
        this.setState({ isLoading: true })

        const options = {
            title: 'Select picture',
            customButtons: [{ name: 'view', title: 'View Profile Picture' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
                quality: 1,
                allowsEditing: true
            },
        };


        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                this.setState({ isLoading: false })
                // console.log('User cancelled image picker');
            } else if (response.error) {
                this.setState({ isLoading: false })
                // console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                this.setState({ isLoading: false, isImageViewVisible: true })
                // console.log('User tapped custom button: ', response.customButton);
            } else {

                // You can also display the image using data:
                const source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({ profileUrl: { source: source } })

                var data = new FormData();

                var photo = {
                    uri: response.uri,
                    type: response.type,
                    name: 'profile.jpg',
                };
                data.append('images', photo);
                // console.log(data);

                setTimeout(() => {
                    this.props.actions.settings.uploadProfile(data, this.onSuccess, this.onError)
                }, 300);
            }
        });
    }
    saveProfile() {

        if (this.state.user.old_password && this.state.user.new_password) {
            if (this.state.new_password !== this.state.confirm_new_password) {
                showDanger("Password not Match");
                return;
            }
        }

        this.state.user.country = this.state.country ? this.state.country._id : '';
        this.setState({ SaveprofileLoading: true })
        this.props.actions.settings.updateProfile(this.state.user, this.ProfileonSuccess, this.ProfileonError);
    }

    Newsletter(value) {
        this.setState({ notifications: value });
        if (value) {
            this.state.user.newsletter = 1;
        } else {
            this.state.user.newsletter = 0;
        }
        this.setState({ user: this.state.user })
        // console.log(this.state.user)


    }


    render() {
        const { isImageViewVisible } = this.state;

        var images = [];
        for (let k in this.props.data.userInfo.images) {
            images.push(BASE_API_URL_IMAEG_ORIGINAL + this.props.data.userInfo.images[k].url)
        }


        return (
            <View style={styles.container} >
                <StatusBar backgroundColor="transparent" barStyle="light-content" />

                <Header color={theme.colors.primary} search={false} backPrimary={false} back={true} Text={translate('Profile').toUpperCase()} navigation={this.props.navigation} backclick={() => { this.props.navigation.pop() }} />

                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', width: '100%', alignContent: 'center', alignSelf: 'center' }}>
                    <Block style={styles.toggles}>


                        <View style={{ marginHorizontal: moderateScale(10), marginTop: moderateScale(20) }}>



                            {this.state.user.role !== 'user' &&
                                <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: moderateScale(20), height: moderateScale(200) }}>
                                    <SliderBox resizeMode="cover" style={{
                                        height: moderateScale(200),
                                        backgroundColor: 'white', width: '90%', alignSelf: 'center', borderRadius: moderateScale(10)
                                    }}
                                        images={images} pagination={true}
                                    />
                                </View>
                            }




                            <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10), marginTop: moderateScale(20) }}>{translate('Frist Name')}</Text>
                            <Input
                                placeholderTextColor={theme.colors.gray02}
                                returnKeyType="next"
                                value={this.state.user.first_name}
                                placeholder={translate('Frist Name')}
                                onChangeText={(value) => { this.state.user.first_name = value; this.setState({ user: this.state.user }) }}
                                autoCapitalize="none"
                                labelStyle={{ color: theme.colors.white, ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}
                                inputContainerStyle={{
                                    width: '100%', height: moderateScale(45),
                                    ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                }}
                                inputStyle={{
                                    borderColor: theme.colors.gray05, marginTop: moderateScale(3),
                                    borderRadius: moderateScale(3), ...I18nManager.isRTL ? { textAlign: 'right' } : {}

                                }}
                                containerStyle={{ marginTop: moderateScale(1) }}
                            />


                            <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10) }}>{translate('Last Name')}</Text>
                            <Input
                                placeholderTextColor={theme.colors.gray02}
                                returnKeyType="next"
                                value={this.state.user.last_name}
                                placeholder={translate('Last Name')}
                                onChangeText={(value) => { this.state.user.last_name = value; this.setState({ user: this.state.user }) }}
                                autoCapitalize="none"
                                autoCompleteType="email"
                                textContentType="emailAddress"
                                labelStyle={{ color: theme.colors.black, marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}
                                inputContainerStyle={{
                                    width: '100%', height: moderateScale(45),
                                    ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                }}
                                inputStyle={{
                                    borderColor: theme.colors.gray05, marginTop: moderateScale(3),
                                    borderRadius: moderateScale(3), ...I18nManager.isRTL ? { textAlign: 'right' } : {}

                                }}
                                containerStyle={{ marginTop: moderateScale(1) }}
                                keyboardType="email-address" />



                            <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10) }}>{translate('Email')}</Text>
                            <Input
                                placeholderTextColor={theme.colors.gray02}
                                returnKeyType="next"
                                disabled
                                value={this.state.user.email}
                                placeholder={translate('Last Name')}
                                onChangeText={(value) => { this.state.user.email = value; this.setState({ user: this.state.user }) }}
                                autoCapitalize="none"
                                autoCompleteType="email"
                                textContentType="emailAddress"
                                labelStyle={{ color: theme.colors.black, marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}
                                inputContainerStyle={{
                                    width: '100%', height: moderateScale(45),
                                    ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                }}
                                inputStyle={{
                                    borderColor: theme.colors.gray05, marginTop: moderateScale(3),
                                    borderRadius: moderateScale(3), ...I18nManager.isRTL ? { textAlign: 'right' } : {}

                                }}
                                containerStyle={{ marginTop: moderateScale(1) }}
                                keyboardType="email-address" />

                            <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10) }}>{translate('Phone')}</Text>
                            <Input
                                placeholderTextColor={theme.colors.gray02}
                                returnKeyType="next"
                                value={this.state.user.phone}
                                disabled
                                placeholder={translate('Phone')}
                                onChangeText={(value) => { this.state.user.phone = value; this.setState({ user: this.state.user }) }}
                                autoCapitalize="none"
                                autoCompleteType="email"
                                labelStyle={{ color: theme.colors.black, marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}
                                inputContainerStyle={{
                                    width: '100%', height: moderateScale(45),
                                    ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                }}
                                inputStyle={{
                                    borderColor: theme.colors.gray05, marginTop: moderateScale(3),
                                    borderRadius: moderateScale(3), ...I18nManager.isRTL ? { textAlign: 'right' } : {}
                                }}
                                containerStyle={{ marginTop: moderateScale(1) }}
                                textContentType="emailAddress"
                                keyboardType="email-address" />

                            <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10) }}>{translate('Facebook link')}</Text>

                            <Input
                                labelStyle={{ color: theme.colors.secondary }}
                                containerStyle={{ marginTop: moderateScale(1) }}
                                inputContainerStyle={{
                                    width: '100%', height: moderateScale(45),
                                    ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                }}
                                inputStyle={{
                                    borderColor: theme.colors.gray05, marginTop: moderateScale(3),
                                    borderRadius: moderateScale(3), ...I18nManager.isRTL ? { textAlign: 'right' } : {}
                                }}
                                returnKeyType="next"
                                onSubmitEditing={() => { this.onPress() }}
                                leftIcon={
                                    <Icon
                                        name="facebook"
                                        size={22}
                                        style={{ marginEnd: moderateScale(10), marginStart: moderateScale(-10) }}
                                        color={theme.colors.gray03}
                                    />}
                                placeholder={translate('Facebook link')}
                                placeholderTextColor={theme.colors.gray02}
                                value={this.state.user.facebook}
                                onChangeText={(value) => this.setState({ facebook: value })}
                            />



                            <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10) }}>{translate('Instagram link')}</Text>

                            <Input
                                labelStyle={{ color: theme.colors.secondary }}
                                containerStyle={{ marginTop: moderateScale(1) }}
                                inputContainerStyle={{
                                    width: '100%', height: moderateScale(45),
                                    ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                }}
                                inputStyle={{
                                    borderColor: theme.colors.gray05, marginTop: moderateScale(3),
                                    borderRadius: moderateScale(3), ...I18nManager.isRTL ? { textAlign: 'right' } : {}
                                }}
                                returnKeyType="next"
                                onSubmitEditing={() => { this.onPress() }}
                                leftIcon={
                                    <Icon
                                        name="instagram"
                                        size={22}
                                        style={{ marginEnd: moderateScale(10), marginStart: moderateScale(-10) }}
                                        color={theme.colors.gray03}
                                    />}
                                placeholder={translate('Instagram link')}
                                placeholderTextColor={theme.colors.gray02}
                                value={this.state.user.instagram}
                                onChangeText={(value) => this.setState({ instagram: value })}
                            />



                            <Text style={{ color: theme.colors.gray04, marginTop: moderateScale(10), fontSize: moderateScale(15), paddingHorizontal: moderateScale(15), width: '100%', ...I18nManager.isRTL ? { textAlign: 'left' } : {}, fontWeight: 'bold' }}>{translate('Select Country')}</Text>

                            {this.state.Countries.length !== 0 &&
                                <RNPickerSelect
                                    textInputProps={{
                                        borderColor: theme.colors.gray05, backgroundColor: theme.colors.gray01, borderRadius: moderateScale(10),
                                        borderWidth: 0, height: moderateScale(40), marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(10), marginTop: moderateScale(10)
                                    }}
                                    Icon={() => {
                                        return (
                                            <View style={{ height: moderateScale(45), justifyContent: 'center', alignItems: 'center', alignContent: 'center', top: moderateScale(10), right: moderateScale(10) }}>
                                                <Icon
                                                    name="caret-down"
                                                    size={22}
                                                    style={{ marginEnd: 10 }}
                                                    color={theme.colors.gray03}
                                                />
                                            </View>
                                        )
                                    }}
                                    value={this.state.country._id}
                                    style={{ marginBottom: moderateScale(10), paddingHorizontal: moderateScale(10) }}
                                    placeholder={
                                        {
                                            label: 'Select Country',
                                            value: '',
                                            color: theme.colors.gray02
                                        }
                                    }
                                    placeholderTextColor={theme.colors.gray02}
                                    onValueChange={(value) => { this.setState({ country: { _id: value } }); console.log('this.state.country', this.state.country); }}
                                    items={this.state.Countries}
                                />


                            }




                            <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10) }}>{translate('City')}</Text>
                            <Input
                                placeholderTextColor={theme.colors.gray02}
                                returnKeyType="next"
                                value={this.state.user.city}
                                placeholder={translate('City')}
                                onChangeText={(value) => { this.state.user.city = value; this.setState({ user: this.state.user }) }}
                                autoCapitalize="none"
                                autoCompleteType="email"
                                labelStyle={{ color: theme.colors.black, marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}
                                inputContainerStyle={{
                                    width: '100%', height: moderateScale(45),
                                    ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                }}
                                inputStyle={{
                                    borderColor: theme.colors.gray05, marginTop: moderateScale(3),
                                    borderRadius: moderateScale(3), ...I18nManager.isRTL ? { textAlign: 'right' } : {}
                                }}
                                containerStyle={{ marginTop: moderateScale(1) }}
                                textContentType="emailAddress"
                                keyboardType="email-address" />

                            <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10) }}>{translate('Birth Day')}</Text>


                            <View style={{
                                borderColor: theme.colors.gray01, backgroundColor: theme.colors.gray01, borderRadius: moderateScale(20),
                                borderWidth: 0, marginHorizontal: moderateScale(10), ...I18nManager.isRTL ? { paddingEnd: 10, textAlign: 'right' } : {}, paddingHorizontal: moderateScale(0), marginTop: moderateScale(5), justifyContent: 'center', alignContent: 'center', alignItems: 'center'
                            }}>
                                {this.state.user && this.state.user.birthday &&
                                    <DatePicker
                                        date={new Date(this.state.user.birthday)}
                                        minimumDate={new Date()}
                                        maximumDate={new Date(new Date().setDate(new Date().getDate() + (30 * 3)))}
                                        onDateChange={(date) => { this.setState({ Bookingdate: date }) }}
                                    />}
                            </View>


                            {/* <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10) }}>{translate('Old Password')}</Text>
                            <Input
                                placeholderTextColor={theme.colors.gray02}
                                returnKeyType="next"
                                placeholder={translate('Old Password')}
                                value={this.state.old_password}
                                labelStyle={{ color: theme.colors.black, marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}
                                inputContainerStyle={{
                                    width: '100%', height: moderateScale(45),
                                    ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                }}
                                inputStyle={{
                                    borderColor: theme.colors.gray05, marginTop: moderateScale(3),
                                    borderRadius: moderateScale(3), ...I18nManager.isRTL ? { textAlign: 'right' } : {},

                                }}
                                containerStyle={{ marginTop: moderateScale(1) }}
                                onChangeText={(value) => { this.state.user.old_password = value; this.setState({ user: this.state.user }) }}
                                secureTextEntry />






                            <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10) }}>{translate('New Password')}</Text>
                            <Input
                                placeholderTextColor={theme.colors.gray02}
                                returnKeyType="next"
                                placeholder={translate('New Password')}
                                value={this.state.new_password}
                                labelStyle={{ color: theme.colors.black, marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}
                                inputContainerStyle={{
                                    width: '100%', height: moderateScale(45),
                                    ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                }}
                                inputStyle={{
                                    borderColor: theme.colors.gray05, marginTop: moderateScale(3),
                                    borderRadius: moderateScale(3), ...I18nManager.isRTL ? { textAlign: 'right' } : {}

                                }}
                                containerStyle={{ marginTop: moderateScale(1) }}
                                secureTextEntry />


                            <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10) }}>{translate('Confirm New Password')}</Text>
                            <Input
                                returnKeyType="next"
                                placeholder={translate('Confirm New Password')}
                                value={this.state.confirm_new_password}
                                placeholderTextColor={theme.colors.gray02}
                                onChangeText={(value) => { this.state.user.confirm_new_password = value; this.setState({ user: this.state.user }) }}
                                labelStyle={{ color: theme.colors.black, marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}
                                inputContainerStyle={{
                                    width: '100%', height: moderateScale(45),
                                    ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                }}
                                inputStyle={{
                                    borderColor: theme.colors.gray05, marginTop: moderateScale(3),
                                    borderRadius: moderateScale(3), ...I18nManager.isRTL ? { textAlign: 'right' } : {}

                                }}
                                containerStyle={{ marginTop: moderateScale(1) }}
                                secureTextEntry /> */}



                            {this.state.user.role !== 'user' &&
                                <Text style={{ color: theme.colors.secondary, fontWeight: '600', marginBottom: moderateScale(10), fontSize: moderateScale(14), marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, marginHorizontal: moderateScale(10) }}>{translate('Details')}</Text>
                            }

                            {this.state.user.role !== 'user' &&
                                <Input
                                    placeholderTextColor={theme.colors.gray02}
                                    returnKeyType="next"
                                    value={this.state.user.description}
                                    placeholder={translate('Details')}
                                    onChangeText={(value) => { this.state.user.description = value; this.setState({ user: this.state.user }) }}
                                    autoCapitalize="none"
                                    multiline={true}
                                    autoCompleteType="email"
                                    textContentType="emailAddress"
                                    labelStyle={{ color: theme.colors.black, marginTop: moderateScale(10), ...I18nManager.isRTL ? { textAlign: 'left' } : {}, }}
                                    inputContainerStyle={{
                                        width: '100%', height: moderateScale(145),
                                        ...I18nManager.isRTL ? { paddingHorizontal: moderateScale(10) } : { paddingHorizontal: moderateScale(10) }, borderBottomWidth: 0, backgroundColor: theme.colors.gray01, marginTop: moderateScale(5), borderRadius: moderateScale(10)
                                    }}
                                    inputStyle={{
                                        borderColor: theme.colors.gray05, marginTop: moderateScale(3),
                                        borderRadius: moderateScale(3), ...I18nManager.isRTL ? { textAlign: 'right' } : {}

                                    }}
                                    containerStyle={{ marginTop: moderateScale(1) }}
                                    keyboardType="email-address" />
                            }



                            <Button isLoading={this.state.SaveprofileLoading} style={{
                                borderColor: theme.colors.secondary, marginTop: moderateScale(5),
                                borderRadius: moderateScale(10), borderWidth: 0, backgroundColor: theme.colors.secondary, width: '80%', alignSelf: 'center', marginTop: moderateScale(20), marginBottom: moderateScale(50),
                            }} textStyle={{ fontSize: moderateScale(16), color: theme.colors.primary, fontWeight: '600' }}
                                onPress={() => {
                                    this.saveProfile();
                                }}>{translate('UPDATE')}</Button>

                        </View>


                    </Block>

                </KeyboardAwareScrollView>
                <ImageView
                    glideAlways
                    images={[this.state.profileUrl]}
                    imageIndex={0}
                    animationType="fade"
                    isVisible={isImageViewVisible}
                    onClose={() => this.setState({ isImageViewVisible: false })}
                    onImageChange={index => {

                    }}
                />
            </View>
        )
    }

}

const mapStateToProps = (state) => ({
    data: {
        userInfo: state.login.userInfo
    },
})


const mapDispatchToProps = (dispatch) => ({
    actions: {
        settings: bindActionCreators(loginActions, dispatch)
    }
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: theme.colors.white,
    },

    headerText: {
        fontSize: 25,
        alignSelf: 'center',
    },
    back: {
        alignSelf: 'flex-end',
        height: 50,
        width: 50,
        borderRadius: 20,
        marginRight: 10,
    },

    header: {
        marginTop: 100,
        marginBottom: 30,
        color: 'white',
        alignItems: 'center',
        paddingHorizontal: theme.sizes.base * 2,
    },
    avatar: {
        height: 120,
        width: 120
    },
    inputs: {
        marginTop: theme.sizes.base * 0,
        paddingHorizontal: theme.sizes.base * 2,
    },
    inputRow: {
        alignItems: 'flex-end'
    },
    sliders: {
        marginTop: theme.sizes.base * 0.7,
        paddingHorizontal: theme.sizes.base * 2,
    },
    thumb: {
        width: theme.sizes.base,
        height: theme.sizes.base,
        borderRadius: theme.sizes.base,
        borderColor: 'white',
        borderWidth: 3,
        backgroundColor: theme.colors.secondary,
    },
    groupHeader: {
        height: 40,
        backgroundColor: theme.colors.secondary,
        flexDirection: 'row',
        alignItems: 'center'
    },
    groupTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    groupTitleText: {
        flex: 0.9,
        paddingHorizontal: 10,
        fontSize: 17,
        fontWeight: '500',
        color: theme.colors.white
    },
    groupTitleArrow: {
        width: 12,
        tintColor: theme.colors.white,
        height: 12,
        flex: 0.1,
        marginRight: 5
    },
    toggles: {
        marginTop: 10,
        paddingHorizontal: theme.sizes.base * 1
    },
    iconCounter: {
        height: 120,
        width: 120,
    },
    iconCounterDummy: {
        height: 130,
        width: 130,
    },
    iconCounterText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center"
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Profile))