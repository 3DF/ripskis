const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your project URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your Public Anon Key

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const videoInput = document.getElementById('videoInput');
const uploadButton = document.getElementById('uploadButton');

uploadButton.addEventListener('click', async () => {
  const videoFile = videoInput.files[0];
  
  if (!videoFile) {
    alert('Please select a video file to upload.');
    return;
  }

  const bucketName = 'your_video_bucket'; // Replace with your bucket name
  const filePath = `public/${videoFile.name}`; // Example path within the bucket

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
