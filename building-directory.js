/* Text directories transcribed from student-supplied signs on 10 October 2026. */
(() => {
  'use strict';
  const label = (en, ms, zh) => ({ en, ms, zh });
  const room = (en, ms, zh, direction = '') => ({ name: label(en, ms, zh), direction });
  const records = {
    '资讯与通讯科技系': {
      title: label('JTMK building · floor directory', 'Bangunan JTMK · panduan tingkat', 'JTMK 大楼 · 楼层目录'),
      aliases: 'JTMK JMSK MKT MSKD MKR hypermedia komputer computer rangkaian network structured cabling kabel terstruktur application development pembangunan aplikasi CAD dewan kuliah utama DKU bilik suis presentation pembentangan 数学 科学 电脑 实验室 主讲堂',
      floors: [
        ['G', [
          room('Information & Communication Technology Department (JTMK)', 'Jabatan Teknologi Maklumat & Komunikasi (JTMK)', '资讯与通讯科技系（JTMK）', 'right'),
          room('Computer System & Digital Laboratories 1–2', 'Makmal Sistem Komputer & Digital 1–2', '电脑系统与数字实验室 1–2（MSKD1／MSKD2）', 'left'),
          room('Network Switch Room', 'Bilik Suis Rangkaian', '网络交换机房', 'right'),
        ]],
        ['1', [
          room('Information Technology Laboratory 1', 'Makmal Teknologi Maklumat 1', '资讯科技实验室 1（MKT1）', 'right'),
          room('Information Technology Laboratory 2', 'Makmal Teknologi Maklumat 2', '资讯科技实验室 2（MKT2）', 'right'),
          room('Main Lecture Theatre', 'Dewan Kuliah Utama', '主讲堂（Dewan Kuliah Utama）', 'right'),
          room('Structured Cabling Laboratories 1–2', 'Makmal Kabel Terstruktur 1–2', '结构化布线实验室 1–2', 'left'),
          room('Communication & Network Laboratory 1', 'Makmal Komunikasi & Rangkaian 1', '通讯与网络实验室 1', 'left'),
          room('Communication & Network Laboratories 1–2', 'Makmal Komunikasi & Rangkaian 1–2', '通讯与网络实验室 1–2', 'right'),
        ]],
        ['2', [
          room('Mathematics, Science & Computer Department (JMSK)', 'Jabatan Matematik, Sains & Komputer (JMSK)', '数学、科学与电脑系（JMSK）', 'left'),
          room('Computer Laboratories 1–2', 'Makmal Komputer 1–2', '电脑实验室 1–2', 'left'),
          room('Application Development Laboratory 2', 'Makmal Pembangunan Aplikasi 2', '应用开发实验室 2', 'right'),
        ]],
        ['3', [
          room('Hypermedia Laboratory', 'Makmal Hypermedia', '超媒体实验室', 'left'),
          room('Presentation Room 1', 'Bilik Pembentangan 1', '演示室 1', 'left'),
          room('Hypermedia Laboratory 3', 'Makmal Hypermedia 3', '超媒体实验室 3', 'right'),
          room('Information Technology Laboratory 2', 'Makmal Teknologi Maklumat 2', '资讯科技实验室 2（MKT2）', 'right'),
          room('Computer Aided Design & Drafting Laboratory 1', 'Makmal Rekabentuk & Tulisan Berbantu Komputer 1', '电脑辅助设计与绘图实验室 1', 'right'),
          room('Application Development Laboratories 3–4', 'Makmal Pembangunan Aplikasi 3–4', '应用开发实验室 3–4', 'right'),
          room('Communication & Network Laboratory 3', 'Makmal Komunikasi & Rangkaian 3', '通讯与网络实验室 3', 'right'),
        ]],
      ],
      note: label('The signs list Information Technology Laboratory 2 on both floors 1 and 3. Check the room-door label for your class.', 'Papan tanda menyenaraikan Makmal Teknologi Maklumat 2 pada tingkat 1 dan 3. Semak label pintu bilik untuk kelas anda.', '指示牌将资讯科技实验室 2 同时列于 1 楼与 3 楼，上课前请核对课室门牌。'),
    },
    // Retain the existing map key so saved links and CMS records still match.
    'JP / JPA / JMSK 教学区域': {
      title: label('JP / JPA / Examination Unit building', 'Bangunan JP / JPA / Unit Peperiksaan', 'JP／JPA／考试单位大楼'),
      aliases: 'JP JPA unit peperiksaan examination exam UPLI latihan industri internship BK18 BK19 BK25 BK26 BK27 BK37 BK38 bilik kuliah lecture room seminar presentation drawing lukisan 考试 课室 实习',
      floors: [
        ['G', [
          room('General Studies Department (JPA)', 'Jabatan Pengajian Am (JPA)', '通识教育系（JPA）'),
          room('Industry Liaison & Training Unit (UPLI)', 'Unit Perhubungan & Latihan Industri (UPLI)', '工业联系与实习单位（UPLI）', 'left'),
        ]],
        ['1', [
          room('Commerce Department (JP)', 'Jabatan Perdagangan (JP)', '商业系（JP）'),
          room('Lecture Rooms 18–19 (BK 18–19)', 'Bilik Kuliah 18–19 (BK 18–19)', '课室 18–19（BK 18–19）', 'right'),
          room('Seminar & Presentation Room', 'Bilik Seminar & Pembentangan', '研讨与演示室', 'left'),
          room('Drawing Room', 'Bilik Lukisan', '绘图室', 'left'),
        ]],
        ['2', [
          room('Examination Unit', 'Unit Peperiksaan', '考试单位（Unit Peperiksaan）'),
          room('Lecture Rooms 25–27 (BK 25–27)', 'Bilik Kuliah 25–27 (BK 25–27)', '课室 25–27（BK 25–27）', 'left'),
          room('Lecture Rooms 37–38 (BK 37–38)', 'Bilik Kuliah 37–38 (BK 37–38)', '课室 37–38（BK 37–38）', 'right'),
        ]],
      ],
    },
  };
  const copy = {
    en: { floor: 'Floor', ground: 'Ground floor', left: 'Left', right: 'Right', orientation: 'Left and right follow the photographed signs when facing them at that location.', source: 'Building signs · updated 10 October 2026' },
    ms: { floor: 'Tingkat', ground: 'Aras bawah', left: 'Kiri', right: 'Kanan', orientation: 'Kiri dan kanan mengikut papan tanda yang difoto apabila anda menghadapnya di lokasi tersebut.', source: 'Papan tanda bangunan · dikemas kini 10 Oktober 2026' },
    zh: { floor: '楼层', ground: '底层', left: '左侧', right: '右侧', orientation: '左右方向按照片中的指示牌整理，指在拍摄位置面对指示牌时的方向。', source: '建筑现场指示牌 · 更新于 2026年10月10日' },
  };
  const current = () => window.PMS_UI?.language || 'en';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function markup(key, language = current()) {
    const building = records[key];
    if (!building) return '';
    const l = copy[language] ? language : 'en', c = copy[l];
    return `<section class="building-directory" data-building-directory="${esc(key)}" data-no-translate><h3>${esc(building.title[l])}</h3><dl class="building-floors">${building.floors.map(([level, rooms]) => `<div class="building-floor"><dt>${level === 'G' ? `G · ${c.ground}` : `${c.floor} ${level}`}</dt><dd><ul>${rooms.map(r => `<li><span>${esc(r.name[l])}</span>${r.direction ? `<span class="building-direction">${esc(c[r.direction])}</span>` : ''}</li>`).join('')}</ul></dd></div>`).join('')}</dl><p class="building-orientation">${esc(c.orientation)}</p>${building.note ? `<p class="building-note">${esc(building.note[l])}</p>` : ''}<small class="building-source">${esc(c.source)}</small></section>`;
  }
  function searchText(key, language = current()) {
    const b = records[key], l = copy[language] ? language : 'en';
    return b ? [b.title[l], ...b.floors.flatMap(([level, rooms]) => rooms.map(r => `${copy[l].floor} ${level} ${r.name[l]}`))].join(' ') : '';
  }
  window.PMS_BUILDINGS = { records, markup, searchText, updated: '2026-10-10' };
  document.addEventListener('pms-language-change', () => {
    document.querySelectorAll('[data-building-directory]').forEach(el => {
      el.outerHTML = markup(el.dataset.buildingDirectory);
    });
  });
})();
