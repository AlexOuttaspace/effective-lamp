import React from 'react'
import { styled } from 'linaria/react'

const Root = styled.div`
  display: flex;
  height: 100vh;
`

const MapContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
`

const ListContainer = styled.div`
  flex-shrink: 0;
  overflow-y: auto;
`

interface LayoutProps {
  mapElement: React.ReactNode
  listElement: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ mapElement, listElement }) => (
  <Root>
    <ListContainer>{listElement}</ListContainer>
    <MapContainer>{mapElement}</MapContainer>
  </Root>
)
