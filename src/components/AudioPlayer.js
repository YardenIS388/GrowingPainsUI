import {HStack, Circle, Text, Image, Box} from '@chakra-ui/react'
import {useState, useEffect, useRef} from 'react'
export default function AudioPlayer({audioFile, storyData, cutAudioSignal}) {

    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioSrc = audioFile;
    const audioRef = useRef(new Audio(audioSrc));
    
    const handlePlay = () => {
     
      if (isPlaying) {
        setIsPlaying(false);
       
        audioRef.current.pause();
      } else {
        setIsPlaying(true);
        audioRef.current.play();
      }
    };

    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(2, '0')}`;
      }

     
     
  
    useEffect(() => {

      const audio = audioRef.current;
      const updateProgress = () => {
        setTrackProgress(audio.currentTime);
      };
      
  
      audio.addEventListener("timeupdate", updateProgress);
     
      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.pause(); // Pause the audio
        audio.currentTime = 0; // Reset the audio position
        setIsPlaying(false)
      };
    }, []);
  
  

    return ( 
    <> 
    <HStack w="100%" bg='#FF7153' borderRadius='56px' p='8px' borderWidth='3px' borderColor='#E6664B' boxShadow={'0px 4px 50px rgba(255,113,83, 0.14)'}>
        <HStack justifyContent='space-between' w="100%">
            <HStack>
                <Circle bg="#EB5D3F" boxSize='40px' onClick={() => handlePlay()} className={'audio'}>
                    {isPlaying ? 
                    <Image src='../images/pauseIcon.svg'></Image>
                    : 
                    <Image src='../images/playIcon.svg'></Image>}
                </Circle>
                <Text color='white' fontFamily={'Roboto'} fontWeight={500} fontSize='16px'>{isPlaying
                        ? "Playing"
                        : "Play"}</Text>
                <Image src='../images/audioIconWhite.svg' m='2px !important'></Image>
                <Text m='2px !important' color='#FFCBAD' fontFamily={'Roboto'} fontWeight={400} fontSize='16px'>in {storyData && storyData.language}</Text>
            </HStack>
            <Box bg="#EB5D3F" py='8px' px='16px' borderRadius='40px'>
                <Text color='white'>{formatTime(trackProgress.toFixed(2))}</Text>
            </Box>
        </HStack>
    </HStack> < Text color = '#8A8A92' fontSize = '14px' fontFamily={'Roboto'} fontWeight={400} > The audio will play part of an interview in the original language it was recorded. </Text>
    </>
       )
}