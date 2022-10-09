import React, { useState, useEffect } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './BoardContent.scss'
import Column from 'components/Column/Column'

import { mapOrder} from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

import { initialData } from 'actions/initialData'
import { isEmpty} from 'lodash'

function BoardContent() {

    const [board,setBoard] = useState({}) //object
    const [columns,setColumns] = useState([]) //array

    useEffect(()=> {
        const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
       
        if(boardFromDB) {
          setBoard(boardFromDB)
          
/**
          //sort columnOrders
          boardFromDB.columns.sort(function(a,b) {
              return boardFromDB.columnOrder.indexOf(a.id) - boardFromDB.columnOrder.indexOf(b.id)
          })

           setColumns(boardFromDB.columns)
**/
          //do it other way
          // console.log(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'));
          setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'title') )
   
        }
      }, [])

  
      //lodash is a library to check null object
      if(isEmpty(board)) {
        return <div className='not-found' style={{'padding':'10px', 'color':'white'}}>Board not found</div>
      }


    const onColumnDrop = (dropResult)=> {
      console.log(dropResult)
    
      //swap the position of the state when dragging
      let newColumns = [...columns]
      newColumns = applyDrag(newColumns,dropResult)

      console.log(newColumns)
      console.log(columns)
      //set back the value to new value
      setColumns(newColumns)

      //do the same with board
      let newBoard = {...board}
      newBoard.columnOrder = newColumns.map(c=>c.id)
      newBoard.columns = newColumns
      console.log(newBoard)
      setBoard(newBoard)
    }  

    const onCardDrop =(columnId, dropResult)=> {
      if(dropResult.removedIndex !==null || dropResult.addedIndex !==null) {
        let newColumns = [...columns]
        
        let currentColumn = newColumns.find(c=>c.id === columnId)
        currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
        currentColumn.cardOrder = currentColumn.cards.map(i => i.id)
        console.log(currentColumn)
        setColumns(newColumns)
        
      }
        
    }  

    return   (

      <div className='board-content'>
         <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={index =>
            columns[index]
          }

          //specific css to know which thing can be dragged
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'column-drop-preview'
          }}
        >
           {columns.map((column, index) => (
            <Draggable key={index}>
              <Column column={column} onCardDrop={onCardDrop} />
            </Draggable>
            
           ) )}

        </Container>
       <div className='add-new-column'>
         <i className='fa fa-plus icon'/> Add another column
       </div>
      
      </div>
    )
    

}

export default BoardContent
