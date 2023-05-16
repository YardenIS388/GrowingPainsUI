import {Circle, Box, Image} from '@chakra-ui/react'
import StoryCircle from '../components/StoryCircle'
export default function StoryList({storyList, title}) {

    const emptyArray = Array((25)).fill("")
    const defaultArray = storyList ? [...storyList, ...emptyArray ] : null

    return(
                <Box display='flex' flexWrap='wrap' gap={5} overflow='scroll' pt='24px'>
                    {
                      storyList ?   storyList.map((story) => {
                            if(story.ageGroup === title){
                                return (
                                    <StoryCircle  key={story._id}   imageSrc={'../images/marble1.svg'} story={story}>
                                          
                                    </StoryCircle>
                                   
                                )                              
                            }})
                        : 
                        null
                    }
                    {
                         
                         emptyArray.map((story) => {
                          
                                return (
                                    <Circle key={story._id} bg="#303038" size='50px' me='auto'>
                                        {story.ageGroup}
                                    </Circle>
                                )                              
                            })
                    }
                </Box>
    )
}