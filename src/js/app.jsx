import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/styles.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel);



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
            time: ['4:57', '4:41', '4:40', '4:13', '3:17'],
            currentSong : '',
            currentArtist : 'Choose your song!',
            backgroundClasses: ['duch', 'despacito', 'perfect', 'poczatek', 'wolves'],
            activeSongBg: 'default'
        }
    }

    changeSong = (e) => {
      this.setState({
          currentSong : this.state.song[e.currentTarget.id],
          currentArtist: this.state.singer[e.currentTarget.id],
          activeSongBg: this.state.backgroundClasses[e.currentTarget.id]
      });
    };

    render() {
        return (
            <div id="MainContainer">
                <Player>
                    <div className={this.state.activeSongBg} id="PlayerTop">
                        <PlayerOptions/>
                        <PlayerInfo currentSong={this.state.currentSong} currentArtist={this.state.currentArtist}/>
                    </div>
                    <div id="PlayerBottom">
                        <PlayerButtons/>
                    </div>
                </Player>
                <Playlist>
                    <div id="PlaylistTop">
                        <PlaylistHeader/>
                    </div>
                    <div id="PlaylistBottom">
                        <PlaylistBody songs={this.state.song} singers={this.state.singer} times={this.state.time} changeSong={this.changeSong}/>
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
            <div id="PlayerContainer">
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
                <button id="redo"></button>
                <button id="shuffle"></button>
                <button id="repeat"></button>
                <button id="hamburger"></button>

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
                <div id="Author">{this.props.currentArtist}</div>
                <div id="Song">{this.props.currentSong}</div>
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
            <div id="PlayerButtons">
                <button id="share"></button>
                <button id="previous"></button>
                <button id="play"></button>
                <button id="next"></button>
                <button id="like"></button>
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
            <div id="PlaylistContainer">
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

            let li = [];

            for (let i = 0; i < this.props.songs.length; i++) {

                li.push(<li id={i} onClick={this.props.changeSong}>
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