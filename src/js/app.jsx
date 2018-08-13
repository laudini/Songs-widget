import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/styles.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStroopwafel} from '@fortawesome/free-solid-svg-icons'


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
            timeInSec: ['297', '281', '280', '253', '197'],
            likes: [0, 0, 0, 0, 0],
            currentSong: '',
            currentSongId: null,
            currentArtist: 'Choose your song!',
            backgroundClasses: ['duch', 'despacito', 'perfect', 'poczatek', 'wolves'],
            activeSongBg: 'default',
            activePlayer: 'activeplayer',
            activePlaylist: 'disactiveplaylist',
            playStatus: 'Play',
            timeElapsed: 0
        };
    }
    componentDidMount = () => {
        let intervalId = setInterval(() => {
            this.setState({
                timeElapsed: this.state.timeElapsed + 1
            });
            if (this.state.timeElapsed === Number(this.state.timeInSec[this.state.currentSongId])) {
                clearInterval(intervalId);
            }
            document.getElementById('seekbar').value = 1 / Number(this.state.timeInSec[this.state.currentSongId]) * this.state.timeElapsed;
        }, 1000);
        this.setState({
            intervalId : intervalId
        })
    };

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
        if (this.state.likes[this.state.currentSongId]) {
            newArray[this.state.currentSongId] = 0;
            this.setState({
                likes: newArray
            })
        } else {
            newArray[this.state.currentSongId] = 1;
            this.setState({
                likes: newArray
            });
        }
    };

    playlistLikeSong = (e) => {
        e.stopPropagation();
        let newArray = this.state.likes;
        if (this.state.likes[e.currentTarget.parentElement.parentElement.parentElement.id]) {
            newArray[e.currentTarget.parentElement.parentElement.parentElement.id] = 0;
            this.setState({
                likes: newArray
            });
        } else {
            newArray[e.currentTarget.parentElement.parentElement.parentElement.id] = 1;
            this.setState({
                likes: newArray
            });
        }
    };

    startSong = () => {
        if (this.state.playStatus != 'Play') {

        } else {
            let intervalId = setInterval(() => {
                this.setState({
                    timeElapsed: this.state.timeElapsed + 1
                });
                if (this.state.timeElapsed === Number(this.state.timeInSec[this.state.currentSongId])) {
                    clearInterval(intervalId);
                }
                document.getElementById('seekbar').value = 1 / Number(this.state.timeInSec[this.state.currentSongId]) * this.state.timeElapsed;
            }, 1000);
        }
    };

    shuffle = () => {

        let objects = [];
        let shuffledSongs = [];
        let shuffledSingers = [];
        let shuffledTimes = [];
        let shuffledLikes = [];
        let shuffledBgs = [];
        let shuffledTIS = [];

        for (let i = 0; i < this.state.song.length; i++) {
            objects[i] = {
                song: this.state.song[i],
                singer: this.state.singer[i],
                time: this.state.time[i],
                like: this.state.likes[i],
                bgs: this.state.backgroundClasses[i],
                tis: this.state.timeInSec[i]
            }
        }

        objects.sort(function () {
            return 0.5 - Math.random()
        });

        for (let j = 0; j < this.state.song.length; j++) {
            shuffledSongs.push(objects[j].song);
            shuffledSingers.push(objects[j].singer);
            shuffledTimes.push(objects[j].time);
            shuffledLikes.push(objects[j].like);
            shuffledBgs.push(objects[j].bgs);
            shuffledTIS.push(objects[j].tis);
        }

        this.setState({
            song: shuffledSongs,
            singer: shuffledSingers,
            time: shuffledTimes,
            likes: shuffledLikes,
            backgroundClasses: shuffledBgs,
            currentSong: shuffledSongs[0],
            currentSongId: 0,
            currentArtist: shuffledSingers[0],
            activeSongBg: shuffledBgs[0],
            timeInSec: shuffledTIS
        })

    };

    render() {
        return (
            <div id="MainContainer">
                <Player activePlayer={this.state.activePlayer}>
                    <div className={this.state.activeSongBg} id="PlayerTop">
                        <PlayerOptions shuffle={this.shuffle} changeToPlaylist={this.changeToPlaylist}/>
                        <PlayerInfo currentSong={this.state.currentSong} currentArtist={this.state.currentArtist}/>
                    </div>
                    <div id="PlayerBottom">
                        <PlayerButtons startSong={this.startSong} likeSong={this.likeSong} nextSong={this.nextSong}
                                       prevSong={this.prevSong}
                                       pauseSong={this.pauseSong} playStatus={this.state.playStatus}
                                       likes={this.state.likes} currentSongId={this.state.currentSongId}/>
                    </div>
                </Player>
                <Playlist activePlaylist={this.state.activePlaylist}>
                    <div id="PlaylistTop">
                        <PlaylistHeader changeToPlayer={this.changeToPlayer}/>
                    </div>
                    <div id="PlaylistBottom">
                        <PlaylistBody playlistLikeSong={this.playlistLikeSong} changeToPlayer={this.changeToPlayer}
                                      songs={this.state.song} likes={this.state.likes}
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
                <button onClick={this.props.shuffle} id="Shuffle"></button>
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
        console.log(this.props.likes);
        let liked = this.props.likes[this.props.currentSongId];
        if (liked === 1) {
            return (
                <div>
                    <div>
                        <audio src="https://www.youtube.com/watch?v=Ul1q622VWQg" id="player"></audio>
                        <progress id="seekbar" value="0" max="1"></progress>
                    </div>
                    <div id="PlayerButtons">
                        <button id="Share"><span/></button>
                        <button onClick={this.props.prevSong} id="Previous"><span/></button>
                        <button onClick={() => {
                            this.props.pauseSong();
                            this.props.startSong();
                        }} id={this.props.playStatus}><span/></button>
                        <button onClick={this.props.nextSong} id="Next"><span/></button>
                        <button onClick={this.props.likeSong} id="Liked"><span/></button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div id="SongProgress">
                        <progress id="seekbar" value="0" max="1"></progress>
                    </div>
                    <div id="PlayerButtons">
                        <button id="Share"></button>
                        <button onClick={this.props.prevSong} id="Previous"></button>
                        <button onClick={() => {
                            this.props.pauseSong();
                            this.props.startSong();
                        }
                        } id={this.props.playStatus}></button>
                        <button onClick={this.props.nextSong} id="Next"></button>
                        <button onClick={this.props.likeSong} id="Like"></button>
                    </div>
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
        let likes = this.props.likes;

        let heart = "PlaylistLike";

        for (let i = 0; i < this.props.songs.length; i++) {
            if (likes[i]) {
                heart = "PlaylistLiked"
            } else {
                heart = "PlaylistLike"
            }

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
                        <button onClick={(e) => {
                            this.props.playlistLikeSong(e)
                        }} className={heart}></button>
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