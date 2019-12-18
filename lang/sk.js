export default {
  isoName: 'sk',
  nativeName: 'Slovenčina',
  label: {
    clear: 'Vymazať',
    ok: 'OK',
    cancel: 'Zrušiť',
    close: 'Zavrieť',
    set: 'Nastaviť',
    select: 'Vybrať',
    reset: 'Resetovať',
    remove: 'Odstrániť',
    update: 'Upraviť',
    create: 'Vytvoriť',
    search: 'Hľadať',
    filter: 'Filtrovať',
    refresh: 'Obnoviť'
  },
  date: {
    days: 'Nedeľa_Pondelok_Utorok_Streda_Štvrtok_Piatok_Sobota'.split('_'),
    daysShort: 'Ned_Pon_Uto_Str_Štv_Pia_Sob'.split('_'),
    months: 'Január_Február_Marec_Apríl_Máj_Jún_Júl_August_September_Október_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Máj_Jún_Júl_Aug_Sep_Okt_Nov_Dec'.split('_'),
    firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: true
  },
  table: {
    noData: 'Nie sú dostupné údaje',
    noResults: 'Neboli nájdené vyhovujúce záznamy',
    loading: 'Načítavam...',
    selectedRecords: function (rows) {
      return rows > 0
        ? rows + ' ' + (rows === 1 ? 'riadok vybratý' : (rows < 5 ? 'riadky vybraté' : 'riadkov vybratých')) + '.'
        : 'Žiadne vybraté riadky.'
    },
    recordsPerPage: 'Riadkov na stránku:',
    allRows: 'Všetky',
    pagination: function (start, end, total) {
      return start + '-' + end + ' z ' + total
    },
    columns: 'Stĺpce'
  },
  editor: {
    url: 'URL',
    bold: 'Tučné',
    italic: 'Kurzíva',
    strikethrough: 'Prečiarknuté',
    underline: 'Podčiarknuté',
    unorderedList: 'Odrážky',
    orderedList: 'Číslovanie',
    subscript: 'Dolný index',
    superscript: 'Horný index',
    hyperlink: 'Odkaz',
    toggleFullscreen: 'Prepnúť na celú obrazovku',
    quote: 'Citovať',
    left: 'Zarovnať doľava',
    center: 'Centrovať',
    right: 'Zarovnať doprava',
    justify: 'Zarovnať podľa okrajov',
    print: 'Tlačiť',
    outdent: 'Zmenšiť odsadenie',
    indent: 'Zväčšiť odsadenie',
    removeFormat: 'Odstrániť formátovanie',
    formatting: 'Formátovanie',
    fontSize: 'Veľkosť písma',
    align: 'Zarovnať',
    hr: 'Vložiť horizontálny oddelovač',
    undo: 'Späť',
    redo: 'Znova',
    heading1: 'Hlavička 1',
    heading2: 'Hlavička 2',
    heading3: 'Hlavička 3',
    heading4: 'Hlavička 4',
    heading5: 'Hlavička 5',
    heading6: 'Hlavička 6',
    paragraph: 'Odsek',
    code: 'Kód',
    size1: 'Veľmi malé',
    size2: 'Malé',
    size3: 'Normálne',
    size4: 'Stredne veľké',
    size5: 'Veľké',
    size6: 'Veľmi veľké',
    size7: 'Maximálne',
    defaultFont: 'Predvolené písmo',
    viewSource: 'Zdroj pohladu'
  },
  tree: {
    noNodes: 'Nie sú dostupné vetvy',
    noResults: 'Neboli nájdené vyhovujúce vetvy'
  }
}
