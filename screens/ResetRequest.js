/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    ActivityIndicator,
    Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';
import { ResetRequest } from '../components/requests';
import { AuthContext } from '../components/context';


const ResetRequestScreen = ({route, navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        email: '',
        check_textInputChange: false,
        isValidUser: true,
        correct_email: false,
    });

    const [isChecking, setIsChecking] = React.useState(false);

    const { colors } = useTheme();

    const { signIn } = React.useContext(AuthContext);


    const textInputChange = (val) => {
        if ( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false,
            });
        }
    };

    const Emailinputchange = (val) => {
        if ( String(val).includes('@') ) {
            setData({
                ...data,
                email: val,
                correct_email: true,
            });
        } else {
            setData({
                ...data,
                email: val,
                correct_email: false,
            });
        }
    };

    const handleValidUser = (val) => {
        if ( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true,
            });
        } else {
            setData({
                ...data,
                isValidUser: false,
            });
        }
    };

    const ConfirmHandle = (userName, email) => {
        if ( data.username.length == 0 || data.email.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or email field cannot be empty.', [
                {text: 'Okay'},
            ]);
            return;
        }
        setIsChecking(true);
        ResetRequest(userName,email).then(result => {
            if (result.status === 'fail') {
                Alert.alert('Invalid Infos!', result.info, [
                    {text: 'Okay'},
                ]);
                setIsChecking(false);
                return;
            }
            setIsChecking(false)
            navigation.navigate('ResetConfirmScreen',{token:result.token});
        });
    };

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor="black" barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Password Reset!</Text>
        </View>
        <Animatable.View
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background,
            }]}
        >
            <Text style={{color: '#009387', paddingTop:0,paddingBottom:10}}>Kindly ensure the email and username corresponds to the account to be resetted</Text>
            <Text style={[styles.text_footer, {
                color: colors.text,
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="user-o"
                    color="#FC6D3F"
                    size={20}
                />
                <TextInput
                    placeholder="Your Username"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text,
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ?
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Username must be atleast 4 characters long.</Text>
            </Animatable.View>
            }


            <Text style={[styles.text_footer, {marginTop: 35,}]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="envelope-o"
                    color="#FC6D3F"
                    size={20}
                />
                <TextInput
                    textContentType="emailAddress"
                    placeholder="Your Email"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => Emailinputchange(val)}
                />
                {data.correct_email ?
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {ConfirmHandle( data.username, data.email );}}
                >
                <LinearGradient
                    colors={['black', '#FC6D3F']}
                    style={styles.signIn}
                >
                    { isChecking == false ? (
                        <Text style={[styles.textSign, {
                            color:'#fff',
                        }]}>Submit Request</Text>
                    )
                    :
                        <ActivityIndicator animating={isChecking} color='#fff' />
                    }
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default ResetRequestScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        backgroundColor: "black"
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    text_footer: {
        color: 'black',
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50,
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
  });
