
"use client"
import React, { useState } from 'react';
import { styled, alpha, Box, FormControl, Stack, TextField } from '@mui/material';
import { Slider as BaseSlider, sliderClasses } from '@mui/base/Slider';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeListFlats, changeSquareRoom } from '@/hooks/reducer';
import { getFilterFats } from '@/request/request';
import { useAppSelector } from '@/hooks/hook';
import { useRouter } from 'next/router';


export default function SquareRegulation({ min, max }: { min: number, max: number }) {
  const router = useRouter()

  const [value, setValue] = useState<number[]>([22, 75]);
  const dispatch = useDispatch()

  const priceFilter = useAppSelector(state => state.fats.priceRooms)
  const numberRoom = useAppSelector(state => state.fats.numberOfRooms)


  useEffect(() => {
    const { minSquare, maxSquare } = router.query;
    if (minSquare && maxSquare) {
      setValue([Number(minSquare), Number(maxSquare)]);
    }
  }, []);

  useEffect(() => {
    dispatch(changeSquareRoom({ square: [value[0], value[1]] }))
  }, [min, max, value]);



  useEffect(() => {

    const fetchData = async () => {

      const filter = {
        "f[square][min]":  value[0],
        "f[square][max]":  value[1],
        "f[price][min]":  priceFilter[0],
        "f[price][max]":  priceFilter[1],
        "f[rooms][]":  numberRoom,
      }
      const data = await getFilterFats(filter);
      dispatch(changeListFlats({ fats: data.data }));
    };
    fetchData();

    const query = {
      minSquare: value[0],
      maxSquare: value[1],
      minPrice: router.query.minPrice,
      maxPrice: router.query.maxPrice,
      numbersOfRoom: router.query.numbersOfRoom
    };
    router.push({
      pathname: router.pathname,
      query: query
    });

  }, [value]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Stack spacing={-2}>
      <FormControl fullWidth>
        <TextField id="price-range" value={`от ${value[0]} - до ${value[1]}`} />
      </FormControl>
      <Slider
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
      />
    </Stack>
  );
}



const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  300: '#66B2FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B3',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Slider = styled(BaseSlider)(
  ({ theme }) => `
  color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
  height: 6px;
  width: 100%;
  padding: 16px 0;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;

  &.${sliderClasses.disabled} {
    pointer-events: none;
    cursor: default;
    color: ${theme.palette.mode === 'light' ? grey[300] : grey[600]};
    opacity: 0.4;
  }

  & .${sliderClasses.rail} {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
    opacity: 0.3;
  }

  & .${sliderClasses.track} {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 6px;
    background-color: currentColor;
  }

  & .${sliderClasses.thumb} {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    margin-left: -6px;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    background-color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
    transition-property: box-shadow, transform;
    transition-timing-function: ease;
    transition-duration: 120ms;
    transform-origin: center;

    &:hover {
      box-shadow: 0 0 0 6px ${alpha(
    theme.palette.mode === 'light' ? blue[200] : blue[300],
    0.3,
  )};
    }

    &.${sliderClasses.focusVisible} {
      box-shadow: 0 0 0 8px ${alpha(
    theme.palette.mode === 'light' ? blue[200] : blue[400],
    0.5,
  )};
      outline: none;
    }

    &.${sliderClasses.active} {
      box-shadow: 0 0 0 8px ${alpha(
    theme.palette.mode === 'light' ? blue[200] : blue[400],
    0.5,
  )};
      outline: none;
      transform: scale(1.2);
    }
  }

  & .${sliderClasses.mark} {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 99%;
    background-color: ${theme.palette.mode === 'light' ? blue[200] : blue[900]};
    top: 44%;
    transform: translateX(-50%);
  }

  & .${sliderClasses.markActive} {
    background-color: ${theme.palette.mode === 'light' ? blue[500] : blue[400]};
  }
`,
);
