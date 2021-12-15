import React, { Component } from 'react'
import liff from '@line/liff'
import './Profile.css'

const liffId = '1656504242-NvmJWeO5'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            // userLineID: '',
            pictureUrl: '',
        }
    }

    componentDidMount = async () => {
        await liff.init({ liffId: `${liffId}` }).catch((err) => {
            throw err
        })
        if (liff.isLoggedIn()) {
            let getProfile = await liff.getProfile()
            this.setState({
                name: getProfile.displayName,
                // userLineID: getProfile.userId,
                pictureUrl: getProfile.pictureUrl,
            })
        } else {
            liff.login()
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="support">
                        <img
                            className="profile_pic"
                            alt="pic"
                            src={this.state.pictureUrl}
                        />
                        <p className="profile_name"> {this.state.name}</p>
                    </div>
                </header>
            </div>
        )
    }
}

export default Profile
