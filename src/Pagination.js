import React from 'react';

class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.handleEvents(e);
    }

    render() {
        return (
            <nav>
                <ul className="pagination pagination-sm float-right">
                    <li className={this.props.object.disableFirst ? 'page-item disabled d-none d-xl-block' : 'page-item d-none d-xl-block'}><button type="button" onClick={this.handleClick} name="first" className={("page-link") + (this.props.object.disableFirst ? ' text-muted' : ' text-dark font-weight-bolder')}>First</button></li>
                    <li className={this.props.object.disablePre ? 'page-item disabled' : 'page-item bg-dark'}><button type="button" onClick={this.handleClick} name="pre" className={("page-link") + (this.props.object.disablePre ? ' text-muted' : ' text-dark font-weight-bolder')}>&laquo;</button></li>
                    <li className="page-item disabled d-none d-xl-block"><button type="button" className="page-link text-white bg-dark">{this.props.object.currentPage} {' of '}  {this.props.object.lastPage}</button></li>
                    <li className={this.props.object.disableNext ? 'page-item disabled' : 'page-item'}><button type="button" onClick={this.handleClick} name="next" className={("page-link") + (this.props.object.disableNext ? ' text-muted' : ' text-dark font-weight-bolder')}>&raquo;</button></li>
                    <li className={this.props.object.disableLast ? 'page-item disabled d-none d-xl-block' : 'page-item d-none d-xl-block'}><button type="button" onClick={this.handleClick} name="last" className={("page-link") + (this.props.object.disableLast ? ' text-muted' : ' text-dark font-weight-bolder')}>Last</button></li>
                </ul>
            </nav>
        )
    }
}

export default Pagination;