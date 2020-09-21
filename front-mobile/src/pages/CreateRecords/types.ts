export type GamePlatform = 'XBOX' | 'PC' | 'PLAYSTATION';

export type Game = {
    //Estrutura da API
    id: number;
    title: string;
    platform: GamePlatform;
    //Estrutura para preenhcimento do RNPickerSelect (Componente Select)
    label: string;
    value: number;
}