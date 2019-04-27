import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { createStream } from '../../actions'

class StreamCreate extends React.Component {
    renderError({ error, touched }){
        if(touched && error){
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    // renderInput(formProps) {
        //const {input} = formProps.input
    renderInput = ({ input, label, meta }) => { 
        console.log(meta) // show validate() obj that include error's message
        const className =  `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            // className="field error"
            <div className={className}> 
                <label>{label}</label>
                {/* <input {...formProps.input} /> */}
                {/* {...input} same like formProps.input.onChange/value/... */}
                {/* autoComplete off so its not auto fill data */}
                <input {...input} autoComplete="off" />
                {/* display error under input field */}
                {/* <div>{meta.error}</div>  */}
                <div>{this.renderError(meta)}</div>
            </div>
        )
    }

    onSubmit = (formValues)=> {
        //console.log(formValues) // when not use redux-form
        this.props.createStream(formValues) //dispatch action from redux- action creators
    }

    render(){
        //console.log(this.props) // all props that redux-form support
        return (
            //handleSubmit() from this.props support by redux
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field 
                    name="title" 
                    component={this.renderInput} 
                    label="Enter title"
                />
                <Field 
                    name="description" 
                    component={this.renderInput} 
                    label="Enter description"
                />
                <button className="ui button primary">Submit</button>
            </form>
        )

    }
}

const validate = (formValues) => {
    const errors = {}
    if(!formValues.title) {
        // only ran if the user did not enter the title
        errors.title = "You must enter the title"
    }

    if(!formValues.description) {
        errors.description = "You must enter the description"
    }

    return errors
}

const fromWrapped = reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate)

/* export default reduxForm({
    form: 'streamCreate',
    validate
})(StreamCreate) */

export default connect(null, { createStream }) (fromWrapped)