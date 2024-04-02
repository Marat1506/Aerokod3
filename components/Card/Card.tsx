import React from 'react'
import styles from './Card.module.css'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Image from 'next/image'

interface Props {
    floor: string,
    id: number,
    image: string,
    old_price: string,
    price: string,
    project_title: string,
    release_dates: string,
    rooms: number,
    square: string,
    studio: boolean,
}

interface Props2 {
    data: Props[]
}

export default function Card({ data }: Props2) {
    if (data) {
        return (
            data.map((d, index) => (
                <Box key={index} className={styles.card}>
                    <Box className="flex justify-between p-[5px]">
                        <Box>
                            {d.rooms == 0 ?  <Typography>{'Студия'}  {d.square}м²</Typography>:
                            <Typography>{d.rooms}-комнатная {d.square}м²</Typography>}
                            
                            <Box className="flex align-bottom">
                                <Typography className={styles.pice_now}>{d.price} ₽</Typography>
                                <Typography className={styles.pice_old}>{d.old_price} ₽</Typography>
                            </Box>
                        </Box>
                        <Box>
                            <Image src={'/like.png'} alt='gg' width={55} height={55} />
                        </Box>
                    </Box>
                    <Box className={'flex justify-center text-center'}>
                        <Image src={'/Group.png'} alt='Group' width={95} height={187} />
                    </Box>
                    <Box>
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Проект</TableCell>
                                        <TableCell align="right">{d.project_title}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={d.id}>
                                        <TableCell component="th" scope="row">
                                            Этаж
                                        </TableCell>
                                        <TableCell align="right">{d.floor}</TableCell>
                                    </TableRow>
                                    <TableRow key={d.id + '_release_date'}>
                                        <TableCell component="th" scope="row">
                                            Срок сдачи
                                        </TableCell>
                                        <TableCell align="right">{d.release_dates}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            ))
        )
    }
}

