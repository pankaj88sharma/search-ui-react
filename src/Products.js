import React from 'react';
import Pagination from './Pagination';
import './Products.css';
//import logo from './placeholder.png';

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            truncateText: true
        }
        this.handleOnHover = this.handleOnHover.bind(this);
        this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
    }

    handleOnHover() {
        this.setState({
            truncateText: false
        })
    }

    handleOnMouseOut() {
        this.setState({
            truncateText: true
        })
    }

    render() {
        const rows = [];
        this.props.products.forEach(product => {
            rows.push(<ProductRow key={product.id} product={product} handleEvents={this.props.handleEvents} />);
        });

        return (
            <div className="row pt-0">
                <div className="col-12">
                    { this.props.spellCheckedTerm && 
                    <div className="row">
                        <div className="col-12 mt-1">
                    <p className="text-danger font-weight-bolder">Did you mean: <button type="button" name="spellCheck" value={this.props.spellCheckedTerm} onClick={this.props.handleEvents} className="btn btn-link btn-lg pt-0 pl-0 pr-0"><u><i>{this.props.spellCheckedTerm}</i></u></button></p>
                        </div>
                    </div>
                     }
                    <div className="row">
                        {this.props.num > 0 ? (
                            <div className="col-6 mt-3">
                                <label className="font-weight-bolder">All products: {this.props.num}</label>
                            </div>
                        ) : (this.props.object.isLoaded &&
                            <div className="col-8 mt-3">
                                <h4>No results found!</h4>
                            </div>
                            )
                        }

                        <div className="col-6 mt-3">
                            {this.props.num > 0 && <Pagination object={this.props.object} handleEvents={this.props.handleEvents} />}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">

                            {!this.props.object.showSpinner &&
                                <div className="row">
                                    {
                                        rows
                                    }
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ProductRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            truncateText: true
        }
        this.handleOnHover = this.handleOnHover.bind(this);
        this.handleOnMouseOut = this.handleOnMouseOut.bind(this);
    }

    handleOnHover() {
        this.setState({
            truncateText: false
        })
    }

    handleOnMouseOut() {
        this.setState({
            truncateText: true
        })
    }

    handleProductPage(data, e) {
        this.props.handleEvents(e, null, data);
    }

    render() {
        const product = this.props.product;
        var dollars;
        if (product.price && product.price[0]) {
            dollars = product.price[0] / 100000;
            dollars = dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
        }

        return (
            <div className="col-12 col-md-6 col-lg-3 mb-3" style={{ fontSize: '0.950rem' }}>
                <div className="row justify-content-center hover-pointer" id="productPage" onClick={this.handleProductPage.bind(this, product)}>
                    <div className="col-11 border rounded shadow p-4">
                        <div>
                            <img src={process.env.PUBLIC_URL + '/images/' + product.product + '.jpeg'} alt={product.title} className="img-fluid rounded" />
                        </div>
                        {product.department &&
                            <div className="font-weight-bold mt-2">
                            {product.department}
                            </div>
                        }
                        <div className='font-weight-bold text-primary'>
                            {product.title}
                        </div>
                        {product.colors &&
                            <div className="text-truncate">
                                <b>Available colors:</b> {product.colors.join(', ')}
                            </div>
                        }
                        {product.brand &&
                            <div className="font-weight-bold">
                            {product.brand}
                            </div>
                        }
                        {product.price && product.price[0] &&
                            <div className="text-danger font-weight-bold">
                                 {dollars}
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}


export default Products;