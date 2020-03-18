import React from 'react';
import './SearchBar.css';
import AutoSuggest from './AutoSuggest';
import logo from './solr-logo.svg';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleEvents = this.handleEvents.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
    }

    handleEvents(e) {
        this.props.handleEvents(e);
    }

    handleChange(e) {
        this.props.handleEvents(e);
    }

    handleKeyDown(e) {
        if (e.keyCode === 13) {
            this.props.handleEvents(e);
        }
    }

    handleOnBlur(e) {
        let action = 'EMPTY_TA';
        this.props.handleEvents(e, action);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
                <div className="col-12">
                    <div className="row">
                        <div className="col-2">
                            <a className="navbar-brand" href="/" title="Solr Logo">
                                <img src={logo} alt="solr logo" />
                            </a>
                        </div>
                        {<div className="input-group col-5">
                            <input autoComplete="off" onBlur={this.handleOnBlur} type="search" name="keyword" className="form-control form-control-lg" value={this.props.object.keyword} placeholder='What are you looking for today?' onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
                            <div className="input-group-append">
                                <button className="btn btn-block btn-lg btn-dark" name="go" type="button" onClick={this.handleEvents}><i className="fa fa-search"></i></button>
                            </div>
                            {this.props.object.taItems.length > 0 &&
                                <div className="shadow auto-complete rounded row m-0">
                                    <AutoSuggest topProducts={this.props.object.topProducts} keyword={this.props.object.keyword} refinementsAvailable={this.props.refinementsAvailable} taItems={this.props.object.taItems} handleEvents={this.props.handleEvents} />
                                </div>
                            }
                        </div>
                        }
                        <div className="col-1">
                            <div className="row">
                        <div className="col custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="reRank" checked={this.props.object.reRank} onChange={this.handleChange} />
                            <label className="custom-control-label hover-pointer text-secondary" htmlFor="reRank">reRank</label>
                        </div>
                        </div>

                        <div className="row">

                        <div className="col custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="reloadModel" checked={this.props.object.reloadModel} onChange={this.handleChange} />
                            <label className="custom-control-label hover-pointer text-secondary" htmlFor="reloadModel">reloadModel</label>
                        </div>
                        </div>
                        
                        </div>

                        <div className="col-2">
                            <button className="btn btn-link btn-lg" name="train" type="button" onClick={this.handleEvents}><i className="fa"> Train Model</i></button>
                        </div>

                        {this.props.object.loggedOut && <div className="col text-right pr-0 pl-0">
                            <button onClick={this.handleEvents} name="login" type="button" className="btn btn-link btn-lg"><i className="fa fa-sign-in"> Login</i></button>
                        </div>}
                        {this.props.object.loggedIn && <div className="col text-right">
                            <label className="text-secondary font-weight-bolder">{this.props.object.userName}</label>
                            <button onClick={this.handleEvents} name="logout" type="button" className="btn btn-link btn-lg pr-0"><i className="fa fa-sign-out"> Logout</i></button>
                        </div>}
                    </div>
                </div>
            </nav>
        )
    }
}

export default SearchBar;