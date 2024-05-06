function convertToBase64() {

  const fileInput = document.getElementById('fileInput');
  const resultDiv = document.getElementById('result');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      const base64String = reader.result.split(',')[1];
      const base64ImageSrc = `data:image/jpeg;base64,${base64String}`;
      resultDiv.innerText = base64ImageSrc;
    };
    reader.onerror = function (error) {
      console.error('Error:', error);
    };
  } else {
    resultDiv.innerText = 'No file selected';
  }
}