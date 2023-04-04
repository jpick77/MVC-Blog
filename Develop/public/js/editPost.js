const id = document.querySelector('#editBtn').getAttribute('data-id');

const newFormHandler = async (event) => {
    event.preventDefault();
    console.log('test');
    const name = document.querySelector('#post-name').value.trim();
    const content = document.querySelector('#post-content').value.trim();

          console.log(id)
  
      const response = await fetch(`/api/post/${id}/edit/`, {
        method: 'PUT',
        body: JSON.stringify({ name, content, id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create post');
      }
    
  };

  document
    .querySelector('.new-edit-form')
    .addEventListener('submit', newFormHandler);
  
