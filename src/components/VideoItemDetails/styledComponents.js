import styled from 'styled-components'

export const TrendingContainer = styled.div`
  background-color: ${props => (props.isDark ? ' #0f0f0f' : '#f9f9f9')};
  color: ${props => (props.isDark ? '#ffffff' : 'black')};
`
export const VarientButton = styled.button`
  color: ${props => (props.isActive ? '#2563eb' : '#64748b')};
`
