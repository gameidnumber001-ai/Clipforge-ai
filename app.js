const input=document.getElementById('videoFile');
const video=document.getElementById('videoPreview');
const nameEl=document.getElementById('fileName');
const durationEl=document.getElementById('fileDuration');
const btn=document.getElementById('analyzeBtn');
const notice=document.getElementById('notice');
const urlInput=document.getElementById('videoUrl');
const sourceSelect=document.getElementById('sourceSelect');
let currentUrl=null;
function detectPlatform(url){
  if(/youtu\.be|youtube\.com/i.test(url)) return 'youtube';
  if(/facebook\.com|fb\.watch/i.test(url)) return 'facebook';
  if(/tiktok\.com/i.test(url)) return 'tiktok';
  return null;
}
function validateUrl(){
  const raw=urlInput.value.trim();
  if(!raw){notice.textContent='Paste a video link first.';return;}
  let u; try{u=new URL(raw)}catch{notice.textContent='That does not look like a valid URL.';return;}
  const platform=detectPlatform(raw);
  if(!platform){notice.textContent='Supported platforms in this build: YouTube, Facebook and TikTok.';return;}
  if(sourceSelect.value!=='auto' && sourceSelect.value!==platform){notice.textContent='The selected platform does not match this link. Choose Auto-detect or the correct platform.';return;}
  const count=document.getElementById('clipCount').value;
  nameEl.textContent=platform[0].toUpperCase()+platform.slice(1)+' link ready';
  durationEl.textContent=`${count} clips · English captions`;
  notice.textContent='Link recognized. The processing backend is not connected yet, so no clips have been generated. Next step: connect authorized source access, transcription, AI highlight ranking and FFmpeg rendering.';
}
btn.addEventListener('click',()=>{
  if(input.files && input.files[0] && !urlInput.value.trim()){
    notice.textContent='File selected. Upload processing is not connected yet. Next step: connect secure upload, transcription, AI highlight ranking and FFmpeg rendering.';
    return;
  }
  validateUrl();
});
urlInput.addEventListener('input',()=>{if(urlInput.value.trim())notice.textContent='Ready to validate your video link.';});
sourceSelect.addEventListener('change',()=>{if(urlInput.value.trim())validateUrl();});
input.addEventListener('change',e=>{const file=e.target.files[0];if(!file)return;if(!file.type.startsWith('video/')){notice.textContent='Please choose a valid video file.';return;}if(currentUrl)URL.revokeObjectURL(currentUrl);currentUrl=URL.createObjectURL(file);video.src=currentUrl;video.hidden=false;document.querySelector('.preview-placeholder').hidden=true;nameEl.textContent=file.name;video.onloadedmetadata=()=>{const s=Math.floor(video.duration||0);durationEl.textContent=`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')} · English captions`;};notice.textContent='Local preview loaded. Actual AI clip generation is not connected yet.';});
