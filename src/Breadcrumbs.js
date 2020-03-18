import React from 'react';

class Breadcrumbs extends React.Component {
    render() {
        const breadcrumbsTaxonomy = [];
        const breadcrumbsXAble = [];
        this.props.breads.forEach((bc, pindex) => {
            bc.values.forEach((value, cindex) => {
                breadcrumbsXAble.push(<BreadcrumbItem key={value.displayValue + pindex + cindex} value={value} displayName={bc.displayName} handleEvents={this.props.handleEvents} />)
            })
        })

        return (
            <div className="mb-2">
                {breadcrumbsTaxonomy}
                {breadcrumbsXAble}
            </div>
        )
    }
}

class BreadcrumbItem extends React.Component {
    constructor(props){ 
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.handleEvents(e, 'n', this.props.value.action);
    }

    render() {
        const displayValue = this.props.displayName + ':' +this.props.value.displayValue;
        const clickType = 1;
        let span = <span><i className="fa fa-times-circle mr-1"></i>{displayValue}</span>;
        const className = (clickType !== 1) ? 'btn btn-outline-dark border-0 btn-sm mt-2 p-0 pl-1 pr-1 ' : 'btn btn-outline-dark btn-sm mr-3 mt-2 border border-secondary rounded pt-0 pb-0 ' ;

        if (clickType === 0) {
            span = <span><u>{displayValue}</u></span>;
        } else if (clickType === 2 || clickType === 3) {
            span = <span>{displayValue}</span>;
        }

        return (
            <button style={{fontSize: '.875rem'}} onClick={this.handleClick} name="refn" type="button" 
            className={(className + (clickType === 2 || clickType === 3 ? "remove-hover" : ""))}>{span}</button>
        )
    }
}

export default Breadcrumbs;