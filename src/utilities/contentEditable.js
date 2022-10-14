


//onkeyDown 
export  const saveContentAfterPressEnter = (e) =>{
    if (e.key === 'Enter') {
      //trigger the Onblur to call for handleColumnTitleBlur
      e.target.blur()
    }
  }



  //select all input value
 export const selectAllInlineText = (e) =>{
    e.target.focus()
    e.target.select()
    //document.execCommand('selectAll',false,null)

  }