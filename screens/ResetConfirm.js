/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    Alert,
    ScrollView,
    ActivityIndicator,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { ResetConfirmRequest } from '../components/requests';
import { AuthContext } from '../components/context';

const ResetConfirmScreen = ({route,navigation}) => {

    const [data, setData] = React.useState({
        code: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const [isChecking, setIsChecking] = React.useState(false);

    const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if ( val.trim().length >= 10 && val.trim().length <= 12  ) {
            setData({
                ...data,
                code: val,
                check_textInputChange: true,

            });
        } else {
            setData({
                ...data,
                code: val,
                check_textInputChange: false,
            });
        }
    };

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val,
        });
    };

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val,
        });
    };

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry,
        });
    };

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry,
        });
    };

    const confirmHandle = (data) => {
        if ( data.code.length == 0 || data.password.length == 0 || data.confirm_password.length == 0 ) {
            Alert.alert('Invalid Inputs!', 'Some fields are empty.', [
                {text: 'Okay'},
            ]);
            return;
        }
        if (data.confirm_password !== data.password){
            Alert.alert('Invalid Inputs!', 'passwords do not match.', [
                {text:'okay'},
            ]);
            return;
        }
        setIsChecking(true);
        ResetConfirmRequest(data,route.params.token).then(result => {
            if (result.status === 'fail') {
                Alert.alert('Error!', result.info, [
                    {text: 'Okay'},
                ]);
                setIsChecking(false);
                return;
            }
            setIsChecking(false)
            signIn(result, result.username);
        });
    };

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='black' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Create New Password!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <Text style={{color: '#009387', paddingBottom:10, fontSize:14}}>
                kindly enter the Code sent to your Email, it can be 10,11 or 12 characters long.
            </Text>
            <ScrollView>
            <Text style={styles.text_footer}>Code</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="registered"
                    color="#FC6D3F"
                    size={20}
                />
                <TextInput 
                    placeholder="Code"
                    style={styles.textInput}
                    maxLength={12}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
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

            { data.check_textInputChange ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>code should be within 10-12 characters long.</Text>
            </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>New Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#FC6D3F"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm New Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#FC6D3F"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.confirm_secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {confirmHandle(data)}}
                >
                <LinearGradient
                    colors={['black', '#FC6D3F']}
                    style={styles.signIn}
                >
                    { isChecking == false ? (
                        <Text style={[styles.textSign, {
                            color:'#fff',
                        }]}>Change</Text>
                    )
                    :
                        <ActivityIndicator animating={isChecking} color='#fff' />
                    }
                </LinearGradient>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default ResetConfirmScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: 'black'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
        backgroundColor:"black"
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: 'black',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
