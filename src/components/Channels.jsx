import React from 'react';
import cn from 'classnames';


const Channels = (props) => {
    const { channels, currentChannelId, onChannelClick } = props;
    return (
        <div className="col-3 border-right">
            <div className="d-flex mb-2">
                <span>Channels</span>
                <button className="btn btn-link p-0 ml-auto">+</button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill">
                {
                    channels.map((channel) => {
                        const { name, id } = channel;
                        const classes = cn({
                            btn: true,
                            "nav-link": true,
                            "btn-block": true,
                            "active": id === currentChannelId,
                            "shadow-none": true,
                        });
                        return (
                            <li key={id} className="nav-item">
                                <button
                                    onClick={onChannelClick(id)}
                                    type="button"
                                    className={classes}>
                                    {name}
                                </button>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

export default Channels;
