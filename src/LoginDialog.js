import React from 'react';
import './LoginDialog.css';

class LoginDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleChange(e) {
        this.props.handleEvents(e);
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.props.handleEvents(e);
        }
    }

    render() {
        const showHideClassName = this.props.object.showLoginDialog ? "login-bg display-block" : "login-bg display-none";
        return (
            <div className={showHideClassName}>
                <div className="login-bg-modal border rounded">
                    <div className="row p-2">
                        <div className="col-12">
                            <div className="row">
                                <div className="col text-right">
                                    <button name="closeLoginDialog" onClick={this.props.handleEvents} type="button" className="btn btn-lg btn-link"><i className="fa fa-window-close"></i></button>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-8">
                                    <input name="username" autoComplete="off" value={this.props.object.userName} onChange={this.handleChange} onKeyDown={this.handleKeyDown} className="form form-control form-control-sm" type="search" placeholder="username" />
                                </div>
                                <div className="col-4">
                                    <button type="button" name="submit-login" onClick={this.props.handleEvents} className="btn btn-sm btn-success">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginDialog;