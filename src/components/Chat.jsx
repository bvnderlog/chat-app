import React from 'react';


export default class Chat extends React.Component {
    handleChange = () => {
        console.log('changed input');
    }

    render() {
        return (
            <div className="col h-100">
                <div className="d-flex flex-column h-100">
                    <div id="messages-box" className="chat-messages overflow-auto mb-3">
                        <div>
                            <b>Magnolia_Johns5</b>: 123
                        </div>
                        <div>
                            <b>Adonis42</b>: Привет
                        </div>
                    </div>
                    <div className="mt-auto">
                        <form noValidate="" className="">
                            <div className="form-group">
                                <div className="input-group">
                                    <input onChange={this.handleChange} name="body" className="form-control" value="" />
                                    <div className="d-block invalid-feedback">&nbsp;</div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
