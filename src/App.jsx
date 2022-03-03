import React from "react"
import {useAuthState} from "react-firebase-hooks/auth"
import {Oval} from "react-loader-spinner"

import {auth} from "lib/firebase"
import InitialRouting from "components/InitialRouting"
import Auth from "pages/Auth"

import images from "assets/img"

const App = () => {
    const [user, loading] = useAuthState(auth)

    if(loading) {
        return (
            <div className="app_loading">
                <div className="app_loading_contents">
                    <img src={images.DriveLogo} alt="logo"/>
                    <Oval
                        color="#33A852" height={120} width={120}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="app">
            {!user ? <Auth /> : <InitialRouting />}
        </div>
    )
}

export default App
