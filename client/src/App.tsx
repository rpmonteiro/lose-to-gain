import React, { Component } from 'react'
import './App.css'
import GoogleLogin from 'react-google-login'
import axios from 'axios'
import { UserVM } from '../../shared-types'

interface AppState {
    user: UserVM
    fitbitLoggedIn: boolean
    loggedInGoogle: boolean
}

export default class App extends Component<{}, AppState> {
    state = {
        user: {
            google_id: '',
            first_name: '',
            fitbit_linked: false
        },
        fitbitLoggedIn: false,
        loggedInGoogle: false
    }

    onGoogleLogin = (res: any) => {
        axios
            .post<UserVM>('http://localhost:5000/google-auth', {
                googleToken: res.tokenId
            })
            .then((response) => {
                console.log({ response })
                this.setState({
                    user: response.data,
                    loggedInGoogle: true
                })
            })
            .catch((err) => console.log({ err }))
    }

    render() {
        const { loggedInGoogle, user } = this.state

        const userIsConnectedToFitbit = user.fitbit_linked
        const googleLoginButton = (
            <GoogleLogin
                clientId="1022232016844-5umaao3o00c6fm920vsgitgkhnb3gr9b.apps.googleusercontent.com"
                buttonText="Login"
                isSignedIn={true}
                onSuccess={this.onGoogleLogin}
                onFailure={(err: any) => console.log({ err })}
                cookiePolicy={'single_host_origin'}
            />
        )

        const fitbitLoginButton = (
            <a href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22DPRT&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ffitbit-auth&scope=weight&expires_in=604800">
                Fitbit
            </a>
        )

        const userInfo = loggedInGoogle && <div>{(user as any).first_name}</div>

        return (
            <div className="App">
                {!loggedInGoogle && googleLoginButton}
                {userInfo}
                {loggedInGoogle && !userIsConnectedToFitbit && fitbitLoginButton}
            </div>
        )
    }
}
