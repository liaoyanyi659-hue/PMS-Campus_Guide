/* Self-hosted pdf-lib; fully embedded Unicode TrueType font, real AcroForm fields. */
(() => {
  'use strict';
  let assets;
  const widths=[595.28,841.89],margin=40,contentWidth=515.28;
  const NOTICE='Check both documents, print this Receipt and the Report, and personally hand them to Pejabat Felo. PMS Explore only stores records and prepares documents. It does not submit to the school or track repair progress.';
  const OFFLINE='Editing this downloaded PDF does not update the website record. To synchronise details, edit the record on PMS Explore, save and download again.';
  async function loadAssets(){
    if(!assets)assets=Promise.all([fetch('vendor/NotoSansSC.ttf',{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error('font');return r.arrayBuffer();}),fetch('vendor/NotoSansSC.ttf.json',{cache:'force-cache'}).then(r=>{if(!r.ok)throw Error('font');return r.json();})]).catch(e=>{assets=null;throw e;});
    return assets;
  }
  // Narrow fontkit-compatible adapter for this pinned static font. Metrics and cmap
  // are generated from the exact TTF during packaging. Full font (not a subset) is
  // embedded so users can enter additional supported characters in offline editors.
  function adapter(m){
    const reverse={};Object.entries(m.cmap).forEach(([cp,id])=>{cp=Number(cp);if(!reverse[id]||(cp>=0x4E00&&cp<=0x9FFF))reverse[id]=[cp];});
    const glyph=cp=>{const id=m.cmap[cp];if(id===undefined)throw Object.assign(Error('Unsupported Unicode character'),{key:'fontError'});return {id,advanceWidth:m.widths[id],codePoints:reverse[id]};};
    return {create:()=>({...m,characterSet:Object.keys(m.cmap).map(Number),glyphForCodePoint:glyph,layout:s=>({glyphs:[...s.replace(/\t/g,'    ')].map(c=>glyph(c.codePointAt(0)))}),post:{isFixedPitch:false},head:{macStyle:{italic:false}},'OS/2':{sFamilyClass:0},cff:false})};
  }
  // Soft wrap without losing spaces, line endings or user wording. Returned chunks
  // concatenate byte-for-byte to the original string. Conservative field padding.
  function wrapSegments(text,font,maxWidth,size){
    const result=[];let line='',lineWidth=0;
    for(const c of text){
      if(c==='\r'){line+=c;continue;}
      if(c==='\n'){result.push(line+c);line='';lineWidth=0;continue;}
      const w=font.widthOfTextAtSize(c,size);
      if(line&&lineWidth+w>maxWidth){
        const split=Math.max(line.lastIndexOf(' '),line.lastIndexOf('\t'))+1;
        if(split>0){result.push(line.slice(0,split));line=line.slice(split);lineWidth=font.widthOfTextAtSize(line.replace(/\r/g,''),size);}else{result.push(line);line='';lineWidth=0;}
      }
      if(line&&lineWidth+w>maxWidth){result.push(line);line='';lineWidth=0;}
      line+=c;lineWidth+=w;
    }
    if(line||!result.length)result.push(line);return result;
  }
  function chunks(text,font,maxLines=28,maxWidth=contentWidth-22,size=11){
    const lines=wrapSegments(text,font,maxWidth,size),result=[];
    for(let i=0;i<lines.length;i+=maxLines)result.push(lines.slice(i,i+maxLines).join(''));
    return result;
  }
  async function generate(record,photos,kind){
    if(!['receipt','report'].includes(kind))throw Error('Invalid document kind');
    const L=window.PDFLib,[fontBytes,metrics]=await loadAssets(),doc=await L.PDFDocument.create();
    doc.registerFontkit(adapter(metrics));
    const font=await doc.embedFont(fontBytes,{subset:false,customName:'PMSNotoSansSC'}),labelFont=font,bold=font,form=doc.getForm();
    form.acroForm.dict.set(L.PDFName.of('DR'),doc.context.obj({Font:{[font.name]:font.ref}}));
    form.acroForm.dict.set(L.PDFName.of('DA'),L.PDFString.of('/'+font.name+' 11 Tf 0 g'));
    doc.setTitle(kind==='report'?'Facility Complaint Report':'Facility Complaint Receipt');doc.setAuthor('PMS Explore');doc.setSubject('Documents prepared - personal hand-in required');
    let page,y;const pages=[];
    function newPage(title){page=doc.addPage(widths);pages.push(page);y=widths[1]-margin;page.drawText('PMS EXPLORE',{x:margin,y:y-10,size:9,font:bold,color:L.rgb(.08,.23,.36)});y-=36;page.drawText(title,{x:margin,y,size:20,font:bold});y-=27;page.drawText(record.reference+' | Version '+record.version,{x:margin,y,size:9,font:labelFont});y-=24;}
    function textBlock(text,size=10){
      for(const segment of wrapSegments(text,font,contentWidth,size)){if(y<margin+36)newPage(kind==='receipt'?'Facility Complaint Receipt (continued)':'Facility Complaint Report (continued)');page.drawText(segment.replace(/[\r\n]/g,''),{x:margin,y,size,font});y-=size*1.5;}y-=8;
    }
    function staticField(label,value){if(y<margin+65)newPage('Facility Complaint Receipt (continued)');page.drawText(label,{x:margin,y,size:10,font:bold});y-=17;textBlock(value,11);}
    function field(name,label,value,lines=2){
      const parts=chunks(value,font,lines);parts.forEach((part,index)=>{
        // Fixed generous line-height; a continuation gets its own real field.
        const h=lines*17+20;if(y-h<margin+42)newPage('Facility Complaint Report (continued)');
        page.drawText(label+(parts.length>1?' (part '+(index+1)+' of '+parts.length+')':''),{x:margin,y,size:10,font:bold});y-=h+8;
        const f=form.createTextField(name+(parts.length>1?'_'+(index+1):''));f.enableMultiline();f.disableScrolling();f.setText(part);
        f.addToPage(page,{x:margin,y,width:contentWidth,height:h,font,borderWidth:.7,borderColor:L.rgb(.65,.7,.75),backgroundColor:L.rgb(1,1,1),textColor:L.rgb(.08,.1,.13)});f.setFontSize(11);
        // pdf-lib's default multiline provider only wraps on whitespace. Use
        // character-aware appearance lines so CJK and long URLs never clip.
        f.acroField.setDefaultAppearance('/'+font.name+' 11 Tf 0.08 0.1 0.13 rg');
        f.updateAppearances(font,(field,widget)=>{
          const {width,height}=widget.getRectangle();const textLines=wrapSegments(field.getText()||'',font,contentWidth-22,11).map((segment,index)=>{const text=segment.replace(/[\r\n]/g,'');return {text,encoded:font.encodeText(text),width:font.widthOfTextAtSize(text,11),height:11,x:8,y:height-23-index*17};});
          if(textLines.length>lines)throw Error('PDF field overflow');
          return L.drawTextField({x:0,y:0,width,height,borderWidth:.7,borderColor:L.rgb(.65,.7,.75),color:L.rgb(1,1,1),textColor:L.rgb(.08,.1,.13),font:font.name,fontSize:11,textLines,padding:7});
        });y-=22;
      });
    }
    const date=v=>v+' UTC';
    if(kind==='receipt'){
      newPage('Facility Complaint Receipt');
      staticField('Status','Documents prepared');staticField('Complaint Number',record.reference);staticField('Full Name',record.full_name);staticField('Matric Number',record.matric_number);staticField('Location',record.location);staticField('Facility',record.facility);
      // A bounded original-text excerpt is explicitly a summary, not a rewrite.
      const summary=[...record.description].slice(0,350).join('');staticField('Problem Summary (first 350 characters)',summary);staticField('Submitted At',date(record.created_at));staticField('Updated At',date(record.updated_at));
      textBlock('PRINT AND HAND IN',11);textBlock(NOTICE);textBlock('Matric number format was checked only; student identity has not been verified.');textBlock(OFFLINE);
    }else{
      newPage('Facility Complaint Report');textBlock('Status: Documents prepared');textBlock('Submitted At: '+date(record.created_at)+' | Updated At: '+date(record.updated_at),9);textBlock(NOTICE,9);textBlock(OFFLINE,9);
      field('full_name','Full Name',record.full_name,3);field('matric_number','Matric Number',record.matric_number,1);field('location','Location',record.location,5);field('facility','Facility',record.facility,4);
      newPage('Problem Description');field('description','Problem Description',record.description,28);
      newPage('Signature and Date');textBlock('Matric number format was checked only; student identity has not been verified.');textBlock('I have checked the details in this Report and the Receipt.');field('signature','Signature','',3);field('signature_date','Date','',1);textBlock('Print both documents and personally hand them to Pejabat Felo.');textBlock('If an offline edit exceeds a field\'s space, revise the website record and generate a new paginated Report.');
      for(let i=0;i<photos.length;i++){
        newPage('Problem Photo '+(i+1)+' of '+photos.length);const b=photos[i],raw=await b.arrayBuffer(),img=b.type==='image/png'?await doc.embedPng(raw):await doc.embedJpg(raw),areaH=y-margin-45,scale=Math.min(contentWidth/img.width,areaH/img.height);const w=img.width*scale,h=img.height*scale;page.drawImage(img,{x:margin+(contentWidth-w)/2,y:y-h,width:w,height:h});y-=h+24;page.drawText('Photo '+(i+1)+' | '+record.reference,{x:margin,y,size:9,font:labelFont});
      }
      // Every widget was assigned a custom Unicode /AP above. Keep these, /Fields
      // and /V intact; NEVER flatten or regenerate using the whitespace provider.
    }
    pages.forEach((p,i)=>p.drawText('Page '+(i+1)+' of '+pages.length+' | Documents prepared | '+record.reference,{x:margin,y:24,size:8,font:labelFont,color:L.rgb(.3,.35,.4)}));
    return doc.save({updateFieldAppearances:false});
  }
  window.PMS_COMPLAINT_PDF={generate,chunks,adapter};
})();
