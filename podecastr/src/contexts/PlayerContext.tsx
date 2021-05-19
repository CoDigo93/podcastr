import { createContext, useState, ReactNode, useContext } from 'react'



type Episode = {
    title:string,
    members:string,
    thumbnail:string,
    duration:number,
    url:string
}
 
type PlayerContextData = {
    episodeList: Episode[],
    currentEpisodeIndex: number,
    isPlaying:boolean,
    isLooping,
    isShuffling,
    play: (episode: Episode) => void,
    playList: (list: Episode[], index: number) => void,
    playNext: () => void,
    playPrevious: () => void,
    togglePlay:() => void,
    toggleShuffle:() => void,
    toggleLoop:() => void,
    setPlayingState:(state: boolean) => void,
    hasNext: boolean,
    hasPrevious: boolean,
    clearPlayerState: () => void


}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider({children}: PlayerContextProviderProps){
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping ] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  
  function play(episode: Episode){
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }


  function playList(list: Episode[], index: number){
    setEpisodeList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }

  
  
  function togglePlay(){
    setIsPlaying(!isPlaying)
  }



  function toggleLoop(){
    setIsLooping(!isLooping)
  }


  function toggleShuffle(){
    setIsShuffling(!isShuffling)
  }
  
  
  function setPlayingState(state: boolean){
    setIsPlaying(state)
  }


  function clearPlayerState(){
    setEpisodeList([])
    setCurrentEpisodeIndex(0)
  }

  
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length
  const hasPrevious = currentEpisodeIndex > 0

  function playNext(){

    if(isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)

      setCurrentEpisodeIndex(nextRandomEpisodeIndex)

    }else if(hasNext) {
      const nextEpisodeIndex = currentEpisodeIndex + 1
      setCurrentEpisodeIndex(nextEpisodeIndex)
    }
       
  }

  
  
  function playPrevious(){
      const previousEpisodeIndex = currentEpisodeIndex - 1

      if(hasPrevious)
        setCurrentEpisodeIndex(previousEpisodeIndex)
  }

  return (

    <PlayerContext.Provider value={{ 
        episodeList, 
        currentEpisodeIndex, 
        play, 
        playList,
        playNext,
        playPrevious,
        isPlaying, 
        isLooping,
        togglePlay, 
        setPlayingState,
        hasNext,
        hasPrevious,
        toggleLoop,
        toggleShuffle,
        isShuffling,
        clearPlayerState,
      }}>

          {children}
      </PlayerContext.Provider>
  )
}


export const usePlayer = () =>{
    return useContext(PlayerContext)
}