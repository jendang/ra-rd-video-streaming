import React from 'react'

class GoogleAuth extends React.Component {
    state = { isSignedIn: null }

    componentDidMount() {
        //initialize Google API library
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                //this clientId from the project that created on console.developers.google.com
                clientId: '17972676130-ucv2lo416iu90a8h123231ugbc2qtmhc.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                //this.auth = GoogleAuth
                //getting the OAuth object that contains all funcs
                this.auth = window.gapi.auth2.getAuthInstance() 
                //update state
                //this.auth.isSignedIn.get() ==> true: signedIn, false: NOT signedIn
                this.setState({ isSignedIn: this.auth.isSignedIn.get() }) 
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }
    // callback func for eventListener
    //update state of signIn/signOut without refresh the page
    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
    }

    onSignIn = () => {
        this.auth.signIn()
    }

    onSignOut = () => {
        this.auth.signOut()
    }

    //helper func
    renderAuthButton() {
        if(this.state.isSignedIn === null){
            return null
        } else if (this.state.isSignedIn) { //user is signed in
            return (
                <button  onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon"/>
                    Sign In
                </button>
            )
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }
}

export default GoogleAuth