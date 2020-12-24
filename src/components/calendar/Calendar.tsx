import React, { useEffect, useState } from 'react'
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import moment from 'moment';

interface CalendarProps {}

const cita = {
  date: '12/25/2020',
  time: '10:00',
}


export const Calendar: React.FC<CalendarProps> = ({}) => {
  const [days, setDays] = useState<string[]>([]);
  const [hours, setHours] = useState<string[]>([]);
  useEffect(() => {
    const daysTmp : string[] = [];
    // const currentDay = new Date();
    let day = 0;
    while (day < 7) {
      // const answer = new Date().setDate(new Date().getDate() + 5);
      let date = moment(new Date()).add({ days: day })
      console.log('date.day().toString()', date.format('ddd DD').toString());
      console.log('date.day()', date.format('ddd DD'));
      daysTmp.push(date.format('ddd DD'))
      // let date = moment(answer, "MM-DD-YYYY", "es").locale("mx");
      // console.log(answer);
      console.log(date.day());

      // console.log('DIA---->', date.format('ddd DD'));
      // console.log("dia de la semana :"+date.day());
      // console.log("mes:"+date.month());
      // console.log("año:"+date.year());
      // console.log("Fecha con localización :"+ date.format("DD MMMM YYYY"));
      // console.log("Fechsssss", date);

      day++;
    }

      var result = [];                      // Results will go here
      var nowHour = new Date().getHours();  // Get current hour of the day
      console.log('segundos', moment().day());
      // Loop from current hour number to 23
      for(var i = nowHour; i < 24; i++){
        result.push(i + "00");  // Put loop counter into array with "00" next to it
      }

      getHours();

    console.log('horas', result);
    
    setDays(daysTmp);
  }, []);

  const getHours = () => {
    // var d = new Date(),
    // h = d.getHours(),
    // m = 15 * Math.floor(d.getMinutes()/15),
    // stamp = h + ":" + (m === 0 ? "00" : m);
  
    var arr = [], i, j;
    for(i=0; i<24; i++) {
      for(j=0; j<4; j++) {
        arr.push(i + ":" + (j===0 ? "00" : 15*j) );
      }
    }
    setHours(arr);
    console.log('get hours', arr);
  }

  const book = (res: any, day: string, time: string) => {
    let date = moment(new Date(Date.parse(res.date)))
    if (date.format('ddd DD') === day && res.time === time) {
      return <Text>Cita aqui</Text>
    }
  }

  const headerDay = (item: string) => (
    <Flex align='center' justify='center' bg='surface' width='14%' height='40px'>
      <Text fontWeight='bold'>{item}</Text>
    </Flex>
  )

  return (
    <Box>
      <Flex pos='sticky' top='0' borderTopWidth={1} borderBottomWidth={1} borderColor='borders'>
        <Flex align='center' justify='center' bg='surface' width='5%' height='40px'>
          <Text fontWeight='bold'>Horas</Text>
        </Flex>
        { days.map((item) => headerDay(item)) }
      </Flex>
      
      <Flex direction='row'>
        <Flex direction='column' w='5%'>
          {
            Array.from(Array(24), (e, i) => (
              <Flex bg='surface' w='100%' height='120px' justify='center' align='center' borderWidth={1} borderColor='borders'>
                <Text>{i}:00</Text>
              </Flex>
            ))
          }
        </Flex>
        <Flex direction='row' w='95%'>
          { days.map((day) => {
            return (
              <Flex direction='column' w='15%'>
                {
                  hours.map((time) => (
                    <Box bg='surface' height='30px' borderWidth={1} borderColor='borders' borderTopWidth='0px' borderLeftWidth='0px'>
                      { book(cita, day, time) }
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