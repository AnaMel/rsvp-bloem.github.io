import React, { Component } from 'react';

class BoxList extends Component {
    constructor() {
        super();
        this.state = {
            isComplete: false,

            isPlusOne: true,

            firstName: undefined,
            lastName: undefined,

            plusOneFirstName: undefined,
            plusOneLastName: undefined,

            diet: undefined,
            error: undefined,

        }
        this._onAddPlusOne = this._onAddPlusOne.bind(this);
        this._onNamedFormChange = this._onNamedFormChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    _onAddPlusOne(event) {
        const value = event.target.value === 'true' ? true : false;
        this.setState({ isPlusOne: value })
    }

    _onNamedFormChange(name, event) {
        const value = event.target.value;
        this.setState({ [name]: value })
    }

    _onSubmit() {
        if (!this.state.firstName || !this.state.lastName) {
            this.setState({ error: "* Please enter your First and Last name" });
            return;
        }

        if (this.props.isRSVP && this.state.isPlusOne && (!this.state.plusOneFirstName || !this.state.plusOneLastName)) {
            this.setState({ error: "* Please enter your plus one's First and Last name" });
            return;
        }

        this._onSave();
        this.setState({ isComplete: true });

    }

    _onSave() {
        const dbRef = firebase.database().ref(`rsvp`);
        dbRef.child(`${this.state.lastName}${this.state.firstName}`).set({ 'RSVP': this.props.isRSVP, 'timeStamp': Date.now(), 'lastName': this.state.lastName, 'firstName': this.state.firstName, 'plusOneFirstName': this.state.plusOneFirstName || 'N/A', 'plusOneLaststName': this.state.plusOneLastName || 'N/A', 'diet': this.state.diet || 'N/A' });
    }


    render() {
        if (this.state.isComplete) {
            return (
                <div className="modal">
                    {this.props.isRSVP ? (
                        <div className="thankYou">
                            <div className="cusrsiveFont m-b-10">Thank you! We will see you on August 8, 2020.</div>
                            <div className="cusrsiveFont m-b-30">Herenboerderij De Hucht, Stationsstraat 24, Elst, The Netherlands</div>
                            <div className="cusrsiveFont important">We will send a follow-up email with event details a few weeks before the date.</div>
                        </div>
                    ) : (
                            <div className="thankYou cusrsiveFont">Thank you! It is unfortunate you can not make it, but we hope to see you soon.</div>
                        )
                    }
                </div>
            )
        }

        if (!this.props.isRSVP) {
            return (
                <div className="modal">
                    <div className="questions">
                        <a className="exit cusrsiveFont" onClick={this.props.onCloseModal}>GO BACK</a>
                        <div className="controls">
                            <label htmlFor="inp" className="inp m-r-30">
                                <input type="text" id="inp" placeholder="&nbsp;" onChange={(e) => this._onNamedFormChange('firstName', e)} />
                                <span className="label">Your First Name</span>
                                <span className="border"></span>
                            </label>
                            <label htmlFor="inp" className="inp">
                                <input type="text" id="inp" placeholder="&nbsp;" onChange={(e) => this._onNamedFormChange('lastName', e)} />
                                <span className="label">Your Last Name</span>
                                <span className="border"></span>
                            </label>
                        </div>
                        <div className="button_cont m-t-30" align="center" onClick={this._onSubmit}><a className="example_b">Send</a></div>
                        <div className="errors height-75">{this.state.error}</div>
                    </div>
                </div>
            )
        }


        return (
            <div className="modal">
                <a className="exit cusrsiveFont" onClick={this.props.onCloseModal}>GO BACK</a>
                <div className="questions">
                    <div className="controls controls-vertical m-b-50">
                        <label for="inp" className="inp m-r-30">
                            <input type="text" id="inp" placeholder="&nbsp;" onChange={(e) => this._onNamedFormChange('firstName', e)} />
                            <span className="label">Your First Name</span>
                            <span className="border"></span>
                        </label>
                        <label for="inp" className="inp">
                            <input type="text" id="inp" placeholder="&nbsp;" onChange={(e) => this._onNamedFormChange('lastName', e)} />
                            <span className="label">Your Last Name</span>
                            <span className="border"></span>
                        </label>
                    </div>
                    <div className="question">Will you be bringing a plus one?</div>
                    <div className="controls m-b-50 height-75">
                        <div className="checkbox-container circular-container m-r-30">
                            <label className="checkbox-label">
                                <input type="checkbox" value={true} checked={this.state.isPlusOne} onChange={this._onAddPlusOne} />
                                <span className="checkbox-custom circular"></span>
                            </label>
                            <div className="input-title">Yes</div>
                        </div>
                        <div className="checkbox-container circular-container m-r-30">
                            <label className="checkbox-label">
                                <input type="checkbox" value={false} checked={!this.state.isPlusOne} onChange={this._onAddPlusOne} />
                                <span className="checkbox-custom circular"></span>
                            </label>
                            <div className="input-title">No</div>
                        </div>
                        {
                            this.state.isPlusOne && (
                                <div className="controls">
                                    <label for="inp" className="inp m-r-30">
                                        <input type="text" id="inp" placeholder="&nbsp;" onChange={(e) => this._onNamedFormChange('plusOneFirstName', e)} />
                                        <span className="label">First Name</span>
                                        <span className="border"></span>
                                    </label>
                                    <label for="inp" className="inp">
                                        <input type="text" id="inp" placeholder="&nbsp;" onChange={(e) => this._onNamedFormChange('plusOneLastName', e)} />
                                        <span className="label">Last Name</span>
                                        <span className="border"></span>
                                    </label>
                                </div>
                            )
                        }
                    </div>
                    <div className="question m-b-0">Any dietary restrictions we should know about?</div>
                    <label for="inp" className="inp">
                        <input type="text" id="inp" placeholder="&nbsp;" onChange={(e) => this._onNamedFormChange('diet', e)} />
                    </label>
                    <div className="button_cont m-t-30 m-b-30" align="center" onClick={this._onSubmit}><a className="example_b">Send</a></div>
                    <div className="errors height-75">{this.state.error}</div>
                </div>

            </div>
        )
    }
}


export default BoxList;