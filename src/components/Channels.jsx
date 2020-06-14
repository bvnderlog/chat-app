import React from 'react';

// TODO: active
export default class Channels extends React.Component {
    chooseChannel = () => {
        console.log('chose a channel');
    }

    render() {
        const { channels } = this.props;
        return (
            <div className="col-3 border-right">
                <div className="d-flex mb-2">
                    <span>Channels</span>
                    <button className="btn btn-link p-0 ml-auto">+</button>
                </div>
                <ul className="nav flex-column nav-pills nav-fill">
                    {
                        channels.map((channel) => {
                            const classes = "nav-link btn btn-block";
                            const { name, id } = channel;
                            return (
                                <li key={id} className="nav-item">
                                    <button onClick={this.chooseChannel} type="button" className={classes}>
                                        {name}
                                    </button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}
