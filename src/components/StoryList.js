import {Circle, Box} from '@chakra-ui/react'
import StoryCircle from '../components/StoryCircle'
import { useContext} from 'react'
import { StoryContext } from '../contexts/StoriesContext'

export default function StoryList({ title}) {

    const storyList = useContext(StoryContext)
    const emptyArray = Array(11).fill("")


    return(
                <Box display='flex' flexWrap='wrap' justifyContent={'center'} gap={10} overflow='scroll' pt='24px'>
                    {
                      storyList.length > 0 ?   storyList.map(( story, index) => {
                            console.log(index)
                            if(story.ageGroup === title){
                                return (
                                    <Circle  
                                        key={story._id}
                                        size='60px'
                                        
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
                                        >
                                        {story.ageGroup}
                                    </Circle>
                                )                              
                            })
                    }
                </Box>
    )
}