
import { useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import HeaderMobile from './HeaderMobile'
import HeaderDesktop from './HeaderDesktop'
type Props = {}

export default function Header(props: Props) {

    const isMobile = useMediaQuery('(max-width: 768px)')
  return (
    <Box>
        {isMobile && <HeaderMobile />}
        {!isMobile && <HeaderDesktop />}
    </Box>
  )
  
}