import React from 'react';


const App = (props) => {
    const { channels } = props;
    return (
        <ul>
            {
                channels.map((channel) => {
                    const { name, id } = channel;
                    return <li key={id}>{name}</li>;
                })
            }
        </ul>
    );
};

export default App;
