import React from 'react';
import SeoInfo from './SeoInfo';

class RightSideBar extends React.Component {
    render() {
        return (
            <div className="col-2 bg-light border-left">
                {this.props.response.searchResultInfo && this.props.object.showSeoInfo &&
                <div className="row justify-content-center">
                    <SeoInfo response={this.props.response} />
                </div>
                }
            </div>
        )
    }
}

export default RightSideBar;