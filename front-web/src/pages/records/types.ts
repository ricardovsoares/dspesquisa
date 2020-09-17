
//Se precisássemos de outros elementos além do content e totalPages, era só incluir na estrutura abaixo.
//Por exemplo: totalElements, pageSize, etc
export type RecordsResponse={
    content: RecordItem[];
    totalPages: number;
}

//RecordItem foi criado para instanciar/receber os atributos do Record
export type RecordItem={
    id: number;
    moment: string;
    name: string;
    age: number;
    gameTitle: string;
    platform: Plataform;
    genreName: string;
}

export type Plataform = 'XBOX' | 'PC' | 'PLAYSTATION';