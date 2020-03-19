import React from 'react';

class AutoSuggest extends React.Component {
    render() {
        const items = [];
        const topProducts = [];
        this.props.taItems.forEach(item => {
            items.push(<TAItem keyword={this.props.keyword} item={item} key={item.toString()} handleEvents={this.props.handleEvents} />);
        });
        this.props.topProducts.forEach(product => {
            topProducts.push(<ProductItem key={product.id} product={product} handleEvents={this.props.handleEvents} />);
        });
        return (
            <React.Fragment>
                <div className="col-12 col-md-4 list-group pr-0 bg-white" role="tablist">
                    {items}
                </div>
                <div className="col-8 bg-light d-none d-md-block d-lg-block">
                    <div className="row pt-1 ml-1"> 
                    <h6 style={{fontSize: '0.875rem'}} className="font-weight-bolder">TOP PRODUCTS</h6>
                    </div>
                    <div className="row p-0 pl-2 pr-2 pb-2">
                       {topProducts}
                    </div>
                </div>
                </React.Fragment>
        )
    }
}

class ProductItem extends React.Component {

    handleProductPage(data, e) {
        this.props.handleEvents(e, null, data);
    }

    render() {
        const product = this.props.product;

        return (
            <div className="col-4 hover-pointer" id="productPage" onMouseDown={this.handleProductPage.bind(this, product)}>
                <div>
                    <img src={process.env.PUBLIC_URL + '/images/' + product.product + '.jpeg'} alt={product.title} className="img-fluid rounded"/>
                </div>
                <div style={{fontSize: '0.775rem'}} className="font-weight-bolder mt-1">
                    {product.title}
                </div>
            </div>
        )
    }
}

class TAItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.handleEvents(e);
    }

    render() {
        let val = this.props.item;
        const splitKeyword = this.props.keyword.split(' ');
        splitKeyword.forEach( str => {
            if(str !== '' && str.length > 1)
                val = val.replace(new RegExp(str, 'gi'), '<b>' + str + '</b>');
        });
        return (
        <button dangerouslySetInnerHTML={{ __html: val }} type="button" name="ta" data-toggle="list" role="tab" value={this.props.item} onMouseDown={this.handleClick} style={{ fontSize: '.825rem' }} className="list-group-item list-group-item-action p-0 pl-2 pt-1 pb-1 pr-1 border-0"></button>
        )
    }
}

export default AutoSuggest;