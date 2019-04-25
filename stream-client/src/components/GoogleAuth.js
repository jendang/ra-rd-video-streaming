import React from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../actions'

class GoogleAuth extends React.Component {
    //GOOGLE AUTH WITH REDUX
    
    componentDidMount() {
        //initialize Google API library
        window.gapi.load('client:auth2', () => {
            window.gapi.client
                .init({
                    //this clientId from the project that created on console.developers.google.com
                    clientId: '17972676130-ucv2lo416iu90a8h123231ugbc2qtmhc.apps.googleusercontent.com',
                    scope: 'email'
                }).then(() => {
                    //this.auth = GoogleAuth
                    //getting the OAuth object that contains all funcs
                    this.auth = window.gapi.auth2.getAuthInstance() 
                    //update state
                    //this.auth.isSignedIn.get() ==> true: signedIn, false: NOT signedIn
                    this.onAuthChange(this.auth.isSignedIn.get()) //initialize library
                    this.auth.isSignedIn.listen(this.onAuthChange)
                })
        })
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId()); //dispatch action creator signIn() not google signIn()
        }else {
            this.props.signOut() ////dispatch action creator signOut()not google signIn()
        }
    }

    //eventHandlers callback
    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    //helper func
    renderAuthButton() {
        if(this.props.isSignedIn === null){
            return null
        } else if (this.props.isSignedIn) { //user is signed in
            return (
                <button  onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign in with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        )
    }

    

    /* GOOGLE AUTH WITH ONLY REACT 
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

    onSignInClick = () => {
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    //helper func
    renderAuthButton() {
        if(this.state.isSignedIn === null){
            return null
        } else if (this.state.isSignedIn) { //user is signed in
            return (
                <button  onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
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
    } */
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { signIn, signOut }) (GoogleAuth)