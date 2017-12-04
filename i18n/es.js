export default {
  lang: 'es',
  label: {
    clear: 'Borrar',
    ok: 'OK',
    cancel: 'Cancelar',
    close: 'Cerrar',
    set: 'Establecer',
    select: 'Seleccionar',
    reset: 'Restablecer',
    remove: 'Eliminar',
    update: 'Actualizar',
    create: 'Crear',
    search: 'Buscar',
    filter: 'Filtro',
    refresh: 'Actualizar'
  },
  date: {
    days: 'Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sábado'.split('_'),
    daysShort: 'Dom_Lun_Mar_Mie_Jue_Vie_Sáb'.split('_'),
    months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
    monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
    firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: true
  },
  pullToRefresh: {
    pull: 'Jalar hacia abajo para actualizar',
    release: 'Soltar para actualizar',
    refresh: 'Actualizando...'
  },
  table: {
    noData: 'Sin datos disponibles',
    noResults: 'No se econtraron resultados',
    loader: 'Cargando...',
    selectedRows: rows => rows > 1 ? `${rows} filas seleccionadas.` : `${rows === 0 ? 'Sin' : '1'} fila seleccionada.`,
    rowsPerPage: 'Filas por página:',
    allRows: 'Todas',
    pagination: (start, end, total) => `${start}-${end} de ${total}`,
    columns: 'Columnas'
  },
  editor: {
    url: 'URL',
    bold: 'Negrita',
    italic: 'Italico',
    strikethrough: 'Tachado',
    underline: 'Subrayado',
    unorderedList: 'Lista Desordenada',
    orderedList: 'List Ordenada',
    subscript: 'Subíndice',
    superscript: 'Superíndice',
    hyperlink: 'Hipervínculo',
    toggleFullscreen: 'Alternar pantalla completa',
    quote: 'Cita',
    left: 'Alineación izquierda',
    center: 'Alineación centro',
    right: 'Alineación derecha',
    justify: 'Justificar alineación',
    print: 'Imprimir',
    outdent: 'Disminuir indentación',
    indent: 'Aumentar indentación',
    removeFormat: 'Remover formato',
    formatting: 'Formato',
    fontSize: 'Tamaño de Fuente',
    align: 'Alinear',
    hr: 'Insertar HR',
    undo: 'Deshacer',
    redo: 'Rehacer',
    header1: 'Encabezado 1',
    header2: 'Encabezado 2',
    header3: 'Encabezado 3',
    header4: 'Encabezado 4',
    header5: 'Encabezado 5',
    header6: 'Encabezado 6',
    paragraph: 'Parafo',
    code: 'Codigo',
    size1: 'Muy pequeño',
    size2: 'Pequeño',
    size3: 'Normal',
    size4: 'MedioMedium-large',
    size5: 'Grande',
    size6: 'Muy',
    size7: 'Maximo',
    defaultFont: 'Fuente por defecto'
  }
}
