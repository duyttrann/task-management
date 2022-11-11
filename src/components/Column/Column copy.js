import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './Column.scss'
import {MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM} from 'utilities/constants'
import { saveContentAfterPressEnter, selectAllInlineText } from 'utilities/contentEditable'
import { createNewCard } from 'actions/ApiCall'
import {cloneDeep} from 'lodash'

import Card from 'components/Card/Card';
import ConfirmModal from 'components/Common/ConfirmModal';
import { mapOrder} from 'utilities/sorts'
import {Form ,Dropdown, Button} from 'react-bootstrap'

function Column(props) {
    const { column, onCardDrop, onUpdateColumn } = props

//    const cards =  column.cards
    const cards = mapOrder(column.cards, column.CardOrder,'_id')  

    // const onCardDrop =(columnId, dropResult)=> {
    //   if(dropResult.removedIndex !==null || dropResult.addedIndex !==null) {
        
    //   }
        
    //   }  


    //modal
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const toggleShowConfirm = () => setShowConfirmModal(!showConfirmModal)


    const [openNewCardForm , setOpenNewCardForm] = useState(false)
    const toggleOpenNewCardForm = () =>{  setOpenNewCardForm(!openNewCardForm)}


    const [columnTitle, setColumnTitle] = useState('')
    useEffect(() => {
      setColumnTitle(column.title)
    },[column.title])

    const handleColumnTitleChange = useCallback(  (e) =>{
      setColumnTitle(e.target.value)
    })


    const newCardTextareaRef = useRef(null)
    useEffect(()=> {
      if(newCardTextareaRef && newCardTextareaRef.current) {
        newCardTextareaRef.current.focus()
      }
    }, [openNewCardForm])


    const [newCardTitle, setNewCardTitle] =useState('')

    //get value of the input and put to addNewCard function
    const onNewCardTitleChange = useCallback((e) =>setNewCardTitle(e.target.value), [])

    const handleColumnTitleBlur = (e) => {
        //update text in Column input onclick
        const newColumn = {
          ...column,
          title: columnTitle
        }
        onUpdateColumn(newColumn)
        setNewCardTitle('')
        toggleOpenNewCardForm()
    }


    const onConfirmModalAction = (type) => {
      console.log(type)
        if(type === MODAL_ACTION_CONFIRM) {
          //remove column
          const newColumn = {
            ...column,
            _destroy: true
          }
          console.log(newColumn)
          onUpdateColumn(newColumn)
        }
      toggleShowConfirm()

    }

   
    const addNewCard = () => {
      if (!newCardTitle) {
        newCardTextareaRef.current.focus()
        return
      }


      
      const newCardToAdd = {
        boardId: column.boardId,
        columnId: column._id,
        title: newCardTitle.trim(),
      }

      //call to API
      createNewCard(newCardToAdd).then(card => {
          //reupdate back to column, use lodash to create a new clone of Column, dont change the raw data
          let newColumn = cloneDeep(column)
          newColumn.cards.push(card)
          newColumn.CardOrder.push(card._id)

          onUpdateColumn(newColumn)
      })

    

    }
    return (
        <div className='column'>
        <header className='column-drag-handle'>
         <div className='column-title'> 
         <Form.Control size='sm' 
                type='text' 
          
                className='content-editable'
                // value={column.title}
                value = {columnTitle}
                spellCheck="false"
                onClick={selectAllInlineText}
                onChange={handleColumnTitleChange}
                onBlur={handleColumnTitleBlur}
                onKeyDown={saveContentAfterPressEnter}

                //when dragging the column, the column texts dont get onclick
                onMouseDown= {e=>e.preventDefault}
                // onChange={handleColumnTitleChange}
                // onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
               />
         </div>
         <div className='column-dropdown-actions'>
              <Dropdown>
            <Dropdown.Toggle  id="dropdown-basic" size='sm' className='dropdown-btn'/>

            <Dropdown.Menu>
              <Dropdown.Item>Add Card</Dropdown.Item>
              <Dropdown.Item  onClick={toggleShowConfirm}>Remove Column</Dropdown.Item>
              <Dropdown.Item>Move all cards in this column</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
         </div>
         
        </header>
       <div className='card-list'>
       <Container
                    {...column.props}
                   
                    // onDragStart={e => console.log('drag started', e)}
                    // onDragEnd={e => console.log('drag end', e)}
                    // onDragEnter={() => {
                    //     console.log('drag enter:', column.id);
                    //   }}
                    //   onDragLeave={() => {
                    //     console.log('drag leave:', column.id);
                    //   }}
                     groupName="col"
                    onDrop={dropResult =>onCardDrop(column._id,dropResult)}
                    getChildPayload={index =>
                      cards[index]
                    }
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                 
                    onDropReady={p => console.log('Drop ready: ', p)}
                    dropPlaceholder={{                      
                      animationDuration: 150,
                      showOnTop: true,
                      className: 'card-drop-preview' 
                    }}
                    dropPlaceholderAnimationDuration={200}
                  >
                 {cards.map((card,index)=>(
                 <Draggable key={index}>
                    <Card  card={card} />
                 </Draggable>
                 ) )}
       
         </Container>
                
         {openNewCardForm && 
          <div className='add-new-card-area'>
          <Form.Control size='sm' as='textarea'
           placeholder ='Enter title for this card..' 
           rows="3"
           className='texarea-enter-new-card'
           ref={newCardTextareaRef}
           value ={newCardTitle}
           onChange={onNewCardTitleChange}
           onKeyDown ={event => (event.key == 'Enter') && addNewCard() }
           // ref={newColumnInputRef}
           // value={newColumnTitle}
           // onChange={onNewColumnTitleChange}
           // onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
          />
           </div>
         }       
        
       </div>
       <footer>

       {openNewCardForm && 
          <div className='add-new-card-actions'>
          <Button variant="success" size='sm' onClick={addNewCard} >Add Card</Button>
          <span className='cancel-icon' onClick={toggleOpenNewCardForm} >
            <i className='fa fa-trash icon'></i>
          </span>
           </div>
         }      

        {!openNewCardForm && 
        <div className='footer-actions' onClick={toggleOpenNewCardForm}>
        <i className='fa fa-plus icon'/> Add another cards
        </div>
        }
        
        </footer>


        <ConfirmModal
          show={showConfirmModal}
          onAction={onConfirmModalAction}
          title="Remove Column"
          // content ={'Are you sure you want to remove this column ${column.title}! ?'}
        />
     </div>
    
    )
 
}

export default Column