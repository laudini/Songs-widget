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
        this.state = {
            song: ['Duch', 'Despacito', 'Perfect', 'Początek', 'Wolves'],
            singer: ['Kacper HTA ft. Arab', 'Luis Fonsi ft. Daddy Yankee', 'Ed Sheeran', 'Męskie granie', 'Selena Gomez ft. Marchmello'],
            time: ['4:57', '4:41', '4:40', '4:13', '3:17']
        }
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
                    <div id="Playlist-Bottom">
                        <PlaylistBody songs={this.state.song} singers={this.state.singer} times={this.state.time}/>
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
                <button id="ReverseHamburger"></button>
                <div id="PlaylistHeaderTitle">Playlist</div>
            </div>
        )
    }

}

class PlaylistBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

            let songs = [];
            let artists = [];
            let times = [];
            let li = [];

            for (let i = 0; i < this.props.songs.length; i++) {
                songs.push(this.props.songs[i]);
                artists.push(this.props.singers[i]);
                times.push(this.props.times[i]);

                li.push(<li>
                    <div>
                        <div>{this.props.times[i]}</div>
                        <div>{this.props.singers[i]}</div>
                    </div>
                    <div>{this.props.songs[i]}</div>
                </li>)
            }

        return (
            <div id="PlaylistBody">
                <ul id="SongList">
                    {li}
                </ul>
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