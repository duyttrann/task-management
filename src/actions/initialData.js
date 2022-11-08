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
                    id: 'card-1',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 1',cover: 'https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/271180999_6715074841898050_3119676219567720605_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=OV23wkLDdOYAX8C008c&_nc_ht=scontent-lga3-1.xx&oh=00_AfC8cGwCXLUCOc8x2OSvKGPLQ1prim-fNGFTrE6yJWqmSA&oe=636F78A5'},
                    {id: 'card-2',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 2',cover: null },
                    {id: 'card-3',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 3',cover: null },
                    {id: 'card-4',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 4',cover: 'https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/290015481_2292666290889902_871806036976462062_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=SQRieQFEF3wAX_0cP1v&_nc_ht=scontent-lga3-1.xx&oh=00_AfCWN2nZI9xk9tjv7p15OzaHRSXF5yO52IF7pKFfMfCvyw&oe=636F6000' },
                    {id: 'card-5',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 5',cover: 'https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/234247539_2046493278840539_8464483790303355121_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=0-DVr_AonsYAX-7_3Gq&_nc_ht=scontent-lga3-1.xx&oh=00_AfCgVyepvhs99FeUTqgbp3lpeA2zjjxlts_TN8eGmcXvtA&oe=636F5A7D' },
                    {id: 'card-6',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 6',cover: null },
                    {id: 'card-7',boardId: 'board-1', columnId: 'column-1',title: 'Title of card 7',cover: 'https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/262478417_2133163510173515_965153587463486417_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=VyYrweEi4UcAX9MGCsV&_nc_ht=scontent-lga3-1.xx&oh=00_AfC9eiiTelXhZq4vrXDzZdQ1Zgqqy7nfr35x-5KO1jbtVg&oe=636EF11A' },
                  
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