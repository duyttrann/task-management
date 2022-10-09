export const initialData = {
    boards: [{
        id:'board-1',
        columnOrder : ['column-3','column-2','column-1'],
        columns: [
            {
                id:'column-1',
                boardId: 'board-1',
                title: 'To do column',
                cardOrder: ['card-1','card-2','card-3','card-4','card-5','card-6','card-7'],
                cards: [
                    {
                    id: 'card-1',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 1',cover: 'https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-1/271180999_6715074841898050_3119676219567720605_n.jpg?stp=dst-jpg_p320x320&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=P3PCTsYPY3gAX-BEnAT&_nc_ht=scontent-lga3-2.xx&oh=00_AT_ErSWuf9qUEUicjHgo2rVGTI-2bxdMSaQTeCFKHBDxOA&oe=63407127'},
                    {id: 'card-2',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 2',cover: null },
                    {id: 'card-3',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 3',cover: null },
                    {id: 'card-4',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 4',cover: null },
                    {id: 'card-5',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 5',cover: null },
                    {id: 'card-6',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 6',cover: null },
                    {id: 'card-7',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 7',cover: null },
                  
                ]
            },
            
            {
                id:'column-2',
                boardId: 'board-1',
                title: 'In progress column',
                cardOrder: ['card-8','card-9','card-10'],
                cards: [
                    {
                    id: 'card-8',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 8',cover: null },
                    {id: 'card-9',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 9',cover: null },
                    {id: 'card-10',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 10',cover: null },
                
                  
                ]
            },

            {
                id:'column-3',
                boardId: 'board-1',
                title: 'Done column',
                cardOrder: ['card-11','card-12','card-13'],
                cards: [
                    {
                    id: 'card-11',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 11',cover: null },
                    {id: 'card-12',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 12',cover: null },
                    {id: 'card-13',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 13',cover: null },
                
                  
                ]
            }
        ]
    }
    ]
        
    
}