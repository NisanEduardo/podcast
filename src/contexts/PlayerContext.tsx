import { createContext, useState, ReactNode, useContext } from 'react'

type Episode = {
    title: string
    members: string
    thumbnail: string
    duration: number
    url: string
}

type PlayerContextData = {
    episodeList: Array<Episode>
    currentEpisodeIndex: number
    isPlayng: boolean
    isLooping: boolean
    isShuffling: boolean
    play: ( episode: Episode ) => void
    playList: ( list: Episode[], index: number ) => void
    setPlayngState: ( state: boolean ) => void
    togglePlay: () => void
    toggleLoop: () => void
    toggleShuffle: () => void
    playPrevious: () => void
    playNext: () => void
    clearPlayerState: () => void
    hasNext: boolean
    hasPrevious: boolean
}

export const PlayerContext = createContext({} as PlayerContextData )

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps ) {

    const [ episodeList, setEpisodeList ] = useState([])
    const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState( 0 )
    const [ isPlayng, setIsPlayng ] = useState( false )
    const [ isLooping, setIsLooping ] = useState( false )
    const [ isShuffling, setIsShuffling ] = useState( false )

    function play( episode: Episode ) {

        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlayng( true )
    }

    function playList( list: Episode[], index: number ) {
        setEpisodeList( list )
        setCurrentEpisodeIndex( index )
        setIsPlayng( true )
    }

    function togglePlay() {

        setIsPlayng( !isPlayng )

    }

    function toggleLoop() {

        setIsLooping( !isLooping )

    }

    function toggleShuffle() {

        setIsShuffling( !isShuffling )

    }

    function clearPlayerState() {
        setEpisodeList([])
        setCurrentEpisodeIndex(0)
    }

    function setPlayngState( state: boolean ) {
        setIsPlayng( state )
    }

    const hasPrevious = currentEpisodeIndex > 0
    const hasNext = isShuffling || ( currentEpisodeIndex + 1 ) < episodeList.length

    function playNext() {
        if( isShuffling ) {

            const nexRandomEpisodeIndex = Math.floor( Math.random() * episodeList.length )
            setCurrentEpisodeIndex( nexRandomEpisodeIndex )

        } else if( hasNext ) {

            setCurrentEpisodeIndex( currentEpisodeIndex + 1 )

        }
    }

    function playPrevious() {

        if( hasPrevious ) {
            setCurrentEpisodeIndex( currentEpisodeIndex -1 )
        }
    }

    return (
        <PlayerContext.Provider
        value={{
            episodeList,
            currentEpisodeIndex,
            isPlayng,
            isLooping,
            isShuffling,
            play,
            playList,
            playPrevious,
            playNext,
            togglePlay,
            clearPlayerState,
            toggleLoop,
            toggleShuffle,
            hasPrevious,
            hasNext,
            setPlayngState
        }}>
            { children }
        </PlayerContext.Provider>
    )

}

export const usePlayer = () => {
    return useContext( PlayerContext )
}