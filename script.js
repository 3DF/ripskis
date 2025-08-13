import createClient from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://ybcledejiqybeyogdgyr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliY2xlZGVqaXF5YmV5b2dkZ3lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwODQ5ODIsImV4cCI6MjA3MDY2MDk4Mn0.o20c8aW3aOqSPiH7ayAkZMDZtOzeiDQU3MNbL9Hz1e4';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const videoInput = document.getElementById('videoInput');
const uploadButton = document.getElementById('uploadButton');

uploadButton.addEventListener('click', async () => {
  const videoFile = videoInput.files[0];
  
  if (!videoFile) {
    alert('Please select a video file to upload.');
    return;
  }

  const bucketName = 'videos';
  const filePath = `${videoFile.name}`; // path within the bucket

  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, videoFile);
    
    if (error) {
      console.error('Error uploading video:', error.message);
      alert('Error uploading video: ' + error.message);
    } else {
      console.log('Video uploaded successfully:', data);
      alert('Video uploaded successfully!');
      
      // You can get the public URL of the uploaded video here
      // const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      // console.log('Public URL:', publicUrlData.publicUrl);
    }
  } catch (err) {
    console.error('An unexpected error occurred:', err);
    alert('An unexpected error occurred during upload.');
  }
});
