document.addEventListener('DOMContentLoaded', () => {
  const paraList = document.getElementById('para-list');
  const pdfViewer = document.getElementById('pdf-viewer');
  const loading = document.getElementById('loading');
  const prevBtn = document.getElementById('prev-para');
  const nextBtn = document.getElementById('next-para');
  const nightModeBtn = document.getElementById('night-mode');
  const fullscreenBtn = document.getElementById('fullscreen');

  let currentPara = 1;

  // পারা লিস্ট তৈরি
  for (let i = 1; i <= 30; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = `পারা ${i}`;
    a.onclick = (e) => {
      e.preventDefault();
      loadPara(i);
    };
    li.appendChild(a);
    paraList.appendChild(li);
  }

  function loadPara(para) {
  loading.style.display = 'block';
  
  const pdfUrl = `https://raw.githubusercontent.com/MamunExpert/BeautifulQuran/main/pdfs/para${para}.pdf`;
  
  pdfViewer.src = `https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(pdfUrl)}`;
  
  currentPara = para;
  updateActiveLink();
  setTimeout(() => { loading.style.display = 'none'; }, 800);
}

  function updateActiveLink() {
    const links = paraList.querySelectorAll('a');
    links.forEach((link, index) => {
      link.classList.toggle('active', index === currentPara - 1);
    });
  }

  prevBtn.onclick = () => {
    if (currentPara > 1) loadPara(currentPara - 1);
  };

  nextBtn.onclick = () => {
    if (currentPara < 30) loadPara(currentPara + 1);
  };

  nightModeBtn.onclick = () => {
    document.body.classList.toggle('night-mode');
  };

  fullscreenBtn.onclick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  // প্রথম পারা লোড
  loadPara(1);
});
