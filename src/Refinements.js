import React from 'react';
import './Refinements.css';

class Refinements extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
        this.props.handleEvents(e);
    }

    render() {
        const refns = this.props.refns == null ? [] : this.props.refns.fieldRefinements;
        const fieldRefns = [];
        const showClearAll = this.props.object.n.length > 0;
        const expandAll = this.props.object.toggleRefns ? 'COLLAPSE ALL' : 'EXPAND ALL';
        refns.forEach(refn => {
            fieldRefns.push(<RefinementsSideBar object={this.props.object} key={refn.displayName} displayName={refn.displayName} values={refn.values} clearSelectedValues={refn.clearSelectedValues} handleEvents={this.props.handleEvents} />);
        })
        return (
            <div className="row">
                <div className="col-12 mt-3 pt-1">
                    <div className="row justify-content-end pl-1 pr-1 mb-1">
                        <div className="col-5 text-left">
                            {showClearAll &&
                                <button name="refn" style={{ fontSize: '0.700rem' }} value="" onClick={this.handleClick} className="btn btn-link btn-sm p-0 font-weight-bolder text-decoration-none" type="button">CLEAR ALL</button>
                            }
                        </div>

                        <div className="col-7 text-right">
                            <button name="toggleRefns" style={{ fontSize: '0.700rem' }} onClick={this.handleClick} className="btn btn-link btn-sm p-0 font-weight-bolder text-decoration-none" type="button">{expandAll}</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {fieldRefns}
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

class RefinementsSideBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(e) {
        this.props.handleEvents(e);
    }

    handleChange(refn, e) {
        this.props.handleEvents(e, "FILTER_REFN", refn);
    }

    render() {
        const displayName = this.props.displayName;
        const filterText = this.props.object.filterRefnMap[displayName] ? this.props.object.filterRefnMap[displayName] : '';
        const values = this.props.values;
        const rows = [];
        const hasSelectedAttributes = this.props.clearSelectedValues ? true : false;
        if (filterText === '') {
            values.forEach(value => {
                rows.push(<RefinementRow refnDisplay={displayName} key={displayName + value.displayValue} value={value} handleEvents={this.props.handleEvents} />);
            })
     } else {
        values.forEach(value => {
            if (value.displayValue.toLowerCase().indexOf(filterText) !== -1)
                rows.push(<RefinementRow refnDisplay={displayName} key={displayName + value.displayValue} value={value} handleEvents={this.props.handleEvents} />);
        })
     }
        let showRefn = false;
        if (this.props.object.refnsToShow.includes(displayName)) {
            showRefn = true;
        }

        return (
            <div className="row mt-1">
                <div className="col-12">
                    <button type="button" name="toggleRefn" value={displayName} style={{ fontSize: '.925rem' }} onClick={this.handleClick} className={"btn btn-outline-dark border-0 btn-block btn-sm btn-text-align-left mb-1 p-0 pl-1 pr-1" + (showRefn ? ' font-weight-bolder text-white bg-dark' : '')}>{displayName}<span className="badge badge-dark float-right mt-1 font-weight-bolder">{showRefn ? <i className="fa fa-chevron-up"></i> : <i className="fa fa-chevron-down"></i>}</span></button>
                </div>
                <div className={"col-12 refn-sidebar-main" + (showRefn ? ' border-bottom' : '')}>
                 
                        {
                            showRefn && <div className="row p-1">
                                {
                                    hasSelectedAttributes &&
                                    <div className="col-12">
                                        <button type="button" onClick={this.handleClick} value={this.props.clearSelectedValues.encodedNavigation} name="refn" style={{ fontSize: '.650rem' }} className="btn btn-light btn-sm p-0 border mt-0 pl-1 pr-1 btn-text-align-left mb-1">CLEAR</button>
                                    </div>
                                }
                                { this.props.object.refnsCountMap[displayName] >= 100 && 
                                    <div className="col-12 mt-1 mb-1">
                                        <div className="form-group m-0">
                                            <input type="search" className="form-control form-control-sm" value={filterText} onChange={this.handleChange.bind(this, displayName)} />
                                        </div>
                                    </div>
                                }
                                <div className="col-12 refn-sidebar">
                                    {rows}
                                    </div>
                                
                            </div>
                        }

                </div>
            </div>
        )
    }
}

class RefinementRow extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.handleEvents(e, 'n', this.props.value.action);
    }

    render() {
        const value = this.props.value;
        const displayValue = value.displayValue;
        const count = value.count;
        return (
            <div className="row">
                <div className="col-12">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" disabled={count === 0} checked={value.selected} onChange={this.handleClick} id={"customCheck" + this.props.refnDisplay + displayValue} />
                        <label title={displayValue + ' ' +count} style={{ fontSize: '.875rem' }} className={"custom-control-label d-block" + (value.selected ? ' font-weight-bolder' : '') + (count === 0 ? '' : ' hover-pointer')} htmlFor={"customCheck" + this.props.refnDisplay + displayValue} >
                            {displayValue} <span className="badge badge-light">{count}</span>
                        </label>
                    </div>
                </div>
                </div>
        )
    }
}

export default Refinements;