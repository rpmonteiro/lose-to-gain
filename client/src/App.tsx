import React, { Component } from 'react'
import './App.css'
import GoogleLogin from 'react-google-login'

export default class App extends Component {
    onGoogleLogin = (res: any) => {
        fetch('http://localhost:5000/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                googleToken: res.tokenId
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log({ data })
            })
            .catch((err) => console.log({ err }))

        console.log({ res })
    }

    render() {
        return (
            <div className="App">
                <GoogleLogin
                    clientId="1022232016844-5umaao3o00c6fm920vsgitgkhnb3gr9b.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.onGoogleLogin}
                    onFailure={(err: any) => console.log({ err })}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        )
    }
}
