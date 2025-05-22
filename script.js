const form = document.getElementById('postForm');

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  console.log('Form submitted'); // Debug

  const text = quill.root.innerHTML;
  console.log('Text content:', text); // Debug

  try {
    const response = await fetch('https://lenalt343.app.n8n.cloud/webhook/post-social', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });

    console.log('Fetch response:', response); // Debug

    if (response.ok) {
      alert('Posted successfully!');
    } else {
      alert('Failed to post');
    }
  } catch (error) {
    console.error('Fetch error:', error); // Debug
  }
});
