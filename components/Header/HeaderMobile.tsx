import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import HeaderMobileForm from './HeaderMobileForm'
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { changeFilterOpen } from '@/hooks/reducer';

type Props = {}

export default function HeaderMobile({ }: Props) {
    const open = useAppSelector(state => state.fats.filterOpen)
    const dispatch = useAppDispatch()
    return (
        <Box>
            <Box className='flex justify-between '>
                <Typography className="text-t6-normal mb-4">ПЛАНИРОВКИ</Typography>
                {open && <Button className=' text-black mt-[-30px] mr-[-20px] shadow-none' variant="contained" onClick={() => dispatch(changeFilterOpen())}>
                    <ClearIcon />
                    </Button>}
                
            </Box>

            <Box>
                {open && <HeaderMobileForm />}
                {!open && <Button fullWidth className='bg-blue-500 text-white' variant="contained" onClick={() => dispatch(changeFilterOpen())}>Фильтр</Button>}
                {open && <Button fullWidth className='bg-blue-500 text-white' variant="contained" onClick={() => dispatch(changeFilterOpen())}>Смотреть квартиры</Button>}
            </Box>

        </Box>
    )
}