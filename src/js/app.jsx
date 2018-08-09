import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/styles.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container/>
        )
    }

}

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="Main-Container">
                <Player>
                    <div id="Player-Top">
                        <PlayerOptions/>
                        <PlayerInfo/>
                    </div>
                    <div id="Player-Bottom">
                        <PlayerButtons/>
                    </div>
                </Player>
                <Playlist>
                    <div id="Playlist-Top">
                        <PlaylistHeader/>
                    </div>
                    <div>
                        <PlaylistBody/>
                    </div>
                </Playlist>
            </div>
        )
    }

}

class Player extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="Player-Container">
                {this.props.children}
            </div>
        )
    }

}

class PlayerOptions extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="PlayerOptions">
                <button>repeat pl</button>
                <button>shuffle</button>
                <button>repeat</button>
                <button>hamburger</button>
            </div>
        )
    }

}

class PlayerInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="PlayerInfo">
                <div id="Author">autor</div>
                <div id="Song">piosenka</div>
            </div>
        )
    }

}

class PlayerButtons extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <button>share</button>
                <button>prev</button>
                <button>stop</button>
                <button>next</button>
                <button>like</button>
            </div>
        )
    }

}

class Playlist extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="Playlist-Container">
                {this.props.children}
            </div>
        )
    }

}

class PlaylistHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="PlaylistHeader">
                playlistheader
            </div>
        )
    }

}

class PlaylistBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="PlaylistBody">
                playlistbody
            </div>
        )
    }

}


document.addEventListener('DOMContentLoaded', function () {

    ReactDOM.render(
        <App/>,
        document.querySelector('#app')
    );

});