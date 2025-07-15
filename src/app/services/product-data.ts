export interface Item {
    id: string;
    name: string;               
    price: number;
    imageThumbnail?: string;
    quantity?: number;
}

export const ITEMS: Item[] = [
    {
        id: 'sci-1',
        name: 'Super Cool Item',
        price: 5.99,
        imageThumbnail: '../assets/thumb-1.jpg',
    },
    {
        id: 'aci-1',
        name: 'Another Cool Item',
        price: 11.99,
        imageThumbnail: '../assets/thumb-2.jpg',
    },
    {
        id: 'yaci-1',
        name: 'Yet Another Cool Item',
        price: 18.99,
        imageThumbnail: '../assets/thumb-3.jpg',
    }
];
