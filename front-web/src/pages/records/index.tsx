import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
import { RecordsResponse } from './types';
import { formatDate } from './helpers';
import Pagination from '../pagination/index';
import Filters from '../../components/filters';

const BASE_URL = 'http://localhost:8080';

const Records = () => {

    //O useState está criando um estado interno para o componente. Trata-se de um React Hooks 
    //Esse estado vai armazernar os valores para serem consumidos
    const [recordsResponse, setRecordsResponse] = useState<RecordsResponse>();
    console.log(recordsResponse); 

    const [activePage, setActivePage] = useState(0);
    
    //Se os colchetes estão vazios, significa que não temos nenhum tipo de depência
    //Nesse caso o componente será executado assim que for iniciado
    //Como se trata de carga de uma lista, é o comportamento esperado
    //Porém precisamos passar como depencência o ActivePage para toda vez que este estado mudar, ele fará uma nova requisição
    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=10&page=${activePage}`)
            .then(response => setRecordsResponse(response.data));

    }, [activePage]);

    const handlePageChange = (index: number) => {
        setActivePage(index);
    }

    return (
            <div className="page-container">
                <Filters link="/charts" linkText="VER GRÁFICOS" />
                <table className="records-table" cellPadding="0" cellSpacing="0">
                    <thead>
                        <tr>
                            <th>INSTANTE</th>
                            <th>NOME</th>
                            <th>IDADE</th>
                            <th>PLATAFORMA</th>
                            <th>GENERO</th>
                            <th>TÍTULO DO GAME</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recordsResponse?.content.map(record => (
                            <tr key={record.id}>
                                <td>{formatDate(record.moment)}</td>
                                <td>{record.name}</td>
                                <td>{record.age}</td>
                                <td className="text-secondary">{record.platform}</td>
                                <td>{record.genreName}</td>
                                <td className="text-primary">{record.gameTitle}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination 
                    activePage={activePage}
                    goToPage={handlePageChange}
                    totalPages={recordsResponse?.totalPages}
                />
        </div>
    );
}

export default Records;