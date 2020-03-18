import React from 'react';

class ErrorPage extends React.Component {
    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-6 text-center border rounded shadow mt-5">
                    <h1>something went wrong!</h1>
                    <p>{this.props.error}</p>
                </div>
            </div>
        )
    }
}

export default ErrorPage;