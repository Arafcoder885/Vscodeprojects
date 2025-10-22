// ...existing code...
/* Simple Audio Visualiser (mic + file) */
const canvas = document.getElementById('visualiser');
const ctx = canvas.getContext('2d');
const micBtn = document.getElementById('micBtn');
const fileInput = document.getElementById('fileInput');
const stopBtn = document.getElementById('stopBtn');
const audioPlayer = document.getElementById('audioPlayer');

let audioCtx = null;
let analyser = null;
let dataArray = null;
let sourceNode = null;
let animationId = null;
let mediaStream = null;

function resize() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(canvas.clientWidth * dpr);
  canvas.height = Math.floor(canvas.clientHeight * dpr);
  ctx.scale(dpr, dpr);
}
window.addEventListener('resize', resize);
resize();

function ensureAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function startAnalyserFrom(node) {
  stop(); // stop existing
  ensureAudioContext();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);

  node.connect(analyser);
  // optionally connect to destination if using media element and you want playback
  try { node.connect(audioCtx.destination); } catch (e) { /* some nodes may already be connected */ }

  sourceNode = node;
  draw();
}

function draw() {
  if (!analyser) return;
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);

  analyser.getByteFrequencyData(dataArray);

  const barCount = Math.floor(w / 6);
  const step = Math.floor(dataArray.length / barCount);
  const barWidth = (w / barCount) * 0.8;
  const gap = (w / barCount) * 0.2;
  for (let i = 0; i < barCount; i++) {
    const v = dataArray[i * step] / 255;
    const barHeight = v * h;
    const x = i * (barWidth + gap);
    // color gradient
    const hue = 200 - v * 180;
    ctx.fillStyle = `hsl(${hue} 90% ${30 + v * 50}%)`;
    ctx.fillRect(x, h - barHeight, barWidth, barHeight);
  }

  animationId = requestAnimationFrame(draw);
}

async function startMic() {
  try {
    ensureAudioContext();
    if (audioCtx.state === 'suspended') await audioCtx.resume();
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const micSource = audioCtx.createMediaStreamSource(mediaStream);
    startAnalyserFrom(micSource);
  } catch (err) {
    console.error('Microphone error:', err);
    alert('Could not access microphone. Check permissions.');
  }
}

fileInput.addEventListener('change', (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  audioPlayer.src = url;
  audioPlayer.hidden = false;
  audioPlayer.play().catch(()=>{ /* autoplay might be blocked; user can press play */ });

  // create source from media element after audioContext created
  ensureAudioContext();
  audioPlayer.onplay = () => {
    // disconnect previous
    stop();
    const elSource = audioCtx.createMediaElementSource(audioPlayer);
    startAnalyserFrom(elSource);
  };
});

micBtn.addEventListener('click', () => {
  startMic();
});

stopBtn.addEventListener('click', stop);

function stop() {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (sourceNode) {
    try { sourceNode.disconnect(); } catch (e) {}
    sourceNode = null;
  }
  if (analyser) {
    try { analyser.disconnect(); } catch (e) {}
    analyser = null;
  }
  if (mediaStream) {
    mediaStream.getTracks().forEach(t => t.stop());
    mediaStream = null;
  }
  if (audioPlayer && !audioPlayer.paused) {
    audioPlayer.pause();
  }
}