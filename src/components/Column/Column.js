import React, { useCallback, useEffect, useState } from 'react'
import { Container, Draggable } from 'react-smooth-dnd'
import './Column.scss'
import {MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM} from 'utilities/constants'
import { saveContentAfterPressEnter, selectAllInlineText } from 'utilities/contentEditable'

import Card from 'components/Card/Card';
import ConfirmModal from 'components/Common/ConfirmModal';
import { mapOrder} from 'utilities/sorts'
import {Form ,Dropdown} from 'react-bootstrap'

function Column(props) {
    const { column, onCardDrop, onUpdateColumn } = props

//    const cards =  column.cards
    const cards = mapOrder(column.cards, column.cardOrder,'id')  

    // const onCardDrop =(columnId, dropResult)=> {
    //   if(dropResult.removedIndex !==null || dropResult.addedIndex !==null) {
        
    //   }
        
    //   }  


    //modal
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const toggleShowConfirm = () => setShowConfirmModal(!showConfirmModal)


    const [columnTitle, setColumnTitle] = useState('')
    useEffect(() => {
      setColumnTitle(column.title)
    },[column.title])

    const handleColumnTitleChange = useCallback(  (e) =>{
      setColumnTitle(e.target.value)
    })

    const handleColumnTitleBlur = (e) => {
        //update text in Column input onclick
        const newColumn = {
          ...column,
          title: columnTitle
        }
        onUpdateColumn(newColumn)
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
                    onDrop={dropResult =>onCardDrop(column.id,dropResult)}
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
         
       </div>
       <footer>
        <div className='footer-actions'>
          <i className='fa fa-plus icon'/> Add another cards
        </div>
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