/* LFAEA static research layer
 * Loads the supplied derived datasets and evidence chunks directly from this site.
 * No Node.js server, API endpoint, API key, or server-side runtime is required.
 */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fmt = (v, digits = 3) => (v === null || v === undefined || !Number.isFinite(Number(v))) ? '—' : Number(v).toLocaleString(undefined,{maximumFractionDigits:digits});
  const colors = ['#FF963D','#B78AF4','#E96D27','#8C5BC8','#FFC078','#D9B8FF','#A94F2D'];
  let psi159 = null, psi142 = null, manifest = null, knowledgeBase = null;
  let charts = {};
  let twin = null;
  let copilotBusy = false;

  const chartDefaults = () => {
    if (!window.Chart) return;
    Chart.defaults.color = '#C7B9D1';
    Chart.defaults.font.family = "'DM Sans', sans-serif";
    Chart.defaults.font.size = 11;
    Chart.defaults.borderColor = 'rgba(183,138,244,.16)';
    Chart.defaults.animation.duration = 650;
  };
  function destroyChart(id){ if(charts[id]){ charts[id].destroy(); charts[id]=null; } }
  function drawChart(id, config){
    const canvas = document.getElementById(id);
    if (!canvas || !window.Chart) return null;
    destroyChart(id);
    charts[id] = new Chart(canvas, config);
    return charts[id];
  }
  const baseOptions = (xTitle, yTitle, type='linear') => ({
    responsive:true, maintainAspectRatio:false, parsing:false,
    interaction:{mode:'nearest',intersect:false},
    plugins:{legend:{display:true,labels:{usePointStyle:true,boxWidth:7,padding:16}},tooltip:{backgroundColor:'#160F1E',borderColor:'#694786',borderWidth:1,titleColor:'#F5F0F8',bodyColor:'#E0D5E8',padding:11}},
    scales:{x:{type,grid:{color:'rgba(183,138,244,.12)'},title:{display:true,text:xTitle,color:'#BFA9D4'},ticks:{color:'#BFA9D4',maxTicksLimit:9}},y:{grid:{color:'rgba(183,138,244,.12)'},title:{display:true,text:yTitle,color:'#BFA9D4'},ticks:{color:'#BFA9D4',maxTicksLimit:7}}}
  });

  async function fetchJSON(path){
    const response=await fetch(`./${path}`,{cache:'no-cache'});
    if(!response.ok) throw new Error(`${path} could not be loaded (${response.status}).`);
    return response.json();
  }

  async function loadResearchData(){
    const results=await Promise.allSettled([
      fetchJSON('datasets/derived/psi159.json'),
      fetchJSON('datasets/derived/psi142.json'),
      fetchJSON('datasets/derived/knowledge-base.json')
    ]);
    if(results[0].status==='fulfilled') psi159=results[0].value;
    if(results[1].status==='fulfilled') psi142=results[1].value;
    if(results[2].status==='fulfilled') knowledgeBase=results[2].value;
    manifest=psi159?.manifest||null;

    if(psi159 && psi142){
      populateDataStudio();
    }else{
      const host=$('#ingestedFileList');
      const failed=[results[0],results[1]].find(x=>x.status==='rejected');
      if(host) host.innerHTML=`<div class="caution-box">A derived dataset could not be loaded. Confirm that the <b>datasets/derived</b> folder is beside index.html. ${esc(failed?.reason?.message||'')}</div>`;
      console.error('[LFAEA] Dataset loading issue:',results.filter(x=>x.status==='rejected'));
    }
    const status=$('#modelStatus');
    if(status){
      status.innerHTML=knowledgeBase?.chunks?.length
        ? '<i class="status-dot status-local"></i> Static evidence assistant · no server or API key'
        : '<i class="status-dot status-local"></i> Static mode · basic project knowledge only';
      status.classList.remove('model-connected');
    }
  }

  function populateDataStudio(){
    if(!psi159 || !psi142) return;
    const b1=psi159.b1, sp=psi159.a4Setpoints;
    $('#kpiB1Rows').textContent=Number(b1.rowCount).toLocaleString();
    $('#kpiB1Dt').textContent=`${fmt(b1.time.medianIntervalMs,1)} ms`;
    $('#kpiCameraRows').textContent=Object.values(psi159.camera).reduce((n,x)=>n+x.frameRecords,0).toLocaleString();
    const select=$('#b1ChannelSelect');
    select.innerHTML=Object.keys(b1.series).map((k,i)=>`<option value="${esc(k)}" ${i===0?'selected':''}>${esc(k)}</option>`).join('');
    select.addEventListener('change',renderB1Chart);
    renderB1Chart();
    renderSetpointChart();
    renderCameraMetadata();
    const idSel=$('#psi142IdSelect'); idSel.addEventListener('change',()=>renderPsi142Chart(idSel.value));
    renderPsi142Chart('1');
    renderFilesManifest();
    $('#b1IntegrityNote').innerHTML=`<b>Integrity flags:</b> ${b1.time.reversals} timestamp reversal detected (−5 ms). The original row order is retained. <span>${esc(b1.unitsNote)}</span>`;
    const nz=sp.stats['MFCA1Setpoint(V)'];
    $('#a4SetpointNote').textContent=`${sp.rowCount} source rows. MFCA1: ${nz.nonZeroRows} non-zero entries at ${nz.uniqueNonZero.join(', ')} V. Voltage is not converted to flow without the required gas lookup and calibration.`;
  }

  function renderB1Chart(){
    if(!psi159 || !window.Chart) return;
    const name=$('#b1ChannelSelect').value;
    const raw=psi159.b1.series[name] || [];
    const st=psi159.b1.channelStatsRaw[name] || {};
    drawChart('b1SeriesChart',{type:'line',data:{datasets:[{label:name,data:raw.map(p=>({x:p.x,y:p.y})),borderColor:colors[0],backgroundColor:'rgba(255,150,61,.12)',pointRadius:0,pointHoverRadius:3,borderWidth:1.6,tension:.12,fill:true}]},options:{...baseOptions('Elapsed time from first record (s)','Source-column value (unit not supplied)'),plugins:{...baseOptions('','').plugins,legend:{display:false}}}});
    $('#b1ChannelStats').innerHTML=[['N',st.n],['MIN',fmt(st.min,6)],['MEDIAN',fmt(st.median,6)],['MEAN',fmt(st.mean,6)],['MAX',fmt(st.max,6)]].map(([k,v])=>`<div><small>${k}</small><b>${v??'—'}</b></div>`).join('');
  }

  function renderSetpointChart(){
    if(!psi159 || !window.Chart) return;
    const series=psi159.a4Setpoints.series;
    const names=Object.keys(series);
    drawChart('a4SetpointChart',{type:'line',data:{datasets:names.map((name,i)=>({label:name,data:series[name].map(p=>({x:p.x,y:p.y})),borderColor:colors[i],pointRadius:2,pointHoverRadius:4,borderWidth:1.7,tension:0,fill:false}))},options:baseOptions('Elapsed time (s)','Setpoint (V)')});
  }

  function renderCameraMetadata(){
    if(!psi159) return;
    const rows=Object.entries(psi159.camera);
    $('#cameraCards').innerHTML=rows.map(([name,c])=>`<article class="camera-card"><div class="camera-card-head"><b>${esc(name)}</b><span>${Number(c.frameRecords).toLocaleString()} records</span></div><div class="camera-metrics"><div><small>FrameRate field</small><b>${fmt(c.frameRateRecorded,3)}</b></div><div><small>Median Δt</small><b>${fmt(c.deltaMs.median,1)} ms</b></div><div><small>Image size</small><b>${esc((c.imageWidth||[])[0]||'—')} × ${esc((c.imageHeight||[])[0]||'—')}</b></div><div><small>Pixel format</small><b>${esc((c.pixelFormat||[])[0]||'—')}</b></div></div></article>`).join('');
    const ds=rows.map(([name,c],i)=>({label:name,data:c.sample.filter(p=>p.deltaMs!==null).map(p=>({x:p.index,y:p.deltaMs})),borderColor:colors[i],backgroundColor:colors[i],pointRadius:2,showLine:true,tension:0,borderWidth:1.4}));
    drawChart('cameraDeltaChart',{type:'scatter',data:{datasets:ds},options:baseOptions('Metadata record index','DeltaMilliseconds field (ms)')});
  }

  function renderPsi142Chart(id){
    if(!psi142 || !window.Chart) return;
    destroyChart('psi142Chart'); destroyChart('psi142SecondaryChart');
    $('#psi142SecondaryWrap').style.display='none';
    $('#psi142RawPreview').innerHTML='';
    const d=psi142.dataIds[id];
    const status= d?.status || 'No chart definition is available for this Data ID.';
    $('#psi142Status').innerHTML=`<span class="micro-badge">DATA ID ${esc(id)}</span> <span>${esc(status)}</span>`;
    $('#psi142Note').textContent= id==='1'||id==='2'
      ? 'Ozone attribution conflict: the supplied CSV crosswalk and Excel summary reverse the labels for Data IDs 1 and 2. The chart therefore uses Data ID only and makes no ozone assignment.'
      : id==='6' ? 'Not plotted: the supplied research update identifies unresolved field mapping. The workbook preview is retained below without assigning a physical interpretation.'
      : id==='4' ? 'The workbook includes a column named “a”; the supplied summary does not define its physical meaning or unit. It is shown as stored.'
      : 'Values and series labels are read from the uploaded workbook. The source column names are preserved; these are not operational limits or safety thresholds.';
    if(!d) return;
    if(id==='1'||id==='2'||id==='3'){
      const groups=[...new Set(d.points.map(p=>p.fuelGroup))];
      drawChart('psi142Chart',{type:'scatter',data:{datasets:groups.map((g,i)=>({label:g,data:d.points.filter(p=>p.fuelGroup===g).map(p=>({x:p.Yf,y:p.value})),backgroundColor:colors[i%colors.length],borderColor:colors[i%colors.length],pointRadius:4}))},options:baseOptions('Yf','aCFE (1/s) / aHFE (1/s)')});
    } else if(id==='4'){
      const ds=[{label:'ϕ_HFE',data:d.points.filter(p=>p.phi_HFE!==null).map(p=>({x:p.a,y:p.phi_HFE})),borderColor:colors[1],pointRadius:4,showLine:true},{label:'ϕ_CFE',data:d.points.filter(p=>p.phi_CFE!==null).map(p=>({x:p.a,y:p.phi_CFE})),borderColor:colors[2],pointRadius:4,showLine:true}];
      drawChart('psi142Chart',{type:'scatter',data:{datasets:ds},options:baseOptions('a (unit not defined in supplied summary)','Workbook value')});
    } else if(id==='5'){
      const plif=d.series.filter(s=>s.label.startsWith('PLIF'));
      const temps=d.series.filter(s=>s.label.startsWith('Temperature'));
      drawChart('psi142Chart',{type:'scatter',data:{datasets:plif.map((s,i)=>({label:s.label,data:s.points.map(p=>({x:p.x,y:p.y})),showLine:true,borderColor:colors[i],backgroundColor:colors[i],pointRadius:0,borderWidth:1.8,tension:.12}))},options:baseOptions('Distance (cm)','PLIF signal (a.u.)')});
      $('#psi142SecondaryWrap').style.display='block';
      drawChart('psi142SecondaryChart',{type:'scatter',data:{datasets:temps.map((s,i)=>({label:s.label,data:s.points.map(p=>({x:p.x,y:p.y})),showLine:true,borderColor:colors[i+2],backgroundColor:colors[i+2],pointRadius:3,borderWidth:1.8,tension:.1}))},options:baseOptions('Location (cm)','Temperature (K)')});
    } else if(id==='6'){
      const preview=d.rawPreview||[];
      $('#psi142RawPreview').innerHTML=`<div class="raw-preview-title">Source worksheet rows · unclassified preview</div><pre class="raw-preview">${esc(JSON.stringify(preview,null,2))}</pre>`;
    } else if(id==='7'){
      drawChart('psi142Chart',{type:'scatter',data:{datasets:d.series.map((s,i)=>({label:s.label,data:s.points.map(p=>({x:p.x,y:p.y})),showLine:true,borderColor:colors[i],backgroundColor:colors[i],pointRadius:0,borderWidth:1.7,tension:.08}))},options:baseOptions(d.xField,d.yField)});
    } else if(id==='8'){
      const groups=[...new Set(d.points.map(p=>p.condition))];
      drawChart('psi142Chart',{type:'scatter',data:{datasets:groups.map((g,i)=>({label:g,data:d.points.filter(p=>p.condition===g).map(p=>({x:p.Xf,y:p.Tmax_K})),backgroundColor:colors[i],borderColor:colors[i],pointRadius:5}))},options:baseOptions('Xf','T_max (K)')});
    }
  }

  function renderFilesManifest(){
    const rows=[
      ['PSI-159 raw data · 21256B1','9,627 rows · 36 source columns','Raw time series'],
      ['PSI-159 MFC setpoints · 21256A4','36 rows · setpoints in V','Raw setpoint history'],
      ['INTNS camera metadata · 21256A4','1,275 records · Mono16 · 1392 × 1040','Camera metadata only'],
      ['ACME camera metadata · 21256B1','286 records · BayerRG12 · 1360 × 1024','Camera metadata only'],
      ['PSI-142 workbook','Data summary + Data ID 1–8 sheets','Excel source'],
      ['PSI-142 CSV crosswalk','8 Data ID publication / figure mappings','CSV source']
    ];
    const linkRows=(psi142.summary||[]).filter(x=>x.psiRecordUrl);
    const workbookLinks=linkRows.map(x=>`<a class="workbook-link" href="${esc(x.psiRecordUrl)}" target="_blank" rel="noopener"><b>Data ID ${esc(x.dataId)}</b><span>NASA Maptis record ↗</span></a>`).join('');
    $('#ingestedFileList').innerHTML=rows.map((r,i)=>`<div class="ingested-row"><span class="ingested-index">0${i+1}</span><div><b>${esc(r[0])}</b><small>${esc(r[1])}</small></div><span class="ingested-type">${esc(r[2])}</span></div>`).join('') + `<div class="workbook-links-wrap"><div class="eyebrow">LIVE RECORD LINKS EXTRACTED FROM THE XLSX</div><div class="workbook-links">${workbookLinks||'<span class="small-muted">No hyperlinks were recovered from the workbook.</span>'}</div><p class="small-muted">Links are associated with the workbook Data ID rows as stored; repeated NASA record targets are retained as separate row links.</p></div>`;
  }

  function sourceHref(src){
    if(src?.url) return String(src.url);
    let f=String(src.sourceFile||'').trim().replace(/\.pdf\.pdf$/i,'.pdf');
    if(!f) return null;
    if(f.includes('NASA_PSI_Microgravity_Combustion_Review_EN_With_Uploaded_Data.pdf'))
      return `references/NASA_PSI_Microgravity_Combustion_Review_EN_With_Uploaded_Data.pdf${src.page?'#page='+src.page:''}`;
    if(f.includes('NASA_PSI_Research_Update_Note_EN.pdf'))
      return `references/NASA_PSI_Research_Update_Note_EN.pdf${src.page?'#page='+src.page:''}`;
    if(f.includes(';')) f=f.split(';').map(x=>x.trim()).find(x=>/\.(csv|xlsx|mdipsug)$/i.test(x))||f.split(';')[0].trim();
    return `datasets/raw/${encodeURIComponent(f)}`;
  }
  function renderAnswerText(text,sources){
    let html=esc(text).replace(/\n/g,'<br>');
    html=html.replace(/\[(E\d+)\]/g,(m,id)=>{
      const src=sources.find(s=>s.id===id);
      const href=src?sourceHref(src):null;
      return src&&href?`<a class="inline-citation" href="${esc(href)}" target="_blank" rel="noopener" title="${esc(src.source)}">[${id}]</a>`:m;
    });
    return html;
  }
  function renderChatMessage(role, question, payload){
    const isUser=role==='user';
    const bubble=document.createElement('article');
    bubble.className=`chat-turn ${isUser?'chat-user':'chat-assistant'}`;
    if(isUser){
      bubble.innerHTML=`<div class="chat-role">YOU</div><div class="chat-bubble">${esc(question)}</div>`;
    }else{
      const sources=payload.sources||[];
      const mode='LOCAL STATIC EVIDENCE SEARCH';
      bubble.innerHTML=`<div class="chat-role">LFAEA ASSISTANT <span>${esc(mode)}</span></div><div class="chat-bubble"><div class="ai-answer-text">${renderAnswerText(payload.answer||'No matching evidence was found.',sources)}</div>${payload.notes?.length?`<div class="answer-section"><h4>IMPORTANT LIMITATIONS</h4><ul>${payload.notes.map(n=>`<li>${esc(n)}</li>`).join('')}</ul></div>`:''}<div class="answer-section"><h4>PROJECT SOURCE TRAIL</h4>${sources.map(src=>{const href=sourceHref(src);return href?`<a class="answer-source" href="${esc(href)}" target="_blank" rel="noopener"><b>${esc(src.id)}</b> · ${esc(src.source)}${src.page?` · p. ${src.page}`:''}</a>`:`<span class="answer-source"><b>${esc(src.id)}</b> · ${esc(src.source)}</span>`;}).join('')||'<p>No project source passages matched this question.</p>'}</div><p class="small-muted">This static assistant searches the evidence files packaged with the website. It does not call an online AI model, external API, or NASA live service.</p></div>`;
    }
    return bubble;
  }

  const retrievalStopwords=new Set('a an and are as at be been being by can could did do does for from had has have how i in into is it its of on or our that the their them there these this those to was were what when where which who why will with would you your about after before between during each more most other such than then them they using used use'.split(' '));
  function normaliseTerms(value){
    const raw=String(value||'').toLowerCase().match(/[\p{L}\p{N}]+(?:[-/][\p{L}\p{N}]+)*/gu)||[];
    const terms=[];
    raw.forEach(term=>{
      if(term.length>1 && !retrievalStopwords.has(term)) terms.push(term);
      term.split(/[-/]/).forEach(part=>{if(part.length>2&&!retrievalStopwords.has(part))terms.push(part);});
    });
    const aliases={
      'psi159':['psi-159','cfi-g','mfc','calibration','voltage'],
      'psi-159':['psi159','cfi-g','mfc','calibration','voltage'],
      'psi142':['psi-142','cool-flame','data-id'],
      'psi-142':['psi142','cool-flame','data-id'],
      'lunar':['moon','one-sixth','partial-gravity'],
      'moon':['lunar','one-sixth','partial-gravity'],
      'smoke':['aerosol','soot','particle'],
      'aerosol':['smoke','particle','same-r'],
      'solid':['material','bass-ii','flammability'],
      'flammability':['solid','material','ignition'],
      'spice':['smoke-point','coflow','nonbuoyant'],
      'spice-count':['52','55','263']
    };
    const expanded=[...terms];
    terms.forEach(t=>{(aliases[t]||[]).forEach(a=>expanded.push(a));});
    return [...new Set(expanded)];
  }
  function sentenceExtract(text,terms){
    const clean=String(text||'').replace(/\s+/g,' ').trim();
    const sentences=clean.match(/[^.!?]+[.!?]?/g)||[clean];
    const ranked=sentences.map((sentence,index)=>{
      const low=sentence.toLowerCase();
      let score=0;
      terms.forEach(term=>{if(low.includes(term)) score+=term.length>5?2:1;});
      return {sentence:sentence.trim(),score,index};
    }).filter(x=>x.score>0 && x.sentence.length>45 && x.sentence.length<650)
      .sort((a,b)=>b.score-a.score || a.index-b.index).slice(0,3)
      .sort((a,b)=>a.index-b.index);
    if(ranked.length) return ranked.map(x=>x.sentence).join(' ');
    return clean.slice(0,360)+(clean.length>360?'…':'');
  }
  function searchLocalEvidence(question){
    const q=String(question||'').trim();
    const lower=q.toLowerCase();
    const chunks=knowledgeBase?.chunks||[];
    const terms=normaliseTerms(q);
    if(!chunks.length){
      const data=window.LFAEA_DATA||{};
      const fallback=data.investigations||[];
      const hits=fallback.map(inv=>({inv,score:normaliseTerms([inv.title,inv.acronym,inv.psi,inv.summary,inv.value].join(' ')).filter(t=>terms.includes(t)).length})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,3);
      const sourceMap=new Map((data.sources||[]).map(source=>[source.id,source]));
      const sourceRecords=[];
      hits.forEach(({inv})=>(inv.links||[]).forEach(id=>{const source=sourceMap.get(id);if(source&&!sourceRecords.some(x=>x.url===source.url))sourceRecords.push(source);}));
      const sources=sourceRecords.slice(0,3).map((source,i)=>({id:`E${i+1}`,source:source.title||source.publisher,url:source.url,page:null}));
      return {answer:hits.length?hits.map((x,i)=>`[E${i+1}] ${x.inv.acronym} (${x.inv.psi}): ${x.inv.summary} ${x.inv.value}`).join('\n\n'):'The local evidence index could not be loaded. Check the datasets/derived/knowledge-base.json file.',sources,notes:['The detailed evidence index was unavailable; this answer is based only on the project investigation catalogue.']};
    }
    if(/^(hi|hello|hey|good morning|good afternoon|thanks|thank you)[!. ]*$/i.test(lower)){
      return {answer:'Hello! I am the LFAEA static evidence assistant. Ask me about SPICE, BASS-II, SAME-R, SAFFIRE, PSI-159, PSI-142, lunar-gravity evidence, calibration gaps, or the project datasets.',sources:[],notes:['I search the supplied project files locally; I am not a generative AI model.']};
    }
    if(/what can you do|help me|help$/i.test(lower)){
      return {answer:'I can search the bundled research review, the PSI update note, and selected dataset notes; return short source-linked excerpts; and help locate investigation records and data limitations. Try asking: “What is missing before PSI-159 flow can be calculated?” or “Explain the SPICE 52 vs 55 smoke-point discrepancy.”',sources:[],notes:['I do not browse the live web, calculate unprovided calibration values, or generate answers beyond the retrieved project evidence.']};
    }
    const docTokens=chunks.map(c=>normaliseTerms(c.text));
    const df=new Map();
    terms.forEach(term=>df.set(term,docTokens.filter(tokens=>tokens.includes(term)).length));
    const avgLen=docTokens.reduce((sum,t)=>sum+t.length,0)/Math.max(1,docTokens.length);
    const ranked=chunks.map((chunk,i)=>{
      const tokens=docTokens[i];
      let score=0;
      terms.forEach(term=>{
        const tf=tokens.filter(t=>t===term).length;
        if(!tf)return;
        const n=chunks.length, d=df.get(term)||0;
        const idf=Math.log(1+(n-d+0.5)/(d+0.5));
        score+=idf*(tf*2.2)/(tf+1.2*(0.25+0.75*tokens.length/Math.max(1,avgLen)));
      });
      if(chunk.sourceFile?.includes('PSI-159') && /psi.?159|mfc|calibrat|voltage|sccm|flow/.test(lower)) score+=1.5;
      if(chunk.sourceFile?.includes('PSI-142') && /psi.?142|data id|ozone|cool.?flame/.test(lower)) score+=1.5;
      if(chunk.kind==='update_note' && /update|uploaded|new data|raw data|coverage/.test(lower)) score+=0.4;
      return {chunk,score,index:i};
    }).filter(x=>x.score>0.12).sort((a,b)=>b.score-a.score || a.index-b.index).slice(0,3);
    if(!ranked.length){
      return {answer:'I could not find a sufficiently relevant passage in the supplied project evidence. Try a named investigation (SPICE, BASS-II, SAME-R, SAFFIRE), a PSI identifier, or a specific measurement / data limitation.',sources:[],notes:['No conclusion is inferred when the bundled evidence does not contain a clear match.']};
    }
    const sources=ranked.map((x,i)=>({id:`E${i+1}`,source:x.chunk.source,sourceFile:x.chunk.sourceFile,page:x.chunk.page,chunkId:x.chunk.id}));
    const excerpts=ranked.map((x,i)=>`[E${i+1}] ${sentenceExtract(x.chunk.text,terms)}`);
    return {answer:`Closest passages in the supplied evidence:\n\n${excerpts.join('\n\n')}`,sources,notes:['This is extractive local retrieval: passages are selected from the packaged documents, not newly generated or independently verified claims.','Keep the source conditions and stated missing-data limitations when interpreting any result.']};
  }

  async function askCopilot(question){
    const box=$('#assistantAnswer');
    if(!box || !question.trim() || copilotBusy) return;
    copilotBusy=true;
    const submit=$('#assistantForm button[type="submit"]');
    const input=$('#assistantQuestion');
    const clean=question.trim();
    if(!box.querySelector('.chat-turn')) box.innerHTML='';
    box.appendChild(renderChatMessage('user',clean));
    const thinking=document.createElement('div');
    thinking.className='ai-thinking';
    thinking.innerHTML='<span class="thinking-orbit"></span><div><b>Searching local project evidence…</b><small>No server or internet API is being called.</small></div>';
    box.appendChild(thinking);
    box.scrollTop=box.scrollHeight;
    if(submit){submit.disabled=true;submit.textContent='Searching…';}
    if(input) input.value='';
    try{
      await new Promise(resolve=>setTimeout(resolve,80));
      const payload=searchLocalEvidence(clean);
      thinking.remove();
      box.appendChild(renderChatMessage('assistant',clean,payload));
    }catch(err){
      thinking.remove();
      const failure=document.createElement('div'); failure.className='caution-box'; failure.textContent=`The local evidence search could not complete: ${err.message}`;
      box.appendChild(failure);
    }finally{
      copilotBusy=false;
      if(submit){submit.disabled=false;submit.innerHTML='Search evidence <span>→</span>';}
      box.scrollTop=box.scrollHeight;
      if(input) input.focus();
    }
  }

  function initAiInterceptors(){
    // Capture the form before the legacy demo handler so the static evidence search is the single path.
    document.addEventListener('submit',e=>{
      if(e.target?.id!=='assistantForm') return;
      e.preventDefault(); e.stopImmediatePropagation();
      askCopilot($('#assistantQuestion').value.trim());
    },true);
    document.addEventListener('click',e=>{
      const btn=e.target.closest('#suggestedQueries button');
      if(!btn) return;
      e.preventDefault(); e.stopImmediatePropagation();
      $('#assistantQuestion').value=btn.textContent.trim();
      askCopilot($('#assistantQuestion').value);
    },true);
  }

  function initTwin(){
    const host=$('#twinCanvasHost');
    if(!host || !window.THREE){host.innerHTML='<div class="caution-box">Three.js could not be loaded. Check the internet connection and refresh the page.</div>';return;}
    const T=window.THREE;
    const scene=new T.Scene();
    const camera=new T.PerspectiveCamera(42,1,.1,100); camera.position.set(0,0,6.7);
    const renderer=new T.WebGLRenderer({antialias:true,alpha:true});
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
    renderer.setClearColor(0x08070B,0);
    if('outputColorSpace' in renderer) renderer.outputColorSpace=T.SRGBColorSpace;
    host.innerHTML=''; host.appendChild(renderer.domElement);
    const root=new T.Group(); scene.add(root);
    const flame=new T.Group(); root.add(flame);
    const ambient=new T.AmbientLight(0xb78af4,.8); scene.add(ambient);
    const key=new T.PointLight(0xff963d,3.3,12); key.position.set(2,2,3); scene.add(key);
    const rim=new T.PointLight(0x7541b8,2.2,10); rim.position.set(-2,-1,-3); scene.add(rim);
    const core=new T.Mesh(new T.SphereGeometry(.58,48,48),new T.MeshPhysicalMaterial({color:0xffa14a,emissive:0x7739a9,emissiveIntensity:1.15,transparent:true,opacity:.62,roughness:.24,metalness:.04,clearcoat:.4})); flame.add(core);
    const shell=new T.Mesh(new T.SphereGeometry(.85,48,48),new T.MeshBasicMaterial({color:0x9b66d6,transparent:true,opacity:.16,side:T.DoubleSide,depthWrite:false})); flame.add(shell);
    const outer=new T.Mesh(new T.SphereGeometry(1.03,48,48),new T.MeshBasicMaterial({color:0xff963d,transparent:true,opacity:.055,wireframe:true,depthWrite:false})); flame.add(outer);
    const bright=new T.Mesh(new T.SphereGeometry(.22,32,32),new T.MeshBasicMaterial({color:0xffe0b8,transparent:true,opacity:.85})); flame.add(bright); bright.position.set(0,.02,.3);
    // Three oriented reference orbits around the flame field.
    const ringMat=new T.MeshBasicMaterial({color:0xb78af4,transparent:true,opacity:.34});
    [[1.52,.16,0],[1.85,1.03,.38],[1.2,1.25,1.02]].forEach((v,i)=>{const ring=new T.Mesh(new T.TorusGeometry(v[0],.006,8,128),ringMat);ring.rotation.set(v[1],v[2],i*.42);root.add(ring);});
    const grid=new T.GridHelper(4,18,0x4a3261,0x2e1b3b); grid.position.y=-1.68; grid.material.transparent=true; grid.material.opacity=.3; root.add(grid);
    const axis=new T.AxesHelper(.75); axis.position.set(-1.7,-1.55,0); root.add(axis);
    // Particle tracers are a conceptual visual layer, not measured smoke or flow vectors.
    const count=700, positions=new Float32Array(count*3), phases=new Float32Array(count), speeds=new Float32Array(count);
    for(let i=0;i<count;i++){
      const u=Math.random()*Math.PI*2, v=Math.acos(2*Math.random()-1), r=.84+Math.random()*.62;
      positions[i*3]=r*Math.sin(v)*Math.cos(u); positions[i*3+1]=r*Math.cos(v); positions[i*3+2]=r*Math.sin(v)*Math.sin(u);
      phases[i]=Math.random()*Math.PI*2; speeds[i]=.35+Math.random()*.7;
    }
    const geo=new T.BufferGeometry(); geo.setAttribute('position',new T.BufferAttribute(positions,3));
    const pts=new T.Points(geo,new T.PointsMaterial({color:0xffb56b,size:.018,transparent:true,opacity:.72,depthWrite:false,sizeAttenuation:true})); root.add(pts);
    // Faint axis-aligned field marker lines.
    const lineMat=new T.LineBasicMaterial({color:0x8d63b5,transparent:true,opacity:.26});
    for(let i=0;i<12;i++){
      const a=i*Math.PI/6, arr=[Math.cos(a)*1.2,-1.42,Math.sin(a)*1.2,Math.cos(a)*1.72,-1.42,Math.sin(a)*1.72];
      const lg=new T.BufferGeometry(); lg.setAttribute('position',new T.Float32BufferAttribute(arr,3));root.add(new T.Line(lg,lineMat));
    }
    let running=true, drag=false, px=0, py=0, downX=0, downY=0, zoom=6.7, frame=0;
    const resize=()=>{const w=Math.max(320,host.clientWidth),h=Math.max(280,host.clientHeight);renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();};
    const canvas=renderer.domElement;
    canvas.addEventListener('pointerdown',e=>{drag=true;px=e.clientX;py=e.clientY;canvas.setPointerCapture(e.pointerId);});
    canvas.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-px,dy=e.clientY-py;root.rotation.y+=dx*.006;root.rotation.x+=dy*.004;px=e.clientX;py=e.clientY;});
    const stopDrag=()=>{drag=false;}; canvas.addEventListener('pointerup',stopDrag);canvas.addEventListener('pointercancel',stopDrag);
    canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(4.4,Math.min(9.5,zoom+e.deltaY*.004));camera.position.z=zoom;},{passive:false});
    const mode=$('#twinMode');
    mode.addEventListener('change',()=>{
      const earth=mode.value==='earth';
      flame.scale.set(earth ? 0.68 : 1, earth ? 1.52 : 1, earth ? 0.68 : 1);
      shell.scale.set(earth?.82:1,earth?1.25:1,earth?.82:1);
      outer.scale.set(earth?.9:1,earth?1.2:1,earth?.9:1);
      $('#twinModeTitle').textContent=earth?'Buoyancy-influenced morphology':'Diffusion-led morphology';
      $('#twinModeText').textContent=earth?'The elongated shape represents a familiar buoyancy-influenced flame concept on Earth. Real flame shape remains dependent on fuel, geometry, ventilation, and test conditions.':'With buoyancy-driven natural convection strongly reduced, diffusion and imposed ventilation become more important. The displayed sphere is a schematic, not a universal flame shape.';
      $('#twinSceneModeLabel')?.remove();
    });
    $('#twinPause').addEventListener('click',()=>{running=!running;$('#twinPause').textContent=running?'Pause animation':'Resume animation';});
    $('#twinReset').addEventListener('click',()=>{root.rotation.set(0,0,0);camera.position.set(0,0,6.7);zoom=6.7;});
    const animate=()=>{
      frame=requestAnimationFrame(animate);
      if(running){
        flame.rotation.y+=.0038; flame.rotation.z+=.0012; shell.rotation.y-=.0013;
        core.scale.setScalar(1+.018*Math.sin(Date.now()*.002)); outer.rotation.x+=.0008;
        const p=geo.attributes.position.array;
        for(let i=0;i<count;i++){
          const basei=i*3, phase=phases[i]+Date.now()*.00035*speeds[i];
          const r=.85+.2*(.5+.5*Math.sin(phase));
          const len=Math.hypot(p[basei],p[basei+1],p[basei+2])||1;
          const scale=r/len; p[basei]*=scale;p[basei+1]*=scale;p[basei+2]*=scale;
        }
        geo.attributes.position.needsUpdate=true; pts.rotation.y-=.0007;
      }
      renderer.render(scene,camera);
    };
    const resizeObs=new ResizeObserver(resize); resizeObs.observe(host); resize(); animate();
    twin={renderer,scene,camera,root,resizeObs,frame};
  }

  function onPageNavigation(){
    $$('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{
      const page=btn.dataset.page;
      setTimeout(()=>{
        if(page==='data-studio'){
          if(charts.b1SeriesChart) charts.b1SeriesChart.resize();
          Object.values(charts).forEach(c=>c?.resize?.());
        }
        if(page==='digital-twin' && twin){
          const host=$('#twinCanvasHost'); if(host && twin.renderer){twin.renderer.setSize(Math.max(320,host.clientWidth),Math.max(280,host.clientHeight),false);twin.camera.aspect=host.clientWidth/host.clientHeight;twin.camera.updateProjectionMatrix();}
        }
      },80);
    }));
  }

  async function initAdvanced(){
    chartDefaults();
    initAiInterceptors();
    await loadResearchData();
    onPageNavigation();
    initTwin();
  }
  document.addEventListener('DOMContentLoaded',initAdvanced,{once:true});
})();
