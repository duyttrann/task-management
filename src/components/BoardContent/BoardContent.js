import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import {Container as  BootstrapContainer, Row, Col, Form,Button} from 'react-bootstrap'
import './BoardContent.scss'
import Column from 'components/Column/Column'

import { mapOrder} from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

import { initialData } from 'actions/initialData'
import { isEmpty} from 'lodash'

function BoardContent() {

    const [board,setBoard] = useState({}) //object
    const [columns,setColumns] = useState([]) //array
    const [openNewColumnForm , setOpenNewColumnForm] = useState(false)

    const newColumnInputRef = useRef(null)

    const [newColumnTitle, setNewColumnTitle] =useState('')

    //get value of the input and put to addNewColumn function
    const onNewColumnTitleChange = useCallback((e) =>setNewColumnTitle(e.target.value), [])

    const addNewColumn = () => {
        console.log(newColumnTitle)
        if(!newColumnTitle) {
          //if the input is empty, focus back to the input
          newColumnInputRef.current.focus()
          return
        }

        const newColumnToAdd = {
          id: Math.random().toString(36).substr(2,5),
          boardId: board.id,
          title: newColumnTitle.trim(),
          cardOrder: [],
          cards: []
        }

        let newColumns = [...columns]
        newColumns.push(newColumnToAdd)

        let newBoard = {...board}
        newBoard.columnOrder = newColumns.map(c=>c.id)
        newBoard.columns = newColumns
        setBoard(newBoard)
        setColumns(newColumns)

        setNewColumnTitle('')
        toggleOpenNewColumnForm() 

      }

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


      useEffect(()=> {
        if(newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus()
        }
      }, [openNewColumnForm])
  
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
    const toggleOpenNewColumnForm = () =>{
        setOpenNewColumnForm(!openNewColumnForm)
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

        <BootstrapContainer className='trello-clone-container'>
          {!openNewColumnForm && 
            <Row>
            <Col className='add-new-column' onClick={toggleOpenNewColumnForm}>
               <i className='fa fa-plus icon'/> Add another column
            </Col>
          </Row>
          }

          {openNewColumnForm && 
             <Row>
             <Col className='enter-new-column'> 
               <Form.Control size='sm' type='text' placeholder ='Enter Column title' 
                className='input-enter-new-column'
                ref={newColumnInputRef}
                value={newColumnTitle}
                onChange={onNewColumnTitleChange}
                onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
               />
               <Button variant="success" size='sm' onClick={addNewColumn}>Add Column</Button>
               <span className='cancel-new-column' onClick={ toggleOpenNewColumnForm} >
                 <i className='fa fa-trash icon'></i>
               </span>
             </Col>
           </Row> 
          }
        
          
     
       </BootstrapContainer>

      
      
      </div> 
    )
    

}

export default BoardContent
