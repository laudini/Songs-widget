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
            activeSongBg: 'default',
            activeLayer: 'player'
        }
    }

    changeToPlaylist = () => {
        this.setState({
            activeLayer: 'playlist'
        })
    };

    changeToPlayer = () => {
        this.setState({
            activeLayer: 'player'
        })
    };

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
                        <PlayerOptions changeToPlaylist={this.changeToPlaylist}/>
                        <PlayerInfo currentSong={this.state.currentSong} currentArtist={this.state.currentArtist}/>
                    </div>
                    <div id="PlayerBottom">
                        <PlayerButtons/>
                    </div>
                </Player>
                <Playlist>
                    <div id="PlaylistTop">
                        <PlaylistHeader changeToPlayer={this.changeToPlayer}/>
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
                <button id="Redo"></button>
                <button id="Shuffle"></button>
                <button id="Repeat"></button>
                <button id="Hamburger"></button>

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
                <button id="Share"></button>
                <button id="Previous"></button>
                <button id="Play"></button>
                <button id="Next"></button>
                <button id="Like"></button>
            </div>
        )
    }

}

class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display : "noDisplay"
        }
    }

    render() {
        return (
            <div className={this.state.display} id="PlaylistContainer">
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

                li.push(<li className="SongTiles" id={i} onClick={this.props.changeSong}>
                    <div className="divContainer">
                    <div className="FlexDiv">
                    <div className="SongTilesInfoTop">
                        <div className="SongTime">{this.props.times[i]} |</div>
                        <div className="SongAuthor"> {this.props.singers[i]}</div>
                    </div>
                    <div className="SongName">{this.props.songs[i]}</div>
                    </div>
                    <div className="PlaylistButtons">
                        <button className="PlaylistShare"></button>
                        <button className="PlaylistLike"></button>
                    </div>
                    </div>
                    <hr/>
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