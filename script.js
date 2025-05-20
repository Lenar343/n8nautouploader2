const quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Write your post...',
  modules: {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }], ['link', 'emoji']]
  }
});

const form = document.getElementById('postForm');
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const text = quill.root.innerHTML;
  const imageFile = document.getElementById('imageInput').files[0];

  const formData = new FormData();
  formData.append('text', text);
  formData.append('photo', imageFile);

  const response = await fetch('https://lenalt343.app.n8n.cloud/webhook/post-social', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    alert('Posted successfully!');
  } else {
    alert('Failed to post');
  }
});
