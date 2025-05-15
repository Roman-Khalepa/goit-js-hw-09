const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

function populateFormFields() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      formData = JSON.parse(savedData);
      if (feedbackForm.elements.email) {
        feedbackForm.elements.email.value = formData.email || '';
      }
      if (feedbackForm.elements.message) {
        feedbackForm.elements.message.value = formData.message || '';
      }
    }
  } catch (error) {
    console.error('Error parsing saved form data from localStorage:', error);
    localStorage.removeItem(STORAGE_KEY);
    formData = { email: '', message: '' };
  }
}

populateFormFields();

feedbackForm.addEventListener('input', event => {
  const fieldName = event.target.name;
  const fieldValue = event.target.value.trim();

  if (formData.hasOwnProperty(fieldName)) {
    formData[fieldName] = fieldValue;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  } catch (error) {
    console.error('Error saving form data to localStorage:', error);
  }
});

feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const trimmedEmail = formData.email.trim();
  const trimmedMessage = formData.message.trim();

  formData.email = trimmedEmail;
  formData.message = trimmedMessage;

  if (formData.email === '' || formData.message === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);

  formData.email = '';
  formData.message = '';

  feedbackForm.reset();
});