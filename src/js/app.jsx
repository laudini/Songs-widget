import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/styles.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStroopwafel} from '@fortawesome/free-solid-svg-icons'

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
            likes: [0, 0, 0, 0, 0],
            currentSong: '',
            currentSongId: null,
            currentArtist: 'Choose your song!',
            backgroundClasses: ['duch', 'despacito', 'perfect', 'poczatek', 'wolves'],
            activeSongBg: 'default',
            activePlayer: 'activeplayer',
            activePlaylist: 'disactiveplaylist',
            playStatus: 'Play'
        }
    }

    changeToPlaylist = () => {
        this.setState({
            activePlayer: 'disactiveplayer',
            activePlaylist: 'activeplaylist'
        })
    };

    changeToPlayer = () => {
        this.setState({
            activePlayer: 'activeplayer',
            activePlaylist: 'disactiveplaylist'
        })
    };

    changeSong = (e) => {
        this.setState({
            currentSong: this.state.song[e.currentTarget.id],
            currentArtist: this.state.singer[e.currentTarget.id],
            activeSongBg: this.state.backgroundClasses[e.currentTarget.id],
            currentSongId: Number(e.currentTarget.id)
        });
    };

    pauseSong = () => {
        if (this.state.playStatus === "Play") {
            this.setState({
                playStatus: 'Stop'
            })
        } else {
            this.setState({
                playStatus: 'Play'
            })
        }
    };

    nextSong = () => {
        if (this.state.currentSongId < this.state.song.length - 1) {
            this.setState({
                currentSongId: this.state.currentSongId + 1,
                currentSong: this.state.song[this.state.currentSongId + 1],
                currentArtist: this.state.singer[this.state.currentSongId + 1],
                activeSongBg: this.state.backgroundClasses[this.state.currentSongId + 1]
            });

        } else {
            this.setState({
                currentSongId: 0,
                currentSong: this.state.song[0],
                currentArtist: this.state.singer[0],
                activeSongBg: this.state.backgroundClasses[0]
            })
        }
    };

    prevSong = () => {
        if (this.state.currentSongId >= 1) {
            this.setState({
                currentSongId: this.state.currentSongId - 1,
                currentSong: this.state.song[this.state.currentSongId - 1],
                currentArtist: this.state.singer[this.state.currentSongId - 1],
                activeSongBg: this.state.backgroundClasses[this.state.currentSongId - 1]

            })
        } else {
            this.setState({
                currentSongId: this.state.song.length - 1,
                currentSong: this.state.song[this.state.song.length - 1],
                currentArtist: this.state.singer[this.state.song.length - 1],
                activeSongBg: this.state.backgroundClasses[this.state.song.length - 1]
            })
        }
    };

    likeSong = () => {
        let newArray = this.state.likes;
        newArray[this.state.currentSongId] = 1;
        this.setState({
            likes: newArray
        });
        console.log(this.state.likes);
        console.log(this.state.currentSongId);
    };

    playlistLikeSong = (e) => {
        e.stopPropagation();
        let newArray = this.state.likes;
        newArray[e.currentTarget.parentElement.parentElement.parentElement.id] = 1;
        this.setState({
            likes: newArray
        });
        console.log(this.state.likes);
    };

    render() {
        return (
            <div id="MainContainer">
                <Player activePlayer={this.state.activePlayer}>
                    <div className={this.state.activeSongBg} id="PlayerTop">
                        <PlayerOptions changeToPlaylist={this.changeToPlaylist}/>
                        <PlayerInfo currentSong={this.state.currentSong} currentArtist={this.state.currentArtist}/>
                    </div>
                    <div id="PlayerBottom">
                        <PlayerButtons likeSong={this.likeSong} nextSong={this.nextSong} prevSong={this.prevSong}
                                       pauseSong={this.pauseSong} playStatus={this.state.playStatus}
                                       likes={this.state.likes} currentSongId={this.state.currentSongId}/>
                    </div>
                </Player>
                <Playlist activePlaylist={this.state.activePlaylist}>
                    <div id="PlaylistTop">
                        <PlaylistHeader changeToPlayer={this.changeToPlayer}/>
                    </div>
                    <div id="PlaylistBottom">
                        <PlaylistBody playlistLikeSong={this.playlistLikeSong} changeToPlayer={this.changeToPlayer} songs={this.state.song}
                                      singers={this.state.singer} times={this.state.time} changeSong={this.changeSong}/>
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
            <div className={this.props.activePlayer} id="PlayerContainer">
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
                <button onClick={this.props.changeToPlaylist} id="Hamburger"></button>

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
        let liked = this.props.likes[this.props.currentSongId];
        if (liked === 1) {
            return (
                <div id="PlayerButtons">
                    <button id="Share"></button>
                    <button onClick={this.props.prevSong} id="Previous"></button>
                    <button onClick={this.props.pauseSong} id={this.props.playStatus}></button>
                    <button onClick={this.props.nextSong} id="Next"></button>
                    <button onClick={this.props.likeSong} id="Liked"></button>
                </div>
            )
        } else {
            return (
                <div id="PlayerButtons">
                    <button id="Share"></button>
                    <button onClick={this.props.prevSong} id="Previous"></button>
                    <button onClick={this.props.pauseSong} id={this.props.playStatus}></button>
                    <button onClick={this.props.nextSong} id="Next"></button>
                    <button onClick={this.props.likeSong} id="Like"></button>
                </div>
            )
        }

    }

}

class Playlist extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.activePlaylist} id="PlaylistContainer">
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
                <button onClick={this.props.changeToPlayer} id="ReverseHamburger"></button>
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

            li.push(<li className="SongTiles" id={i} onClick={(e) => {
                this.props.changeSong(e);
                this.props.changeToPlayer();
            }}>
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
                        <button onClick={(e) => {this.props.playlistLikeSong(e)}} className="PlaylistLike"></button>
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