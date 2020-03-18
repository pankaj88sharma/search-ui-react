import React from 'react';

class AdditionalParams extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.handleEvents(e);
    }

    render() {
        return (
            <div style={{ display: 'block', right: '12px', paddingRight: '15px', minWidth: '15rem' }} className="dropdown-menu dropdown-menu-right p-3 shadow">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group mb-0">
                            {this.props.object.apiType !== 'b' &&
                                <input autoComplete="off" type="search" name="n" className="form-control form-control-sm mb-2" value={this.props.object.n} placeholder='n' onChange={this.handleChange} />
                            }
                            <input type="search" autoComplete="off" name="ip" value={this.props.object.ip} className="form-control form-control-sm mb-2" placeholder="ip:port" onChange={this.handleChange} />
                            <input type="search" autoComplete="off" name="storeId" value={this.props.object.storeId} className="form-control form-control-sm mb-2" placeholder="storeId" onChange={this.handleChange} />
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="debug" checked={this.props.object.debug} onChange={this.handleChange} />
                                <label className="custom-control-label hover-pointer text-secondary" htmlFor="debug">debug</label>
                            </div>
                            {this.props.object.apiType === 'b' &&
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="showSeoInfo" checked={this.props.object.showSeoInfo} onChange={this.handleChange} />
                                    <label className="custom-control-label hover-pointer text-secondary" htmlFor="showSeoInfo">seoInfo</label>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdditionalParams;