import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import Refinements from './Refinements';
import Products from './Products';
import ErrorPage from './ErrorPage';
import ProductPage from './ProductPage';

class SearchBarProductsList extends React.Component {
    render() {
        const products = this.props.response.searchResultInfo !== undefined ? this.props.response.searchResultInfo.resultPage : [];
        const num = this.props.response.searchResultInfo !== undefined ? this.props.response.searchResultInfo.numFound : 0;
        const breadcrumbs = this.props.response.headerArea !== undefined ? this.props.response.headerArea.breadcrumbs : [];
        const spellCheckedTerm = this.props.response.spellCheckCorrection !== undefined && this.props.response.spellCheckCorrection.correctionAvailable ? this.props.response.spellCheckCorrection.correctedTerm : ''
        return (
            <div className="col-12">                
                {this.props.object.showErrorPage && <ErrorPage error={this.props.object.error} />}

                <div className="row justify-content-center">
                    <div className="col-2 d-none d-lg-block">
                        {
                        this.props.refinementsAvailable &&
                        <Refinements isLoaded={this.props.isLoaded} object={this.props.object} refns={this.props.response.navigationArea} handleEvents={this.props.handleEvents} />
                        }
                    </div>
                    <div className="col-11 col-lg-10">
                        {
                            breadcrumbs.length > 0 && <div className="row mt-2">
                                <div className="col-12">
                                    <Breadcrumbs breads={breadcrumbs} handleEvents={this.props.handleEvents} />
                                </div>
                            </div>
                        }
                        { this.props.object.showAllProductsPage && 
                            <Products spellCheckedTerm={spellCheckedTerm} products={products} num={num} object={this.props.object} handleEvents={this.props.handleEvents} />
                        }
                        { this.props.object.showProductPage &&
                            <ProductPage product={this.props.object.product} handleEvents={this.props.handleEvents} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBarProductsList;