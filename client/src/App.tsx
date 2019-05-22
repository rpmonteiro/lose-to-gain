import React, { Component } from 'react'
import './App.css'
import GoogleLogin from 'react-google-login'
import axios from 'axios'

interface User {
    active: boolean
    email: string
    first_name: string
    google_id: string
    id: number
    invited_by: null | string
    last_name: string
}

interface AppState {
    user: User
    fitbitLoggedIn: boolean
    loggedInGoogle: boolean
}

export default class App extends Component<{}, AppState> {
    state = {
        user: {
            active: false,
            email: '',
            first_name: '',
            google_id: '',
            id: 0,
            invited_by: null,
            last_name: ''
        },
        fitbitLoggedIn: false,
        loggedInGoogle: false
    }

    componentDidMount() {
        const url = window.location.href
        if (url.includes('fitbit-auth')) {
            setTimeout(() => {
                console.log('user', this.state.user)
                const authCode = window.location.search.split('code=')[1]
                // window.location.replace('http://localhost:3000')
                axios
                    .post('http://localhost:5000/fitbit-auth', {
                        userId: this.state.user.id,
                        fitbitAuthCode: authCode
                    })
                    .then((lala) => console.log({ lala }))
                    .catch((err) => {
                        console.log({ err })
                    })
            }, 3000)
        }
    }

    onGoogleLogin = (res: any) => {
        axios
            .post<User>('http://localhost:5000/google-auth', {
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

        const userInfo = loggedInGoogle && <div>{(user as any).first_name}</div>

        return (
            <div className="App">
                {!loggedInGoogle && googleLoginButton}
                {userInfo}
                <a href="https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=22DPRT&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Ffitbit-auth&scope=weight&expires_in=604800">
                    Fitbit
                </a>
            </div>
        )
    }
}
