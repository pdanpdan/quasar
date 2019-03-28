import './vue'

export as namespace quasar
export * from './utils'

// Quasar Type Definitions
import Vue, { VueConstructor } from 'vue'

export const AddressbarColor: AddressbarColor
export interface AddressbarColor {
    set(hexColor : String): void
}

export const AppFullscreen: AppFullscreen
export interface AppFullscreen {
    isCapable? : Boolean
    isActive? : Boolean
    request(target? : String): void
    exit(): void
    toggle(target? : String): void
}

export const AppVisibility: AppVisibility
export interface AppVisibility {
    appVisible? : Boolean
}

export const BottomSheet: BottomSheet
export interface BottomSheet {
    create(opts : {
        className? : String | [] | any
        style? : String | [] | any
        title? : String
        message? : String
        actions? : []
        grid? : Boolean
        width? : String
        color? : String
        seamless? : Boolean
        persistent? : Boolean }): {
        onOk? : Function
        onCancel? : Function
        onDismiss? : Function
        hide? : Function }
}

export const CloseDialog: CloseDialog
export interface CloseDialog {
}

export const CloseMenu: CloseMenu
export interface CloseMenu {
}

export const ClosePopup: ClosePopup
export interface ClosePopup {
}

export const Cookies: Cookies
export interface Cookies {
    get(name : String): String
    getAll(): any
    set(name : String, value : String, options? : {
        expires? : Number | String
        path? : String
        domain? : String
        httpOnly? : Boolean
        secure? : Boolean }): void
    has(name : String): Boolean
    remove(name : String, options? : {
        path? : String
        domain? : String
        httpOnly? : Boolean
        secure? : Boolean }): void
    parseSSR(ssrContext : any): any
}

export const Dialog: Dialog
export interface Dialog {
    create(opts : {
        className? : String | [] | any
        style? : String | [] | any
        title? : String
        message? : String
        position? : String
        options? : {
        prompt? : {
        model? : [] | String
        type? : String }
        options? : {
        type? : String
        model? : []
        items? : [] } }
        ok? : String | any | Boolean
        cancel? : String | any | Boolean
        width? : String
        stackButtons? : Boolean
        color? : String
        persistent? : Boolean
        noEscDismiss? : Boolean
        noBackdropDismiss? : Boolean
        noRouteDismiss? : Boolean
        seamless? : Boolean
        maximized? : Boolean
        fullWidth? : Boolean
        fullHeight? : Boolean
        transitionShow? : String
        transitionHide? : String }): {
        onOk? : Function
        onCancel? : Function
        onDismiss? : Function
        hide? : Function }
}

export const GoBack: GoBack
export interface GoBack {
}

export const Loading: Loading
export interface Loading {
    isActive? : Boolean
    show(opts? : {
        delay? : Number
        message? : String
        sanitize? : Boolean
        spinnerSize? : Number
        spinnerColor? : String
        messageColor? : String
        backgroundColor? : String
        spinner? : Vue
        customClass? : String }): void
    hide(): void
    setDefaults(opts : {
        delay? : Number
        message? : String
        spinnerSize? : Number
        spinnerColor? : String
        messageColor? : String
        backgroundColor? : String
        spinner? : Vue
        customClass? : String }): void
}

export const LoadingBar: LoadingBar
export interface LoadingBar {
    start(speed? : Number): void
    stop(): void
    increment(amount? : Number): void
}

export const LocalStorage: LocalStorage
export interface LocalStorage {
    has(key : String): Boolean
    getLength(): Number
    getItem(key : String): any
    getIndex(index : Number): any
    getAll(): any
    set(key : String, value : String): void
    remove(key : String): void
    clear(): void
    isEmpty(): Boolean
}

export const Meta: Meta
export interface Meta {
}

export const Notify: Notify
export interface Notify {
    create(opts : {
        color? : String
        textColor? : String
        message : String
        icon? : String
        avatar? : String
        position? : String
        classes? : String
        timeout? : Number
        actions? : []
        onDismiss? : Function
        closeBtn? : String
        multiLine? : Boolean }): Function
    setDefaults(opts : {
        color? : String
        textColor? : String
        message : String
        icon? : String
        avatar? : String
        position? : String
        classes? : String
        timeout? : Number
        actions? : []
        onDismiss? : Function
        closeBtn? : String
        multiLine? : Boolean }): void
}

export const Platform: Platform
export interface Platform {
    is? : any
    has? : {
        touch? : Boolean
        webStorage? : Boolean }
    within? : {
        iframe? : Boolean }
}

export const QAjaxBar: VueConstructor<QAjaxBar>
export interface QAjaxBar extends Vue {
    position? : String
    size? : String
    color? : String
    skipHijack? : Boolean
    reverse? : Boolean
    start(speed? : Number): void
    increment(amount? : Number): void
    stop(): void
}

export const QAvatar: VueConstructor<QAvatar>
export interface QAvatar extends Vue {
    size? : String
    fontSize? : String
    color? : String
    textColor? : String
    icon? : String
    square? : Boolean
    rounded? : Boolean
}

export const QBadge: VueConstructor<QBadge>
export interface QBadge extends Vue {
    color? : String
    textColor? : String
    floating? : Boolean
    transparent? : Boolean
    label? : String | Number
    align? : String
}

export const QBanner: VueConstructor<QBanner>
export interface QBanner extends Vue {
    inlineActions? : Boolean
    dense? : Boolean
    rounded? : Boolean
}

export const QBar: VueConstructor<QBar>
export interface QBar extends Vue {
    dense? : Boolean
    dark? : Boolean
}

export const QBreadcrumbs: VueConstructor<QBreadcrumbs>
export interface QBreadcrumbs extends Vue {
    separator? : String
    activeColor? : String
    gutter? : String
    separatorColor? : String
    align? : String
}

export const QBreadcrumbsEl: VueConstructor<QBreadcrumbsEl>
export interface QBreadcrumbsEl extends Vue {
    to? : String | any
    exact? : Boolean
    append? : Boolean
    replace? : Boolean
    activeClass? : String
    exactActiveClass? : String
    disable? : Boolean
    label? : String
    icon? : String
}

export const QBtn: VueConstructor<QBtn>
export interface QBtn extends Vue {
    ripple? : Boolean | any
    type? : String
    to? : String | any
    replace? : Boolean
    label? : String | Number
    icon? : String
    iconRight? : String
    round? : Boolean
    outline? : Boolean
    flat? : Boolean
    unelevated? : Boolean
    rounded? : Boolean
    push? : Boolean
    glossy? : Boolean
    size? : String
    fab? : Boolean
    fabMini? : Boolean
    color? : String
    textColor? : String
    noCaps? : Boolean
    noWrap? : Boolean
    dense? : Boolean
    tabindex? : Number | String
    align? : String
    stack? : Boolean
    stretch? : Boolean
    loading? : Boolean
    disable? : Boolean
    percentage? : Number
    darkPercentage? : Boolean
}

export const QBtnDropdown: VueConstructor<QBtnDropdown>
export interface QBtnDropdown extends Vue {
    value? : Boolean
    ripple? : Boolean | any
    type? : String
    to? : String | any
    replace? : Boolean
    label? : String | Number
    icon? : String
    iconRight? : String
    round? : Boolean
    outline? : Boolean
    flat? : Boolean
    unelevated? : Boolean
    rounded? : Boolean
    push? : Boolean
    glossy? : Boolean
    size? : String
    fab? : Boolean
    fabMini? : Boolean
    color? : String
    textColor? : String
    noCaps? : Boolean
    noWrap? : Boolean
    dense? : Boolean
    tabindex? : Number | String
    align? : String
    stack? : Boolean
    stretch? : Boolean
    loading? : Boolean
    disable? : Boolean
    split? : Boolean
    contentStyle? : [] | String | any
    contentClass? : [] | String | any
    cover? : Boolean
    persistent? : Boolean
    autoClose? : Boolean
    menuAnchor? : String
    menuSelf? : String
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export const QBtnGroup: VueConstructor<QBtnGroup>
export interface QBtnGroup extends Vue {
    spread? : Boolean
    outline? : Boolean
    flat? : Boolean
    unelevated? : Boolean
    rounded? : Boolean
    push? : Boolean
    stretch? : Boolean
    glossy? : Boolean
}

export const QBtnToggle: VueConstructor<QBtnToggle>
export interface QBtnToggle extends Vue {
    ripple? : Boolean | any
    value? : any
    options? : []
    color? : String
    textColor? : String
    toggleColor? : String
    toggleTextColor? : String
    spread? : Boolean
    outline? : Boolean
    flat? : Boolean
    unelevated? : Boolean
    rounded? : Boolean
    push? : Boolean
    glossy? : Boolean
    size? : String
    noCaps? : Boolean
    noWrap? : Boolean
    dense? : Boolean
    readonly? : Boolean
    disable? : Boolean
    stack? : Boolean
    stretch? : Boolean
}

export const QCard: VueConstructor<QCard>
export interface QCard extends Vue {
    dark? : Boolean
    square? : Boolean
    flat? : Boolean
    bordered? : Boolean
}

export const QCardActions: VueConstructor<QCardActions>
export interface QCardActions extends Vue {
    align? : String
    vertical? : Boolean
}

export const QCardSection: VueConstructor<QCardSection>
export interface QCardSection extends Vue {
}

export const QCarousel: VueConstructor<QCarousel>
export interface QCarousel extends Vue {
    fullscreen? : Boolean
    value? : any
    animated? : Boolean
    infinite? : Boolean
    swipeable? : Boolean
    transitionPrev? : String
    transitionNext? : String
    height? : String
    padding? : Boolean
    controlColor? : String
    autoplay? : Number | Boolean
    arrows? : Boolean
    prevIcon? : String
    nextIcon? : String
    navigation? : Boolean
    navigationIcon? : String
    thumbnails? : Boolean
    toggleFullscreen(): void
    setFullscreen(): void
    exitFullscreen(): void
    next(): void
    previous(): void
    goTo(panelName : String | Number): void
}

export const QCarouselControl: VueConstructor<QCarouselControl>
export interface QCarouselControl extends Vue {
    position? : String
    offset? : []
}

export const QCarouselSlide: VueConstructor<QCarouselSlide>
export interface QCarouselSlide extends Vue {
    name : any
    disable? : Boolean
    imgSrc? : String
}

export const QChatMessage: VueConstructor<QChatMessage>
export interface QChatMessage extends Vue {
    sent? : Boolean
    label? : String
    bgColor? : String
    textColor? : String
    name? : String
    avatar? : String
    text? : String
    stamp? : String
    size? : String
    labelSanitize? : Boolean
    nameSanitize? : Boolean
    textSanitize? : Boolean
    stampSanitize? : Boolean
}

export const QCheckbox: VueConstructor<QCheckbox>
export interface QCheckbox extends Vue {
    value? : any | []
    val? : any
    trueValue? : any
    falseValue? : any
    label? : String
    leftLabel? : Boolean
    color? : String
    keepColor? : Boolean
    dark? : Boolean
    dense? : Boolean
    disable? : Boolean
    tabindex? : Number | String
    indeterminateValue? : any
    toggleIndeterminate? : Boolean
    toggle(): void
}

export const QChip: VueConstructor<QChip>
export interface QChip extends Vue {
    ripple? : Boolean | any
    dense? : Boolean
    icon? : String
    iconRight? : String
    label? : String | Number
    color? : String
    textColor? : String
    value? : Boolean
    selected? : Boolean
    square? : Boolean
    outline? : Boolean
    clickable? : Boolean
    removable? : Boolean
    tabindex? : Number | String
    disable? : Boolean
}

export const QCircularProgress: VueConstructor<QCircularProgress>
export interface QCircularProgress extends Vue {
    value? : Number
    min? : Number
    max? : Number
    color? : String
    centerColor? : String
    trackColor? : String
    size? : String
    fontSize? : String
    thickness? : Number
    angle? : Number
    indeterminate? : Boolean
    showValue? : Boolean
    reverse? : Boolean
}

export const QColor: VueConstructor<QColor>
export interface QColor extends Vue {
    value? : String
    defaultValue? : String
    formatModel? : String
    disable? : Boolean
    readonly? : Boolean
    dark? : Boolean
}

export const QDate: VueConstructor<QDate>
export interface QDate extends Vue {
    value? : String
    landscape? : Boolean
    color? : String
    textColor? : String
    dark? : Boolean
    readonly? : Boolean
    disable? : Boolean
    calendar? : String
    defaultYearMonth? : String
    defaultView? : String
    events? : [] | Function
    eventColor? : String | Function
    options? : [] | Function
    firstDayOfWeek? : String | Number
    todayBtn? : Boolean
    minimal? : Boolean
}

export const QDialog: VueConstructor<QDialog>
export interface QDialog extends Vue {
    contentClass? : [] | String | any
    contentStyle? : [] | String | any
    value? : Boolean
    persistent? : Boolean
    noEscDismiss? : Boolean
    noBackdropDismiss? : Boolean
    noRouteDismiss? : Boolean
    autoClose? : Boolean
    seamless? : Boolean
    maximized? : Boolean
    fullWidth? : Boolean
    fullHeight? : Boolean
    position? : String
    transitionShow? : String
    transitionHide? : String
    noRefocus? : Boolean
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export const QDrawer: VueConstructor<QDrawer>
export interface QDrawer extends Vue {
    value? : Boolean
    side? : String
    overlay? : Boolean
    width? : Number
    mini? : Boolean
    miniWidth? : Number
    breakpoint? : Number
    behavior? : String
    bordered? : Boolean
    elevated? : Boolean
    persistent? : Boolean
    showIfAbove? : Boolean
    contentClass? : [] | String | any
    contentStyle? : [] | String | any
    noSwipeOpen? : Boolean
    noSwipeClose? : Boolean
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export const QEditor: VueConstructor<QEditor>
export interface QEditor extends Vue {
    fullscreen? : Boolean
    value? : String
    readonly? : Boolean
    disable? : Boolean
    minHeight? : String
    maxHeight? : String
    height? : String
    definitions? : {
        label? : String
        tip? : String
        htmlTip? : String
        icon? : String
        key? : Number
        handler? : Function
        cmd? : String
        param? : String | Function
        disable? : Boolean | Function
        type? : String }
    fonts? : any
    toolbar? : []
    toolbarColor? : String
    toolbarTextColor? : String
    toolbarToggleColor? : String
    toolbarBg? : String
    toolbarFlat? : Boolean
    toolbarOutline? : Boolean
    toolbarPush? : Boolean
    toolbarRounded? : Boolean
    contentStyle? : any
    contentClass? : any | [] | String
    toggleFullscreen(): void
    setFullscreen(): void
    exitFullscreen(): void
    runCmd(cmd : String, param? : String, update? : Boolean): void
    refreshToolbar(): void
    focus(): void
    getContentEl(): String
}

export const QExpansionItem: VueConstructor<QExpansionItem>
export interface QExpansionItem extends Vue {
    to? : String | any
    exact? : Boolean
    append? : Boolean
    replace? : Boolean
    activeClass? : String
    exactActiveClass? : String
    disable? : Boolean
    value? : Boolean
    icon? : String
    expandIcon? : String
    expandIconClass? : [] | String | any
    label? : String
    labelLines? : Number | String
    caption? : String
    captionLines? : Number | String
    dark? : Boolean
    dense? : Boolean
    duration? : Number
    headerInsetLevel? : Number
    contentInsetLevel? : Number
    expandSeparator? : Boolean
    defaultOpened? : Boolean
    expandIconToggle? : Boolean
    switchToggleSide? : Boolean
    denseToggle? : Boolean
    group? : String
    popup? : Boolean
    headerStyle? : [] | String | any
    headerClass? : [] | String | any
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export const QFab: VueConstructor<QFab>
export interface QFab extends Vue {
    value? : Boolean
    icon? : String
    activeIcon? : String
    direction? : String
    persistent? : Boolean
    outline? : Boolean
    push? : Boolean
    flat? : Boolean
    color? : String
    textColor? : String
    glossy? : Boolean
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export const QFabAction: VueConstructor<QFabAction>
export interface QFabAction extends Vue {
    icon : String
    outline? : Boolean
    push? : Boolean
    flat? : Boolean
    color? : String
    textColor? : String
    glossy? : Boolean
    to? : String | any
    replace? : Boolean
}

export const QField: VueConstructor<QField>
export interface QField extends Vue {
    error? : Boolean
    errorMessage? : String
    rules? : []
    lazyRules? : Boolean
    label? : String
    stackLabel? : Boolean
    hint? : String
    hideHint? : Boolean
    prefix? : String
    suffix? : String
    color? : String
    bgColor? : String
    dark? : Boolean
    loading? : Boolean
    clearable? : Boolean
    clearIcon? : Boolean
    filled? : Boolean
    outlined? : Boolean
    borderless? : Boolean
    standout? : Boolean
    bottomSlots? : Boolean
    counter? : Boolean
    rounded? : Boolean
    square? : Boolean
    dense? : Boolean
    itemsAligned? : Boolean
    disable? : Boolean
    readonly? : Boolean
    resetValidation(): void
    validate(value? : any): void
}

export const QFooter: VueConstructor<QFooter>
export interface QFooter extends Vue {
    value? : Boolean
    reveal? : Boolean
    bordered? : Boolean
    elevated? : Boolean
}

export const QForm: VueConstructor<QForm>
export interface QForm extends Vue {
    validate(): Promise
    resetValidation(): void
}

export const QHeader: VueConstructor<QHeader>
export interface QHeader extends Vue {
    value? : Boolean
    reveal? : Boolean
    revealOffset? : Number
    bordered? : Boolean
    elevated? : Boolean
}

export const QIcon: VueConstructor<QIcon>
export interface QIcon extends Vue {
    name? : String
    color? : String
    size? : String
    left? : Boolean
    right? : Boolean
}

export const QImg: VueConstructor<QImg>
export interface QImg extends Vue {
    src? : String
    srcset? : String
    sizes? : String
    alt? : String
    placeholderSrc? : String
    basic? : Boolean
    contain? : Boolean
    position? : String
    ratio? : String | Number
    transition? : String
    spinnerColor? : String
    spinnnerSize? : String
}

export const QInfiniteScroll: VueConstructor<QInfiniteScroll>
export interface QInfiniteScroll extends Vue {
    offset? : Number
    scrollTarget? : Element | String
    disable? : Boolean
    poll(): void
    trigger(): void
    reset(): void
    stop(): void
    resume(): void
    updateScrollTarget(): void
}

export const QInnerLoading: VueConstructor<QInnerLoading>
export interface QInnerLoading extends Vue {
    showing? : Boolean
    color? : String
    size? : String
    transitionShow? : String
    transitionHide? : String
    dark? : Boolean
}

export const QInput: VueConstructor<QInput>
export interface QInput extends Vue {
    mask? : String
    fillMask? : Boolean
    unmaskedValue? : Boolean
    error? : Boolean
    errorMessage? : String
    rules? : []
    lazyRules? : Boolean
    label? : String
    stackLabel? : Boolean
    hint? : String
    hideHint? : Boolean
    prefix? : String
    suffix? : String
    color? : String
    bgColor? : String
    dark? : Boolean
    loading? : Boolean
    clearable? : Boolean
    clearIcon? : Boolean
    filled? : Boolean
    outlined? : Boolean
    borderless? : Boolean
    standout? : Boolean
    bottomSlots? : Boolean
    counter? : Boolean
    rounded? : Boolean
    square? : Boolean
    dense? : Boolean
    itemsAligned? : Boolean
    disable? : Boolean
    readonly? : Boolean
    value : String | Number
    type? : String
    debounce? : String | Number
    maxlength? : String | Number
    autogrow? : Boolean
    autofocus? : Boolean
    inputClass? : [] | String | any
    inputStyle? : [] | String | any
    resetValidation(): void
    validate(value? : any): void
    focus(): void
    blur(): void
}

export const QItem: VueConstructor<QItem>
export interface QItem extends Vue {
    to? : String | any
    exact? : Boolean
    append? : Boolean
    replace? : Boolean
    activeClass? : String
    exactActiveClass? : String
    disable? : Boolean
    active? : Boolean
    dark? : Boolean
    clickable? : Boolean
    dense? : Boolean
    insetLevel? : Number
    tabindex? : Number | String
    tag? : String
    manualFocus? : Boolean
    focused? : Boolean
}

export const QItemLabel: VueConstructor<QItemLabel>
export interface QItemLabel extends Vue {
    overline? : Boolean
    caption? : Boolean
    header? : Boolean
    inset? : Boolean
    lines? : Number | String
}

export const QItemSection: VueConstructor<QItemSection>
export interface QItemSection extends Vue {
    avatar? : Boolean
    thumbnail? : Boolean
    side? : Boolean
    top? : Boolean
    noWrap? : Boolean
}

export const QKnob: VueConstructor<QKnob>
export interface QKnob extends Vue {
    value? : Number
    min? : Number
    max? : Number
    step? : Number
    color? : String
    centerColor? : String
    trackColor? : String
    size? : String
    fontSize? : String
    thickness? : Number
    angle? : Number
    showValue? : Boolean
    tabindex? : Number | String
    disable? : Boolean
    readonly? : Boolean
}

export const QLayout: VueConstructor<QLayout>
export interface QLayout extends Vue {
    view? : String
    container? : Boolean
}

export const QLinearProgress: VueConstructor<QLinearProgress>
export interface QLinearProgress extends Vue {
    value? : Number
    buffer? : Number
    color? : String
    trackColor? : String
    dark? : Boolean
    reverse? : Boolean
    stripe? : Boolean
    indeterminate? : Boolean
    query? : Boolean
    rounded? : Boolean
}

export const QList: VueConstructor<QList>
export interface QList extends Vue {
    bordered? : Boolean
    dense? : Boolean
    separator? : Boolean
    dark? : Boolean
    padding? : Boolean
}

export const QMarkupTable: VueConstructor<QMarkupTable>
export interface QMarkupTable extends Vue {
    dense? : Boolean
    dark? : Boolean
    flat? : Boolean
    bordered? : Boolean
    separator? : String
    wrapCells? : Boolean
}

export const QMenu: VueConstructor<QMenu>
export interface QMenu extends Vue {
    target? : Boolean | String
    contextMenu? : Boolean
    contentClass? : [] | String | any
    contentStyle? : [] | String | any
    value? : Boolean
    fit? : Boolean
    cover? : Boolean
    anchor? : String
    self? : String
    offset? : []
    noParentEvent? : Boolean
    touchPosition? : Boolean
    persistent? : Boolean
    autoClose? : Boolean
    maxHeight? : String
    maxWidth? : String
    transitionShow? : String
    transitionHide? : String
    observeAnchor? : Boolean
    noFocus? : Boolean
    noRefocus? : Boolean
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
    updatePosition(): void
}

export const QNoSsr: VueConstructor<QNoSsr>
export interface QNoSsr extends Vue {
    tag? : String
    placeholder? : String
}

export const QOptionGroup: VueConstructor<QOptionGroup>
export interface QOptionGroup extends Vue {
    value? : any
    options? : []
    type? : String
    color? : String
    keepColor? : Boolean
    dark? : Boolean
    dense? : Boolean
    leftLabel? : Boolean
    inline? : Boolean
    disable? : Boolean
}

export const QPage: VueConstructor<QPage>
export interface QPage extends Vue {
    padding? : Boolean
    styleFn? : Function
}

export const QPageContainer: VueConstructor<QPageContainer>
export interface QPageContainer extends Vue {
}

export const QPageScroller: VueConstructor<QPageScroller>
export interface QPageScroller extends Vue {
    position? : String
    offset? : []
    expand? : Boolean
    scrollOffset? : Number
    duration? : Number
}

export const QPageSticky: VueConstructor<QPageSticky>
export interface QPageSticky extends Vue {
    position? : String
    offset? : []
    expand? : Boolean
}

export const QPagination: VueConstructor<QPagination>
export interface QPagination extends Vue {
    value : Number
    min? : Number
    max : Number
    color? : String
    textColor? : String
    size? : String
    disable? : Boolean
    input? : Boolean
    boundaryLinks? : Boolean
    boundaryNumbers? : Boolean
    directionLinks? : Boolean
    ellipses? : Boolean
    maxPages? : Number
    set(pageNumber? : Number): void
    setOffset(offset? : Number): void
}

export const QParallax: VueConstructor<QParallax>
export interface QParallax extends Vue {
    src? : String
    height? : Number
    speed? : Number
}

export const QPopupEdit: VueConstructor<QPopupEdit>
export interface QPopupEdit extends Vue {
    value? : any
    title? : String
    buttons? : Boolean
    labelSet? : String
    labelCancel? : String
    persistent? : Boolean
    color? : String
    validate? : Function
    disable? : Boolean
    set(): void
    cancel(): void
}

export const QPopupProxy: VueConstructor<QPopupProxy>
export interface QPopupProxy extends Vue {
    target? : Boolean | String
    contextMenu? : Boolean
    value? : Boolean
    breakpoint? : Number | String
    touchPosition? : Boolean
    disable? : Boolean
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
}

export const QPullToRefresh: VueConstructor<QPullToRefresh>
export interface QPullToRefresh extends Vue {
    color? : String
    icon? : String
    noMouse? : Boolean
    disable? : Boolean
    trigger(): void
    updateScrollTarget(): void
}

export const QRadio: VueConstructor<QRadio>
export interface QRadio extends Vue {
    value : Number | String
    val : Number | String
    label? : String
    leftLabel? : Boolean
    color? : String
    keepColor? : Boolean
    dark? : Boolean
    dense? : Boolean
    disable? : Boolean
    tabindex? : Number | String
    set(): void
}

export const QRange: VueConstructor<QRange>
export interface QRange extends Vue {
    value? : {
        min? : Number
        max? : Number }
    min? : Number
    max? : Number
    step? : Number
    dragRange? : Boolean
    dragRangeOnly? : Boolean
    color? : String
    label? : Boolean
    labelColor? : String
    leftLabelColor? : String
    rightLabelColor? : String
    leftLabelValue? : String | Number
    rightLabelValue? : String | Number
    labelAlways? : Boolean
    markers? : Boolean
    snap? : Boolean
    dark? : Boolean
    dense? : Boolean
    disable? : Boolean
    readonly? : Boolean
    tabindex? : Number | String
}

export const QRating: VueConstructor<QRating>
export interface QRating extends Vue {
    value? : Number
    max? : Number | String
    icon? : String
    color? : String
    size? : String
    noReset? : Boolean
    readonly? : Boolean
    disable? : Boolean
}

export const QResizeObserver: VueConstructor<QResizeObserver>
export interface QResizeObserver extends Vue {
    debounce? : String | Number
    trigger(immediately? : Boolean): void
}

export const QRouteTab: VueConstructor<QRouteTab>
export interface QRouteTab extends Vue {
    to : String | any
    exact? : Boolean
    append? : Boolean
    replace? : Boolean
    activeClass? : String
    exactActiveClass? : String
    disable? : Boolean
    ripple? : Boolean | any
    icon? : String
    label? : Number | String
    alert? : Boolean | String
    name? : Number | String
    noCaps? : Boolean
    tabindex? : Number | String
}

export const QScrollArea: VueConstructor<QScrollArea>
export interface QScrollArea extends Vue {
    thumbStyle? : any
    contentStyle? : any
    contentActiveStyle? : any
    delay? : Number | String
    horizontal? : Boolean
    setScrollPosition(offset : Number, duration? : Number): void
}

export const QScrollObserver: VueConstructor<QScrollObserver>
export interface QScrollObserver extends Vue {
    debounce? : String | Number
    horizontal? : Boolean
    trigger(immediately? : Boolean): void
    getPosition(): void
}

export const QSelect: VueConstructor<QSelect>
export interface QSelect extends Vue {
    error? : Boolean
    errorMessage? : String
    rules? : []
    lazyRules? : Boolean
    label? : String
    stackLabel? : Boolean
    hint? : String
    hideHint? : Boolean
    prefix? : String
    suffix? : String
    color? : String
    bgColor? : String
    dark? : Boolean
    loading? : Boolean
    clearable? : Boolean
    clearIcon? : Boolean
    filled? : Boolean
    outlined? : Boolean
    borderless? : Boolean
    standout? : Boolean
    bottomSlots? : Boolean
    counter? : Boolean
    rounded? : Boolean
    square? : Boolean
    dense? : Boolean
    itemsAligned? : Boolean
    disable? : Boolean
    readonly? : Boolean
    value : Number | String | []
    multiple? : Boolean
    displayValue? : Number | String
    displayValueSanitize? : Boolean
    options? : []
    optionValue? : Function | String
    optionLabel? : Function | String
    optionDisable? : Function | String
    hideSelected? : Boolean
    hideDropdownIcon? : Boolean
    dropdownIcon? : String
    maxValues? : Number | String
    optionsDense? : Boolean
    optionsDark? : Boolean
    optionsSelectedClass? : String
    optionsCover? : Boolean
    optionsSanitize? : Boolean
    useInput? : Boolean
    useChips? : Boolean
    newValueMode? : String
    mapOptions? : Boolean
    emitValue? : Boolean
    inputDebounce? : Number | String
    autofocus? : Boolean
    transitionShow? : String
    transitionHide? : String
    resetValidation(): void
    validate(value? : any): void
    focus(): void
    removeAtIndex(index : Number): void
    add(opt : any): void
    toggleOption(opt : any): void
    setOptionIndex(index : Number): void
    filter(value : String): void
    updateMenuPosition(): void
}

export const QSeparator: VueConstructor<QSeparator>
export interface QSeparator extends Vue {
    dark? : Boolean
    spaced? : Boolean
    inset? : Boolean | String
    vertical? : Boolean
    color? : String
}

export const QSlideItem: VueConstructor<QSlideItem>
export interface QSlideItem extends Vue {
    leftColor? : String
    rightColor? : String
}

export const QSlider: VueConstructor<QSlider>
export interface QSlider extends Vue {
    value? : Number
    min? : Number
    max? : Number
    step? : Number
    color? : String
    label? : Boolean
    labelColor? : String
    labelValue? : String | Number
    labelAlways? : Boolean
    markers? : Boolean
    snap? : Boolean
    dark? : Boolean
    dense? : Boolean
    disable? : Boolean
    readonly? : Boolean
    tabindex? : Number | String
}

export const QSlideTransition: VueConstructor<QSlideTransition>
export interface QSlideTransition extends Vue {
    appear? : Boolean
    duration? : Number
}

export const QSpace: VueConstructor<QSpace>
export interface QSpace extends Vue {
}

export const QSpinner: VueConstructor<QSpinner>
export interface QSpinner extends Vue {
    size? : String
    color? : String
    thickness? : Number
}

export const QSpinnerAudio: VueConstructor<QSpinnerAudio>
export interface QSpinnerAudio extends Vue {
    size? : String
    color? : String
}

export const QSpinnerBall: VueConstructor<QSpinnerBall>
export interface QSpinnerBall extends Vue {
    size? : String
    color? : String
}

export const QSpinnerBars: VueConstructor<QSpinnerBars>
export interface QSpinnerBars extends Vue {
    size? : String
    color? : String
}

export const QSpinnerComment: VueConstructor<QSpinnerComment>
export interface QSpinnerComment extends Vue {
    size? : String
    color? : String
}

export const QSpinnerCube: VueConstructor<QSpinnerCube>
export interface QSpinnerCube extends Vue {
    size? : String
    color? : String
}

export const QSpinnerDots: VueConstructor<QSpinnerDots>
export interface QSpinnerDots extends Vue {
    size? : String
    color? : String
}

export const QSpinnerFacebook: VueConstructor<QSpinnerFacebook>
export interface QSpinnerFacebook extends Vue {
    size? : String
    color? : String
}

export const QSpinnerGears: VueConstructor<QSpinnerGears>
export interface QSpinnerGears extends Vue {
    size? : String
    color? : String
}

export const QSpinnerGrid: VueConstructor<QSpinnerGrid>
export interface QSpinnerGrid extends Vue {
    size? : String
    color? : String
}

export const QSpinnerHearts: VueConstructor<QSpinnerHearts>
export interface QSpinnerHearts extends Vue {
    size? : String
    color? : String
}

export const QSpinnerHourglass: VueConstructor<QSpinnerHourglass>
export interface QSpinnerHourglass extends Vue {
    size? : String
    color? : String
}

export const QSpinnerInfinity: VueConstructor<QSpinnerInfinity>
export interface QSpinnerInfinity extends Vue {
    size? : String
    color? : String
}

export const QSpinnerIos: VueConstructor<QSpinnerIos>
export interface QSpinnerIos extends Vue {
    size? : String
    color? : String
}

export const QSpinnerOval: VueConstructor<QSpinnerOval>
export interface QSpinnerOval extends Vue {
    size? : String
    color? : String
}

export const QSpinnerPie: VueConstructor<QSpinnerPie>
export interface QSpinnerPie extends Vue {
    size? : String
    color? : String
}

export const QSpinnerPuff: VueConstructor<QSpinnerPuff>
export interface QSpinnerPuff extends Vue {
    size? : String
    color? : String
}

export const QSpinnerRadio: VueConstructor<QSpinnerRadio>
export interface QSpinnerRadio extends Vue {
    size? : String
    color? : String
}

export const QSpinnerRings: VueConstructor<QSpinnerRings>
export interface QSpinnerRings extends Vue {
    size? : String
    color? : String
}

export const QSpinnerTail: VueConstructor<QSpinnerTail>
export interface QSpinnerTail extends Vue {
    size? : String
    color? : String
}

export const QSplitter: VueConstructor<QSplitter>
export interface QSplitter extends Vue {
    value? : Number
    horizontal? : Boolean
    limits? : []
    disable? : Boolean
    beforeClass? : [] | String | any
    afterClass? : [] | String | any
    separatorClass? : [] | String | any
    separatorStyle? : [] | String | any
    dark? : Boolean
}

export const QStep: VueConstructor<QStep>
export interface QStep extends Vue {
    name : any
    disable? : Boolean
    icon? : String
    color? : String
    title : String
    caption? : String
    doneIcon? : String
    doneColor? : String
    activeIcon? : String
    activeColor? : String
    errorIcon? : String
    errorColor? : String
    headerNav? : Boolean
    done? : Boolean
    error? : Boolean
}

export const QStepper: VueConstructor<QStepper>
export interface QStepper extends Vue {
    value? : any
    animated? : Boolean
    infinite? : Boolean
    swipeable? : Boolean
    transitionPrev? : String
    transitionNext? : String
    dark? : Boolean
    flat? : Boolean
    bordered? : Boolean
    vertical? : Boolean
    alternativeLabels? : Boolean
    headerNav? : Boolean
    contracted? : Boolean
    inactiveIcon? : String
    inactiveColor? : String
    doneIcon? : String
    doneColor? : String
    activeIcon? : String
    activeColor? : String
    errorIcon? : String
    errorColor? : String
    next(): void
    previous(): void
    goTo(panelName : String | Number): void
}

export const QStepperNavigation: VueConstructor<QStepperNavigation>
export interface QStepperNavigation extends Vue {
}

export const QTab: VueConstructor<QTab>
export interface QTab extends Vue {
    ripple? : Boolean | any
    icon? : String
    label? : Number | String
    alert? : Boolean | String
    name? : Number | String
    noCaps? : Boolean
    tabindex? : Number | String
    disable? : Boolean
}

export const QTable: VueConstructor<QTable>
export interface QTable extends Vue {
    fullscreen? : Boolean
    data? : []
    rowKey? : String
    color? : String
    grid? : Boolean
    dense? : Boolean
    columns? : []
    visibleColumns? : []
    loading? : Boolean
    title? : String
    hideHeader? : Boolean
    hideBottom? : Boolean
    dark? : Boolean
    flat? : Boolean
    bordered? : Boolean
    separator? : String
    wrapCells? : Boolean
    binaryStateSort? : Boolean
    noDataLabel? : String
    noResultsLabel? : String
    loadingLabel? : String
    selectedRowsLabel? : Function
    rowsPerPageLabel? : String
    paginationLabel? : Function
    tableStyle? : String | [] | any
    tableClass? : String | [] | any
    filter? : String | any
    filterMethod? : Function
    pagination? : {
        sortBy? : String
        descending? : Boolean
        page? : Number
        rowsPerPage? : Number
        rowsNumber? : Number }
    rowsPerPageOptions? : []
    selection? : String
    selected? : []
    sortMethod? : Function
    toggleFullscreen(): void
    setFullscreen(): void
    exitFullscreen(): void
    requestServerInteraction(props? : {
        pagination? : {
        sortBy? : String
        descending? : Boolean
        page? : Number
        rowsPerPage? : Number }
        filter? : Function }): void
    setPagination(pagination : {
        sortBy? : String
        descending? : Boolean
        page? : Number
        rowsPerPage? : Number }, forceServerRequest? : Boolean): void
    prevPage(): void
    nextPage(): void
    isRowSelected(key : any): void
    clearSelection(): void
    sort(col : String | any): void
}

export const QTabPanel: VueConstructor<QTabPanel>
export interface QTabPanel extends Vue {
    name : any
    disable? : Boolean
}

export const QTabPanels: VueConstructor<QTabPanels>
export interface QTabPanels extends Vue {
    value? : any
    animated? : Boolean
    infinite? : Boolean
    swipeable? : Boolean
    transitionPrev? : String
    transitionNext? : String
    next(): void
    previous(): void
    goTo(panelName : String | Number): void
}

export const QTabs: VueConstructor<QTabs>
export interface QTabs extends Vue {
    value? : Number | String
    vertical? : Boolean
    align? : String
    breakpoint? : Number | String
    activeColor? : String
    activeBgColor? : String
    indicatorColor? : String
    leftIcon? : String
    rightIcon? : String
    shrink? : Boolean
    switchIndicator? : Boolean
    narrowIndicator? : Boolean
    inlineLabel? : Boolean
    noCaps? : Boolean
    dense? : Boolean
}

export const QTd: VueConstructor<QTd>
export interface QTd extends Vue {
    props? : any
    autoWidth? : Boolean
}

export const QTh: VueConstructor<QTh>
export interface QTh extends Vue {
    props? : any
    autoWidth? : Boolean
}

export const QTime: VueConstructor<QTime>
export interface QTime extends Vue {
    value? : String
    landscape? : Boolean
    color? : String
    textColor? : String
    dark? : Boolean
    readonly? : Boolean
    disable? : Boolean
    format24h? : Boolean
    options? : Function
    hourOptions? : []
    minuteOptions? : []
    secondOptions? : []
    withSeconds? : Boolean
    nowBtn? : Boolean
}

export const QTimeline: VueConstructor<QTimeline>
export interface QTimeline extends Vue {
    color? : String
    side? : String
    layout? : String
    dark? : Boolean
}

export const QTimelineEntry: VueConstructor<QTimelineEntry>
export interface QTimelineEntry extends Vue {
    heading? : Boolean
    tag? : String
    side? : String
    icon? : String
    color? : String
    title? : String
    subtitle? : String
}

export const QToggle: VueConstructor<QToggle>
export interface QToggle extends Vue {
    value? : any | []
    val? : any
    trueValue? : any
    falseValue? : any
    label? : String
    leftLabel? : Boolean
    color? : String
    keepColor? : Boolean
    dark? : Boolean
    dense? : Boolean
    disable? : Boolean
    tabindex? : Number | String
    icon? : String
    checkedIcon? : String
    uncheckedIcon? : String
    toggle(): void
}

export const QToolbar: VueConstructor<QToolbar>
export interface QToolbar extends Vue {
    inset? : Boolean
}

export const QToolbarTitle: VueConstructor<QToolbarTitle>
export interface QToolbarTitle extends Vue {
    shrink? : Boolean
}

export const QTooltip: VueConstructor<QTooltip>
export interface QTooltip extends Vue {
    contentClass? : [] | String | any
    contentStyle? : [] | String | any
    value? : Boolean
    maxHeight? : String
    maxWidth? : String
    transitionShow? : String
    transitionHide? : String
    anchor? : String
    self? : String
    offset? : []
    target? : Boolean | String
    delay? : Number
    show(evt? : any): void
    hide(evt? : any): void
    toggle(evt? : any): void
    updatePosition(): void
}

export const QTr: VueConstructor<QTr>
export interface QTr extends Vue {
    props? : any
}

export const QTree: VueConstructor<QTree>
export interface QTree extends Vue {
    nodes : []
    nodeKey : String
    labelKey? : String
    color? : String
    controlColor? : String
    textColor? : String
    selectedColor? : String
    dark? : Boolean
    icon? : String
    tickStrategy? : String
    ticked? : []
    expanded? : []
    selected? : any
    defaultExpandAll? : Boolean
    accordion? : Boolean
    filter? : String
    filterMethod? : Function
    duration? : Number
    noNodesLabel? : String
    noResultsLabel? : String
    getNodeByKey(key : any): any
    getTickedNodes(): []
    getExpandedNodes(): []
    isExpanded(key : any): Boolean
    expandAll(): void
    collapseAll(): void
    setExpanded(key : any, state : Boolean): void
    isTicked(key : any): Boolean
    setTicked(keys : [], state : Boolean): void
}

export const QUploader: VueConstructor<QUploader>
export interface QUploader extends Vue {
    label? : String
    color? : String
    textColor? : String
    dark? : Boolean
    square? : Boolean
    flat? : Boolean
    bordered? : Boolean
    multiple? : Boolean
    accept? : String
    maxFileSize? : Number
    maxTotalSize? : Number
    filter? : Function
    noThumbnails? : Boolean
    autoUpload? : Boolean
    disable? : Boolean
    readonly? : Boolean
    factory? : Function
    url? : String | Function
    method? : String | Function
    fieldName? : String | Function
    headers? : [] | Function
    fields? : [] | Function
    withCredentials? : Boolean | Function
    sendRaw? : Boolean | Function
    batch? : Boolean | Function
    abort(): void
    upload(): void
    pickFiles(): void
    addFiles(files : []): void
    reset(): void
    removeUploadedFiles(): void
    removeQueuedFiles(): void
    removeFile(file : any): void
}

export const QVideo: VueConstructor<QVideo>
export interface QVideo extends Vue {
    src : String
}

export const Ripple: Ripple
export interface Ripple {
}

export const Screen: Screen
export interface Screen {
    width? : Number
    height? : Number
    sizes? : {
        sm? : Number
        md? : Number
        lg? : Number
        xl? : Number }
    lt? : {
        sm? : Boolean
        md? : Boolean
        lg? : Boolean
        xl? : Boolean }
    gt? : {
        xs? : Boolean
        sm? : Boolean
        md? : Boolean
        lg? : Boolean }
    xs? : Boolean
    sm? : Boolean
    md? : Boolean
    lg? : Boolean
    xl? : Boolean
    setSizes(breakpoints : {
        sm? : Number
        md? : Number
        lg? : Number
        xl? : Number }): void
    setDebounce(amount : Number): void
}

export const Scroll: Scroll
export interface Scroll {
}

export const ScrollFire: ScrollFire
export interface ScrollFire {
}

export const SessionStorage: SessionStorage
export interface SessionStorage {
    has(key : String): Boolean
    getLength(): Number
    getItem(key : String): any
    getIndex(index : Number): any
    getAll(): any
    set(key : String, value : String): void
    remove(key : String): void
    clear(): void
    isEmpty(): Boolean
}

export const TouchHold: TouchHold
export interface TouchHold {
}

export const TouchPan: TouchPan
export interface TouchPan {
}

export const TouchRepeat: TouchRepeat
export interface TouchRepeat {
}

export const TouchSwipe: TouchSwipe
export interface TouchSwipe {
}

export interface QVueGlobals {
    addressbarColor: AddressbarColor
    fullscreen: AppFullscreen
    appVisible: AppVisibility
    bottomSheet: BottomSheet
    cookies: Cookies
    dialog: Dialog
    loading: Loading
    loadingBar: LoadingBar
    localStorage: LocalStorage
    notify: Notify
    platform: Platform
    screen: Screen
    sessionStorage: SessionStorage
}

declare module 'vue/types/vue' {
    interface Vue {
        $q: QVueGlobals
    }
}
