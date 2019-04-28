import React from 'react'
import { Link } from 'react-router-dom'
import Modal from '../Modal'
import history from '../../history'
import { connect } from 'react-redux'
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onDelete = () => {
        this.props.deleteStream(this.props.match.params.id)
        history.push('/') //can have this one in Action Creator as well
    }

    renderActions = () => {
        return (
            //React.Fragment replacing <div> in case we dont need <div> to maintaining the Semantic UI styles
            <React.Fragment> 
                <button 
                    onClick={this.onDelete}
                    className="ui button negative"
                >
                    Delete
                </button>
                {/* <button 
                    onClick={() => history.push('/')}
                    className="ui button"
                >
                    Cancel
                </button> */}
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    renderContent () {
        if(!this.props.stream){
            return 'Are you sure you want to delete this streams?'
        }
        return `Are you sure you want to delete the stream with title:  ${this.props.stream.title}`
    }
        
    render(){
        return (
            <div>
                <Modal 
                    title="Delete stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id] //fetching one stream with the ID in route
    }
}

export default connect(mapStateToProps, { fetchStream, deleteStream } ) (StreamDelete)