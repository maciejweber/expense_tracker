import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFriends, deleteFriend } from '../../actions/friends';
import Friend from './Friend';

class FriendList extends Component {
    static propTypes = {
        friends: PropTypes.array.isRequired,
        getFriends: PropTypes.func.isRequired,
        deleteFriend: PropTypes.func.isRequired,
    }

    componentDidMount(){
        this.props.getFriends();
    }

    render () {
        return (
            <div>
                <h3>Friends ({this.props.friends.length})</h3>
                {this.props.friends.map((friend) => 
                    <Friend 
                    key={friend.id} 
                    friend={friend}
                    remove={() => this.props.deleteFriend(friend.id)}
                    />
                )}
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    friends: state.friends.friends
})

export default connect(mapStateToProps, { getFriends, deleteFriend })(FriendList);