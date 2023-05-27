import {Circle, Box, HStack} from '@chakra-ui/react'
import StoryCircle from '../components/StoryCircle'
import { useContext} from 'react'
import { StoryContext } from '../contexts/StoriesContext'

export default function StoryList({ title}) {

    const storyList = useContext(StoryContext)
    const emptyArray = Array(11).fill("")


    return(
                <Box display='flex' flexWrap='wrap' gap={5} overflow='scroll' pt='24px'>
                    {
                        title === '13-19' && 
                        <HStack w='100%'>
                            <StoryCircle
                                    imageSrc='../images/marbles/marble-M-olga.svg'
                                    story={{content:'',
                                            storyId:'olga',
                                            ageGroup:'13-19',
                                            audioFIleName:'../audio/audio-1.mp3'}
                                            }>
                            </StoryCircle>
                        </HStack>
                    }
                    {
                      storyList.length > 0 ?   storyList.map(( story, index) => {
                            console.log(index)
                            if(story.ageGroup === title){
                                return (
                                    <Circle  
                                        key={story._id}
                                        size='60px'
                                        me='auto'
                                        display={'flex'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        >
                                         <StoryCircle                                              
                                            imageSrc={`../images/marbles/marble-xs-${story.storyId}.svg`} 
                                            story={story}> 
                                        </StoryCircle>
                                    </Circle>
                                )                              
                            }})
                        : 
                        null
                    }
                    {    
                         emptyArray.map(( story, index ,) => {                   
                                return (
                                    <Circle 
                                        key={index} 
                                        bg="#303038" 
                                        size='60px' 
                                        me='auto'
                                        >
                                        {story.ageGroup}
                                    </Circle>
                                )                              
                            })
                    }
                </Box>
    )
}