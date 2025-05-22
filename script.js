document.addEventListener('DOMContentLoaded', function () {
  const quill = new Quill('#editor', {
    theme: 'snow',
    placeholder: 'Write your post...',
    modules: {
      toolbar: [['bold', 'italic', 'underline'], [{ list: 'bullet' }], ['link']]
    }
  });
  const form = document.getElementById('postForm');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const text = quill.root.innerHTML;
    if (!text.trim() || text === '<p><br></p>') {
      alert('Please enter some text before posting.');
      return;
    }
    
    const imageFile = document.getElementById('imageInput')?.files?.[0];
    const formData = new FormData();
    formData.append('text', text);
    if (imageFile) {
      formData.append('photo', imageFile);
    }
    
    // Debug: Log FormData contents
    console.log('FormData contents:');
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    try {
      const response = await fetch('https://lenalt343.app.n8n.cloud/webhook/3c2ca73d-10d4-4aed-985b-78eaebf76882', {
        method: 'POST',
        body: formData
      });
      const resultText = await response.text();
      console.log('Response from n8n:', resultText);
      if (response.ok) {
        alert('Posted successfully!');
      } else {
        alert('Failed to post. See console.');
      }
    } catch (error) {
      console.error('Network or fetch error:', error);
      alert('Something went wrong. See console for details.');
    }
  });
});
