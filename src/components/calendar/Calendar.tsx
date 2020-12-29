import React, { useEffect, useLayoutEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import moment from 'moment';

interface CalendarProps {}

const cita = {
  date: '12/25/2020',
  time: '10:00',
}

const citas = [
  {
    name: 'Oscar',
    date: '12/25/2020',
    time: '10:00',
  },
  {
    name: 'Oscar',
    date: '12/25/2020',
    time: '11:00',
  },
  {
    name: 'Oscar',
    date: '12/25/2020',
    time: '12:00',
  },
  {
    name: 'Oscar',
    date: '12/25/2020',
    time: '13:00',
  },
  {
    name: 'Oscar',
    date: '12/25/2020',
    time: '14:00',
  },
  {
    name: 'Juan',
    date: '12/25/2020',
    time: '19:00',
  } 
]

type days = {
  dayName: string
  dayNumber: string
}

export const Calendar: React.FC<CalendarProps> = ({}) => {
  const [days, setDays] = useState<days[]>([]);
  const [hours, setHours] = useState<string[]>([]);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    console.log('use effect')
    const daysTmp : days[] = [];
    // const currentDay = new Date();
    let day = 0;
    while (day < 7) {
      // const answer = new Date().setDate(new Date().getDate() + 5);
      let date = moment(new Date()).add({ days: day })
      daysTmp.push({
        dayName: date.format('ddd'),
        dayNumber: date.format('DD')
      });
      day++;
    }
    
    setDays(daysTmp);
    getHours();
    setIsRender(true);

  }, []);

  useEffect(() => {
    if(isRender) {
      citas.forEach((item, index) => {
        // ReactDOM.render(book(item), document.getElementById('24-0:00'));
      }); 
    }
  })

  useLayoutEffect(() => {
    console.log('use layout')
    // citas.forEach((item, index) => {
    //   ReactDOM.render(book(item), document.getElementById('24-0:00'));
    // });
  })

  // useEffect(() => {
  //   // Consulta el API
  //   citas.forEach((item, index) => {
  //     ReactDOM.render(book(item), document.getElementById('24-0:00'));
  //   });
  // }, []);

  const getHours = () => {
    var arr = [], i, j;
    for(i=0; i<24; i++) {
      for(j=0; j<4; j++) {
        arr.push(i + ":" + (j===0 ? "00" : 15*j) );
      }
    }
    setHours(arr);
  }

  const book = (item: any, day?: string, time?: string) => {
    // let date = moment(new Date(Date.parse(item.date)))
    // if (date.format('ddd DD') === day && item.time === time) {
    //   return <Text>Cita aqui</Text>
    // }

    return <Text>{item.name}</Text>
  }

  const headerDay = (item: days, index: number) => (
    <Flex key={index} align='center' justify='center' bg='surface' width='14%' height='40px'>
      <Text fontWeight='bold'>{item.dayName}</Text>
    </Flex>
  )

  return (
    <Box>
      <Flex pos='sticky' top='0' borderTopWidth={1} borderBottomWidth={1} borderColor='borders'>
        <Flex align='center' justify='center' bg='surface' width='5%' height='40px'>
          <Text fontWeight='bold'>Horas</Text>
        </Flex>
        { days.map((item, i) => headerDay(item, i)) }
      </Flex>
      
      <Flex direction='row'>
        <Flex direction='column' w='5%'>
          {
            Array.from(Array(24), (e, i) => (
              <Flex key={i} bg='surface' w='100%' height='120px' justify='center' align='center' borderWidth={1} borderColor='borders'>
                <Text>{i}:00</Text>
              </Flex>
            ))
          }
        </Flex>
        <Flex direction='row' w='95%'>
          { days.map((day) => {
            return (
              <Flex key={day.dayNumber} direction='column' w='15%'>
                {
                  hours.map((time, key) => (
                    <Box key={key}  id={`${day.dayNumber}-${time}`} bg='surface' height='30px' borderWidth={1} borderColor='borders' borderTopWidth='0px' borderLeftWidth='0px'>
                      {/* { book(cita, day, time) } */}
                    </Box>
                  ))
                }            
              </Flex>
            )
          }) }
        </Flex>
      </Flex>
      
    </Box>
  );
}