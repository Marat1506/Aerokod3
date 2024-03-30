
import React, { useEffect, useState } from 'react';
import { Autocomplete, Box, Button, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import PriceRegulation from './PriceRegulation';
import { useAppDispatch, useAppSelector } from '@/hooks/hook';
import { changeListFlats, changeNumberRooms, changeOptionProjectState } from '@/hooks/reducer';
import SquareRegulation from './SquareRegulation';
import { getFilterFats } from '@/request/request';
import { useRouter } from 'next/router';

type Props = {};

const options = ['Все', 'Тестовый'];

export default function Header({ }: Props) {
    const router = useRouter();
    const [projectState, setProjectState] = useState(1);
    const option = useAppSelector(state => state.fats.optionProjectState);
    const dispatch = useAppDispatch();
    const squareFilter = useAppSelector(state => state.fats.squareRoom);
    const priceFilter = useAppSelector(state => state.fats.priceRooms);
    const numberRooms = useAppSelector(state => state.fats.numberOfRooms);
    const [value, setValue] = useState<string | null>(options[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const filter = {
                "f[square][min]": squareFilter[0],
                "f[square][max]":  squareFilter[1],
                "f[price][min]":  priceFilter[0],
                "f[price][max]":  priceFilter[1],
                "f[rooms][]":  numberRooms,
                
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
    }, [value, numberRooms]);

    const handleButtonClick = (index: number) => {
        setProjectState(index);
        dispatch(changeNumberRooms({ room: index }));
    };

    return (
        <Box className="p-4">
            <Typography className="text-t6-normal mb-4">ПЛАНИРОВКИ</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Typography className="mb-2">Проект</Typography>
                    <Autocomplete
                        fullWidth
                        value={value}
                        onChange={(event: any, newValue: string | null) => {
                            setValue(newValue);
                            dispatch(changeOptionProjectState({option: newValue}))
                        }}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => {
                            setInputValue(newInputValue);
                        }}
                        id="controllable-states-demo"
                        options={options}
                        renderInput={(params) => <TextField {...params} label="" />}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography className="mb-2">Укажите количество комнат</Typography>
                    <div className="grid grid-cols-5 gap-2">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <Button 
                                key={index}
                                className={`h-[55px] ${projectState === index ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                variant="contained"
                                onClick={() => handleButtonClick(index)}
                                disabled={option === 'Тестовый' && index !== 2} 
                            >
                                {index === 0 ? 'Ст' : `${index}к`}
                            </Button>
                        ))}
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography className="mb-2">Стоимость</Typography>
                    <PriceRegulation min={0} max={20000000} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography className="mb-2">Задайте площадь, м^2</Typography>
                    <SquareRegulation min={0} max={200} />
                </Grid>
            </Grid>

        </Box>
    );
}
