const quill = new Quill('#editor', {
  theme: 'snow',
  placeholder: 'Write your post...',
  modules: {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }], ['link', 'emoji']]
  }
});

// Initialize Instagram editor
const instagramQuill = new Quill('#instagramEditor', {
  theme: 'snow',
  placeholder: 'Instagram content will appear here...',
  modules: {
    toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }], ['link', 'emoji']]
  }
});

// Function to receive content from automation
window.receiveInstagramContent = function(content) {
  instagramQuill.root.innerHTML = content;
};

const form = document.getElementById('postForm');
form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const text = quill.root.innerHTML;
  const imageFile = document.getElementById('imageInput').files[0];

  const formData = new FormData();
  formData.append('text', text);
  formData.append('photo', imageFile);

  const response = await fetch('https://lenalt343.app.n8n.cloud/webhook-test/post-social', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    alert('Posted successfully!');
  } else {
    alert('Failed to post');
  }
});

// Handle posting Instagram content
document.getElementById('postInstagramContent').addEventListener('click', async function() {
  const text = instagramQuill.root.innerHTML;
  const imageFile = document.getElementById('imageInput').files[0];

  const formData = new FormData();
  formData.append('text', text);
  formData.append('photo', imageFile);

  const response = await fetch('https://lenalt343.app.n8n.cloud/webhook-test/post-social', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    alert('Instagram content posted successfully!');
  } else {
    alert('Failed to post Instagram content');
  }
});
