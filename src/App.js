import React from 'react';
import './App.css';
import SearchBarProductsList from './SearchBarProductsList';
import axios from "axios";
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import LoginDialog from './LoginDialog';
import uuid from "uuid";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {},
      isLoaded: false,
      showSpinner: false,
      n: [],
      spa: '',
      sortKey: '',
      count: 60,
      apiType: 's',
      start: 0,
      currentPage: 1,
      lastPage: 0,
      disableFirst: false,
      disablePre: false,
      disableNext: false,
      disableLast: false,
      keyword: '',
      ip: 'search-rest-api.herokuapp.com',
      clickstreamEndPoint: 'search-rest-api.herokuapp.com',
      showAdditionalParams: false,
      showErrorPage: false,
      error: '',
      firstHit: true,
      showSeoInfo: false,
      shipToStore: true,
      debug: false,
      storeId: '',
      taItems: [],
      refnsToShow: [],
      toggleRefns: false,
      filterRefnMap: {},
      refnsCountMap: {},
      topProducts: [],
      showAllProductsPage: true,
      showProductPage: false,
      product: {},
      showLoginDialog: false,
      loggedIn: false,
      loggedOut: true,
      userName:'',
      uid: '',
      reRank: false,
      reloadModel: false,
      trainModelIp: 'search-rest-api.herokuapp.com',
      anonymousId: '00000-00000-00000-00000-00000'
    };
    this.handleEvents = this.handleEvents.bind(this);
  }

  componentDidMount() {
    const uid = sessionStorage.getItem('uid');
    if (uid !== null) {
      const uName = sessionStorage.getItem('userName');
      this.setState({
        loggedIn: true,
        loggedOut: false,
        uid: uid,
        userName: uName
      });
    }
  }

   async pushClickStreamData(eventType, product) {
    const baseURL = 'https://' + (this.state.clickstreamEndPoint === '' ? 'localhost:8080' : this.state.clickstreamEndPoint);
 
    const data = {
      sessionId: this.state.uid  === '' ? this.state.anonymousId : this.state.uid,
      keyword: this.state.keyword,
      productId: product.id,
      brand: product.brand,
      transactionType: eventType
    }
    const headers = {
      
    }

     axios({
      method: 'post',
      headers: headers,
      url: baseURL + '/clickstream/post',
      data: data
    }).then(function (response) {
      console.log(response.data);
    }).catch((err) => {
      console.error(err.toString());
    });
  }

  getQueryParams() {
    var qParams = new URLSearchParams();
    if (this.state.keyword !== '') {
      qParams.append("keyword", this.state.keyword);
    }

    this.state.n.forEach(refine => {
      qParams.append("refine", refine);
    });

    qParams.append("count", this.state.count);
    qParams.append("start", this.state.start);
    qParams.append("reRank", this.state.reRank);
    qParams.append("reloadModel", this.state.reloadModel);

    return qParams;
  }

  getTopProducts(keyword) {
    const baseURL = 'https://' + (this.state.ip === '' ? 'localhost:8080' : this.state.ip);
    axios.defaults.baseURL = baseURL;

    axios.get('/search', {
      params: {
        keyword: keyword,
        count: 3,
        reRank: this.state.reRank
      }
    }).then((response) => {
      this.setState({
        topProducts: response.data.searchResultInfo.resultPage
      })
    }).catch((err) => {
      console.error(err.toString());
    });
  }

  call_train_model_api() {
    const baseURL = 'https://' + (this.state.trainModelIp === '' ? 'localhost:5002' : this.state.trainModelIp);
    axios.defaults.baseURL = baseURL;

    axios.get('/train', {
      params: {
      }
    }).then((response) => {
      alert(response.data.message);
    }).catch((err) => {
      alert(err);
    });
  }


  getApiResponse() {
    const baseURL = 'https://' + (this.state.ip === '' ? 'localhost:8080' : this.state.ip);
    axios.defaults.baseURL = baseURL;

    const apiTypeParam = this.getApiType(this.state.apiType);
    const qParams = this.getQueryParams();

    axios.get(apiTypeParam, {
      params: qParams
    }).then((response) => {
      const data = response.data;
      let updatedRefnsToShow = [];
      let updatedRefnsCountMap = {};
      response.data.navigationArea.fieldRefinements.forEach(refn => {
        updatedRefnsCountMap[refn.displayName] = refn.values.length;
        if (refn.clearSelectedValues) {
          updatedRefnsToShow.push(refn.displayName);
        }
      });

      this.setState(state => ({
        response: data,
        isLoaded: true,
        showSpinner: false,
        lastPage: this.getLastPage(data.searchResultInfo.numFound, state.count),
        disableFirst: state.start === 0 ? true : false,
        disablePre: state.start === 0 ? true : false,
        disableNext: state.currentPage === this.getLastPage(data.searchResultInfo.numFound, state.count),
        disableLast: state.currentPage === this.getLastPage(data.searchResultInfo.numFound, state.count),
        showErrorPage: false,
        taItems: [],
        refnsToShow: updatedRefnsToShow,
        toggleRefns: updatedRefnsToShow.length === 0 ? false : this.state.toggleRefns,
        filterRefnMap: {},
        refnsCountMap: updatedRefnsCountMap,
        showAllProductsPage: true,
        showProductPage: false,
        product: {},
        showLoginDialog: false
      }));
    }).catch((err) => {
      this.setState({
        response: {},
        isLoaded: false,
        showErrorPage: true,
        showSpinner: false,
        error: err.toString()
      })
    });
  }

  getTAResponse() {
    const baseURL = 'https://' + (this.state.ip === '' ? 'localhost:8080' : this.state.ip);
    axios.defaults.baseURL = baseURL;

    axios.get('/typeahead', {
      params: {
        query: this.state.keyword
      }
    }).then((response) => {
      this.setState({
        taItems: response.data.suggestions
      }, () => {
        if(response.data.suggestions.length > 0) {
          this.getTopProducts(response.data.suggestions[0]); 
        }
      })
    }).catch((err) => {
      console.error(err.toString());
    });
  }

  getLastPage(totalNumRecs, count) {
    return (Math.floor(totalNumRecs / count) === 0 ? 1 : Math.ceil(totalNumRecs / count));
  }

  getApiType(apiType) {
    if (apiType === 'b') {
      return '/browse';
    }
    else {
      return '/search'
    }
  }

  handleEvents(e, action, value) {
    if (action === 'FILTER_REFN') {
      const updatedFilterRefnMap = {};
      updatedFilterRefnMap[value] = e.target.value.toLowerCase();
      this.setState({
        filterRefnMap: updatedFilterRefnMap
      });
    } else if (action === 'EMPTY_TA') {
      this.setState({
        taItems: []
      });
    } else if (action === 'HIDE_ADDITIONAL_PARAMS') {
      this.setState({
        showAdditionalParams: false
      });
    } else if (action === 'n') {
      this.setState({
        isLoaded: false,
        showSpinner: true,
        n: value,
        start: 0,
        currentPage: 1,
        showAdditionalParams: false,
        firstHit: false,
        toggleRefns: value === '' ? false : this.state.toggleRefns
      }, () => {
        this.getApiResponse();
      });
    } else if (e.currentTarget.name === 'next') {
      this.setState(state => ({
        isLoaded: false,
        showSpinner: true,
        currentPage: state.currentPage + 1,
        start: state.start + state.count,
        firstHit: false,
        showAdditionalParams: false
      }), () => {
        this.getApiResponse();
      });
    } else if (e.currentTarget.name === 'pre') {
      this.setState(state => ({
        isLoaded: false,
        showSpinner: true,
        currentPage: state.currentPage - 1,
        start: state.start - state.count,
        firstHit: false,
        showAdditionalParams: false
      }), () => {
        this.getApiResponse();
      });
    } else if (e.currentTarget.name === 'first') {
      this.setState(state => ({
        isLoaded: false,
        showSpinner: true,
        start: 0,
        currentPage: 1,
        firstHit: false,
        showAdditionalParams: false
      }), () => {
        this.getApiResponse();
      });
    } else if (e.currentTarget.name === 'last') {
      this.setState(state => ({
        isLoaded: false,
        showSpinner: true,
        start: (state.lastPage - 1) * state.count,
        currentPage: state.lastPage,
        firstHit: false,
        showAdditionalParams: false
      }), () => {
        this.getApiResponse();
      });
    } else if (e.currentTarget.name === 'keyword') {
      if (e.keyCode === 13) {
        this.setState({
          isLoaded: false,
          showSpinner: true,
          keyword: e.currentTarget.value.toLowerCase(),
          showAdditionalParams: false,
          firstHit: false,
          taItems: []
        }, () => {
          this.getApiResponse();
        });
      } else if (e.currentTarget.value !== '') {
        this.setState({
          keyword: e.currentTarget.value.toLowerCase(),
        }, () => {
          this.getTAResponse();
        });
      } else {
        this.setState({
          keyword: e.currentTarget.value.toLowerCase(),
          taItems: []
        })
      }
    } else if (e.currentTarget.name === 'ip') {
      this.setState({
        ip: e.currentTarget.value
      });
    } else if (e.currentTarget.name === 'n') {
      this.setState({
        n: e.currentTarget.value
      });
    } else if (e.currentTarget.name === 'spa') {
      if (this.validateSpa(e.currentTarget.value)) {
        this.setState({
          spa: e.currentTarget.value
        });
      }
    } else if (e.currentTarget.name === 'sortKey') {
      if (this.validateInputSortKey(e.currentTarget.value)) {
        this.setState({
          sortKey: e.currentTarget.value
        });
      }
    } else if (e.currentTarget.name === 'count') {
      if (!this.state.isLoaded) {
        this.setState({
          count: parseInt(e.currentTarget.value)
        });
      } else {
        this.setState({
          isLoaded: false,
          showSpinner: true,
          count: parseInt(e.currentTarget.value),
          start: 0,
          firstHit: false,
          showAdditionalParams: false,
          currentPage: 1
        }, () => {
          this.getApiResponse();
        });
      }
    } else if (e.currentTarget.name === 'apiType') {
      this.setState({
        apiType: e.currentTarget.value,
        showAdditionalParams: false
      });
    } else if (e.currentTarget.name === 'refn') {
      this.setState({
        isLoaded: false,
        showSpinner: true,
        n: [],
        start: 0,
        currentPage: 1,
        showAdditionalParams: false,
        firstHit: false,
        toggleRefns: false
      }, () => {
        this.getApiResponse();
      });
    } else if (e.currentTarget.name === 'go') {
      this.setState({
        isLoaded: false,
        showSpinner: true,
        showAdditionalParams: false,
        firstHit: false
      }, () => {
        this.getApiResponse();
      });
    } else if (e.currentTarget.name === 'showAdditionalParams') {
      this.setState(state => ({
        showAdditionalParams: !state.showAdditionalParams
      }));
    } else if (e.currentTarget.id === 'reRank') {
      this.setState(state => ({
        reRank: !state.reRank
      }));
    } else if (e.currentTarget.id === 'reloadModel') {
      this.setState(state => ({
        reloadModel: !state.reloadModel
      }));
    } else if (e.currentTarget.name === 'ship') {
      this.setState(state => ({
        shipToStore: !state.shipToStore
      }));
    } else if (e.currentTarget.name === 'storeId') {
      this.setState({
        storeId: e.currentTarget.value
      });
    } else if (e.currentTarget.name === 'ta') {
      this.setState({
        isLoaded: false,
        showSpinner: true,
        showAdditionalParams: false,
        firstHit: false,
        keyword: e.currentTarget.value
      }, () => {
        this.getApiResponse();
      });
    } else if (e.currentTarget.name === 'toggleRefn') {
      let updatedRefn = this.state.refnsToShow.slice();
      const val = e.currentTarget.value;
      const index = updatedRefn.indexOf(val);
      if (index === -1) {
        updatedRefn.push(val);
      } else {
        updatedRefn.splice(index, 1);
      }
      this.setState({
        refnsToShow: updatedRefn
      });
    } else if (e.currentTarget.name === 'toggleRefns') {
      let updatedRefn = [];
      if (!this.state.toggleRefns) {
        this.state.response.navigationArea.fieldRefinements.forEach(refn => {
          updatedRefn.push(refn.displayName);
        });
      }

      this.setState(state => ({
        toggleRefns: !state.toggleRefns,
        refnsToShow: updatedRefn
      }));
    } else if (e.currentTarget.id === 'productPage') {
      this.pushClickStreamData('click', value);
      this.setState(state => ({
        showAllProductsPage: !state.showAllProductsPage,
        showProductPage: !state.showProductPage,
        product: value
      }));
    } else if (e.currentTarget.name === 'showAllProductsPage') {
      this.setState(state => ({
        showAllProductsPage: !state.showAllProductsPage,
        showProductPage: !state.showProductPage
      }));
    } else if (e.currentTarget.name === 'login') {
      this.setState({
        showLoginDialog: true,
        showAllProductsPage: false
      });
    } else if (e.currentTarget.name === 'logout') {
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('uid');
      alert('You have been logged out!');
      this.setState({
        loggedIn: false,
        loggedOut: true,
        userName: '',
        uid: ''
      });
    } else if (e.currentTarget.name === 'closeLoginDialog') {
      this.setState({
        userName: '',
        showLoginDialog: false,
        showAllProductsPage: true,
        uid: ''
      });
    } else if (e.currentTarget.name === 'username') {
      if (e.keyCode === 13) {
        if(e.currentTarget.value === '') {
          alert('Please enter username!');
        } else {
          const u_id = uuid.v4();
          sessionStorage.setItem('userName', this.state.userName);
          sessionStorage.setItem('uid', u_id);
          this.setState({
            loggedIn: true,
            loggedOut: false,
            showLoginDialog: false,
            uid: u_id
          });
        }
      }
      this.setState({
        userName: e.currentTarget.value
      });
    } else if (e.currentTarget.name === 'submit-login') {
      if(this.state.userName === '') {
        alert('Please enter username!');
      } else {
        const u_id = uuid.v4();
        sessionStorage.setItem('userName', this.state.userName );
        sessionStorage.setItem('uid', u_id);
        this.setState({
          loggedIn: true,
          loggedOut: false,
          showLoginDialog: false,
          uid: u_id
        });
      }
    } else if (e.currentTarget.name === 'addToCart') {
      if (this.state.loggedOut) {
        alert('Please login!');
      } else {
        this.pushClickStreamData('cart', this.state.product.id);
        alert('product added to cart');
      }
    } else if (e.currentTarget.name === 'train') {
      this.call_train_model_api();
    } else if (e.currentTarget.name === 'spellCheck') {
      this.setState({
        keyword: e.currentTarget.value,
        isLoaded: false,
        showSpinner: true,
      }, () => {
        this.getApiResponse();
      });
    }
  }

  validateInputSortKey(sortKey) {
    const re = /^[0-9\b]+$/;
    return (sortKey === '') || (re.test(sortKey) && sortKey >= 1 && sortKey <= 6);
  }

  validateSpa(spa) {
    const re = /^[0-9\b]+$/;
    return (spa === '') || (re.test(spa) && spa >= 0 && spa <= 3);
  }

  render() {
    return (
      <Container response={this.state.response} showSpinner={this.state.showSpinner} isLoaded={this.state.isLoaded}
        handleEvents={this.handleEvents} object={this.state} />
    )
  }
}

class Container extends React.Component {
  render() {
    const isLoaded = this.props.isLoaded;
    const refinementsAvailable = this.props.response.navigationArea && this.props.response.navigationArea.fieldRefinements.length > 0 && this.props.response.searchResultInfo.numFound > 0;
    const styles = {
      opacity: 0.4
    };
    return (
      <React.Fragment>
        {this.props.object.showLoginDialog && <LoginDialog object={this.props.object} handleEvents={this.props.handleEvents} />}
        <SearchBar refinementsAvailable={this.props.refinementsAvailable} handleEvents={this.props.handleEvents} object={this.props.object} />
        <div className="container-fluid">
          {this.props.object.showSpinner && <div className="centered" >
            <LoadingSpinner />
          </div>}
          <div className="row" style={this.props.object.showSpinner ? styles : {}}>
            <SearchBarProductsList refinementsAvailable={refinementsAvailable} handleEvents={this.props.handleEvents} isLoaded={isLoaded} response={this.props.response} object={this.props.object} />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default App;