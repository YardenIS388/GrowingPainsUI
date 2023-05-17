import {Circle, Box} from '@chakra-ui/react'
import StoryCircle from '../components/StoryCircle'
import { useContext } from 'react'
import { StoryContext } from '../contexts/StoriesContext'

export default function StoryList({ title}) {

    const storyList = useContext(StoryContext)

    const emptyArray = Array((25)).fill("")
    const defaultArray = storyList ? [...storyList, ...emptyArray ] : null

    return(
                <Box display='flex' flexWrap='wrap' gap={5} overflow='scroll' pt='24px'>
                    {
                      storyList ?   storyList.map((story) => {
                            if(story.ageGroup === title){
                                return (
                                    <Circle  
                                        key={story._id}
                                        size='60px'
                                        me='auto' >
                                         <StoryCircle  
                                              
                                            imageSrc={'../images/marble1.svg'} 
                                            story={story}> </StoryCircle>
                                    </Circle>
                                   
                                   
                                )                              
                            }})
                        : 
                        null
                    }
                    {    
                         emptyArray.map((index , story) => {
                          
                                return (
                                    <Circle 
                                        key={index} 
                                        bg="#303038" 
                                        size='60px' 
                                        me='auto'>
                                        {story.ageGroup}
                                    </Circle>
                                )                              
                            })
                    }
                </Box>
    )
}