import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Card from '../Card/Card'
import { getFats, getFilterFats, getFilterSquareFats } from '../../request/request';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { changeListFlats } from '@/hooks/reducer';
import { useRouter } from 'next/router';
type Props = {}

export default function CardList(props: Props) {
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state.fats.listFlats)
    const filterSquareRoom = useAppSelector(state => state.fats.squareRoom)
    const listFats = useAppSelector(state => state.fats.listFlats)
    const squareFilter = useAppSelector(state => state.fats.squareRoom);
    const priceFilter = useAppSelector(state => state.fats.priceRooms);
    const numberRooms = useAppSelector(state => state.fats.numberOfRooms);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(3); // Текущая страница
    const [pageSize, setPageSize] = useState(20); // Размер страницы
    const [fetchedFats, setFetchedFats] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await getFats()
    //         dispatch(changeListFlats({ fats: data.data }))
    //     }
    //     fetchData()
    // }, [])


    useEffect(() => {
        const fetchData = async () => {
            const filter = {
                "f[square][min]": squareFilter[0],
                "f[square][max]": squareFilter[1],
                "f[price][min]": priceFilter[0],
                "f[price][max]": priceFilter[1],
                "f[rooms][]": numberRooms,
                
               
            };
            const data = await getFilterFats(filter);
            dispatch(changeListFlats({ fats: data.data }));
        };
        fetchData();

        const query = {
            numbersOfRoom: numberRooms,
            minPrice: router.query.minPrice,
            maxPrice: router.query.maxPrice,
            minSquare: router.query.minSquare,
            maxSquare: router.query.maxSquare
        };
        router.push({
            pathname: router.pathname,
            query: query
        });
    }, [currentPage]);

    const handleShowMore = () => {
        setCurrentPage(currentPage + 1);
    };

    if (data) {
        return (
            <Box>
                <Box className="flex flex-wrap gap-8 mt-[40px]">
                    <Card data={data} />

                </Box>
                <Button fullWidth variant='contained' className='bg-blue-500 text-white mt-[40px]'
                    onClick={handleShowMore} >Показать еще {listFats.length} из 20</Button>
            </Box>

        )
    }

}