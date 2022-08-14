import React from 'react'

interface IContextProps {
  searchResult: object[];
  setSearchResult: any
}

export const TopicListContext = React.createContext({} as IContextProps)