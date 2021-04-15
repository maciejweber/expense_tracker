import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRequests, acceptRequest, rejectRequest } from '../../actions/requests';
import Request from './Request';

class RequestList extends Component {
    static propTypes = {
        requests: PropTypes.array.isRequired,
        getRequests: PropTypes.func.isRequired,
        acceptRequest: PropTypes.func.isRequired,
        rejectRequest: PropTypes.func.isRequired,
    }

    componentDidMount(){
        this.props.getRequests();
    }

    render () {
        return (
            <div>
                <h3>Requests ({this.props.requests.length})</h3>
                {this.props.requests.map((request) => 
                    <Request 
                    key={request.id} 
                    request={request} 
                    accept={() => this.props.acceptRequest(request.id)}
                    reject={() => this.props.rejectRequest(request.id)}
                    />
                )}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    requests: state.requests.requests
})

export default connect(mapStateToProps, { getRequests, acceptRequest, rejectRequest })(RequestList);