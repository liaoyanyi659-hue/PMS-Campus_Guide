/* Restore the original horizontal brand with the institution subtitle. */
(() => {
 const header=document.querySelector('body>header.account-header');
 if(!header)return;
 const brand=header.querySelector('.brand');
 if(!brand)return;
 let subtitle=brand.querySelector(':scope>div:not(.logo)>small');
 if(!subtitle){
  let name=brand.querySelector('.brand-name');
  if(name){const wrapper=document.createElement('div');name.before(wrapper);wrapper.append(name);subtitle=document.createElement('small');wrapper.append(subtitle);}
 }
 if(subtitle){subtitle.textContent='POLITEKNIK MUADZAM SHAH';subtitle.classList.add('institution-name');subtitle.setAttribute('data-no-translate','');}
})();
