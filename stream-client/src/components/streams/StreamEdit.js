import React from 'react'
import { connect } from 'react-redux'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'
import _ from 'lodash'


class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
       // console.log(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        //console.log(formValues) //formValues is from redux-form
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render() {
        if(!this.props.stream) return <div>Loading</div>
        return (
            <div>
                <h3>Edit a stream</h3>
                <StreamForm 
                    onSubmit={this.onSubmit}
                    // initialValues is from redux-form
                    //initialValues={{ title: this.props.stream.title, description: this.props.stream.description}}
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                />
            </div>
        )

    }

    
}

const mapStateToProps = (state, ownProps ) => {
    //console.log(ownProps)
    return { stream: state.streams[ownProps.match.params.id] }
}
export default connect(mapStateToProps, { fetchStream, editStream }) (StreamEdit)