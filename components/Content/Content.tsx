import { Box, useMediaQuery } from '@mui/material'
import React from 'react'

import CardList from '../CardList/CardList'
import Header from '../Header/Header'
import { useAppSelector } from '@/hooks/hook'

type Props = {}

export default function Content({}: Props) {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const filterOpen = useAppSelector(state => state.fats.filterOpen);
  return (
    <Box>
        <Header />
        {(!isMobile || !filterOpen) && <CardList />}
    </Box>
  )
}