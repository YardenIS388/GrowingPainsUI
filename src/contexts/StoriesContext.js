import { createContext } from 'react';

const StoryContext = createContext([])

const StoryProvider = ({ storyList, children }) => {
    return (
      <StoryContext.Provider value={storyList}>
        {children}
      </StoryContext.Provider>
    );
  };
  
  export { StoryContext, StoryProvider };