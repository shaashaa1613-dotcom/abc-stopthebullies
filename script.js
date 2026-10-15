(function(){
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const toast = document.getElementById('toast');

  function setTheme(theme){
    if(theme === 'dark') root.setAttribute('data-theme','dark');
    else root.removeAttribute('data-theme');
    try{localStorage.setItem('stb:theme',theme)}catch(e){}
  }

  // Initialize
  const stored = (function(){try{return localStorage.getItem('stb:theme')}catch(e){return null}})();
  if(stored) setTheme(stored);

  themeToggle.addEventListener('click',function(){
    const isDark = root.getAttribute('data-theme') === 'dark';
    setTheme(isDark? 'light' : 'dark');
    showToast(isDark? 'Light theme' : 'Dark theme');
  });

  function showToast(message){
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(()=> toast.classList.remove('show'),2200);
  }

  // Button actions
  document.querySelectorAll('.s').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const action = btn.dataset.action;
      if(action === 'pledge'){
        navigator.clipboard && navigator.clipboard.writeText('I pledge to speak up and support others.').then(()=>{
          showToast('Pledge copied — paste it anywhere!');
        },()=> showToast('Pledge ready: copy failed'));
      } else if(action === 'report'){
        window.open('https://www.stopbullying.gov/reporting', '_blank');
      } else if(action === 'support'){
        window.open('https://www.stopbullying.gov/help', '_blank');
      } else if(action === 'resources'){
        window.open('https://www.stopbullying.gov/resources', '_blank');
      } else showToast('Action: '+action);
    });

    btn.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

})();
