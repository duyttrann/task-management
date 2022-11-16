import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import {Container as  BootstrapContainer, Row, Col, Form,Button} from 'react-bootstrap'
import './BoardContent.scss'
import Column from 'components/Column/Column'

import { mapOrder} from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

import { initialData } from 'actions/initialData'
import { fetchBoardDetails, createNewColumn, updateBoard,
        updateColumn,updateCard } from 'actions/ApiCall'
import { isEmpty, cloneDeep} from 'lodash'

function BoardContent() {

    const [board,setBoard] = useState({}) //object
    const [columns,setColumns] = useState([]) //array
    const [openNewColumnForm , setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () =>{  setOpenNewColumnForm(!openNewColumnForm)}


    const newColumnInputRef = useRef(null)
 
    const [newColumnTitle, setNewColumnTitle] =useState('')

    //get value of the input and put to addNewColumn function
    const onNewColumnTitleChange = useCallback((e) =>setNewColumnTitle(e.target.value), [])


    //edit the text in Column title when onclick
   const onUpdateColumnState = (newColumnToUpdate) =>{
        const columnIdToUpdate = newColumnToUpdate._id
        console.log(newColumnToUpdate)
        console.log(columnIdToUpdate)
        let newColumns= [...columns]
          

        //find the index of the id of the onlcik Column title
        const index = newColumns.findIndex(i => i._id === columnIdToUpdate)
        
        if (newColumnToUpdate._destroy) {
            //remove column
            newColumns.splice(index, 1)
          } else { 
          //update column
           newColumns.splice(index, 1, newColumnToUpdate)
        

    
        
        }
        
     
        //update back column to board
        let newBoard = {...board}
        newBoard.columnOrder = newColumns.map(c=>c._id)
        newBoard.columns = newColumns
        setBoard(newBoard)
        setColumns(newColumns)
      }

    const addNewColumn = () => {
        if(!newColumnTitle) {
          //if the input is empty, focus back to the input
          newColumnInputRef.current.focus()
          return
        }

        const newColumnToAdd = {
          boardId: board._id,
          title: newColumnTitle.trim(),
        }

        createNewColumn(newColumnToAdd).then(column => {
          let newColumns = [...columns]
          newColumns.push(column)
  
          let newBoard = {...board}
          newBoard.columnOrder = newColumns.map(c=>c._id)
          newBoard.columns = newColumns
          setBoard(newBoard)
          setColumns(newColumns)
  
          setNewColumnTitle('')
          toggleOpenNewColumnForm() 
        })

     

      }

    useEffect(()=> {
        // const boardFromDB = initialData.boards.find(board => board.id === 'board-1')
        fetchBoardDetails('636860caf52276bd8952838c').then(board => {
          // setBoard(boardFromDB)
          // setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'title') )
          setBoard(board)
          setColumns(mapOrder(board.columns, board.columnOrder, '_id') )
        })
//         if(boardFromDB) {
//           setBoard(boardFromDB)
          
// /**
//           //sort columnOrders
//           boardFromDB.columns.sort(function(a,b) {
//               return boardFromDB.columnOrder.indexOf(a.id) - boardFromDB.columnOrder.indexOf(b.id)
//           })

//            setColumns(boardFromDB.columns)
// **/
//           //do it other way
//           // console.log(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'));
//           setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'title') )
   
//         }
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
      // let newColumns = [...columns]
      let newColumns = cloneDeep(columns)
      newColumns = applyDrag(newColumns,dropResult)

 
  

      //do the same with board
      // let newBoard = {...board}
      let newBoard = cloneDeep(board)
      newBoard.columnOrder = newColumns.map(c=>c._id)
      newBoard.columns = newColumns

   //set back the value to new value
      setColumns(newColumns)
      setBoard(newBoard)
        //call api Update columnOrder in board 
      // updateBoard(newBoard._id, newBoard).then(updateBoard => {
        
      //      setColumns(newColumns)
      //      setBoard(updateBoard)
      // })

      updateBoard(newBoard._id, newBoard).catch(() => {
            setColumns(columns)
           setBoard(board)
      })

    }  

    const onCardDrop =(columnId, dropResult)=> {
      if(dropResult.removedIndex !==null || dropResult.addedIndex !==null) {
        let newColumns = [...columns]
        // let newColumns = cloneDeep(columns)

        let currentColumn = newColumns.find(c=>c._id === columnId)
        currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
        currentColumn.CardOrder = currentColumn.cards.map(i => i._id)
        console.log(currentColumn)

        setColumns(newColumns)
        if (dropResult.removedIndex !==null && dropResult.addedIndex !==null) {
            /** 
             * move cards inside a column
              call API to update cardOrder in this column
            * */ 
              updateColumn(currentColumn._id , currentColumn).catch(() => {
                setColumns(columns)
              })
          } else {
            console.log('moveeee')
            /**
             *move cards to another column 
              call API to update cardOrder in this column + re-update columnId of that card
             */
              updateColumn(currentColumn._id , currentColumn).catch(() => {
                setColumns(columns)
              })
              
              if (dropResult.addedIndex !==null) {
                console.log()
                //when dropping to another column, it will run twice, and if we call api to update columnId, it will take back the previous 
                //columnId of its. We make an if here to update columnId only in the first scenerio
                let currentCard = cloneDeep(dropResult.payload)
                currentCard.columnId = currentColumn._id
                updateCard(currentCard._id, currentCard)
              }

              
        }

    
        
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
              <Column column={column} 
              onCardDrop={onCardDrop}
              onUpdateColumnState={onUpdateColumnState}
               />
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
