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
    const imageFile = document.getElementById('imageInput')?.files?.[0];

    const formData = new FormData();
    formData.append('text', text);
    if (imageFile) {
      formData.append('photo', imageFile);
    }

    try {
      const response = await fetch('https://lenalt343.app.n8n.cloud/webhook/post-social', {
        method: 'POST',
        body: formData
      });

      const resultText = await response.text();
      console.log('Response from n8n:', resultText);

      if (response.ok) {
        alert('✅ Posted successfully!');
      } else {
        alert('⚠️ Failed to post. See console.');
      }
    } catch (error) {
      console.error('❌ Network or fetch error:', error);
      alert('❌ Something went wrong. See console for details.');
    }
  });
});
