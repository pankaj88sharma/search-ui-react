import React from 'react';

class SeoInfo extends React.Component {
    render() {
        const seoFacetValues = this.props.response.searchResultInfo.paginationAction.seoFacetValues;
        const params = this.props.response.searchResultInfo.paginationAction.params;
        const encodedNavigation = this.props.response.searchResultInfo.paginationAction.encodedNavigation;
        const bl = this.props.response.searchResultInfo.paginationAction.seoInfo.isBlacklisted;
        const url = 'c' + (seoFacetValues.length > 0 ? '/' + seoFacetValues.join('/') : '') +
            ((params.length > 0 || encodedNavigation) ? '?' : '') +
            (params.length > 0 ? 'a=' + params.join('-') : '') +
            (encodedNavigation ? (params.length > 0 ? '&n=' + encodedNavigation : 'n=' + encodedNavigation) : '');
        return (
            <p className="text-truncate m-0 p-1">{url} <span className="badge badge-secondary" style={{fontSize: '0.875rem'}}> {bl ? 'Blacklisted' : 'Whitelisted'} </span> </p>
        )
    }
}

export default SeoInfo;