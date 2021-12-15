import React, { Component } from "react";
import liff from "@line/liff";
import "./Nav.css";
import Navdrop from "./NavDropdown";

const liffId = "1656504242-NvmJWeO5";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pictureUrl: "",
      prevScrollpos: window.pageYOffset,
      visible: true,
    };
  }

  componentDidMount = async () => {
    await liff.init({ liffId: `${liffId}` }).catch((err) => {
      throw err;
    });
    if (liff.isLoggedIn()) {
      let getProfile = await liff.getProfile();
      this.setState({
        pictureUrl: getProfile.pictureUrl,
      });
    } else {
      liff.login();
    }
    window.addEventListener("scroll", this.handleScroll);
  };
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible,
    });
  };

  render() {
    return (
      <div className={`nav${this.state.visible ? "" : " navbar--hidden"}`}>
        {/* <header className="App-header">
          <div className="support"> */}
        <img
          className="nav_logo"
          src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg"
          alt="Netflix_logo"
        />

        {/* <img className="nav_profile_pic" alt='pic' src={this.state.pictureUrl} /> */}
        <div class="dropdown">
          <div class="dropbtn">
            <button className="btn">
              <img
                className="nav_profile_pic"
                alt="pic"
                src={this.state.pictureUrl}
              />

              <i class="fas fa-angle-down"></i>
            </button>

            <Navdrop />

            {/* <div class="dropdown-content">
  
 
    < a> Profile</a>

   
    
    <a href="#">My List</a>
    
  </div> */}
          </div>
        </div>
      </div>
      //     </header>
      //   </div>
    );
  }
}

export default Login;
