import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://ybcledejiqybeyogdgyr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliY2xlZGVqaXF5YmV5b2dkZ3lyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUwODQ5ODIsImV4cCI6MjA3MDY2MDk4Mn0.o20c8aW3aOqSPiH7ayAkZMDZtOzeiDQU3MNbL9Hz1e4';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const videoPlayer = document.getElementById('videoPlayer');
const videoInput = document.getElementById('videoInput');
const uploadButton = document.getElementById('uploadButton');
const nextButton = document.getElementById('nextButton');
const bucketName = 'videos';
var videoIndex = 0;

uploadButton.addEventListener('click', async () => {
  const videoFile = videoInput.files[0];
  
  if (!videoFile) {
    alert('Please select a video file to upload.');
    return;
  }

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

nextButton.addEventListener('click', async () => {
  videoIndex++;
  const { data: files, error: filesError } = await supabase
    .storage
    .from(bucketName)
    .list(''); // The empty string indicates listing all files at the root of the bucket

  if (filesError) {
    console.error(`Error listing files in bucket "${bucketName}":`, filesError.message);
    return;
  }

  if (files.length > 0) {
    videoIndex = videoIndex % files.length;
    console.log(`videoIndex:` + videoIndex);
    console.log(`Files in bucket "${bucketName}":`);
    files.forEach(file => {
      console.log(`- Name: ${file.name}, Size: ${file.size} bytes, Last Modified: ${file.updated_at}`);
    });
    var nextVideoName = files[videoIndex].name;
    console.log('Next video: ' + nextVideoName);

    const { data: publicUrlData, error } = supabase.storage
      .from(bucketName)
      .getPublicUrl(nextVideoName);

    if (error) {
      console.error('Error getting public URL:', error);
    } else {
      const publicUrl = publicUrlData.publicUrl;
      console.log('Public URL:', publicUrl);
    }

    
  } else {
    console.log(`Bucket "${bucketName}" is empty.`);
  }
});
