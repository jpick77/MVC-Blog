const delCommentButtonHandler = async (event) => {

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
        console.log(id);
      const response = await fetch(`/api/post/comment/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to delete comment');
      }
    }

  };
 
 
 document
    .querySelector('#commentDeleteBtn')
    .addEventListener('click', delCommentButtonHandler);