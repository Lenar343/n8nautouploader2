form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const text = quill.root.innerHTML;
  const imageFile = document.getElementById('imageInput').files[0];

  const formData = new FormData();
  formData.append('text', text);
  formData.append('photo', imageFile);

  try {
    const response = await fetch('https://lenalt343.app.n8n.cloud/webhook/post-social', {
      method: 'POST',
      body: formData
    });

    // Don’t redirect or treat response like a webpage
    if (response.ok) {
      alert('✅ Successfully sent to n8n!');
    } else {
      const error = await response.text();
      console.error('n8n error:', error);
      alert('⚠️ Failed to post. See console for details.');
    }

  } catch (error) {
    console.error('Fetch error:', error);
    alert('❌ Network error — check console.');
  }
});
