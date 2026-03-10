document.addEventListener('DOMContentLoaded', () => {
  const paraList = document.getElementById('para-list');
  const pdfViewer = document.getElementById('pdf-viewer');
  const loading = document.getElementById('loading');
  const prevBtn = document.getElementById('prev-para');
  const nextBtn = document.getElementById('next-para');
  const nightModeBtn = document.getElementById('night-mode');
  const fullscreenBtn = document.getElementById('fullscreen');

  let currentPara = 1; // ডিফল্ট পারা ১

  // পারা লিস্ট তৈরি করুন
  for (let i = 1; i <= 30; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = `পারা ${i}`;
    a.onclick = () => loadPara(i);
    li.appendChild(a);
    paraList.appendChild(li);
  }

  // PDF লোড ফাংশন
  function loadPara(para) {
    loading.style.display = 'block';
    pdfViewer.src = `https://mozilla.github.io/pdf.js/web/viewer.html?file=/pdfs/para${para}.pdf`;
    currentPara = para;
    updateActiveLink();
    setTimeout(() => loading.style.display = 'none', 1000); // লোডিং হাইড
  }

  // অ্যাকটিভ লিঙ্ক আপডেট
  function updateActiveLink() {
    const links = paraList.querySelectorAll('a');
    links.forEach(link => link.classList.remove('active'));
    links[currentPara - 1].classList.add('active');
  }

  // প্রিভিয়াস/নেক্সট
  prevBtn.onclick = () => { if (currentPara > 1) loadPara(currentPara - 1); };
  nextBtn.onclick = () => { if (currentPara < 30) loadPara(currentPara + 1); };

  // নাইট মোড
  nightModeBtn.onclick = () => document.body.classList.toggle('night-mode');

  // ফুলস্ক্রিন
  fullscreenBtn.onclick = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    else document.exitFullscreen();
  };

  // ডিফল্ট লোড
  loadPara(1);
});
