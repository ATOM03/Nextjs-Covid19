import axios from 'axios';
import { NextResponse } from 'next/server';


export async function GET(req: Request){
  
  try{
    const {data} = await axios.get('https://api.covid19india.org/data.json')
    // console.log(data);
    return NextResponse.json( data , { status: 200 })
  }
  catch(error){
    console.log(error)
    return NextResponse.json({ error: error }, { status: 500 })
  }
    // await axios.get('https://api.covid19india.org/data.json')
    //   .then(function (response) {
    //     // console.log(response.data);
    //     NextResponse.json({ data: response.data }, { status: 200 })
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
}