function convertToBase64() {

  const fileInput = document.getElementById('fileInput');
  const imageUrlInput = document.getElementById('imageUrlInput');
  const resultDiv = document.getElementById('result');
  const copyButton = document.getElementById('copyButton');
  

  if (fileInput.files.length > 0) {
    // If file is uploaded
    const reader = new FileReader();
    const file = fileInput.files[0];
    reader.readAsDataURL(file);
    reader.onload = function () {
      const mimeType = file.type;
      const base64String = reader.result.split(',')[1];
      const base64ImageSrc = `data:${mimeType};base64,${base64String}`;
      displayResult(base64ImageSrc);
    };
    reader.onerror = function (error) {
      console.error('Error:', error);
      displayError('Error reading file.');
    };
  } else if (imageUrlInput.value.trim() !== '') {
    // If image URL is provided
    const imageUrl = imageUrlInput.value.trim();
    fetch(imageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function () {
          const mimeType = blob.type;
          const base64String = reader.result.split(',')[1];
          const base64ImageSrc = `data:${mimeType};base64,${base64String}`;
          displayResult(base64ImageSrc);
        };
        reader.onerror = function (error) {
          console.error('Error:', error);
          displayError('Error reading image URL.');
        };
      })
      .catch(error => {
        console.error('Error fetching image:', error);
        displayError('Error fetching image. Please check the URL.');
      });
  } else {
    displayError('Please select an image file or enter an image URL.');
  }
}

// Function to display result
function displayResult(base64ImageSrc) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerText = base64ImageSrc;
  const copyButton = document.getElementById('copyButton');
  copyButton.style.display = 'block';
}

// Function to display error
function displayError(message) {
  const resultDiv = document.getElementById('result');
  result.innerText = message;
}

// Copy function

function copyToClipboard() {
  const resultDiv = document.getElementById('result');
  const textToCopy = resultDiv.innerText;

  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert('Copied to clipboard!');
    })
    .catch(err => {
      console.error('Failed to copy:', err);
    });
}

// Show copy button if text is selectable 
document.getElementById('result').addEventListener('mouseup', function() {
  if (selection.toString().length > 0) {
    document.getElementById('copyButton').style.display = 'block';
  } else {
    document.getElementById('copyButton').style.display = 'none';
  }
});