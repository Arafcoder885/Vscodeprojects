/* ═══════════════════════════════════════════════════════════
   LESSON 5 — Creating Sneaker Visuals and Design Variations
   GOAL: Wire up the SVG colorway explorer so clicking tabs
         recolors the sneaker live using CSS variables.
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const $ = id => document.getElementById(id);
  const generateBtn = $('generateBtn'), formError = $('formError');
  const emptyState = $('emptyState'), loadingState = $('loadingState');
  const loaderText = $('loaderText'), result = $('result');
  const stageGroq = $('stageGroq'), stageHF = $('stageHF');
  const captchaModal = $('captchaModal'), captchaCancel = $('captchaCancel');
  const regenBtn = $('regenBtn'), regenImgBtn = $('regenImgBtn');
  const colorwayTabs = $('colorwayTabs'), colorwayInfo = $('colorwayInfo');
  const sneakerStage = $('sneakerStage');

  let captchaWidgetId = null, currentConcept = null, currentColorways = [];
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  // Chips, color sync, hCaptcha, image helpers (from Lessons 1-4)
  document.querySelectorAll('.chip-group').forEach(g => {
    const inp = $(g.dataset.field);
    g.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => {
      g.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
      c.classList.add('active'); if (inp) inp.value = c.dataset.value;
    }));
  });
  const syncColor = (pid, tid) => {
    const p = $(pid), t = $(tid); if (!p || !t) return;
    p.addEventListener('input', () => t.value = p.value);
    t.addEventListener('input', () => { if (/^#[0-9A-Fa-f]{6}$/.test(t.value)) p.value = t.value; });
  };
  syncColor('primary_color','primary_color_text'); syncColor('accent_color','accent_color_text');

  window.hcaptchaReady = () => {
    captchaWidgetId = hcaptcha.render('hcaptchaWidget', {
      sitekey: window.HCAPTCHA_SITE_KEY, theme: 'dark', size: 'compact',
      callback: token => { captchaModal.classList.add('hidden'); runGeneration(token); },
      'expired-callback': () => { captchaModal.classList.add('hidden'); generateBtn.disabled = false; },
    });
  };
  generateBtn?.addEventListener('click', () => {
    formError.textContent = '';
    if (typeof hcaptcha === 'undefined' || captchaWidgetId === null) { formError.textContent = 'CAPTCHA not loaded.'; return; }
    hcaptcha.reset(captchaWidgetId); captchaModal.classList.remove('hidden');
  });
  captchaCancel?.addEventListener('click', () => { captchaModal.classList.add('hidden'); hcaptcha?.reset(captchaWidgetId); });

  const collectPrefs = () => ({
    style: $('style').value, material: $('material').value, occasion: $('occasion').value,
    primary_color: $('primary_color').value, accent_color: $('accent_color').value,
    inspiration: $('inspiration').value.trim(),
  });
  const setUI = s => {
    [emptyState,loadingState,result].forEach(el=>el.classList.add('hidden'));
    ({empty:emptyState,loading:loadingState,result}[s])?.classList.remove('hidden');
  };
  const setStage = a => {
    stageGroq?.classList.toggle('stage-pill--active',a==='groq'); stageHF?.classList.toggle('stage-pill--active',a==='hf');
    stageGroq?.classList.toggle('stage-pill--done',a==='hf');
  };
  const showImgLoading = () => { $('imgLoading')?.classList.remove('hidden'); $('imgFrame')?.classList.add('hidden'); $('imgError')?.classList.add('hidden'); regenImgBtn?.classList.add('hidden'); };
  const showImgResult  = url => { $('imgLoading')?.classList.add('hidden'); $('imgError')?.classList.add('hidden'); if($('aiImage')) $('aiImage').src=url; $('imgFrame')?.classList.remove('hidden'); regenImgBtn?.classList.remove('hidden'); };
  const showImgError   = msg => { $('imgLoading')?.classList.add('hidden'); $('imgFrame')?.classList.add('hidden'); if($('imgErrorText')) $('imgErrorText').textContent=msg; $('imgError')?.classList.remove('hidden'); regenImgBtn?.classList.remove('hidden'); };
  const fetchImage = async prompt => {
    setStage('hf'); showImgLoading();
    try {
      const r = await fetch('/generate-image',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({image_prompt:prompt})});
      const d = await r.json();
      if (!r.ok||d.error) throw new Error(d.error||'Image generation failed');
      showImgResult(d.image_url);
    } catch(e) { showImgError(e.message); }
  };


  // TODO 1: Write applyColorway(cw, container)
  // Set CSS variables on the .sneaker-svg element:
  // --upper-color, --panel-color, --toe-color,
  // --accent-color, --lace-color, --midsole-color
  // using cw.upper, cw.sole, cw.accent, cw.lace, cw.tongue


  // TODO 2: Write selectColorway(idx)
  // Toggle 'active' on tabs, call applyColorway,
  // update colorwayInfo with color dots and hex values for each part


  // TODO 3: Write buildColorwayTabs(colorways)
  // For each colorway: create .cw-tab button with two color swatches
  // and the colorway name, attach click → selectColorway(i)


  // ── TODO 4: Update renderConcept to use colorway tabs ─────
  // After setting all text fields, also:
  //   currentColorways = c.colorways || [];
  //   if (currentColorways.length) { buildColorwayTabs(currentColorways); selectColorway(0); }
  //
  function renderConcept(c) {
    currentConcept = c;
    $('resultName').textContent = c.name||''; $('resultTagline').textContent = c.tagline||'';
    $('resultDesc').textContent = c.description||''; $('resultPrice').textContent = c.retail_price||'';
    $('resultAudience').textContent = c.target_audience||''; $('resultTags').textContent = (c.style_tags||[]).join(' · ');
    $('materialsList').innerHTML = (c.materials||[]).map(m=>`<li>${esc(m)}</li>`).join('');
    $('featuresList').innerHTML  = (c.features||[]).map(f=>`<li>${esc(f)}</li>`).join('');
    $('soleText').textContent = c.sole_type||'—';
    // TODO: add colorway tab building here
  }

  const runGeneration = async token => {
    const prefs = collectPrefs();
    generateBtn.disabled = true;
    setUI('loading'); setStage('groq'); loaderText.textContent = 'Querying AI…';
    try {
      const r = await fetch('/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...prefs,'h-captcha-response':token})});
      const d = await r.json();
      if (!r.ok||d.error) throw new Error(d.error||'Server error');
      renderConcept(d.concept); setUI('result');
      fetchImage(d.concept.image_prompt);
    } catch(e) { setUI('empty'); formError.textContent = e.message; }
    finally { generateBtn.disabled=false; if(typeof hcaptcha!=='undefined'&&captchaWidgetId!==null) hcaptcha.reset(captchaWidgetId); }
  };

  regenImgBtn?.addEventListener('click', () => currentConcept && fetchImage(currentConcept.image_prompt));
  regenBtn?.addEventListener('click', () => { formError.textContent=''; setUI('empty'); currentConcept=null; });

})();
