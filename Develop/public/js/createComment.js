const subBtn = document.getElementById('#submitBtn');
const id = document.querySelector('#deleteBtn').getAttribute('data-id');

const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const comment = document.querySelector('#post-comment').value.trim();
    
    if (comment) {


      const response = await fetch(`api/post/comment/${id}`, {
        method: 'POST',
        body: JSON.stringify({ id, comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create post');
        console.log(err);
      }
    }
  };
  

const test = async (event)  => {
  event.preventDefault();

  const comment = document.querySelector('#post-comment').value.trim();

  console.log(comment);
  console.log(id);

}

  document
    .querySelector('.new-comment-form')
    .addEventListener('submit', commentFormHandler); 

