import Vue, { VueConstructor, PluginObject } from 'vue'

export interface AddressbarColor {
    set(hexColor : string): void
}

export interface AppFullscreen {
    isCapable : boolean
    isActive : boolean
    request(target? : string): void
    exit(): void
    toggle(target? : string): void
}

export interface AppVisibility {
    appVisible : boolean
}

export interface BottomSheet {
    create(opts : {
        class? : string | any[] | any
        style? : string | any[] | any
        title? : string
        message? : string
        actions? : any[]
        grid? : boolean
        dark? : boolean
        seamless? : boolean
        persistent? : boolean }): DialogChainObject
}

export interface Cookies {
    get(name : string, reviverFn? : Function): string
    getAll(reviverFn? : Function): any
    set(name : string, value : string, options? : {
        expires? : number | string
        path? : string
        domain? : string
        httpOnly? : boolean
        secure? : boolean }): void
    has(name : string, reviverFn? : Function): boolean
    remove(name : string, options? : {
        path? : string
        domain? : string
        httpOnly? : boolean
        secure? : boolean }): void
    parseSSR(ssrContext : any): any
}

export interface Dialog {
    create(opts : QDialogOptions): DialogChainObject
}

export interface Loading {
    isActive : boolean
    show(opts? : {
        delay? : number
        message? : string
        sanitize? : boolean
        spinnerSize? : number
        spinnerColor? : string
        messageColor? : string
        backgroundColor? : string
        spinner? : Vue
        customClass? : string
        ignoreDefaults? : boolean }): void
    hide(): void
    setDefaults(opts : {
        delay? : number
        message? : string
        spinnerSize? : number
        spinnerColor? : string
        messageColor? : string
        backgroundColor? : string
        spinner? : Vue
        customClass? : string }): void
}

export interface LoadingBar {
    start(speed? : number): void
    stop(): void
    increment(amount? : number): void
    setDefaults(): void
}

export interface LocalStorage {
    has(key : string, reviverFn? : Function): boolean
    getLength(): number
    getItem(key : string, reviverFn? : Function): any
    getIndex(index : number, reviverFn? : Function): any
    getAll(reviverFn? : Function): any
    set(key : string, value : any): void
    remove(key : string): void
    clear(): void
    isEmpty(): boolean
}

export interface Meta {
}

export interface Notify {
    create(opts : {
        color? : string
        textColor? : string
        message : string
        html? : boolean
        icon? : string
        avatar? : string
        position? : string
        classes? : string
        timeout? : number
        actions? : any[]
        onDismiss? : Function
        closeBtn? : string
        multiLine? : boolean
        ignoreDefaults? : boolean } | string): Function
    setDefaults(opts : {
        color? : string
        textColor? : string
        message : string
        html? : boolean
        icon? : string
        avatar? : string
        position? : string
        classes? : string
        timeout? : number
        actions? : any[]
        onDismiss? : Function
        closeBtn? : string
        multiLine? : boolean }): void
}

export interface Platform {
    userAgent : string
    is : any
    has : {
        touch : boolean
        webStorage : boolean }
    within : {
        iframe : boolean }
}

export interface Screen {
    width : number
    height : number
    sizes : {
        sm : number
        md : number
        lg : number
        xl : number }
    lt : {
        sm : boolean
        md : boolean
        lg : boolean
        xl : boolean }
    gt : {
        xs : boolean
        sm : boolean
        md : boolean
        lg : boolean }
    xs : boolean
    sm : boolean
    md : boolean
    lg : boolean
    xl : boolean
    setSizes(breakpoints : {
        sm? : number
        md? : number
        lg? : number
        xl? : number }): void
    setDebounce(amount : number): void
}

export interface SessionStorage {
    has(key : string, reviverFn? : Function): boolean
    getLength(): number
    getItem(key : string, reviverFn? : Function): any
    getIndex(index : number, reviverFn? : Function): any
    getAll(reviverFn? : Function): any
    set(key : string, value : any): void
    remove(key : string): void
    clear(): void
    isEmpty(): boolean
}

export interface ClosePopup {
}

export interface GoBack {
}

export interface Ripple {
}

export interface Scroll {
}

export interface ScrollFire {
}

export interface TouchHold {
}

export interface TouchPan {
}

export interface TouchRepeat {
}

export interface TouchSwipe {
}

export interface QAjaxBar extends Vue {
    position? : string
    size? : string
    color? : string
    skipHijack? : boolean
    reverse? : boolean
    start(speed? : number): void
    increment(amount? : number): void
    stop(): void
}

export interface QAvatar extends Vue {
    size? : string
    fontSize? : string
    color? : string
    textColor? : string
    icon? : string
    square? : boolean
    rounded? : boolean
}

export interface QBadge extends Vue {
    color? : string
    textColor? : string
    floating? : boolean
    transparent? : boolean
    multiLine? : boolean
    label? : string | number
    align? : string
}

export interface QBanner extends Vue {
    inlineActions? : boolean
    dense? : boolean
    rounded? : boolean
}

export interface QBar extends Vue {
    dense? : boolean
    dark? : boolean
}

export interface QBreadcrumbs extends Vue {
    separator? : string
    activeColor? : string
    gutter? : string
    separatorColor? : string
    align? : string
}

export interface QBreadcrumbsEl extends Vue {
    to? : string | any
    exact? : boolean
    append? : boolean
    replace? : boolean
    activeClass? : string
    exactActiveClass? : string
    disable? : boolean
    label? : string
    icon? : string
}

export interface QBtn extends Vue {
    size? : string
    ripple? : boolean | any
    type? : string
    to? : string | any
    replace? : boolean
    label? : string | number
    icon? : string
    iconRight? : string
    round? : boolean
    outline? : boolean
    flat? : boolean
    unelevated? : boolean
    rounded? : boolean
    push? : boolean
    glossy? : boolean
    fab? : boolean
    fabMini? : boolean
    color? : string
    textColor? : string
    noCaps? : boolean
    noWrap? : boolean
    dense? : boolean
    tabindex? : number | string
    align? : string
    stack? : boolean
    stretch? : boolean
    loading? : boolean
    disable? : boolean
    percentage? : number
    darkPercentage? : boolean
}

export interface QBtnDropdown extends Vue {
    value? : boolean
    size? : string
    ripple? : boolean | any
    type? : string
    to? : string | any
    replace? : boolean
    label? : string | number
    icon? : string
    iconRight? : string
    round? : boolean
    outline? : boolean
    flat? : boolean
    unelevated? : boolean
    rounded? : boolean
    push? : boolean
    glossy? : boolean
    fab? : boolean
    fabMini? : boolean
    color? : string
    textColor? : string
    noCaps? : boolean
    noWrap? : boolean
    dense? : boolean
    tabindex? : number | string
    align? : string
    stack? : boolean
    stretch? : boolean
    loading? : boolean
    disable? : boolean
    split? : boolean
    disableMainBtn? : boolean
    disableDropdown? : boolean
    contentStyle? : any[] | string | any
    contentClass? : any[] | string | any
    cover? : boolean
    persistent? : boolean
    autoClose? : boolean
    menuAnchor? : string
    menuSelf? : string
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export interface QBtnGroup extends Vue {
    spread? : boolean
    outline? : boolean
    flat? : boolean
    unelevated? : boolean
    rounded? : boolean
    push? : boolean
    stretch? : boolean
    glossy? : boolean
}

export interface QBtnToggle extends Vue {
    ripple? : boolean | any
    value? : any
    options : any[]
    color? : string
    textColor? : string
    toggleColor? : string
    toggleTextColor? : string
    spread? : boolean
    outline? : boolean
    flat? : boolean
    unelevated? : boolean
    rounded? : boolean
    push? : boolean
    glossy? : boolean
    size? : string
    noCaps? : boolean
    noWrap? : boolean
    dense? : boolean
    readonly? : boolean
    disable? : boolean
    stack? : boolean
    stretch? : boolean
}

export interface QCard extends Vue {
    dark? : boolean
    square? : boolean
    flat? : boolean
    bordered? : boolean
}

export interface QCardActions extends Vue {
    align? : string
    vertical? : boolean
}

export interface QCardSection extends Vue {
}

export interface QCarousel extends Vue {
    fullscreen? : boolean
    value? : any
    keepAlive? : boolean
    keepAliveInclude? : string | any[]
    keepAliveExclude? : string | any[]
    keepAliveMax? : number
    animated? : boolean
    infinite? : boolean
    swipeable? : boolean
    transitionPrev? : string
    transitionNext? : string
    height? : string
    padding? : boolean
    controlColor? : string
    autoplay? : number | boolean
    arrows? : boolean
    prevIcon? : string
    nextIcon? : string
    navigation? : boolean
    navigationIcon? : string
    thumbnails? : boolean
    toggleFullscreen(): void
    setFullscreen(): void
    exitFullscreen(): void
    next(): void
    previous(): void
    goTo(panelName : string | number): void
}

export interface QCarouselControl extends Vue {
    position? : string
    offset? : any[]
}

export interface QCarouselSlide extends Vue {
    name : any
    disable? : boolean
    imgSrc? : string
}

export interface QChatMessage extends Vue {
    sent? : boolean
    label? : string
    bgColor? : string
    textColor? : string
    name? : string
    avatar? : string
    text? : string
    stamp? : string
    size? : string
    labelSanitize? : boolean
    nameSanitize? : boolean
    textSanitize? : boolean
    stampSanitize? : boolean
}

export interface QCheckbox extends Vue {
    value : any | any[]
    val? : any
    trueValue? : any
    falseValue? : any
    label? : string
    leftLabel? : boolean
    color? : string
    keepColor? : boolean
    dark? : boolean
    dense? : boolean
    disable? : boolean
    tabindex? : number | string
    indeterminateValue? : any
    toggleIndeterminate? : boolean
    toggle(): void
}

export interface QChip extends Vue {
    ripple? : boolean | any
    dense? : boolean
    icon? : string
    iconRight? : string
    label? : string | number
    color? : string
    textColor? : string
    value? : boolean
    selected? : boolean
    square? : boolean
    outline? : boolean
    clickable? : boolean
    removable? : boolean
    tabindex? : number | string
    disable? : boolean
}

export interface QCircularProgress extends Vue {
    size? : string
    value? : number
    min? : number
    max? : number
    color? : string
    centerColor? : string
    trackColor? : string
    fontSize? : string
    thickness? : number
    angle? : number
    indeterminate? : boolean
    showValue? : boolean
    reverse? : boolean
}

export interface QColor extends Vue {
    value? : string
    defaultValue? : string
    defaultView? : string
    formatModel? : string
    palette? : any[]
    noHeader? : boolean
    noFooter? : boolean
    disable? : boolean
    readonly? : boolean
    dark? : boolean
}

export interface QDate extends Vue {
    value : string
    landscape? : boolean
    mask? : string
    locale? : {
        days? : any[]
        daysShort? : any[]
        months? : any[]
        monthsShort? : any[] }
    calendar? : string
    color? : string
    textColor? : string
    dark? : boolean
    readonly? : boolean
    disable? : boolean
    title? : string
    subtitle? : string
    emitImmediately? : boolean
    defaultYearMonth? : string
    defaultView? : string
    events? : any[] | Function
    eventColor? : string | Function
    options? : any[] | Function
    firstDayOfWeek? : string | number
    todayBtn? : boolean
    minimal? : boolean
}

export interface QTime extends Vue {
    value : string
    landscape? : boolean
    mask? : string
    locale? : {
        days? : any[]
        daysShort? : any[]
        months? : any[]
        monthsShort? : any[] }
    calendar? : string
    color? : string
    textColor? : string
    dark? : boolean
    readonly? : boolean
    disable? : boolean
    format24h? : boolean
    options? : Function
    hourOptions? : any[]
    minuteOptions? : any[]
    secondOptions? : any[]
    withSeconds? : boolean
    nowBtn? : boolean
}

export interface QDialog extends Vue {
    contentClass? : any[] | string | any
    contentStyle? : any[] | string | any
    value? : boolean
    persistent? : boolean
    noEscDismiss? : boolean
    noBackdropDismiss? : boolean
    noRouteDismiss? : boolean
    autoClose? : boolean
    seamless? : boolean
    maximized? : boolean
    fullWidth? : boolean
    fullHeight? : boolean
    position? : string
    transitionShow? : string
    transitionHide? : string
    square? : boolean
    noRefocus? : boolean
    noFocus? : boolean
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export interface QEditor extends Vue {
    fullscreen? : boolean
    value : string
    readonly? : boolean
    square? : boolean
    flat? : boolean
    dense? : boolean
    disable? : boolean
    minHeight? : string
    maxHeight? : string
    height? : string
    definitions? : {
        label? : string
        tip? : string
        htmlTip? : string
        icon? : string
        key? : number
        handler? : Function
        cmd? : string
        param? : string | Function
        disable? : boolean | Function
        type? : string }
    fonts? : any
    toolbar? : any[]
    toolbarColor? : string
    toolbarTextColor? : string
    toolbarToggleColor? : string
    toolbarBg? : string
    toolbarOutline? : boolean
    toolbarPush? : boolean
    toolbarRounded? : boolean
    contentStyle? : any
    contentClass? : any | any[] | string
    toggleFullscreen(): void
    setFullscreen(): void
    exitFullscreen(): void
    runCmd(cmd : string, param? : string, update? : boolean): void
    refreshToolbar(): void
    focus(): void
    getContentEl(): string
}

export interface QFab extends Vue {
    value? : boolean
    icon? : string
    activeIcon? : string
    disable? : boolean
    direction? : string
    persistent? : boolean
    type? : string
    outline? : boolean
    push? : boolean
    flat? : boolean
    color? : string
    textColor? : string
    glossy? : boolean
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export interface QFabAction extends Vue {
    disable? : boolean
    icon : string
    type? : string
    outline? : boolean
    push? : boolean
    flat? : boolean
    color? : string
    textColor? : string
    glossy? : boolean
    to? : string | any
    replace? : boolean
}

export interface QField extends Vue {
    error? : boolean
    errorMessage? : string
    noErrorIcon? : boolean
    rules? : any[]
    lazyRules? : boolean
    label? : string
    stackLabel? : boolean
    hint? : string
    hideHint? : boolean
    prefix? : string
    suffix? : string
    color? : string
    bgColor? : string
    dark? : boolean
    loading? : boolean
    clearable? : boolean
    clearIcon? : string
    filled? : boolean
    outlined? : boolean
    borderless? : boolean
    standout? : boolean | string
    bottomSlots? : boolean
    hideBottomSpace? : boolean
    counter? : boolean
    rounded? : boolean
    square? : boolean
    dense? : boolean
    itemsAligned? : boolean
    disable? : boolean
    readonly? : boolean
    autofocus? : boolean
    maxlength? : string | number
    resetValidation(): void
    validate(value? : any): void
}

export interface QForm extends Vue {
    autofocus? : boolean
    noErrorFocus? : boolean
    noResetFocus? : boolean
    focus(): void
    validate(shouldFocus? : boolean): Promise<boolean>
    resetValidation(): void
    submit(evt? : any): void
    reset(evt? : any): void
}

export interface QIcon extends Vue {
    size? : string
    name? : string
    color? : string
    left? : boolean
    right? : boolean
}

export interface QImg extends Vue {
    src? : string
    srcset? : string
    sizes? : string
    alt? : string
    placeholderSrc? : string
    basic? : boolean
    contain? : boolean
    position? : string
    ratio? : string | number
    transition? : string
    spinnerColor? : string
    spinnerSize? : string
    noDefaultSpinner? : boolean
}

export interface QInfiniteScroll extends Vue {
    offset? : number
    debounce? : string | number
    scrollTarget? : Element | string
    disable? : boolean
    reverse? : boolean
    poll(): void
    trigger(): void
    reset(): void
    stop(): void
    resume(): void
    updateScrollTarget(): void
}

export interface QInnerLoading extends Vue {
    size? : string
    showing? : boolean
    color? : string
    transitionShow? : string
    transitionHide? : string
    dark? : boolean
}

export interface QInput extends Vue {
    mask? : string
    fillMask? : boolean | string
    reverseFillMask? : boolean
    unmaskedValue? : boolean
    error? : boolean
    errorMessage? : string
    noErrorIcon? : boolean
    rules? : any[]
    lazyRules? : boolean
    label? : string
    stackLabel? : boolean
    hint? : string
    hideHint? : boolean
    prefix? : string
    suffix? : string
    color? : string
    bgColor? : string
    dark? : boolean
    loading? : boolean
    clearable? : boolean
    clearIcon? : string
    filled? : boolean
    outlined? : boolean
    borderless? : boolean
    standout? : boolean | string
    bottomSlots? : boolean
    hideBottomSpace? : boolean
    counter? : boolean
    rounded? : boolean
    square? : boolean
    dense? : boolean
    itemsAligned? : boolean
    disable? : boolean
    readonly? : boolean
    autofocus? : boolean
    value : string | number
    type? : string
    debounce? : string | number
    maxlength? : string | number
    autogrow? : boolean
    inputClass? : any[] | string | any
    inputStyle? : any[] | string | any
    resetValidation(): void
    validate(value? : any): void
    focus(): void
    blur(): void
    select(): void
}

export interface QKnob extends Vue {
    size? : string
    value? : number
    min? : number
    max? : number
    step? : number
    color? : string
    centerColor? : string
    trackColor? : string
    fontSize? : string
    thickness? : number
    angle? : number
    showValue? : boolean
    tabindex? : number | string
    disable? : boolean
    readonly? : boolean
}

export interface QDrawer extends Vue {
    value? : boolean
    side? : string
    overlay? : boolean
    width? : number
    mini? : boolean
    miniWidth? : number
    miniToOverlay? : boolean
    breakpoint? : number
    behavior? : string
    bordered? : boolean
    elevated? : boolean
    persistent? : boolean
    showIfAbove? : boolean
    contentClass? : any[] | string | any
    contentStyle? : any[] | string | any
    noSwipeOpen? : boolean
    noSwipeClose? : boolean
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export interface QFooter extends Vue {
    value? : boolean
    reveal? : boolean
    bordered? : boolean
    elevated? : boolean
    heightHint? : number | string
}

export interface QHeader extends Vue {
    value? : boolean
    reveal? : boolean
    revealOffset? : number
    bordered? : boolean
    elevated? : boolean
    heightHint? : number | string
}

export interface QLayout extends Vue {
    view? : string
    container? : boolean
}

export interface QPage extends Vue {
    padding? : boolean
    styleFn? : Function
}

export interface QPageContainer extends Vue {
}

export interface QPageSticky extends Vue {
    position? : string
    offset? : any[]
    expand? : boolean
}

export interface QLinearProgress extends Vue {
    size? : string
    value? : number
    buffer? : number
    color? : string
    trackColor? : string
    dark? : boolean
    reverse? : boolean
    stripe? : boolean
    indeterminate? : boolean
    query? : boolean
    rounded? : boolean
}

export interface QExpansionItem extends Vue {
    to? : string | any
    exact? : boolean
    append? : boolean
    replace? : boolean
    activeClass? : string
    exactActiveClass? : string
    disable? : boolean
    value? : boolean
    icon? : string
    expandIcon? : string
    expandIconClass? : any[] | string | any
    label? : string
    labelLines? : number | string
    caption? : string
    captionLines? : number | string
    dark? : boolean
    dense? : boolean
    duration? : number
    headerInsetLevel? : number
    contentInsetLevel? : number
    expandSeparator? : boolean
    defaultOpened? : boolean
    expandIconToggle? : boolean
    switchToggleSide? : boolean
    denseToggle? : boolean
    group? : string
    popup? : boolean
    headerStyle? : any[] | string | any
    headerClass? : any[] | string | any
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export interface QItem extends Vue {
    to? : string | any
    exact? : boolean
    append? : boolean
    replace? : boolean
    activeClass? : string
    exactActiveClass? : string
    disable? : boolean
    active? : boolean
    dark? : boolean
    clickable? : boolean
    dense? : boolean
    insetLevel? : number
    tabindex? : number | string
    tag? : string
    manualFocus? : boolean
    focused? : boolean
}

export interface QItemLabel extends Vue {
    overline? : boolean
    caption? : boolean
    header? : boolean
    lines? : number | string
}

export interface QItemSection extends Vue {
    avatar? : boolean
    thumbnail? : boolean
    side? : boolean
    top? : boolean
    noWrap? : boolean
}

export interface QList extends Vue {
    bordered? : boolean
    dense? : boolean
    separator? : boolean
    dark? : boolean
    padding? : boolean
}

export interface QSlideItem extends Vue {
    leftColor? : string
    rightColor? : string
}

export interface QMenu extends Vue {
    target? : boolean | string
    noParentEvent? : boolean
    contextMenu? : boolean
    contentClass? : any[] | string | any
    contentStyle? : any[] | string | any
    value? : boolean
    fit? : boolean
    cover? : boolean
    anchor? : string
    self? : string
    offset? : any[]
    touchPosition? : boolean
    persistent? : boolean
    autoClose? : boolean
    separateClosePopup? : boolean
    square? : boolean
    noRefocus? : boolean
    noFocus? : boolean
    maxHeight? : string
    maxWidth? : string
    transitionShow? : string
    transitionHide? : string
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
    updatePosition(): void
}

export interface QNoSsr extends Vue {
    tag? : string
    placeholder? : string
}

export interface QResizeObserver extends Vue {
    debounce? : string | number
    trigger(immediately? : boolean): void
}

export interface QScrollObserver extends Vue {
    debounce? : string | number
    horizontal? : boolean
    trigger(immediately? : boolean): void
    getPosition(): void
}

export interface QOptionGroup extends Vue {
    value? : any
    options? : any[]
    type? : string
    color? : string
    keepColor? : boolean
    dark? : boolean
    dense? : boolean
    leftLabel? : boolean
    inline? : boolean
    disable? : boolean
}

export interface QPageScroller extends Vue {
    position? : string
    offset? : any[]
    expand? : boolean
    scrollOffset? : number
    duration? : number
}

export interface QPagination extends Vue {
    value : number
    min? : number
    max : number
    color? : string
    textColor? : string
    inputStyle? : any[] | string | any
    inputClass? : any[] | string | any
    size? : string
    disable? : boolean
    input? : boolean
    boundaryLinks? : boolean
    boundaryNumbers? : boolean
    directionLinks? : boolean
    ellipses? : boolean
    maxPages? : number
    set(pageNumber? : number): void
    setOffset(offset? : number): void
}

export interface QParallax extends Vue {
    src? : string
    height? : number
    speed? : number
}

export interface QPopupEdit extends Vue {
    value? : any
    title? : string
    buttons? : boolean
    labelSet? : string
    labelCancel? : string
    color? : string
    validate? : Function
    disable? : boolean
    fit? : boolean
    cover? : boolean
    anchor? : string
    self? : string
    offset? : any[]
    touchPosition? : boolean
    persistent? : boolean
    separateClosePopup? : boolean
    square? : boolean
    maxHeight? : string
    maxWidth? : string
    contentClass? : string
    contentStyle? : any[] | string | any
    set(): void
    cancel(): void
}

export interface QPopupProxy extends Vue {
    target? : boolean | string
    noParentEvent? : boolean
    contextMenu? : boolean
    value? : boolean
    breakpoint? : number | string
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export interface QPullToRefresh extends Vue {
    color? : string
    icon? : string
    noMouse? : boolean
    disable? : boolean
    trigger(): void
    updateScrollTarget(): void
}

export interface QRadio extends Vue {
    value : number | string
    val : number | string
    label? : string
    leftLabel? : boolean
    color? : string
    keepColor? : boolean
    dark? : boolean
    dense? : boolean
    disable? : boolean
    tabindex? : number | string
    set(): void
}

export interface QRange extends Vue {
    value? : {
        min? : number
        max? : number }
    min? : number
    max? : number
    step? : number
    dragRange? : boolean
    dragRangeOnly? : boolean
    color? : string
    label? : boolean
    labelColor? : string
    leftLabelColor? : string
    rightLabelColor? : string
    leftLabelValue? : string | number
    rightLabelValue? : string | number
    labelAlways? : boolean
    markers? : boolean
    snap? : boolean
    dark? : boolean
    dense? : boolean
    disable? : boolean
    readonly? : boolean
    tabindex? : number | string
}

export interface QRating extends Vue {
    size? : string
    value? : number
    max? : number | string
    icon? : string | any[]
    iconSelected? : string | any[]
    color? : string
    noReset? : boolean
    readonly? : boolean
    disable? : boolean
}

export interface QScrollArea extends Vue {
    thumbStyle? : any
    contentStyle? : any
    contentActiveStyle? : any
    delay? : number | string
    horizontal? : boolean
    getScrollTarget(): any
    getScrollPosition(): number
    setScrollPosition(offset : number, duration? : number): void
}

export interface QSelect extends Vue {
    virtualListHorizontal? : boolean
    virtualListSliceSize? : number
    virtualListItemSize? : number
    error? : boolean
    errorMessage? : string
    noErrorIcon? : boolean
    rules? : any[]
    lazyRules? : boolean
    label? : string
    stackLabel? : boolean
    hint? : string
    hideHint? : boolean
    prefix? : string
    suffix? : string
    color? : string
    bgColor? : string
    dark? : boolean
    loading? : boolean
    clearable? : boolean
    clearIcon? : string
    filled? : boolean
    outlined? : boolean
    borderless? : boolean
    standout? : boolean | string
    bottomSlots? : boolean
    hideBottomSpace? : boolean
    counter? : boolean
    rounded? : boolean
    square? : boolean
    dense? : boolean
    itemsAligned? : boolean
    disable? : boolean
    readonly? : boolean
    autofocus? : boolean
    value : number | string | any[]
    multiple? : boolean
    displayValue? : number | string
    displayValueSanitize? : boolean
    options? : any[]
    optionValue? : Function | string
    optionLabel? : Function | string
    optionDisable? : Function | string
    hideSelected? : boolean
    hideDropdownIcon? : boolean
    dropdownIcon? : string
    maxValues? : number | string
    optionsDense? : boolean
    optionsDark? : boolean
    optionsSelectedClass? : string
    optionsCover? : boolean
    optionsSanitize? : boolean
    popupContentClass? : string
    popupContentStyle? : any[] | string | any
    useInput? : boolean
    useChips? : boolean
    fillInput? : boolean
    newValueMode? : string
    mapOptions? : boolean
    emitValue? : boolean
    inputDebounce? : number | string
    transitionShow? : string
    transitionHide? : string
    behavior? : string
    scrollTo(index : string | number, scrollUp? : boolean): void
    resetValidation(): void
    validate(value? : any): void
    focus(): void
    showPopup(): void
    hidePopup(): void
    removeAtIndex(index : number): void
    add(opt : any): void
    toggleOption(opt : any): void
    setOptionIndex(index : number): void
    filter(value : string): void
    updateMenuPosition(): void
    updateInputValue(value? : string, noFilter? : boolean): void
}

export interface QSeparator extends Vue {
    dark? : boolean
    spaced? : boolean
    inset? : boolean | string
    vertical? : boolean
    color? : string
}

export interface QSlideTransition extends Vue {
    appear? : boolean
    duration? : number
}

export interface QSlider extends Vue {
    value? : number
    min? : number
    max? : number
    step? : number
    color? : string
    label? : boolean
    labelColor? : string
    labelValue? : string | number
    labelAlways? : boolean
    markers? : boolean
    snap? : boolean
    dark? : boolean
    dense? : boolean
    disable? : boolean
    readonly? : boolean
    tabindex? : number | string
}

export interface QSpace extends Vue {
}

export interface QSpinner extends Vue {
    size? : string
    color? : string
    thickness? : number
}

export interface QSpinnerAudio extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerBall extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerBars extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerComment extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerCube extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerDots extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerFacebook extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerGears extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerGrid extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerHearts extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerHourglass extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerInfinity extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerIos extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerOval extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerPie extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerPuff extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerRadio extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerRings extends Vue {
    size? : string
    color? : string
}

export interface QSpinnerTail extends Vue {
    size? : string
    color? : string
}

export interface QSplitter extends Vue {
    value? : number
    horizontal? : boolean
    limits? : any[]
    disable? : boolean
    beforeClass? : any[] | string | any
    afterClass? : any[] | string | any
    separatorClass? : any[] | string | any
    separatorStyle? : any[] | string | any
    dark? : boolean
}

export interface QStep extends Vue {
    name : any
    disable? : boolean
    icon? : string
    color? : string
    title : string
    caption? : string
    prefix? : string | number
    doneIcon? : string
    doneColor? : string
    activeIcon? : string
    activeColor? : string
    errorIcon? : string
    errorColor? : string
    headerNav? : boolean
    done? : boolean
    error? : boolean
}

export interface QStepper extends Vue {
    value? : any
    keepAlive? : boolean
    keepAliveInclude? : string | any[]
    keepAliveExclude? : string | any[]
    keepAliveMax? : number
    animated? : boolean
    infinite? : boolean
    swipeable? : boolean
    transitionPrev? : string
    transitionNext? : string
    dark? : boolean
    flat? : boolean
    bordered? : boolean
    vertical? : boolean
    alternativeLabels? : boolean
    headerNav? : boolean
    contracted? : boolean
    inactiveIcon? : string
    inactiveColor? : string
    doneIcon? : string
    doneColor? : string
    activeIcon? : string
    activeColor? : string
    errorIcon? : string
    errorColor? : string
    next(): void
    previous(): void
    goTo(panelName : string | number): void
}

export interface QStepperNavigation extends Vue {
}

export interface QTabPanel extends Vue {
    name : any
    disable? : boolean
}

export interface QTabPanels extends Vue {
    value? : any
    keepAlive? : boolean
    keepAliveInclude? : string | any[]
    keepAliveExclude? : string | any[]
    keepAliveMax? : number
    animated? : boolean
    infinite? : boolean
    swipeable? : boolean
    transitionPrev? : string
    transitionNext? : string
    next(): void
    previous(): void
    goTo(panelName : string | number): void
}

export interface QMarkupTable extends Vue {
    dense? : boolean
    dark? : boolean
    flat? : boolean
    bordered? : boolean
    square? : boolean
    separator? : string
    wrapCells? : boolean
}

export interface QTable extends Vue {
    fullscreen? : boolean
    data? : any[]
    rowKey? : string
    color? : string
    grid? : boolean
    dense? : boolean
    columns? : any[]
    visibleColumns? : any[]
    loading? : boolean
    title? : string
    hideHeader? : boolean
    hideBottom? : boolean
    dark? : boolean
    flat? : boolean
    bordered? : boolean
    square? : boolean
    separator? : string
    wrapCells? : boolean
    binaryStateSort? : boolean
    noDataLabel? : string
    noResultsLabel? : string
    loadingLabel? : string
    selectedRowsLabel? : Function
    rowsPerPageLabel? : string
    paginationLabel? : Function
    tableStyle? : string | any[] | any
    tableClass? : string | any[] | any
    tableHeaderStyle? : string | any[] | any
    tableHeaderClass? : string | any[] | any
    cardStyle? : string | any[] | any
    cardClass? : string | any[] | any
    filter? : string | any
    filterMethod? : Function
    pagination? : {
        sortBy? : string
        descending? : boolean
        page? : number
        rowsPerPage? : number
        rowsNumber? : number }
    rowsPerPageOptions? : any[]
    selection? : string
    selected? : any[]
    sortMethod? : Function
    toggleFullscreen(): void
    setFullscreen(): void
    exitFullscreen(): void
    requestServerInteraction(props? : {
        pagination? : {
        sortBy? : string
        descending? : boolean
        page? : number
        rowsPerPage? : number }
        filter? : Function }): void
    setPagination(pagination : {
        sortBy? : string
        descending? : boolean
        page? : number
        rowsPerPage? : number }, forceServerRequest? : boolean): void
    prevPage(): void
    nextPage(): void
    isRowSelected(key : any): void
    clearSelection(): void
    sort(col : string | any): void
}

export interface QTd extends Vue {
    props? : any
    autoWidth? : boolean
}

export interface QTh extends Vue {
    props? : any
    autoWidth? : boolean
}

export interface QTr extends Vue {
    props? : any
}

export interface QRouteTab extends Vue {
    to : string | any
    exact? : boolean
    append? : boolean
    replace? : boolean
    activeClass? : string
    exactActiveClass? : string
    disable? : boolean
    ripple? : boolean | any
    icon? : string
    label? : number | string
    alert? : boolean | string
    name? : number | string
    noCaps? : boolean
    tabindex? : number | string
}

export interface QTab extends Vue {
    ripple? : boolean | any
    icon? : string
    label? : number | string
    alert? : boolean | string
    name? : number | string
    noCaps? : boolean
    tabindex? : number | string
    disable? : boolean
}

export interface QTabs extends Vue {
    value? : number | string
    vertical? : boolean
    align? : string
    breakpoint? : number | string
    activeColor? : string
    activeBgColor? : string
    indicatorColor? : string
    leftIcon? : string
    rightIcon? : string
    stretch? : boolean
    shrink? : boolean
    switchIndicator? : boolean
    narrowIndicator? : boolean
    inlineLabel? : boolean
    noCaps? : boolean
    dense? : boolean
}

export interface QTimeline extends Vue {
    color? : string
    side? : string
    layout? : string
    dark? : boolean
}

export interface QTimelineEntry extends Vue {
    heading? : boolean
    tag? : string
    side? : string
    icon? : string
    avatar? : string
    color? : string
    title? : string
    subtitle? : string
    body? : string
}

export interface QToggle extends Vue {
    value : any | any[]
    val? : any
    trueValue? : any
    falseValue? : any
    label? : string
    leftLabel? : boolean
    color? : string
    keepColor? : boolean
    dark? : boolean
    dense? : boolean
    disable? : boolean
    tabindex? : number | string
    icon? : string
    checkedIcon? : string
    uncheckedIcon? : string
    toggle(): void
}

export interface QToolbar extends Vue {
    inset? : boolean
}

export interface QToolbarTitle extends Vue {
    shrink? : boolean
}

export interface QTooltip extends Vue {
    contentClass? : any[] | string | any
    contentStyle? : any[] | string | any
    value? : boolean
    maxHeight? : string
    maxWidth? : string
    transitionShow? : string
    transitionHide? : string
    anchor? : string
    self? : string
    offset? : any[]
    target? : boolean | string
    delay? : number
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
    updatePosition(): void
}

export interface QTree extends Vue {
    nodes : any[]
    nodeKey : string
    labelKey? : string
    color? : string
    controlColor? : string
    textColor? : string
    selectedColor? : string
    dark? : boolean
    icon? : string
    tickStrategy? : string
    ticked? : any[]
    expanded? : any[]
    selected? : any
    defaultExpandAll? : boolean
    accordion? : boolean
    filter? : string
    filterMethod? : Function
    duration? : number
    noNodesLabel? : string
    noResultsLabel? : string
    getNodeByKey(key : any): any
    getTickedNodes(): any[]
    getExpandedNodes(): any[]
    isExpanded(key : any): boolean
    expandAll(): void
    collapseAll(): void
    setExpanded(key : any, state : boolean): void
    isTicked(key : any): boolean
    setTicked(keys : any[], state : boolean): void
}

export interface QUploader extends Vue {
    label? : string
    color? : string
    textColor? : string
    dark? : boolean
    square? : boolean
    flat? : boolean
    bordered? : boolean
    multiple? : boolean
    accept? : string
    maxFileSize? : number
    maxTotalSize? : number
    filter? : Function
    noThumbnails? : boolean
    autoUpload? : boolean
    hideUploadBtn? : boolean
    disable? : boolean
    readonly? : boolean
    factory? : Function
    url? : string | Function
    method? : string | Function
    fieldName? : string | Function
    headers? : any[] | Function
    formFields? : any[] | Function
    withCredentials? : boolean | Function
    sendRaw? : boolean | Function
    batch? : boolean | Function
    abort(): void
    upload(): void
    pickFiles(): void
    addFiles(files : any[]): void
    reset(): void
    removeUploadedFiles(): void
    removeQueuedFiles(): void
    removeFile(file : any): void
}

export interface QUploaderAddTrigger extends Vue {
}

export interface QVideo extends Vue {
    src : string
}

export interface QVirtualList extends Vue {
    virtualListHorizontal? : boolean
    virtualListSliceSize? : number
    virtualListItemSize? : number
    component? : string
    items? : any[]
    itemsSize? : string | number
    itemsFn? : Function
    scrollTarget? : Element | string
    scrollTo(index : string | number, scrollUp? : boolean): void
}

export interface DialogChainObject {
    onOk (callbackFn : Function): DialogChainObject
    onCancel (callbackFn : Function): DialogChainObject
    onDismiss (callbackFn : Function): DialogChainObject
    hide (): DialogChainObject
}

export interface QDialogOptions {
    class? : string | any[] | any
    style? : string | any[] | any
    title? : string
    message? : string
    html? : boolean
    position? : string
    prompt? : {
        model? : any[] | string
        type? : string }
    options? : {
        type? : string
        model? : any[]
        items? : any[] }
    ok? : string | any | boolean
    cancel? : string | any | boolean
    stackButtons? : boolean
    color? : string
    dark? : boolean
    persistent? : boolean
    noEscDismiss? : boolean
    noBackdropDismiss? : boolean
    noRouteDismiss? : boolean
    seamless? : boolean
    maximized? : boolean
    fullWidth? : boolean
    fullHeight? : boolean
    transitionShow? : string
    transitionHide? : string
    component? : any
    parent? : any
    root? : any
}

import { QVueGlobals } from "./globals";
declare module "./globals" {
export interface QVueGlobals {
    addressbarColor: AddressbarColor
    fullscreen: AppFullscreen
    appVisible : boolean
    bottomSheet (opts : {
        class? : string | any[] | any
        style? : string | any[] | any
        title? : string
        message? : string
        actions? : any[]
        grid? : boolean
        dark? : boolean
        seamless? : boolean
        persistent? : boolean }): DialogChainObject
    cookies: Cookies
    dialog (opts : QDialogOptions): DialogChainObject
    loading: Loading
    loadingBar: LoadingBar
    localStorage: LocalStorage
    notify (opts : {
        color? : string
        textColor? : string
        message : string
        html? : boolean
        icon? : string
        avatar? : string
        position? : string
        classes? : string
        timeout? : number
        actions? : any[]
        onDismiss? : Function
        closeBtn? : string
        multiLine? : boolean
        ignoreDefaults? : boolean } | string): Function
    platform: Platform
    screen: Screen
    sessionStorage: SessionStorage
}
}

declare module 'vue/types/vue' {
    interface Vue {
        $q: QVueGlobals
    }
}
export interface QuasarPluginOptions {
    lang: any,
    config: any,
    iconSet: any,
    components: {
        QAjaxBar?: VueConstructor<QAjaxBar>
        QAvatar?: VueConstructor<QAvatar>
        QBadge?: VueConstructor<QBadge>
        QBanner?: VueConstructor<QBanner>
        QBar?: VueConstructor<QBar>
        QBreadcrumbs?: VueConstructor<QBreadcrumbs>
        QBreadcrumbsEl?: VueConstructor<QBreadcrumbsEl>
        QBtn?: VueConstructor<QBtn>
        QBtnDropdown?: VueConstructor<QBtnDropdown>
        QBtnGroup?: VueConstructor<QBtnGroup>
        QBtnToggle?: VueConstructor<QBtnToggle>
        QCard?: VueConstructor<QCard>
        QCardActions?: VueConstructor<QCardActions>
        QCardSection?: VueConstructor<QCardSection>
        QCarousel?: VueConstructor<QCarousel>
        QCarouselControl?: VueConstructor<QCarouselControl>
        QCarouselSlide?: VueConstructor<QCarouselSlide>
        QChatMessage?: VueConstructor<QChatMessage>
        QCheckbox?: VueConstructor<QCheckbox>
        QChip?: VueConstructor<QChip>
        QCircularProgress?: VueConstructor<QCircularProgress>
        QColor?: VueConstructor<QColor>
        QDate?: VueConstructor<QDate>
        QTime?: VueConstructor<QTime>
        QDialog?: VueConstructor<QDialog>
        QEditor?: VueConstructor<QEditor>
        QFab?: VueConstructor<QFab>
        QFabAction?: VueConstructor<QFabAction>
        QField?: VueConstructor<QField>
        QForm?: VueConstructor<QForm>
        QIcon?: VueConstructor<QIcon>
        QImg?: VueConstructor<QImg>
        QInfiniteScroll?: VueConstructor<QInfiniteScroll>
        QInnerLoading?: VueConstructor<QInnerLoading>
        QInput?: VueConstructor<QInput>
        QKnob?: VueConstructor<QKnob>
        QDrawer?: VueConstructor<QDrawer>
        QFooter?: VueConstructor<QFooter>
        QHeader?: VueConstructor<QHeader>
        QLayout?: VueConstructor<QLayout>
        QPage?: VueConstructor<QPage>
        QPageContainer?: VueConstructor<QPageContainer>
        QPageSticky?: VueConstructor<QPageSticky>
        QLinearProgress?: VueConstructor<QLinearProgress>
        QExpansionItem?: VueConstructor<QExpansionItem>
        QItem?: VueConstructor<QItem>
        QItemLabel?: VueConstructor<QItemLabel>
        QItemSection?: VueConstructor<QItemSection>
        QList?: VueConstructor<QList>
        QSlideItem?: VueConstructor<QSlideItem>
        QMenu?: VueConstructor<QMenu>
        QNoSsr?: VueConstructor<QNoSsr>
        QResizeObserver?: VueConstructor<QResizeObserver>
        QScrollObserver?: VueConstructor<QScrollObserver>
        QOptionGroup?: VueConstructor<QOptionGroup>
        QPageScroller?: VueConstructor<QPageScroller>
        QPagination?: VueConstructor<QPagination>
        QParallax?: VueConstructor<QParallax>
        QPopupEdit?: VueConstructor<QPopupEdit>
        QPopupProxy?: VueConstructor<QPopupProxy>
        QPullToRefresh?: VueConstructor<QPullToRefresh>
        QRadio?: VueConstructor<QRadio>
        QRange?: VueConstructor<QRange>
        QRating?: VueConstructor<QRating>
        QScrollArea?: VueConstructor<QScrollArea>
        QSelect?: VueConstructor<QSelect>
        QSeparator?: VueConstructor<QSeparator>
        QSlideTransition?: VueConstructor<QSlideTransition>
        QSlider?: VueConstructor<QSlider>
        QSpace?: VueConstructor<QSpace>
        QSpinner?: VueConstructor<QSpinner>
        QSpinnerAudio?: VueConstructor<QSpinnerAudio>
        QSpinnerBall?: VueConstructor<QSpinnerBall>
        QSpinnerBars?: VueConstructor<QSpinnerBars>
        QSpinnerComment?: VueConstructor<QSpinnerComment>
        QSpinnerCube?: VueConstructor<QSpinnerCube>
        QSpinnerDots?: VueConstructor<QSpinnerDots>
        QSpinnerFacebook?: VueConstructor<QSpinnerFacebook>
        QSpinnerGears?: VueConstructor<QSpinnerGears>
        QSpinnerGrid?: VueConstructor<QSpinnerGrid>
        QSpinnerHearts?: VueConstructor<QSpinnerHearts>
        QSpinnerHourglass?: VueConstructor<QSpinnerHourglass>
        QSpinnerInfinity?: VueConstructor<QSpinnerInfinity>
        QSpinnerIos?: VueConstructor<QSpinnerIos>
        QSpinnerOval?: VueConstructor<QSpinnerOval>
        QSpinnerPie?: VueConstructor<QSpinnerPie>
        QSpinnerPuff?: VueConstructor<QSpinnerPuff>
        QSpinnerRadio?: VueConstructor<QSpinnerRadio>
        QSpinnerRings?: VueConstructor<QSpinnerRings>
        QSpinnerTail?: VueConstructor<QSpinnerTail>
        QSplitter?: VueConstructor<QSplitter>
        QStep?: VueConstructor<QStep>
        QStepper?: VueConstructor<QStepper>
        QStepperNavigation?: VueConstructor<QStepperNavigation>
        QTabPanel?: VueConstructor<QTabPanel>
        QTabPanels?: VueConstructor<QTabPanels>
        QMarkupTable?: VueConstructor<QMarkupTable>
        QTable?: VueConstructor<QTable>
        QTd?: VueConstructor<QTd>
        QTh?: VueConstructor<QTh>
        QTr?: VueConstructor<QTr>
        QRouteTab?: VueConstructor<QRouteTab>
        QTab?: VueConstructor<QTab>
        QTabs?: VueConstructor<QTabs>
        QTimeline?: VueConstructor<QTimeline>
        QTimelineEntry?: VueConstructor<QTimelineEntry>
        QToggle?: VueConstructor<QToggle>
        QToolbar?: VueConstructor<QToolbar>
        QToolbarTitle?: VueConstructor<QToolbarTitle>
        QTooltip?: VueConstructor<QTooltip>
        QTree?: VueConstructor<QTree>
        QUploader?: VueConstructor<QUploader>
        QUploaderAddTrigger?: VueConstructor<QUploaderAddTrigger>
        QVideo?: VueConstructor<QVideo>
        QVirtualList?: VueConstructor<QVirtualList>
    },
    directives: {
        ClosePopup?: ClosePopup
        GoBack?: GoBack
        Ripple?: Ripple
        Scroll?: Scroll
        ScrollFire?: ScrollFire
        TouchHold?: TouchHold
        TouchPan?: TouchPan
        TouchRepeat?: TouchRepeat
        TouchSwipe?: TouchSwipe
    },
    plugins: {
        AddressbarColor?: AddressbarColor
        AppFullscreen?: AppFullscreen
        AppVisibility?: AppVisibility
        BottomSheet?: BottomSheet
        Cookies?: Cookies
        Dialog?: Dialog
        Loading?: Loading
        LoadingBar?: LoadingBar
        LocalStorage?: LocalStorage
        Meta?: Meta
        Notify?: Notify
        Platform?: Platform
        Screen?: Screen
        SessionStorage?: SessionStorage
    }
}

export as namespace quasar
export * from './utils'
export * from './globals'
export * from './boot'
export const AddressbarColor: AddressbarColor
export const AppFullscreen: AppFullscreen
export const AppVisibility: AppVisibility
export const BottomSheet: BottomSheet
export const Cookies: Cookies
export const Dialog: Dialog
export const Loading: Loading
export const LoadingBar: LoadingBar
export const LocalStorage: LocalStorage
export const Meta: Meta
export const Notify: Notify
export const Platform: Platform
export const Screen: Screen
export const SessionStorage: SessionStorage
export const ClosePopup: ClosePopup
export const GoBack: GoBack
export const Ripple: Ripple
export const Scroll: Scroll
export const ScrollFire: ScrollFire
export const TouchHold: TouchHold
export const TouchPan: TouchPan
export const TouchRepeat: TouchRepeat
export const TouchSwipe: TouchSwipe
export const QAjaxBar: VueConstructor<QAjaxBar>
export const QAvatar: VueConstructor<QAvatar>
export const QBadge: VueConstructor<QBadge>
export const QBanner: VueConstructor<QBanner>
export const QBar: VueConstructor<QBar>
export const QBreadcrumbs: VueConstructor<QBreadcrumbs>
export const QBreadcrumbsEl: VueConstructor<QBreadcrumbsEl>
export const QBtn: VueConstructor<QBtn>
export const QBtnDropdown: VueConstructor<QBtnDropdown>
export const QBtnGroup: VueConstructor<QBtnGroup>
export const QBtnToggle: VueConstructor<QBtnToggle>
export const QCard: VueConstructor<QCard>
export const QCardActions: VueConstructor<QCardActions>
export const QCardSection: VueConstructor<QCardSection>
export const QCarousel: VueConstructor<QCarousel>
export const QCarouselControl: VueConstructor<QCarouselControl>
export const QCarouselSlide: VueConstructor<QCarouselSlide>
export const QChatMessage: VueConstructor<QChatMessage>
export const QCheckbox: VueConstructor<QCheckbox>
export const QChip: VueConstructor<QChip>
export const QCircularProgress: VueConstructor<QCircularProgress>
export const QColor: VueConstructor<QColor>
export const QDate: VueConstructor<QDate>
export const QTime: VueConstructor<QTime>
export const QDialog: VueConstructor<QDialog>
export const QEditor: VueConstructor<QEditor>
export const QFab: VueConstructor<QFab>
export const QFabAction: VueConstructor<QFabAction>
export const QField: VueConstructor<QField>
export const QForm: VueConstructor<QForm>
export const QIcon: VueConstructor<QIcon>
export const QImg: VueConstructor<QImg>
export const QInfiniteScroll: VueConstructor<QInfiniteScroll>
export const QInnerLoading: VueConstructor<QInnerLoading>
export const QInput: VueConstructor<QInput>
export const QKnob: VueConstructor<QKnob>
export const QDrawer: VueConstructor<QDrawer>
export const QFooter: VueConstructor<QFooter>
export const QHeader: VueConstructor<QHeader>
export const QLayout: VueConstructor<QLayout>
export const QPage: VueConstructor<QPage>
export const QPageContainer: VueConstructor<QPageContainer>
export const QPageSticky: VueConstructor<QPageSticky>
export const QLinearProgress: VueConstructor<QLinearProgress>
export const QExpansionItem: VueConstructor<QExpansionItem>
export const QItem: VueConstructor<QItem>
export const QItemLabel: VueConstructor<QItemLabel>
export const QItemSection: VueConstructor<QItemSection>
export const QList: VueConstructor<QList>
export const QSlideItem: VueConstructor<QSlideItem>
export const QMenu: VueConstructor<QMenu>
export const QNoSsr: VueConstructor<QNoSsr>
export const QResizeObserver: VueConstructor<QResizeObserver>
export const QScrollObserver: VueConstructor<QScrollObserver>
export const QOptionGroup: VueConstructor<QOptionGroup>
export const QPageScroller: VueConstructor<QPageScroller>
export const QPagination: VueConstructor<QPagination>
export const QParallax: VueConstructor<QParallax>
export const QPopupEdit: VueConstructor<QPopupEdit>
export const QPopupProxy: VueConstructor<QPopupProxy>
export const QPullToRefresh: VueConstructor<QPullToRefresh>
export const QRadio: VueConstructor<QRadio>
export const QRange: VueConstructor<QRange>
export const QRating: VueConstructor<QRating>
export const QScrollArea: VueConstructor<QScrollArea>
export const QSelect: VueConstructor<QSelect>
export const QSeparator: VueConstructor<QSeparator>
export const QSlideTransition: VueConstructor<QSlideTransition>
export const QSlider: VueConstructor<QSlider>
export const QSpace: VueConstructor<QSpace>
export const QSpinner: VueConstructor<QSpinner>
export const QSpinnerAudio: VueConstructor<QSpinnerAudio>
export const QSpinnerBall: VueConstructor<QSpinnerBall>
export const QSpinnerBars: VueConstructor<QSpinnerBars>
export const QSpinnerComment: VueConstructor<QSpinnerComment>
export const QSpinnerCube: VueConstructor<QSpinnerCube>
export const QSpinnerDots: VueConstructor<QSpinnerDots>
export const QSpinnerFacebook: VueConstructor<QSpinnerFacebook>
export const QSpinnerGears: VueConstructor<QSpinnerGears>
export const QSpinnerGrid: VueConstructor<QSpinnerGrid>
export const QSpinnerHearts: VueConstructor<QSpinnerHearts>
export const QSpinnerHourglass: VueConstructor<QSpinnerHourglass>
export const QSpinnerInfinity: VueConstructor<QSpinnerInfinity>
export const QSpinnerIos: VueConstructor<QSpinnerIos>
export const QSpinnerOval: VueConstructor<QSpinnerOval>
export const QSpinnerPie: VueConstructor<QSpinnerPie>
export const QSpinnerPuff: VueConstructor<QSpinnerPuff>
export const QSpinnerRadio: VueConstructor<QSpinnerRadio>
export const QSpinnerRings: VueConstructor<QSpinnerRings>
export const QSpinnerTail: VueConstructor<QSpinnerTail>
export const QSplitter: VueConstructor<QSplitter>
export const QStep: VueConstructor<QStep>
export const QStepper: VueConstructor<QStepper>
export const QStepperNavigation: VueConstructor<QStepperNavigation>
export const QTabPanel: VueConstructor<QTabPanel>
export const QTabPanels: VueConstructor<QTabPanels>
export const QMarkupTable: VueConstructor<QMarkupTable>
export const QTable: VueConstructor<QTable>
export const QTd: VueConstructor<QTd>
export const QTh: VueConstructor<QTh>
export const QTr: VueConstructor<QTr>
export const QRouteTab: VueConstructor<QRouteTab>
export const QTab: VueConstructor<QTab>
export const QTabs: VueConstructor<QTabs>
export const QTimeline: VueConstructor<QTimeline>
export const QTimelineEntry: VueConstructor<QTimelineEntry>
export const QToggle: VueConstructor<QToggle>
export const QToolbar: VueConstructor<QToolbar>
export const QToolbarTitle: VueConstructor<QToolbarTitle>
export const QTooltip: VueConstructor<QTooltip>
export const QTree: VueConstructor<QTree>
export const QUploader: VueConstructor<QUploader>
export const QUploaderAddTrigger: VueConstructor<QUploaderAddTrigger>
export const QVideo: VueConstructor<QVideo>
export const QVirtualList: VueConstructor<QVirtualList>
export const Quasar: PluginObject<Partial<QuasarPluginOptions>>

import './vue'
