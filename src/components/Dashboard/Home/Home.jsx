import React,{useEffect, useState} from "react";
import { Avatar, Box, Stack, Typography, Tooltip } from "@mui/material";
import { TagBox } from "../Tag/TagStyle";
import { gql, useQuery } from "@apollo/client";
//chart 
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

//chart

const GET_MYEXPENSES = gql`
query Query {
  getMyExpenses {
    _id
    amount
    tag {
      _id
      name
      color
    }
    date
    geo {
      lat
      lon
    }
  }
  getMyTags {
    _id
    name
    color
  }
}`;


function Home() {
  const [chart, setChart] = useState('');

  const { data, loading, refetch, error } = useQuery(GET_MYEXPENSES);

  useEffect(() => {

    if (data) {
      setChart(data.getMyExpenses)
    }
    
  }, [data])

  if(error) return <h4>Error!</h4>
  if(loading) return <h4>Loading</h4>
   return (
    <>
    <TagBox>
    
      <Typography color='#fff' align="center" variant="h6">
        My Dashboard
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={chart}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              barSize={20}
            >
              <XAxis  dataKey="date" scale="point" padding={{ left: 10, right: 10 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="amount" fill="gray" background={{ fill: '#eee' }} />
            </BarChart>
          </ResponsiveContainer>

    </TagBox>
      
    </>
  );
}

export default Home;
