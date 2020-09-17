import React, { useEffect, useState } from 'react';
import Filters from '../../components/filters';
import "./style.css"
import { barOptions, pieOptions } from './chart-options';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { buildBarSeries, getPlatformChartData, getGenderChartData } from './helpers'

const BASE_URL = 'http://localhost:8080';

type PieChartData = {
    labels: string[];
    series: number[];
}

type BarChartData = {
    x: string;
    y: number;
}

const initialPieData = {
    labels: [],
    series: []
}

const Charts = () => {

    //O primeiro valor se trata de uma variável de fato a ser utilizado no componente
    //e o segundo valor é uma função que é utilizado para atualizar a primeira varíavel
    const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
    const [plataformtData, setPlataformtData] = useState<PieChartData>(initialPieData);
    const [gendertData, setGendertData] = useState<PieChartData>(initialPieData);


    useEffect(() => {
        async function getData(){
            const recordsResponse = await axios.get(`${BASE_URL}/records`);
            const gamesResponse = await axios.get(`${BASE_URL}/games`);

            const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
            setBarChartData(barData);

            const platformChartData = getPlatformChartData(recordsResponse.data.content);
            setPlataformtData(platformChartData);

            const genderChartData = getGenderChartData(recordsResponse.data.content);
            setGendertData(genderChartData);
        }

        getData();
    }, [])

    return (
        <div className="page-container">
            <Filters link="/records" linkText="VER TABELA" />
            <div className="chart-container">
                <div className="top-related">
                    <h1 className="top-related-title">
                        Jogos mais votados
                    </h1>
                    <div className="games-container">
                        <Chart options={barOptions}
                         type="bar"
                         width="750"
                         height="550"
                         series={[{ data: barChartData }]}
                      />
                    </div>
                </div>
                <div className="charts">
                    <div className="platform-chart">
                        <h2 className="chart-title">Plataformas</h2>
                        <Chart 
                            options={{ ...pieOptions, labels: plataformtData.labels }}
                            type="donut"
                            series= {plataformtData?.series}
                            width="300"
                      />
                    </div>
                    <div className="gender-chart">
                        <h2 className="chart-title">Gêneros</h2>
                        <Chart 
                            options={{ ...pieOptions, labels: gendertData?.labels }}
                            type="donut"
                            series= {gendertData?.series}
                            width="300"
                      />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Charts;