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
import { RegisterRequest } from '../components/requests';
import { AuthContext } from '../components/context';

const SignInScreen = ({route,navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        email:'',
        fullname:'',
        confirm_password: '',
        check_textInputChange: false,
        is_validuser:false,
        correct_email: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const [isChecking, setIsChecking] = React.useState(false);

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


    const fullnameChange = (val) => {
            setData({
                ...data,
                fullname: val,
            });
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

    const RegisterHandle = (data) => {
        if ( data.username.length == 0 || data.password.length == 0 || data.confirm_password.length == 0 || data.fullname.length == 0 || data.email.length == 0 ) {
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
        RegisterRequest(data).then(result => {
            if (result.token) {
                setIsChecking(false)
                signIn(result, data.username);
            } else {
                Alert.alert('Invalid User!', result.username[0], [
                    {text: 'Okay'},
                ]);
                setIsChecking(false);
                return;
            }
        }).catch(function(error) {
            setIsChecking(false);
            Alert.alert('Connection Error!','Request timed out', [
                {text: 'Try again'},
            ]);
        });
    };

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='black' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome To Traffic Manager</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer} 
        >
            <ScrollView>
            <Text style={[styles.text_header, {
                color:'black', alignSelf:'flex-end', marginBottom:5,
                }]}>Register Once!</Text>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#FC6D3F"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
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

            <Text style={[styles.text_footer, {marginTop: 35,}]}>Fullname</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="address-book-o"
                    color="#FC6D3F"
                    size={20}
                />
                <TextInput
                    placeholder="Your Fullname"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => fullnameChange(val)}
                />
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
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
            }]}>Confirm Password</Text>
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
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {RegisterHandle(data)}}
                >
                <LinearGradient
                    colors={['black', '#FC6D3F']}
                    style={styles.signIn}
                >
                    { isChecking == false ? (
                        <Text style={[styles.textSign, {
                            color:'#fff',
                        }]}>Register </Text>
                    )
                    :
                        <ActivityIndicator animating={isChecking} color='#fff' />
                    }
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('SignInScreen')}
                    style={[styles.signIn, {
                        borderColor: '#FC6D3F',
                        borderWidth: 1,
                        marginTop: 15,
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color:"#FC6D3F" 
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignInScreen;

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
        backgroundColor: "black"
    },
    errorMsg: {
        color:"#FC6D3F",
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
        borderRadius: 10,
        
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    color_textPrivate: {
        color:'#FC6D3F',
    },
  });
