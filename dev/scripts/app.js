import React from 'react';
import ReactDOM from 'react-dom';
import BoxList from './components/boxList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBW6OzneL-3N4Njn9oLBLnuv2H_njRRTOs",
  authDomain: "rsvp-36be6.firebaseapp.com",
  databaseURL: "https://rsvp-36be6.firebaseio.com",
  projectId: "rsvp-36be6",
  storageBucket: "rsvp-36be6.appspot.com",
  messagingSenderId: "445026227326",
  appId: "1:445026227326:web:5cafbac349cd7ebb8d742f",
  measurementId: "G-YHEH5PW8PJ"

};
firebase.initializeApp(config);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isRSVP: true,
    }
    this._onOpenModal = this._onOpenModal.bind(this);
    this._onCloseModal = this._onCloseModal.bind(this);
    this._onRSVP = this._onRSVP.bind(this);
  }

  // componentDidMount() {
  //   const dbref = firebase.database().ref('/users');
  //   const myUser = dbref.push();
  //   const connectedRef = firebase.database().ref(".info/connected");
  // }

  _onOpenModal() {
    this.setState({ isModalOpen: true });
  }

  _onCloseModal() {
    this.setState({ isModalOpen: false });
  }

  _onRSVP(event) {
    const value = event.target.value === 'true' ? true : false;
    this.setState({ isRSVP: value })
  }

  render() {
    return (
      <div className={this.state.isModalOpen ? "body second-step" : "body"}>
        <div className={this.state.isModalOpen ? "mobile second-step" : "mobile"}>
          <h1 >You are invited to the wedding of</h1>
          <h1 className="names">Danny & Anastasiya</h1>
        </div>
        <div className={this.state.isModalOpen ? "image second-step" : "image"}>
          <div className="content m-l-30">
            <h1 className="large">You are invited to the wedding of</h1>
            <h1 className="large names">Danny & Anastasiya</h1>
            <p>August 8, 2020</p>
            <p>Herenboerderij De Hucht, Stationsstraat 24, Elst, The Netherlands</p>
            <div className="rsvp">
              <p>RSVP</p>
              <div className="checkbox-container circular-container m-r-30">
                <label className="checkbox-label">
                  <input type="checkbox" value={true} checked={this.state.isRSVP} onChange={this._onRSVP} />
                  <span className="checkbox-custom circular"></span>
                </label>
                <div className="input-title">Yes</div>
              </div>
              <div className="checkbox-container circular-container m-r-30">
                <label className="checkbox-label">
                  <input type="checkbox" value={false} checked={!this.state.isRSVP} onChange={this._onRSVP} />
                  <span className="checkbox-custom circular"></span>
                </label>
                <div className="input-title">No</div>
              </div>
              <div className="button_cont" align="center" onClick={this._onOpenModal}><a className="example_b">Next</a></div>
            </div>
          </div>
        </div>
        <div className="rsvp-mobile">
          <p>RSVP</p>
          <div className="checkbox-container circular-container m-r-30">
            <label className="checkbox-label">
              <input type="checkbox" value={true} checked={this.state.isRSVP} onChange={this._onRSVP} />
              <span className="checkbox-custom circular"></span>
            </label>
            <div className="input-title">Yes</div>
          </div>
          <div className="checkbox-container circular-container m-r-30">
            <label className="checkbox-label">
              <input type="checkbox" value={false} checked={!this.state.isRSVP} onChange={this._onRSVP} />
              <span className="checkbox-custom circular"></span>
            </label>
            <div className="input-title">No</div>
          </div>
          <div className="button_cont" align="center" onClick={this._onOpenModal}><a className="example_b">Next</a></div>
        </div>

        {
          this.state.isModalOpen && (
            <BoxList isRSVP={this.state.isRSVP} onCloseModal={this._onCloseModal} />
          )
        }

      </div>

      // <BoxList />

    )
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById('app'));
