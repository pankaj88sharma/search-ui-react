import React from 'react';
//import logo from './placeholder.png';

class ProductPage extends React.Component {
    render() {
        const product = this.props.product;
        var dollars;
        if (product.price && product.price[0]) {
            dollars = product.price[0] / 100000;
            dollars = dollars.toLocaleString("en-US", { style: "currency", currency: "USD" });
        }

        var colors = []
        var size = []
        if (product.color) {
            colors.push(<option key='color'>Color</option>);
            product.color.forEach((index, col) => {
                colors.push(<option key={index}>{col}</option>);
            })
        }

        if (product.size) {
            size.push(<option key='size'>Size</option>);
            product.size.forEach((index, si) => {
                size.push(<option key={index}>{si}</option>);
            })
        }

        return (
            <div className="row justify-content-center mt-5">
                <div className="col-1 mt-4">
                    <button type="button" name="showAllProductsPage" onClick={this.props.handleEvents} className="btn btn-sm btn-secondary"><i className="fa fa-chevron-left mr-2"></i>Back</button>
                </div>
                <div className="col-7 border rounded pb-4">
                    <div className="row">
                        <div className="col mt-1 text-primary">
                            <label>{product.department} -> {product.category} -> {product.product}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 font-weight-bold" style={{ fontSize: '1.5rem' }}>
                            {product.title}
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6">
                            <img src={process.env.PUBLIC_URL + '/images/' + product.product + '.jpeg'} alt={product.title} className="img-fluid rounded" />
                        </div>

                        <div className="col-6">
                            <div className="row">
                                {false &&
                                    <div className="col-12">
                                        <button type="button" name="addToCart" onClick={this.props.handleEvents} className="btn btn btn-success">Add to Cart</button>
                                    </div>
                                }

                                {colors.length > 0 &&
                                <div className="col-6 form-group">
                                    <select className="form-control">
                                        {colors}
                                    </select>
                                    </div>
                                }
                                {size.length > 0 &&
                                <div className="col-6 form-group">
                                    <select className="form-control">
                                        {size}
                                    </select>
                                    </div>
                                }
                                {product.brand && 
                                <div className="col-12 font-weight-bolder text-info">
                                    by {product.brand}
                                </div>
                                 }
                                {product.gender && false &&
                                    <div className="col-12 font-weight-bolder text-info">
                                        Gender: {product.gender.join(', ')}
                                    </div>
                                }
                                {product.price && product.price[0] &&
                                    <div className="col-12 font-weight-bolder text-danger">
                                        {dollars}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductPage;