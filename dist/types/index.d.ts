import Vue, { VueConstructor, PluginObject } from 'vue'

export interface AddressbarColor {
    /**
     * Sets addressbar color (for browsers that support it)
     * @param hexColor Color in hex format
     */
    set (hexColor : string): void
}

export interface AppFullscreen {
    /**
     * Does browser support it?
     */
    isCapable : boolean
    /**
     * Is Fullscreen active?
     */
    isActive : boolean
    /**
     * Request going into Fullscreen (with optional target)
     * @param target Optional CSS selector of target to request Fullscreen on
     */
    request (target? : string): void
    /**
     * Request exiting out of Fullscreen mode
     */
    exit (): void
    /**
     * Request toggling Fullscreen mode (with optional target if requesting going into Fullscreen only)
     * @param target Optional CSS selector of target to request Fullscreen on
     */
    toggle (target? : string): void
}

export interface AppVisibility {
    /**
     * Does the app have user focus? Or the app runs in the background / another tab has the user's attention
     */
    appVisible : boolean
}

export interface BottomSheet {
    /**
     * Creates an ad-hoc Bottom Sheet; Same as calling $q.bottomSheet(...)
     * @param opts Bottom Sheet options
     * @returns Chainable Object
     */
    create (opts : {
            /**
             * CSS Class name to apply to the Dialog's QCard
             */
            class? : string | any[] | any
            /**
             * CSS style to apply to the Dialog's QCard
             */
            style? : string | any[] | any
            /**
             * Title
             */
            title? : string
            /**
             * Message
             */
            message? : string
            /**
             * Array of Objects, each Object defining an action
             */
            actions? : any[]
            /**
             * Display actions as a grid instead of as a list
             */
            grid? : boolean
            /**
             * Apply dark mode
             */
            dark? : boolean
            /**
             * Put Bottom Sheet into seamless mode; Does not use a backdrop so user is able to interact with the rest of the page too
             */
            seamless? : boolean
            /**
             * User cannot dismiss Bottom Sheet if clicking outside of it or hitting ESC key
             */
            persistent? : boolean }): DialogChainObject
}

export interface Cookies {
    /**
     * Get cookie
     * @param name Cookie name
     * @param reviverFn Transformation function to be used for values - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
     * @returns Cookie value
     */
    get (name : string, reviverFn? : Function): string
    /**
     * Get all cookies
     * @param reviverFn Transformation function to be used for values - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
     * @returns Object with cookie names (as keys) and their values
     */
    getAll (reviverFn? : Function): any
    /**
     * Set cookie
     * @param name Cookie name
     * @param value Cookie value
     * @param options Cookie options
     */
    set (name : string, value : string, options? : {
            /**
             * Cookie expires detail; If specified as Number, then the unit is days
             */
            expires? : number | string
            /**
             * Cookie path
             */
            path? : string
            /**
             * Cookie domain
             */
            domain? : string
            /**
             * SameSite cookie option (not supported by IE11)
             */
            sameSite? : string
            /**
             * Is cookie Http Only?
             */
            httpOnly? : boolean
            /**
             * Is cookie secure? (https only)
             */
            secure? : boolean
            /**
             * Raw string for other cookie options; To be used as a last resort for possible newer props that are currently not yet implemented in Quasar
             */
            other? : string }): void
    /**
     * Check if cookie exists
     * @param name Cookie name
     * @param reviverFn Transformation function to be used for values - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
     * @returns Does cookie exists or not?
     */
    has (name : string, reviverFn? : Function): boolean
    /**
     * Remove a cookie
     * @param name Cookie name
     * @param options Cookie options
     */
    remove (name : string, options? : {
            /**
             * Cookie path
             */
            path? : string
            /**
             * Cookie domain
             */
            domain? : string }): void
    /**
     * For SSR usage only, and only on the global import (not on $q.cookies)
     * @param ssrContext SSR Context Object
     * @returns Cookie object (like $q.cookies) for SSR usage purposes
     */
    parseSSR (ssrContext : any): any
}

export interface Dialog {
    /**
     * Creates an ad-hoc Dialog; Same as calling $q.dialog(...)
     * @param opts Dialog options
     * @returns Chainable Object
     */
    create (opts : QDialogOptions): DialogChainObject
}

export interface Loading {
    /**
     * Is Loading active?
     */
    isActive : boolean
    /**
     * Activate and show
     * @param opts All props are optional
     */
    show (opts? : {
            /**
             * Wait a number of millisecond before showing; Not worth showing for 100ms for example then hiding it, so wait until you're sure it's a process that will take some considerable amount of time
             */
            delay? : number
            /**
             * Message to display
             */
            message? : string
            /**
             * Force use of textContent instead of innerHTML to render message; Use it when the message might be unsafe (from user input)
             */
            sanitize? : boolean
            /**
             * Spinner size (in pixels)
             */
            spinnerSize? : number
            /**
             * Color name for spinner from the Quasar Color Palette
             */
            spinnerColor? : string
            /**
             * Color name for text from the Quasar Color Palette
             */
            messageColor? : string
            /**
             * Color name for background from the Quasar Color Palette
             */
            backgroundColor? : string
            /**
             * One of the QSpinners
             */
            spinner? : Vue
            /**
             * Add a CSS class to easily customize the component
             */
            customClass? : string
            /**
             * Ignore the default configuration (set by setDefaults()) for this instance only
             */
            ignoreDefaults? : boolean }): void
    /**
     * Hide it
     */
    hide (): void
    /**
     * Merge options into the default ones
     * @param opts Pick the subprop you want to define
     */
    setDefaults (opts : {
            /**
             * Wait a number of millisecond before showing; Not worth showing for 100ms for example then hiding it, so wait until you're sure it's a process that will take some considerable amount of time
             */
            delay? : number
            /**
             * Message to display
             */
            message? : string
            /**
             * Spinner size (in pixels)
             */
            spinnerSize? : number
            /**
             * Color name for spinner from the Quasar Color Palette
             */
            spinnerColor? : string
            /**
             * Color name for text from the Quasar Color Palette
             */
            messageColor? : string
            /**
             * Color name for background from the Quasar Color Palette
             */
            backgroundColor? : string
            /**
             * One of the QSpinners
             */
            spinner? : Vue
            /**
             * Add a CSS class to easily customize the component
             */
            customClass? : string }): void
}

export interface LoadingBar {
    /**
     * Notify bar you've started a background activity
     * @param speed Delay (in milliseconds) between bar progress increments
     */
    start (speed? : number): void
    /**
     * Notify bar one background activity has finalized
     */
    stop (): void
    /**
     * Manually trigger a bar progress increment
     * @param amount Amount (0.0 < x < 1.0) to increment with
     */
    increment (amount? : number): void
    /**
     * Set the inner QAjaxBar's props
     * @param ...props QAjaxBar component props
     */
    setDefaults (): void
}

export interface LocalStorage {
    /**
     * Check if storage item exists
     * @param key Entry key
     * @param reviverFn Transformation function to be used for objects - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
     * @returns Does the item exists or not?
     */
    has (key : string, reviverFn? : Function): boolean
    /**
     * Get storage number of entries
     * @returns Number of entries
     */
    getLength (): number
    /**
     * Get a storage item value
     * @param key Entry key
     * @param reviverFn Transformation function to be used for objects - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
     * @returns Storage item value
     */
    getItem (key : string, reviverFn? : Function): any
    /**
     * Get the storage item value at specific index
     * @param index Entry index
     * @param reviverFn Transformation function to be used for objects - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
     * @returns Storage item value
     */
    getIndex (index : number, reviverFn? : Function): any
    /**
     * Retrieve all items in storage
     * @param reviverFn Transformation function to be used for objects - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
     * @returns Object syntax: item name as Object key and its value
     */
    getAll (reviverFn? : Function): any
    /**
     * Set item in storage
     * @param key Entry key
     * @param value Entry value
     */
    set (key : string, value : any): void
    /**
     * Remove a storage item
     * @param key Storage key
     */
    remove (key : string): void
    /**
     * Remove everything from the storage
     */
    clear (): void
    /**
     * Determine if storage has any items
     * @returns Tells if storage is empty or not
     */
    isEmpty (): boolean
}

export interface Meta {
}

export interface Notify {
    /**
     * Creates a notification; Same as calling $q.notify(...)
     * @param opts For syntax, check quasar.conf options parameters
     * @returns Calling this function hides the notification
     */
    create (opts : {
            /**
             * Color name for component from the Quasar Color Palette
             */
            color? : string
            /**
             * Color name for component from the Quasar Color Palette
             */
            textColor? : string
            /**
             * The content of your message
             */
            message : string
            /**
             * Render message as HTML; This can lead to XSS attacks, so make sure that you sanitize the message first
             */
            html? : boolean
            /**
             * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
             */
            icon? : string
            /**
             * URL to an avatar/image; Suggestion: use statics folder
             */
            avatar? : string
            /**
             * Window side/corner to stick to
             */
            position? : string
            /**
             * Add CSS class(es) to the notification for easier customization
             */
            classes? : string
            /**
             * Amount of time to display (in milliseconds)
             */
            timeout? : number
            /**
             * Notification actions (buttons); If a 'handler' is specified or not, clicking/tapping on the button will also close the notification; Also check 'closeBtn' convenience prop
             */
            actions? : any[]
            /**
             * Function to call when notification gets dismissed
             */
            onDismiss? : Function
            /**
             * Convenience way to add a dismiss button with a specific label, without using the 'actions' convoluted prop
             */
            closeBtn? : string
            /**
             * Put notification into multi-line mode; If this prop isn't used and more than one 'action' is specified then notification goes into multi-line mode by default
             */
            multiLine? : boolean
            /**
             * Ignore the default configuration (set by setDefaults()) for this instance only
             */
            ignoreDefaults? : boolean } | string): Function
    /**
     * Merge options into the default ones
     * @param opts For syntax, check quasar.conf options parameters
     */
    setDefaults (opts : {
            /**
             * Color name for component from the Quasar Color Palette
             */
            color? : string
            /**
             * Color name for component from the Quasar Color Palette
             */
            textColor? : string
            /**
             * The content of your message
             */
            message : string
            /**
             * Render message as HTML; This can lead to XSS attacks, so make sure that you sanitize the message first
             */
            html? : boolean
            /**
             * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
             */
            icon? : string
            /**
             * URL to an avatar/image; Suggestion: use statics folder
             */
            avatar? : string
            /**
             * Window side/corner to stick to
             */
            position? : string
            /**
             * Add CSS class(es) to the notification for easier customization
             */
            classes? : string
            /**
             * Amount of time to display (in milliseconds)
             */
            timeout? : number
            /**
             * Notification actions (buttons); If a 'handler' is specified or not, clicking/tapping on the button will also close the notification; Also check 'closeBtn' convenience prop
             */
            actions? : any[]
            /**
             * Function to call when notification gets dismissed
             */
            onDismiss? : Function
            /**
             * Convenience way to add a dismiss button with a specific label, without using the 'actions' convoluted prop
             */
            closeBtn? : string
            /**
             * Put notification into multi-line mode; If this prop isn't used and more than one 'action' is specified then notification goes into multi-line mode by default
             */
            multiLine? : boolean }): void
}

export interface Platform {
    /**
     * Client browser User Agent
     */
    userAgent : string
    /**
     * Client browser details (property names depend on browser)
     */
    is : any
    /**
     * Client browser detectable properties
     */
    has : {
            /**
             * Client browser runs on device with touch support
             */
            touch : boolean
            /**
             * Client browser has Web Storage support
             */
            webStorage : boolean }
    /**
     * Client browser environment
     */
    within : {
            /**
             * Does the app run under an iframe?
             */
            iframe : boolean }
}

export interface Screen {
    /**
     * Screen width (in pixels)
     */
    width : number
    /**
     * Screen height (in pixels)
     */
    height : number
    /**
     * Breakpoints (in pixels)
     */
    sizes : {
            /**
             * Breakpoint width size (minimum size)
             */
            sm : number
            /**
             * Breakpoint width size (minimum size)
             */
            md : number
            /**
             * Breakpoint width size (minimum size)
             */
            lg : number
            /**
             * Breakpoint width size (minimum size)
             */
            xl : number }
    /**
     * Tells if current screen width is lower than breakpoint-name
     */
    lt : {
            /**
             * Is current screen width lower than this breakpoint's lowest limit?
             */
            sm : boolean
            /**
             * Is current screen width lower than this breakpoint's lowest limit?
             */
            md : boolean
            /**
             * Is current screen width lower than this breakpoint's lowest limit?
             */
            lg : boolean
            /**
             * Is current screen width lower than this breakpoint's lowest limit?
             */
            xl : boolean }
    /**
     * Tells if current screen width is greater than breakpoint-name
     */
    gt : {
            /**
             * Is current screen width greater than this breakpoint's max limit?
             */
            xs : boolean
            /**
             * Is current screen width greater than this breakpoint's max limit?
             */
            sm : boolean
            /**
             * Is current screen width greater than this breakpoint's max limit?
             */
            md : boolean
            /**
             * Is current screen width greater than this breakpoint's max limit?
             */
            lg : boolean }
    /**
     * Current screen width fits exactly 'xs' breakpoint
     */
    xs : boolean
    /**
     * Current screen width fits exactly 'sm' breakpoint
     */
    sm : boolean
    /**
     * Current screen width fits exactly 'md' breakpoint
     */
    md : boolean
    /**
     * Current screen width fits exactly 'lg' breakpoint
     */
    lg : boolean
    /**
     * Current screen width fits exactly 'xl' breakpoint
     */
    xl : boolean
    /**
     * Override default breakpoint sizes
     * @param breakpoints Pick what you want to override
     */
    setSizes (breakpoints : {
            /**
             * Breakpoint width size (minimum size)
             */
            sm? : number
            /**
             * Breakpoint width size (minimum size)
             */
            md? : number
            /**
             * Breakpoint width size (minimum size)
             */
            lg? : number
            /**
             * Breakpoint width size (minimum size)
             */
            xl? : number }): void
    /**
     * Debounce update of all props when screen width/height changes
     * @param amount Amount in milliseconds
     */
    setDebounce (amount : number): void
}

export interface SessionStorage {
    /**
     * Check if storage item exists
     * @param key Entry key
     * @param reviverFn Transformation function to be used for objects - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
     * @returns Does the item exists or not?
     */
    has (key : string, reviverFn? : Function): boolean
    /**
     * Get storage number of entries
     * @returns Number of entries
     */
    getLength (): number
    /**
     * Get a storage item value
     * @param key Entry key
     * @param reviverFn Transformation function to be used for objects - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
     * @returns Storage item value
     */
    getItem (key : string, reviverFn? : Function): any
    /**
     * Get the storage item value at specific index
     * @param index Entry index
     * @param reviverFn Transformation function to be used for objects - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
     * @returns Storage item value
     */
    getIndex (index : number, reviverFn? : Function): any
    /**
     * Retrieve all items in storage
     * @param reviverFn Transformation function to be used for objects - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Using_the_reviver_parameter
     * @returns Object syntax: item name as Object key and its value
     */
    getAll (reviverFn? : Function): any
    /**
     * Set item in storage
     * @param key Entry key
     * @param value Entry value
     */
    set (key : string, value : any): void
    /**
     * Remove a storage item
     * @param key Storage key
     */
    remove (key : string): void
    /**
     * Remove everything from the storage
     */
    clear (): void
    /**
     * Determine if storage has any items
     * @returns Tells if storage is empty or not
     */
    isEmpty (): boolean
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
    /**
     * Position within window of where QAjaxBar should be displayed
     */
    position? : string
    /**
     * Size in CSS units, including unit name
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Skip Ajax hijacking (not a reactive prop)
     */
    skipHijack? : boolean
    /**
     * Reverse direction of progress
     */
    reverse? : boolean
    /**
     * Notify bar you are waiting for a new process to finish
     * @param speed Delay (in milliseconds) between progress auto-increments; If delay is 0 then it disables auto-incrementing
     */
    start (speed? : number): void
    /**
     * Manually trigger a bar progress increment
     * @param amount Amount (0 < x <= 100) to increment with
     */
    increment (amount? : number): void
    /**
     * Notify bar that one process you were waiting has finished
     */
    stop (): void
}

export interface QAvatar extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * The size in CSS units, including unit name, of the content (icon, text)
     */
    fontSize? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * Removes border-radius so borders are squared
     */
    square? : boolean
    /**
     * Applies a small standard border-radius for a squared shape of the component
     */
    rounded? : boolean
}

export interface QBadge extends Vue {
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Tell QBadge if it should float to the top right side of the relative positioned parent element or not
     */
    floating? : boolean
    /**
     * Applies a 0.8 opacity; Useful especially for floating QBagde
     */
    transparent? : boolean
    /**
     * Content can wrap to multiple lines
     */
    multiLine? : boolean
    /**
     * Badge's content as string; overrides default slot if specified
     */
    label? : string | number
    /**
     * Sets vertical-align CSS prop
     */
    align? : string
}

export interface QBanner extends Vue {
    /**
     * Display actions on same row as content
     */
    inlineActions? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Applies a small standard border-radius for a squared shape of the component
     */
    rounded? : boolean
}

export interface QBar extends Vue {
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * The component background color lights up the parent's background (as opposed to default behavior which is to darken it); Works unless you specify a CSS background color for it
     */
    dark? : boolean
}

export interface QBreadcrumbs extends Vue {
    /**
     * The string used to separate the breadcrumbs
     */
    separator? : string
    /**
     * The color of the active breadcrumb, which can be any color from the Quasar Color Palette
     */
    activeColor? : string
    /**
     * The gutter value allows you control over the space between the breadcrumb elements.
     */
    gutter? : string
    /**
     * The color used to color the separator, which can be any color from the Quasar Color Palette
     */
    separatorColor? : string
    /**
     * Specify how to align the breadcrumbs horizontally
     */
    align? : string
}

export interface QBreadcrumbsEl extends Vue {
    /**
     * Equivalent to Vue Router <router-link> 'to' property
     */
    to? : string | any
    /**
     * Equivalent to Vue Router <router-link> 'exact' property
     */
    exact? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'append' property
     */
    append? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'replace' property
     */
    replace? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'active-class' property
     */
    activeClass? : string
    /**
     * Equivalent to Vue Router <router-link> 'active-class' property
     */
    exactActiveClass? : string
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * The label text for the breadcrumb
     */
    label? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
}

export interface QBtn extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Configure material ripple (disable it by setting it to 'false' or supply a config object)
     */
    ripple? : boolean | any
    /**
     * Define the button HTML DOM type
     */
    type? : string
    /**
     * Equivalent to Vue Router <router-link> 'to' property
     */
    to? : string | any
    /**
     * Equivalent to Vue Router <router-link> 'replace' property
     */
    replace? : boolean
    /**
     * The text that will be shown on the button
     */
    label? : string | number
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    iconRight? : string
    /**
     * Use 'outline' design
     */
    outline? : boolean
    /**
     * Use 'flat' design
     */
    flat? : boolean
    /**
     * Remove shadow
     */
    unelevated? : boolean
    /**
     * Applies a more prominent border-radius for a squared shape button
     */
    rounded? : boolean
    /**
     * Use 'push' design
     */
    push? : boolean
    /**
     * Applies a glossy effect
     */
    glossy? : boolean
    /**
     * Makes button size and shape to fit a Floating Action Button
     */
    fab? : boolean
    /**
     * Makes button size and shape to fit a small Floating Action Button
     */
    fabMini? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Avoid turning label text into caps (which happens by default)
     */
    noCaps? : boolean
    /**
     * Avoid label text wrapping
     */
    noWrap? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
    /**
     * Label or content alignment
     */
    align? : string
    /**
     * Stack icon and label vertically instead of on same line (like it is by default)
     */
    stack? : boolean
    /**
     * When used on flexbox parent, button will stretch to parent's height
     */
    stretch? : boolean
    /**
     * Put button into loading state (displays a QSpinner -- can be overriden by using a 'loading' slot)
     */
    loading? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Makes a circle shaped button
     */
    round? : boolean
    /**
     * Percentage (0.0 < x < 100.0); To be used along 'loading' prop; Display a progress bar on the background
     */
    percentage? : number
    /**
     * Progress bar on the background should have dark color; To be used along with 'percentage' and 'loading' props
     */
    darkPercentage? : boolean
    /**
     * Emulate click on QBtn
     * @param evt JS event object
     */
    click (evt? : any): void
}

export interface QBtnDropdown extends Vue {
    /**
     * Controls Menu show/hidden state; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : boolean
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Configure material ripple (disable it by setting it to 'false' or supply a config object)
     */
    ripple? : boolean | any
    /**
     * Define the button HTML DOM type
     */
    type? : string
    /**
     * Equivalent to Vue Router <router-link> 'to' property
     */
    to? : string | any
    /**
     * Equivalent to Vue Router <router-link> 'replace' property
     */
    replace? : boolean
    /**
     * The text that will be shown on the button
     */
    label? : string | number
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    iconRight? : string
    /**
     * Use 'outline' design
     */
    outline? : boolean
    /**
     * Use 'flat' design
     */
    flat? : boolean
    /**
     * Remove shadow
     */
    unelevated? : boolean
    /**
     * Applies a more prominent border-radius for a squared shape button
     */
    rounded? : boolean
    /**
     * Use 'push' design
     */
    push? : boolean
    /**
     * Applies a glossy effect
     */
    glossy? : boolean
    /**
     * Makes button size and shape to fit a Floating Action Button
     */
    fab? : boolean
    /**
     * Makes button size and shape to fit a small Floating Action Button
     */
    fabMini? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Avoid turning label text into caps (which happens by default)
     */
    noCaps? : boolean
    /**
     * Avoid label text wrapping
     */
    noWrap? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
    /**
     * Label or content alignment
     */
    align? : string
    /**
     * Stack icon and label vertically instead of on same line (like it is by default)
     */
    stack? : boolean
    /**
     * When used on flexbox parent, button will stretch to parent's height
     */
    stretch? : boolean
    /**
     * Put button into loading state (displays a QSpinner -- can be overriden by using a 'loading' slot)
     */
    loading? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Split dropdown icon into its own button
     */
    split? : boolean
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    dropdownIcon? : string
    /**
     * Disable main button (useful along with 'split' prop)
     */
    disableMainBtn? : boolean
    /**
     * Disables dropdown (dropdown button if using along 'split' prop)
     */
    disableDropdown? : boolean
    /**
     * Style definitions to be attributed to the menu
     */
    contentStyle? : any[] | string | any
    /**
     * Class definitions to be attributed to the menu
     */
    contentClass? : any[] | string | any
    /**
     * Allows the menu to cover the button. When used, the 'menu-self' and 'menu-fit' props are no longer effective
     */
    cover? : boolean
    /**
     * Allows the menu to not be dismissed by a click/tap outside of the menu or by hitting the ESC key
     */
    persistent? : boolean
    /**
     * Allows any click/tap in the menu to close it; Useful instead of attaching events to each menu item that should close the menu on click/tap
     */
    autoClose? : boolean
    /**
     * Two values setting the starting position or anchor point of the menu relative to its target
     */
    menuAnchor? : string
    /**
     * Two values setting the menu's own position relative to its target
     */
    menuSelf? : string
    /**
     * Triggers component to show
     * @param evt JS event object
     */
    show (evt? : any): void
    /**
     * Triggers component to hide
     * @param evt JS event object
     */
    hide (evt? : any): void
    /**
     * Triggers component to toggle between show/hide
     * @param evt JS event object
     */
    toggle (evt? : any): void
}

export interface QBtnGroup extends Vue {
    /**
     * Spread horizontally to all available space
     */
    spread? : boolean
    /**
     * Use 'outline' design for buttons
     */
    outline? : boolean
    /**
     * Use 'flat' design for buttons
     */
    flat? : boolean
    /**
     * Remove shadow on buttons
     */
    unelevated? : boolean
    /**
     * Applies a more prominent border-radius for squared shape buttons
     */
    rounded? : boolean
    /**
     * Use 'push' design for buttons
     */
    push? : boolean
    /**
     * When used on flexbox parent, buttons will stretch to parent's height
     */
    stretch? : boolean
    /**
     * Applies a glossy effect
     */
    glossy? : boolean
}

export interface QBtnToggle extends Vue {
    /**
     * Configure material ripple (disable it by setting it to 'false' or supply a config object)
     */
    ripple? : boolean | any
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : any
    /**
     * Array of Objects defining each option
     */
    options : any[]
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    toggleColor? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    toggleTextColor? : string
    /**
     * Spread horizontally to all available space
     */
    spread? : boolean
    /**
     * Use 'outline' design
     */
    outline? : boolean
    /**
     * Use 'flat' design
     */
    flat? : boolean
    /**
     * Remove shadow
     */
    unelevated? : boolean
    /**
     * Applies a more prominent border-radius for a squared shape button
     */
    rounded? : boolean
    /**
     * Use 'push' design
     */
    push? : boolean
    /**
     * Applies a glossy effect
     */
    glossy? : boolean
    /**
     * Button size name or a CSS unit including unit name
     */
    size? : string
    /**
     * Avoid turning label text into caps (which happens by default)
     */
    noCaps? : boolean
    /**
     * Avoid label text wrapping
     */
    noWrap? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Stack icon and label vertically instead of on same line (like it is by default)
     */
    stack? : boolean
    /**
     * When used on flexbox parent, button will stretch to parent's height
     */
    stretch? : boolean
}

export interface QCard extends Vue {
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Removes border-radius so borders are squared
     */
    square? : boolean
    /**
     * Applies a 'flat' design (no default shadow)
     */
    flat? : boolean
    /**
     * Applies a default border to the component
     */
    bordered? : boolean
}

export interface QCardActions extends Vue {
    /**
     * Specify how to align the actions
     */
    align? : string
    /**
     * Display actions one below the other
     */
    vertical? : boolean
}

export interface QCardSection extends Vue {
}

export interface QCarousel extends Vue {
    /**
     * Fullscreen mode
     */
    fullscreen? : boolean
    /**
     * Changing route app won't exit fullscreen
     */
    noRouteFullscreenExit? : boolean
    /**
     * Model of the component defining current panel's name; If used as Number, it does not defines panel index though but slide name's which may be an Integer; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : any
    /**
     * Equivalent to using Vue's native <keep-alive> component on the content
     */
    keepAlive? : boolean
    /**
     * Equivalent to using Vue's native include prop for <keep-alive>
     */
    keepAliveInclude? : string | any[]
    /**
     * Equivalent to using Vue's native exclude prop for <keep-alive>
     */
    keepAliveExclude? : string | any[]
    /**
     * Equivalent to using Vue's native max prop for <keep-alive>
     */
    keepAliveMax? : number
    /**
     * Enable transitions between panel (also see 'transition-prev' and 'transition-next' props)
     */
    animated? : boolean
    /**
     * Makes component appear as infinite (when reaching last panel, next one will become the first one)
     */
    infinite? : boolean
    /**
     * Enable swipe events (may interfere with content's touch/mouse events)
     */
    swipeable? : boolean
    /**
     * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
     */
    transitionPrev? : string
    /**
     * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
     */
    transitionNext? : string
    /**
     * Height of Carousel in CSS units, including unit name
     */
    height? : string
    /**
     * Applies a default padding to each slide, according to the usage of 'arrows' and 'navigation' props
     */
    padding? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    controlColor? : string
    /**
     * Jump to next slide at fixed time intervals (in milliseconds); 'false' disables autoplay, 'true' enables it for 5000ms intervals
     */
    autoplay? : number | boolean
    /**
     * Show navigation arrow buttons
     */
    arrows? : boolean
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    prevIcon? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    nextIcon? : string
    /**
     * Show navigation dots
     */
    navigation? : boolean
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    navigationIcon? : string
    /**
     * Show thumbnails
     */
    thumbnails? : boolean
    /**
     * Toggle the view to be fullscreen or not fullscreen
     */
    toggleFullscreen (): void
    /**
     * Enter the fullscreen view
     */
    setFullscreen (): void
    /**
     * Leave the fullscreen view
     */
    exitFullscreen (): void
    /**
     * Go to next panel
     */
    next (): void
    /**
     * Go to previous panel
     */
    previous (): void
    /**
     * Go to specific panel
     * @param panelName Panel's name, which may be a String or Number; Number does not refers to panel index, but to its name, which may be an Integer
     */
    goTo (panelName : string | number): void
}

export interface QCarouselControl extends Vue {
    /**
     * Side/corner to stick to
     */
    position? : string
    /**
     * An array of two numbers to offset the component horizontally and vertically (in pixels)
     */
    offset? : any[]
}

export interface QCarouselSlide extends Vue {
    /**
     * Slide name
     */
    name : any
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * URL pointing to a slide background image (use statics folder)
     */
    imgSrc? : string
}

export interface QChatMessage extends Vue {
    /**
     * Render as a sent message (so from current user)
     */
    sent? : boolean
    /**
     * Renders a label header/section only
     */
    label? : string
    /**
     * Color name (from the Quasar Color Palette) for chat bubble background
     */
    bgColor? : string
    /**
     * Color name (from the Quasar Color Palette) for chat bubble text
     */
    textColor? : string
    /**
     * Author's name
     */
    name? : string
    /**
     * URL to the avatar image of the author; Suggestion: use a static resource
     */
    avatar? : string
    /**
     * Array of strings that are the message body. Strings are not sanitized (see details in docs)
     */
    text? : string
    /**
     * Creation timestamp
     */
    stamp? : string
    /**
     * 1-12 out of 12 (same as col-*)
     */
    size? : string
    /**
     * Force use of textContent instead of innerHTML to render label; Use it when the label might be unsafe (from user input)
     */
    labelSanitize? : boolean
    /**
     * Force use of textContent instead of innerHTML to render name; Use it when the name might be unsafe (from user input)
     */
    nameSanitize? : boolean
    /**
     * Force use of textContent instead of innerHTML to render text; Use it when the text might be unsafe (from user input)
     */
    textSanitize? : boolean
    /**
     * Force use of textContent instead of innerHTML to render stamp; Use it when the stamp might be unsafe (from user input)
     */
    stampSanitize? : boolean
}

export interface QCheckbox extends Vue {
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value : any | any[]
    /**
     * Works when model ('value') is Array. It tells the component which value should add/remove when ticked/unticked
     */
    val? : any
    /**
     * What model value should be considered as checked/ticked/on?
     */
    trueValue? : any
    /**
     * What model value should be considered as unchecked/unticked/off?
     */
    falseValue? : any
    /**
     * Label to display along the component (or use the default slot instead of this prop)
     */
    label? : string
    /**
     * Label (if any specified) should be displayed on the left side of the component
     */
    leftLabel? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Should the color (if specified any) be kept when the component is unticked/ off?
     */
    keepColor? : boolean
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
    /**
     * What model value should be considered as 'indeterminate'?
     */
    indeterminateValue? : any
    /**
     * When user clicks/taps on the component, should we toggle through the indeterminate state too?
     */
    toggleIndeterminate? : boolean
    /**
     * Toggle the state (of the model)
     */
    toggle (): void
}

export interface QChip extends Vue {
    /**
     * Configure material ripple (disable it by setting it to 'false' or supply a config object)
     */
    ripple? : boolean | any
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    iconRight? : string
    /**
     * Chip's content as string; overrides default slot if specified
     */
    label? : string | number
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Model of the component determining if QChip should be rendered or not
     */
    value? : boolean
    /**
     * Model for QChip if it's selected or not
     */
    selected? : boolean
    /**
     * Sets a low value for border-radius instead of the default one, making it close to a square
     */
    square? : boolean
    /**
     * Display using the 'outline' design
     */
    outline? : boolean
    /**
     * Is QChip clickable? If it's the case, then it will add hover effects and emit 'click' events
     */
    clickable? : boolean
    /**
     * If set, then it displays a 'remove' icon that when clicked the QChip emits 'remove' event
     */
    removable? : boolean
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
    /**
     * Put component in disabled mode
     */
    disable? : boolean
}

export interface QCircularProgress extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Current progress (must be between min/max)
     */
    value? : number
    /**
     * Minimum value defining 'no progress' (must be lower than 'max')
     */
    min? : number
    /**
     * Maximum value defining 100% progress made (must be higher than 'min')
     */
    max? : number
    /**
     * Color name for the arc progress from the Quasar Color Palette
     */
    color? : string
    /**
     * Color name for the center part of the component from the Quasar Color Palette
     */
    centerColor? : string
    /**
     * Color name for the track of the component from the Quasar Color Palette
     */
    trackColor? : string
    /**
     * Size of text in CSS units, including unit name. Suggestion: use 'em' units to sync with component size
     */
    fontSize? : string
    /**
     * Thickness of progress arc as a ratio (0.0 < x < 1.0) of component size
     */
    thickness? : number
    /**
     * Angle to rotate progress arc by
     */
    angle? : number
    /**
     * Put component into 'indeterminate' state; Ignores 'value' prop
     */
    indeterminate? : boolean
    /**
     * Enables the default slot and uses it (if available), otherwise it displays the 'value' prop as text; Make sure the text has enough space to be displayed inside the component
     */
    showValue? : boolean
    /**
     * Reverses the direction of progress; Only for determined state
     */
    reverse? : boolean
}

export interface QColor extends Vue {
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : string
    /**
     * The default value to show when the model doesn't have one
     */
    defaultValue? : string
    /**
     * The default view of the picker
     */
    defaultView? : string
    /**
     * Forces a certain model format upon the model
     */
    formatModel? : string
    /**
     * Use a custom palette of colors for the palette tab
     */
    palette? : any[]
    /**
     * Do not render header
     */
    noHeader? : boolean
    /**
     * Do not render footer; Useful when you want a specific view ('default-view' prop) and don't want the user to be able to switch it
     */
    noFooter? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
}

export interface QDate extends Vue {
    /**
     * Date of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value : string
    /**
     * Display the component in landscape mode
     */
    landscape? : boolean
    /**
     * Mask (formatting string) used for parsing and formatting value
     */
    mask? : string
    /**
     * Locale formatting options
     */
    locale? : {
            /**
             * List of full day names (DDDD), starting with Sunday
             */
            days? : any[]
            /**
             * List of short day names (DDD), starting with Sunday
             */
            daysShort? : any[]
            /**
             * List of full month names (MMMM), starting with January
             */
            months? : any[]
            /**
             * List of short month names (MMM), starting with January
             */
            monthsShort? : any[] }
    /**
     * Specify calendar type
     */
    calendar? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Removes border-radius so borders are squared
     */
    square? : boolean
    /**
     * Applies a 'flat' design (no default shadow)
     */
    flat? : boolean
    /**
     * Applies a default border to the component
     */
    bordered? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * When specified, it overrides the default header title; Makes sense when not in 'minimal' mode
     */
    title? : string
    /**
     * When specified, it overrides the default header subtitle; Makes sense when not in 'minimal' mode
     */
    subtitle? : string
    /**
     * Emit model when user browses month and year too
     */
    emitImmediately? : boolean
    /**
     * The default year and month to display (in YYYY/MM format) when model is unfilled (undefined or null)
     */
    defaultYearMonth? : string
    /**
     * The view which will be displayed by default
     */
    defaultView? : string
    /**
     * A list of events to highlight on the calendar; If using a function, it receives the date as a String and must return a Boolean (matches or not)
     */
    events? : any[] | Function
    /**
     * Color name (from the Quasar Color Palette); If using a function, it receives the date as a String and must return a String (color for the received date)
     */
    eventColor? : string | Function
    /**
     * Optionally configure the days that are selectable; If using a function, it receives the date as a String and must return a Boolean (is date acceptable or not)
     */
    options? : any[] | Function
    /**
     * Sets the day of the week that is considered the first day (0 - Sunday, 1 - Monday, ...); This day will show in the left-most column of the calendar
     */
    firstDayOfWeek? : string | number
    /**
     * Display a button that selects the current day
     */
    todayBtn? : boolean
    /**
     * Don’t display the header
     */
    minimal? : boolean
    /**
     * Change model to today
     */
    setToday (): void
    /**
     * Change current view
     * @param view QDate view name
     */
    setView (view : string): void
    /**
     * Increment or decrement calendar view's month or year
     * @param type What to increment/decrement
     * @param descending Decrement?
     */
    offsetCalendar (type : string, descending? : boolean): void
}

export interface QTime extends Vue {
    /**
     * Time of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value : string
    /**
     * Display the component in landscape mode
     */
    landscape? : boolean
    /**
     * Mask (formatting string) used for parsing and formatting value
     */
    mask? : string
    /**
     * Locale formatting options
     */
    locale? : {
            /**
             * List of full day names (DDDD), starting with Sunday
             */
            days? : any[]
            /**
             * List of short day names (DDD), starting with Sunday
             */
            daysShort? : any[]
            /**
             * List of full month names (MMMM), starting with January
             */
            months? : any[]
            /**
             * List of short month names (MMM), starting with January
             */
            monthsShort? : any[] }
    /**
     * Specify calendar type
     */
    calendar? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Removes border-radius so borders are squared
     */
    square? : boolean
    /**
     * Applies a 'flat' design (no default shadow)
     */
    flat? : boolean
    /**
     * Applies a default border to the component
     */
    bordered? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Forces 24 hour time display instead of AM/PM system
     */
    format24h? : boolean
    /**
     * Optionally configure what time is the user allowed to set; Overriden by 'hour-options', 'minute-options' and 'second-options' if those are set
     */
    options? : Function
    /**
     * Optionally configure what hours is the user allowed to set; Overrides 'options' prop if that is also set
     */
    hourOptions? : any[]
    /**
     * Optionally configure what minutes is the user allowed to set; Overrides 'options' prop if that is also set
     */
    minuteOptions? : any[]
    /**
     * Optionally configure what seconds is the user allowed to set; Overrides 'options' prop if that is also set
     */
    secondOptions? : any[]
    /**
     * Allow the time to be set with seconds
     */
    withSeconds? : boolean
    /**
     * Display a button that selects the current time
     */
    nowBtn? : boolean
    /**
     * Change model to current moment
     */
    setNow (): void
}

export interface QDialog extends Vue {
    /**
     * Class definitions to be attributed to the content
     */
    contentClass? : any[] | string | any
    /**
     * Style definitions to be attributed to the content
     */
    contentStyle? : any[] | string | any
    /**
     * Model of the component defining shown/hidden state; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : boolean
    /**
     * User cannot dismiss Dialog if clicking outside of it or hitting ESC key; Also, an app route change won't dismiss it
     */
    persistent? : boolean
    /**
     * User cannot dismiss Dialog by hitting ESC key; No need to set it if 'persistent' prop is also set
     */
    noEscDismiss? : boolean
    /**
     * User cannot dismiss Dialog by clicking outside of it; No need to set it if 'persistent' prop is also set
     */
    noBackdropDismiss? : boolean
    /**
     * Changing route app won't dismiss Dialog; No need to set it if 'persistent' prop is also set
     */
    noRouteDismiss? : boolean
    /**
     * Any click/tap inside of the dialog will close it
     */
    autoClose? : boolean
    /**
     * Put Dialog into seamless mode; Does not use a backdrop so user is able to interact with the rest of the page too
     */
    seamless? : boolean
    /**
     * Put Dialog into maximized mode
     */
    maximized? : boolean
    /**
     * Dialog will try to render with same width as the window
     */
    fullWidth? : boolean
    /**
     * Dialog will try to render with same height as the window
     */
    fullHeight? : boolean
    /**
     * Stick dialog to one of the sides (top, right, bottom or left)
     */
    position? : string
    /**
     * One of Quasar's embedded transitions
     */
    transitionShow? : string
    /**
     * One of Quasar's embedded transitions
     */
    transitionHide? : string
    /**
     * Forces content to have squared borders
     */
    square? : boolean
    /**
     * (Accessibility) When Dialog gets hidden, do not refocus on the DOM element that previously had focus
     */
    noRefocus? : boolean
    /**
     * (Accessibility) When Dialog gets shown, do not switch focus on it
     */
    noFocus? : boolean
    /**
     * Triggers component to show
     * @param evt JS event object
     */
    show (evt? : any): void
    /**
     * Triggers component to hide
     * @param evt JS event object
     */
    hide (evt? : any): void
    /**
     * Triggers component to toggle between show/hide
     * @param evt JS event object
     */
    toggle (evt? : any): void
    /**
     * Focus dialog; if you have content with autofocus attribute, it will directly focus it
     */
    focus (): void
    /**
     * Shakes dialog
     */
    shake (): void
}

export interface QEditor extends Vue {
    /**
     * Fullscreen mode
     */
    fullscreen? : boolean
    /**
     * Changing route app won't exit fullscreen
     */
    noRouteFullscreenExit? : boolean
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value : string
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Removes border-radius so borders are squared
     */
    square? : boolean
    /**
     * Applies a 'flat' design (no borders)
     */
    flat? : boolean
    /**
     * Dense mode; toolbar buttons are shown on one-line only
     */
    dense? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * CSS unit for the minimum height of the editable area
     */
    minHeight? : string
    /**
     * CSS unit for maximum height of the input area
     */
    maxHeight? : string
    /**
     * CSS value to set the height of the editable area
     */
    height? : string
    /**
     * Definition of commands and their buttons to be included in the 'toolbar' prop
     */
    definitions? : {
            /**
             * Label of the button
             */
            label? : string
            /**
             * Text to be displayed as a tooltip on hover
             */
            tip? : string
            /**
             * HTML formatted text to be displayed within a tooltip on hover
             */
            htmlTip? : string
            /**
             * Icon of the button
             */
            icon? : string
            /**
             * Keycode of a key to be used together with the <ctrl> key for use as a shortcut to trigger this element
             */
            key? : number
            /**
             * Either this or "cmd" is required. Function for when button gets clicked/tapped.
             */
            handler? : Function
            /**
             * Either this or "handler" is required. This must be a valid execCommand method according to the designMode API.
             */
            cmd? : string
            /**
             * Only set a param if using a "cmd". This is commonly text or HTML to inject, but is highly dependent upon the specific cmd being called.
             */
            param? : string | Function
            /**
             * Is button disabled? If specifying a function, return a Boolean value.
             */
            disable? : boolean | Function
            /**
             * Pass the value "no-state" if the button should not have an "active" state
             */
            type? : string }
    /**
     * Object with definitions of fonts
     */
    fonts? : any
    /**
     * An array of arrays of Objects/Strings that you use to define the construction of the elements and commands available in the toolbar
     */
    toolbar? : any[]
    /**
     * Font color (from the Quasar Palette) of buttons and text in the toolbar
     */
    toolbarColor? : string
    /**
     * Text color (from the Quasar Palette) of toolbar commands
     */
    toolbarTextColor? : string
    /**
     * Choose the active color (from the Quasar Palette) of toolbar commands button
     */
    toolbarToggleColor? : string
    /**
     * Toolbar background color (from Quasar Palette)
     */
    toolbarBg? : string
    /**
     * Toolbar buttons are rendered "outlined"
     */
    toolbarOutline? : boolean
    /**
     * Toolbar buttons are rendered as a "push-button" type
     */
    toolbarPush? : boolean
    /**
     * Toolbar buttons are rendered "rounded"
     */
    toolbarRounded? : boolean
    /**
     * Object with CSS properties and values for styling the container of QEditor
     */
    contentStyle? : any
    /**
     * CSS classes for the input area
     */
    contentClass? : any | any[] | string
    /**
     * Toggle the view to be fullscreen or not fullscreen
     */
    toggleFullscreen (): void
    /**
     * Enter the fullscreen view
     */
    setFullscreen (): void
    /**
     * Leave the fullscreen view
     */
    exitFullscreen (): void
    /**
     * Run contentEditable command at caret position and range
     * @param cmd Must be a valid execCommand method according to the designMode API
     * @param param The argument to pass to the command
     * @param update Refresh the toolbar
     */
    runCmd (cmd : string, param? : string, update? : boolean): void
    /**
     * Hide the link editor if visible and force the instance to re-render
     */
    refreshToolbar (): void
    /**
     * Focus on the contentEditable at saved cursor position
     */
    focus (): void
    /**
     * Retrieve the content of the Editor
     * @returns Provides the pure HTML within the editable area
     */
    getContentEl (): string
}

export interface QFab extends Vue {
    /**
     * Controls state of fab actions (showing/hidden); Works best with v-model directive, otherwise use along listening to 'input' event
     */
    value? : boolean
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    activeIcon? : string
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Direction to expand Fab Actions to
     */
    direction? : string
    /**
     * By default, Fab Actions are hidden when user navigates to another route and this prop disables this behavior
     */
    persistent? : boolean
    /**
     * Define the button HTML DOM type
     */
    type? : string
    /**
     * Use 'outline' design for Fab button
     */
    outline? : boolean
    /**
     * Use 'push' design for Fab button
     */
    push? : boolean
    /**
     * Use 'flat' design for Fab button
     */
    flat? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Apply the glossy effect over the button
     */
    glossy? : boolean
    /**
     * Expands fab actions list
     * @param evt JS event object
     */
    show (evt? : any): void
    /**
     * Collapses fab actions list
     * @param evt JS event object
     */
    hide (evt? : any): void
    /**
     * Triggers component to toggle between show/hide
     * @param evt JS event object
     */
    toggle (evt? : any): void
}

export interface QFabAction extends Vue {
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon : string
    /**
     * Define the button HTML DOM type
     */
    type? : string
    /**
     * Use 'outline' design for Fab button
     */
    outline? : boolean
    /**
     * Use 'push' design for Fab button
     */
    push? : boolean
    /**
     * Use 'flat' design for Fab button
     */
    flat? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Apply the glossy effect over the button
     */
    glossy? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'to' property
     */
    to? : string | any
    /**
     * Equivalent to Vue Router <router-link> 'replace' property
     */
    replace? : boolean
    /**
     * Emulate click on QFabAction
     * @param evt JS event object
     */
    click (evt? : any): void
}

export interface QField extends Vue {
    /**
     * Does field have validation errors?
     */
    error? : boolean
    /**
     * Validation error message (gets displayed only if 'error' is set to 'true')
     */
    errorMessage? : string
    /**
     * Hide error icon when there is an error
     */
    noErrorIcon? : boolean
    /**
     * Array of Functions/Strings; If String, then it must be a name of one of the embedded validation rules
     */
    rules? : any[]
    /**
     * Check validation status against the 'rules' only after field loses focus for first time
     */
    lazyRules? : boolean
    /**
     * A text label that will “float” up above the input field, once the field gets focus
     */
    label? : string
    /**
     * Label will be always shown above the field regardless of field content (if any)
     */
    stackLabel? : boolean
    /**
     * Helper (hint) text which gets placed below your wrapped form component
     */
    hint? : string
    /**
     * Hide the helper (hint) text when field doesn't have focus
     */
    hideHint? : boolean
    /**
     * Prefix
     */
    prefix? : string
    /**
     * Suffix
     */
    suffix? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    bgColor? : string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Signals the user a process is in progress by displaying a spinner; Spinner can be customized by using the 'loading' slot.
     */
    loading? : boolean
    /**
     * Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null
     */
    clearable? : boolean
    /**
     * Custom icon to use for the clear button when using along with 'clearable' prop
     */
    clearIcon? : string
    /**
     * Use 'filled' design for the field
     */
    filled? : boolean
    /**
     * Use 'outlined' design for the field
     */
    outlined? : boolean
    /**
     * Use 'borderless' design for the field
     */
    borderless? : boolean
    /**
     * Use 'standout' design for the field; Specifies classes to be applied when focused (overriding default ones)
     */
    standout? : boolean | string
    /**
     * Enables bottom slots ('error', 'hint', 'counter')
     */
    bottomSlots? : boolean
    /**
     * Does not reserves space for hint/error/counter anymore when these are not used; as a result, it also disables the animation for those
     */
    hideBottomSpace? : boolean
    /**
     * Show an automatic counter on bottom right
     */
    counter? : boolean
    /**
     * Applies a small standard border-radius for a squared shape of the component
     */
    rounded? : boolean
    /**
     * Remove border-radius so borders are squared; Overrides 'rounded' prop
     */
    square? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Align content to match QItem
     */
    itemsAligned? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Focus field on initial component render
     */
    autofocus? : boolean
    /**
     * Specify a max length of model
     */
    maxlength? : string | number
    /**
     * Match inner content alignments to QItem
     */
    itemAligned? : boolean
    /**
     * Reset validation status
     */
    resetValidation (): void
    /**
     * Trigger a validation
     * @param value Optional value to validate against
     */
    validate (value? : any): void
    /**
     * Focus field
     */
    focus (): void
    /**
     * Blur field (lose focus)
     */
    blur (): void
}

export interface QForm extends Vue {
    /**
     * Focus first focusable element on initial component render
     */
    autofocus? : boolean
    /**
     * Do not try to focus on first component that has a validation error when submitting form
     */
    noErrorFocus? : boolean
    /**
     * Do not try to focus on first component when resetting form
     */
    noResetFocus? : boolean
    /**
     * Validate all fields in form (by default it stops after finding the first invalid field with synchronous validation)
     */
    greedy? : boolean
    /**
     * Focus on first focusable element/component in the form
     */
    focus (): void
    /**
     * Triggers a validation on all applicable inner Quasar components
     * @param shouldFocus Tell if it should focus or not on component with error on submitting form; Overrides 'no-focus-error' prop if specified
     * @returns Promise is always fulfilled and receives the outcome (true -> validation was a success, false -> invalid models detected)
     */
    validate (shouldFocus? : boolean): Promise<boolean>
    /**
     * Resets the validation on all applicable inner Quasar components
     */
    resetValidation (): void
    /**
     * Manually trigger form validation and submit
     * @param evt JS event object
     */
    submit (evt? : any): void
    /**
     * Manually trigger form reset
     * @param evt JS event object
     */
    reset (evt? : any): void
}

export interface QIcon extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Name of the icon, following Quasar convention
     */
    name? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Useful if icon is on the left side of something: applies a standard margin on the right side of Icon
     */
    left? : boolean
    /**
     * Useful if icon is on the right side of something: applies a standard margin on the left side of Icon
     */
    right? : boolean
}

export interface QImg extends Vue {
    /**
     * Path to image
     */
    src? : string
    /**
     * Same syntax as <img> srcset attribute.
     */
    srcset? : string
    /**
     * Same syntax as <img> sizes attribute.
     */
    sizes? : string
    /**
     * Specifies an alternate text for the image, if the image cannot be displayed
     */
    alt? : string
    /**
     * While waiting for your image to load, you can use a placeholder image
     */
    placeholderSrc? : string
    /**
     * Do not use transitions; faster render
     */
    basic? : boolean
    /**
     * Make sure that the image getting displayed is fully contained, regardless if additional blank space besides the image is needed on horizontal or vertical
     */
    contain? : boolean
    /**
     * Equivalent to CSS background-position property
     */
    position? : string
    /**
     * Force the component to maintain an aspect ratio
     */
    ratio? : string | number
    /**
     * One of Quasar's embedded transitions
     */
    transition? : string
    /**
     * Color name for default Spinner (unless using a 'loading' slot)
     */
    spinnerColor? : string
    /**
     * Size in CSS units, including unit name, for default Spinner (unless using a 'loading' slot)
     */
    spinnerSize? : string
    /**
     * Do not display the default spinner when loading images (unless you are specifying one through the 'loading' slot)
     */
    noDefaultSpinner? : boolean
}

export interface QInfiniteScroll extends Vue {
    /**
     * Offset (pixels) to bottom of Infinite Scroll container from which the component should start loading more content in advance
     */
    offset? : number
    /**
     * Debounce amount (in milliseconds)
     */
    debounce? : string | number
    /**
     * CSS selector or DOM element to be used as scroll container instead of the auto detected one
     */
    scrollTarget? : Element | string
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Scroll area should behave like a messenger - starting scrolled to bottom and loading when reaching the top
     */
    reverse? : boolean
    /**
     * Checks scroll position and loads more content if necessary
     */
    poll (): void
    /**
     * Tells Infinite Scroll to load more content, regardless of the scroll position
     */
    trigger (): void
    /**
     * Resets calling index to 0
     */
    reset (): void
    /**
     * Stops working, regardless of scroll position
     */
    stop (): void
    /**
     * Starts working. Checks scroll position upon call and if trigger is hit, it loads more content
     */
    resume (): void
    /**
     * Updates the scroll target; Useful when the parent elements change so that the scrolling target also changes
     */
    updateScrollTarget (): void
}

export interface QInnerLoading extends Vue {
    /**
     * Size in CSS units, including unit name, or standard size name (xs|sm|md|lg|xl), for the inner Spinner (unless using the default slot)
     */
    size? : string
    /**
     * State - loading or not
     */
    showing? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * One of Quasar's embedded transitions
     */
    transitionShow? : string
    /**
     * One of Quasar's embedded transitions
     */
    transitionHide? : string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
}

export interface QInput extends Vue {
    /**
     * Custom mask or one of the predefined mask names
     */
    mask? : string
    /**
     * Fills string with specified characters (or underscore if value is not string) to fill mask's length
     */
    fillMask? : boolean | string
    /**
     * Fills string from the right side of the mask
     */
    reverseFillMask? : boolean
    /**
     * Model will be unmasked (won't contain tokens/separation characters)
     */
    unmaskedValue? : boolean
    /**
     * Does field have validation errors?
     */
    error? : boolean
    /**
     * Validation error message (gets displayed only if 'error' is set to 'true')
     */
    errorMessage? : string
    /**
     * Hide error icon when there is an error
     */
    noErrorIcon? : boolean
    /**
     * Array of Functions/Strings; If String, then it must be a name of one of the embedded validation rules
     */
    rules? : any[]
    /**
     * Check validation status against the 'rules' only after field loses focus for first time
     */
    lazyRules? : boolean
    /**
     * A text label that will “float” up above the input field, once the field gets focus
     */
    label? : string
    /**
     * Label will be always shown above the field regardless of field content (if any)
     */
    stackLabel? : boolean
    /**
     * Helper (hint) text which gets placed below your wrapped form component
     */
    hint? : string
    /**
     * Hide the helper (hint) text when field doesn't have focus
     */
    hideHint? : boolean
    /**
     * Prefix
     */
    prefix? : string
    /**
     * Suffix
     */
    suffix? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    bgColor? : string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Signals the user a process is in progress by displaying a spinner; Spinner can be customized by using the 'loading' slot.
     */
    loading? : boolean
    /**
     * Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null
     */
    clearable? : boolean
    /**
     * Custom icon to use for the clear button when using along with 'clearable' prop
     */
    clearIcon? : string
    /**
     * Use 'filled' design for the field
     */
    filled? : boolean
    /**
     * Use 'outlined' design for the field
     */
    outlined? : boolean
    /**
     * Use 'borderless' design for the field
     */
    borderless? : boolean
    /**
     * Use 'standout' design for the field; Specifies classes to be applied when focused (overriding default ones)
     */
    standout? : boolean | string
    /**
     * Enables bottom slots ('error', 'hint', 'counter')
     */
    bottomSlots? : boolean
    /**
     * Does not reserves space for hint/error/counter anymore when these are not used; as a result, it also disables the animation for those
     */
    hideBottomSpace? : boolean
    /**
     * Show an automatic counter on bottom right
     */
    counter? : boolean
    /**
     * Applies a small standard border-radius for a squared shape of the component
     */
    rounded? : boolean
    /**
     * Remove border-radius so borders are squared; Overrides 'rounded' prop
     */
    square? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Align content to match QItem
     */
    itemsAligned? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Focus field on initial component render
     */
    autofocus? : boolean
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value : string | number
    /**
     * Input type
     */
    type? : string
    /**
     * Debounce amount (in milliseconds) when updating model
     */
    debounce? : string | number
    /**
     * Specify a max length of model
     */
    maxlength? : string | number
    /**
     * Make field autogrow along with its content (uses a textarea)
     */
    autogrow? : boolean
    /**
     * Class definitions to be attributed to the underlying input tag
     */
    inputClass? : any[] | string | any
    /**
     * Style definitions to be attributed to the underlying input tag
     */
    inputStyle? : any[] | string | any
    /**
     * Reset validation status
     */
    resetValidation (): void
    /**
     * Trigger a validation
     * @param value Optional value to validate against
     */
    validate (value? : any): void
    /**
     * Focus underlying input tag
     */
    focus (): void
    /**
     * Lose focus on underlying input tag
     */
    blur (): void
    /**
     * Select input text
     */
    select (): void
}

export interface QKnob extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Any number to indicate the given value of the knob. Either use this property (along with a listener for 'input' event) OR use the v-model directive
     */
    value? : number
    /**
     * The minimum value that the model (the knob value) should start at
     */
    min? : number
    /**
     * The maximimum value that the model (the knob value) should go to
     */
    max? : number
    /**
     * A number representing steps in the value of the model, while adjusting the knob
     */
    step? : number
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Color name for the center part of the component from the Quasar Color Palette
     */
    centerColor? : string
    /**
     * Color name for the track of the component from the Quasar Color Palette
     */
    trackColor? : string
    /**
     * Size of text in CSS units, including unit name. Suggestion: use 'em' units to sync with component size
     */
    fontSize? : string
    /**
     * Thickness of progress arc as a ratio (0.0 < x < 1.0) of component size
     */
    thickness? : number
    /**
     * Angle to rotate progress arc by
     */
    angle? : number
    /**
     * Enables the default slot and uses it (if available), otherwise it displays the 'value' prop as text; Make sure the text has enough space to be displayed inside the component
     */
    showValue? : boolean
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
}

export interface QDrawer extends Vue {
    /**
     * Model of the component defining shown/hidden state; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : boolean
    /**
     * Side to attach to
     */
    side? : string
    /**
     * Puts drawer into overlay mode (does not occupies space on screen, narrowing the page)
     */
    overlay? : boolean
    /**
     * Width of drawer (in pixels)
     */
    width? : number
    /**
     * Puts drawer into mini mode
     */
    mini? : boolean
    /**
     * Width of drawer (in pixels) when in mini mode
     */
    miniWidth? : number
    /**
     * Mini mode will expand as an overlay
     */
    miniToOverlay? : boolean
    /**
     * Breakpoint (in pixels) of layout width up to which mobile mode is used
     */
    breakpoint? : number
    /**
     * Overrides the default dynamic mode into which the drawer is put on
     */
    behavior? : string
    /**
     * Applies a default border to the component
     */
    bordered? : boolean
    /**
     * Adds a default shadow to the header
     */
    elevated? : boolean
    /**
     * Does not auto-closes when app's route changes
     */
    persistent? : boolean
    /**
     * Force drawer to be shown on screen on initial render if the layout width is above breakpoint, regardless of v-model; This is the default behavior when SSR is taken over by client on initial render
     */
    showIfAbove? : boolean
    /**
     * Class definitions to be attributed to the drawer
     */
    contentClass? : any[] | string | any
    /**
     * Style definitions to be attributed to the drawer
     */
    contentStyle? : any[] | string | any
    /**
     * Disables the default behavior where drawer can be swiped into view; Useful for iOS platforms where it might interfere with Safari's 'swipe to go to previous/next page' feature
     */
    noSwipeOpen? : boolean
    /**
     * Disables the default behavior where drawer can be swiped out of view (applies to drawer content only); Useful for iOS platforms where it might interfere with Safari's 'swipe to go to previous/next page' feature
     */
    noSwipeClose? : boolean
    /**
     * Disable the default behavior where drawer backdrop can be swiped
     */
    noSwipeBackdrop? : boolean
    /**
     * Triggers component to show
     * @param evt JS event object
     */
    show (evt? : any): void
    /**
     * Triggers component to hide
     * @param evt JS event object
     */
    hide (evt? : any): void
    /**
     * Triggers component to toggle between show/hide
     * @param evt JS event object
     */
    toggle (evt? : any): void
}

export interface QFooter extends Vue {
    /**
     * Model of the component defining if it is shown or hidden to the user; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : boolean
    /**
     * Enable 'reveal' mode; Takes into account user scroll to temporarily show/hide footer
     */
    reveal? : boolean
    /**
     * Applies a default border to the component
     */
    bordered? : boolean
    /**
     * Adds a default shadow to the footer
     */
    elevated? : boolean
    /**
     * When using SSR, you can optionally hint of the height (in pixels) of the QFooter
     */
    heightHint? : number | string
}

export interface QHeader extends Vue {
    /**
     * Model of the component defining if it is shown or hidden to the user; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : boolean
    /**
     * Enable 'reveal' mode; Takes into account user scroll to temporarily show/hide header
     */
    reveal? : boolean
    /**
     * Amount of scroll (in pixels) that should trigger a 'reveal' state change
     */
    revealOffset? : number
    /**
     * Applies a default border to the component
     */
    bordered? : boolean
    /**
     * Adds a default shadow to the header
     */
    elevated? : boolean
    /**
     * When using SSR, you can optionally hint of the height (in pixels) of the QHeader
     */
    heightHint? : number | string
}

export interface QLayout extends Vue {
    /**
     * Defines how your layout components (header/footer/drawer) should be placed on screen; See docs examples
     */
    view? : string
    /**
     * Containerize the layout which means it changes the default behavior of expanding to the whole window; Useful (but not limited to) for when using on a QDialog
     */
    container? : boolean
}

export interface QPage extends Vue {
    /**
     * Applies a default responsive page padding
     */
    padding? : boolean
    /**
     * Override default CSS style applied to the component (sets minHeight); Function(offset: Number) => CSS props/value: Object
     */
    styleFn? : Function
}

export interface QPageContainer extends Vue {
}

export interface QPageSticky extends Vue {
    /**
     * Page side/corner to stick to
     */
    position? : string
    /**
     * An array of two numbers to offset the component horizontally and vertically in pixels
     */
    offset? : any[]
    /**
     * By default the component shrinks to content's size; By using this prop you make the component fully expand horizontally or vertically, based on 'position' prop
     */
    expand? : boolean
}

export interface QLinearProgress extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Progress value (0.0 < x < 1.0)
     */
    value? : number
    /**
     * Optional buffer value (0.0 < x < 1.0)
     */
    buffer? : number
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Color name for component's track from the Quasar Color Palette
     */
    trackColor? : string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Reverse direction of progress
     */
    reverse? : boolean
    /**
     * Draw stripes; For determinate state only (for performance reasons)
     */
    stripe? : boolean
    /**
     * Put component into indeterminate mode
     */
    indeterminate? : boolean
    /**
     * Put component into query mode
     */
    query? : boolean
    /**
     * Applies a small standard border-radius for a squared shape of the component
     */
    rounded? : boolean
}

export interface QExpansionItem extends Vue {
    /**
     * Equivalent to Vue Router <router-link> 'to' property
     */
    to? : string | any
    /**
     * Equivalent to Vue Router <router-link> 'exact' property
     */
    exact? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'append' property
     */
    append? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'replace' property
     */
    replace? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'active-class' property
     */
    activeClass? : string
    /**
     * Equivalent to Vue Router <router-link> 'active-class' property
     */
    exactActiveClass? : string
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Model of the component defining 'open' state; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : boolean
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    expandIcon? : string
    /**
     * Apply custom class(es) to the expand icon item section
     */
    expandIconClass? : any[] | string | any
    /**
     * Header label (unless using 'header' slot)
     */
    label? : string
    /**
     * Apply ellipsis when there's not enough space to render on the specified number of lines; If more than one line specified, then it will only work on webkit browsers because it uses the '-webkit-line-clamp' CSS property!
     */
    labelLines? : number | string
    /**
     * Header sub-label (unless using 'header' slot)
     */
    caption? : string
    /**
     * Apply ellipsis when there's not enough space to render on the specified number of lines; If more than one line specified, then it will only work on webkit browsers because it uses the '-webkit-line-clamp' CSS property!
     */
    captionLines? : number | string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Animation duration (in milliseconds)
     */
    duration? : number
    /**
     * Apply an inset to header (unless using 'header' slot); Useful when header avatar/left side is missing but you want to align content with other items that do have a left side, or when you're building a menu
     */
    headerInsetLevel? : number
    /**
     * Apply an inset to content (changes content padding)
     */
    contentInsetLevel? : number
    /**
     * Apply a top and bottom separator when expansion item is opened
     */
    expandSeparator? : boolean
    /**
     * Puts expansion item into open state on initial render; Overriden by v-model if used
     */
    defaultOpened? : boolean
    /**
     * Applies the expansion events to the expand icon only and not to the whole header
     */
    expandIconToggle? : boolean
    /**
     * Switch expand icon side (from default 'right' to 'left')
     */
    switchToggleSide? : boolean
    /**
     * Use dense mode for expand icon
     */
    denseToggle? : boolean
    /**
     * Register expansion item into a group (unique name that must be applied to all expansion items in that group) for coordinated open/close state within the group a.k.a. 'accordion mode'
     */
    group? : string
    /**
     * Put expansion list into 'popup' mode
     */
    popup? : boolean
    /**
     * Apply custom style to the header
     */
    headerStyle? : any[] | string | any
    /**
     * Apply custom class(es) to the header
     */
    headerClass? : any[] | string | any
    /**
     * Triggers component to show
     * @param evt JS event object
     */
    show (evt? : any): void
    /**
     * Triggers component to hide
     * @param evt JS event object
     */
    hide (evt? : any): void
    /**
     * Triggers component to toggle between show/hide
     * @param evt JS event object
     */
    toggle (evt? : any): void
}

export interface QItem extends Vue {
    /**
     * Equivalent to Vue Router <router-link> 'to' property
     */
    to? : string | any
    /**
     * Equivalent to Vue Router <router-link> 'exact' property
     */
    exact? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'append' property
     */
    append? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'replace' property
     */
    replace? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'active-class' property
     */
    activeClass? : string
    /**
     * Equivalent to Vue Router <router-link> 'active-class' property
     */
    exactActiveClass? : string
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Put item into 'active' state
     */
    active? : boolean
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Is QItem clickable? If it's the case, then it will add hover effects and emit 'click' events
     */
    clickable? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Apply an inset; Useful when avatar/left side is missing but you want to align content with other items that do have a left side, or when you're building a menu
     */
    insetLevel? : number
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
    /**
     * HTML tag to render; Suggestion: use 'label' when encapsulating a QCheckbox/QRadio/QToggle so that when user clicks/taps on the whole item it will trigger a model change for the mentioned components
     */
    tag? : string
    /**
     * Put item into a manual focus state; Enables 'focused' prop which will determine if item is focused or not, rather than relying on native hover/focus states
     */
    manualFocus? : boolean
    /**
     * Determines focus state, ONLY if 'manual-focus' is enabled / set to true
     */
    focused? : boolean
}

export interface QItemLabel extends Vue {
    /**
     * Renders an overline label
     */
    overline? : boolean
    /**
     * Renders a caption label
     */
    caption? : boolean
    /**
     * Renders a header label
     */
    header? : boolean
    /**
     * Apply ellipsis when there's not enough space to render on the specified number of lines; If more than one line specified, then it will only work on webkit browsers because it uses the '-webkit-line-clamp' CSS property!
     */
    lines? : number | string
}

export interface QItemSection extends Vue {
    /**
     * Render an avatar item side (does not needs 'side' prop to be set)
     */
    avatar? : boolean
    /**
     * Render a thumbnail item side (does not needs 'side' prop to be set)
     */
    thumbnail? : boolean
    /**
     * Renders as a side of the item
     */
    side? : boolean
    /**
     * Align content to top (useful for multi-line items)
     */
    top? : boolean
    /**
     * Do not wrap text (useful for item's main content)
     */
    noWrap? : boolean
}

export interface QList extends Vue {
    /**
     * Applies a default border to the component
     */
    bordered? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Applies a separator between contained items
     */
    separator? : boolean
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Applies a material design-like padding on top and bottom
     */
    padding? : boolean
}

export interface QSlideItem extends Vue {
    /**
     * Color name for left-side background from the Quasar Color Palette
     */
    leftColor? : string
    /**
     * Color name for right-side background from the Quasar Color Palette
     */
    rightColor? : string
    /**
     * Color name for top-side background from the Quasar Color Palette
     */
    topColor? : string
    /**
     * Color name for bottom-side background from the Quasar Color Palette
     */
    bottomColor? : string
    /**
     * Reset to initial state (not swiped to any side)
     */
    reset (): void
}

export interface QMenu extends Vue {
    /**
     * Configure a target element to trigger component toggle; 'true' means it enables the parent DOM element, 'false' means it disables attaching events to any DOM elements; By using a String (CSS selector) it attaches the events to the specified DOM element (if it exists)
     */
    target? : boolean | string
    /**
     * Skips attaching events to the target DOM element (that trigger the element to get shown)
     */
    noParentEvent? : boolean
    /**
     * Allows the component to behave like a context menu, which opens with a right mouse click (or long tap on mobile)
     */
    contextMenu? : boolean
    /**
     * Class definitions to be attributed to the content
     */
    contentClass? : any[] | string | any
    /**
     * Style definitions to be attributed to the content
     */
    contentStyle? : any[] | string | any
    /**
     * Model of the component defining shown/hidden state; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : boolean
    /**
     * Allows the menu to match at least the full width of its target
     */
    fit? : boolean
    /**
     * Allows the menu to cover its target. When used, the 'self' and 'fit' props are no longer effective
     */
    cover? : boolean
    /**
     * Two values setting the starting position or anchor point of the menu relative to its target
     */
    anchor? : string
    /**
     * Two values setting the menu's own position relative to its target
     */
    self? : string
    /**
     * An array of two numbers to offset the menu horizontally and vertically in pixels
     */
    offset? : any[]
    /**
     * Allows for the target position to be set by the mouse position, when the target of the menu is either clicked or touched
     */
    touchPosition? : boolean
    /**
     * Allows the menu to not be dismissed by a click/tap outside of the menu or by hitting the ESC key
     */
    persistent? : boolean
    /**
     * Allows any click/tap in the menu to close it; Useful instead of attaching events to each menu item that should close the menu on click/tap
     */
    autoClose? : boolean
    /**
     * Separate from parent menu, marking it as a separate closing point for v-close-popup (without this, chained menus close all together)
     */
    separateClosePopup? : boolean
    /**
     * Forces content to have squared borders
     */
    square? : boolean
    /**
     * (Accessibility) When Menu gets hidden, do not refocus on the DOM element that previously had focus
     */
    noRefocus? : boolean
    /**
     * (Accessibility) When Menu gets shown, do not switch focus on it
     */
    noFocus? : boolean
    /**
     * The maximimum height of the menu; Size in CSS units, including unit name
     */
    maxHeight? : string
    /**
     * The maximimum width of the menu; Size in CSS units, including unit name
     */
    maxWidth? : string
    /**
     * One of Quasar's embedded transitions
     */
    transitionShow? : string
    /**
     * One of Quasar's embedded transitions
     */
    transitionHide? : string
    /**
     * Triggers component to show
     * @param evt JS event object
     */
    show (evt? : any): void
    /**
     * Triggers component to hide
     * @param evt JS event object
     */
    hide (evt? : any): void
    /**
     * Triggers component to toggle between show/hide
     * @param evt JS event object
     */
    toggle (evt? : any): void
    /**
     * There are some custom scenarios for which Quasar cannot automatically reposition the menu without significant performance drawbacks so the optimal solution is for you to call this method when you need it
     */
    updatePosition (): void
    /**
     * Focus menu; if you have content with autofocus attribute, it will directly focus it
     */
    focus (): void
}

export interface QNoSsr extends Vue {
    /**
     * HTML tag to render
     */
    tag? : string
    /**
     * Text to display on server-side render (unless using 'placeholder' slot)
     */
    placeholder? : string
}

export interface QResizeObserver extends Vue {
    /**
     * Debounce amount (in milliseconds)
     */
    debounce? : string | number
    /**
     * Emit a 'resize' event
     * @param immediately Skip over the debounce amount
     */
    trigger (immediately? : boolean): void
}

export interface QScrollObserver extends Vue {
    /**
     * Debounce amount (in milliseconds)
     */
    debounce? : string | number
    /**
     * Register for horizontal scroll instead of vertical (which is default)
     */
    horizontal? : boolean
    /**
     * Emit a 'scroll' event
     * @param immediately Skip over the debounce amount
     */
    trigger (immediately? : boolean): void
    /**
     * Get current scroll details under the form of an Object: { position, direction, directionChanged, inflexionPosition }
     */
    getPosition (): void
}

export interface QOptionGroup extends Vue {
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : any
    /**
     * Array of objects with value and label props. The binary components will be created according to this array
     */
    options? : any[]
    /**
     * The type of input component to be used
     */
    type? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Should the color (if specified any) be kept when input components are unticked?
     */
    keepColor? : boolean
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Label (if any specified) should be displayed on the left side of the input components
     */
    leftLabel? : boolean
    /**
     * Show input components as inline-block rather than each having their own row
     */
    inline? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
}

export interface QPageScroller extends Vue {
    /**
     * Page side/corner to stick to
     */
    position? : string
    /**
     * An array of two numbers to offset the component horizontally and vertically in pixels
     */
    offset? : any[]
    /**
     * By default the component shrinks to content's size; By using this prop you make the component fully expand horizontally or vertically, based on 'position' prop
     */
    expand? : boolean
    /**
     * Scroll offset (in pixels) from which point the component is shown on page
     */
    scrollOffset? : number
    /**
     * Duration (in milliseconds) of the scrolling until it reaches its target
     */
    duration? : number
}

export interface QPagination extends Vue {
    /**
     * Current page (must be between min/max)
     */
    value : number
    /**
     * Minimum page (must be lower than 'max')
     */
    min? : number
    /**
     * Number of last page (must be higher than 'min')
     */
    max : number
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Style definitions to be attributed to the input (if using one)
     */
    inputStyle? : any[] | string | any
    /**
     * Class definitions to be attributed to the input (if using one)
     */
    inputClass? : any[] | string | any
    /**
     * Button size in CSS units, including unit name
     */
    size? : string
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Use an input instead of buttons
     */
    input? : boolean
    /**
     * Show boundary button links
     */
    boundaryLinks? : boolean
    /**
     * Always show first and last page buttons (if not using 'input')
     */
    boundaryNumbers? : boolean
    /**
     * Show direction buttons
     */
    directionLinks? : boolean
    /**
     * Show ellipses (...) when pages are available
     */
    ellipses? : boolean
    /**
     * Maximum number of page links to display at a time; 0 means Infinite
     */
    maxPages? : number
    /**
     * Go directly to the specified page
     * @param pageNumber Page number to go to
     */
    set (pageNumber? : number): void
    /**
     * Increment/Decrement current page by offset
     * @param offset Offset page, can be negative or positive
     */
    setByOffset (offset? : number): void
}

export interface QParallax extends Vue {
    /**
     * Path to image (unless a 'media' slot is used)
     */
    src? : string
    /**
     * Height of component (in pixels)
     */
    height? : number
    /**
     * Speed of parallax effect (0.0 < x < 1.0)
     */
    speed? : number
}

export interface QPopupEdit extends Vue {
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : any
    /**
     * Optional title (unless 'title' slot is used)
     */
    title? : string
    /**
     * Show Set and Cancel buttons
     */
    buttons? : boolean
    /**
     * Override Set button label
     */
    labelSet? : string
    /**
     * Override Cancel button label
     */
    labelCancel? : string
    /**
     * Class definitions to be attributed to the content
     */
    contentClass? : string
    /**
     * Style definitions to be attributed to the content
     */
    contentStyle? : any[] | string | any
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Validates model then triggers 'save' and closes Popup; Returns a Boolean ('true' means valid, 'false' means abort); Syntax: validate(value)
     */
    validate? : Function
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Allows the menu to match at least the full width of its target
     */
    fit? : boolean
    /**
     * Allows the menu to cover its target. When used, the 'self' and 'fit' props are no longer effective
     */
    cover? : boolean
    /**
     * Two values setting the starting position or anchor point of the menu relative to its target
     */
    anchor? : string
    /**
     * Two values setting the menu's own position relative to its target
     */
    self? : string
    /**
     * An array of two numbers to offset the menu horizontally and vertically in pixels
     */
    offset? : any[]
    /**
     * Allows for the target position to be set by the mouse position, when the target of the menu is either clicked or touched
     */
    touchPosition? : boolean
    /**
     * Avoid menu closing by hitting ESC key or by clicking/tapping outside of the Popup
     */
    persistent? : boolean
    /**
     * Separate from parent menu, marking it as a separate closing point for v-close-popup (without this, chained menus close all together)
     */
    separateClosePopup? : boolean
    /**
     * Forces menu to have squared borders
     */
    square? : boolean
    /**
     * The maximimum height of the menu; Size in CSS units, including unit name
     */
    maxHeight? : string
    /**
     * The maximimum width of the menu; Size in CSS units, including unit name
     */
    maxWidth? : string
    /**
     * Trigger a model update; Validates model (and emits 'save' event if it's the case) then closes Popup
     */
    set (): void
    /**
     * Triggers a model reset to its initial value ('cancel' event is emitted) then closes Popup
     */
    cancel (): void
}

export interface QPopupProxy extends Vue {
    /**
     * Configure a target element to trigger component toggle; 'true' means it enables the parent DOM element, 'false' means it disables attaching events to any DOM elements; By using a String (CSS selector) it attaches the events to the specified DOM element (if it exists)
     */
    target? : boolean | string
    /**
     * Skips attaching events to the target DOM element (that trigger the element to get shown)
     */
    noParentEvent? : boolean
    /**
     * Allows the component to behave like a context menu, which opens with a right mouse click (or long tap on mobile)
     */
    contextMenu? : boolean
    /**
     * Defines the state of the component (shown/hidden); Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : boolean
    /**
     * Breakpoint (in pixels) of window width from where a Menu will get to be used instead of a Dialog
     */
    breakpoint? : number | string
    /**
     * Triggers component to show
     * @param evt JS event object
     */
    show (evt? : any): void
    /**
     * Triggers component to hide
     * @param evt JS event object
     */
    hide (evt? : any): void
    /**
     * Triggers component to toggle between show/hide
     * @param evt JS event object
     */
    toggle (evt? : any): void
}

export interface QPullToRefresh extends Vue {
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Icon to display when refreshing the content
     */
    icon? : string
    /**
     * Don't listen for mouse events
     */
    noMouse? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Triggers a refresh
     */
    trigger (): void
    /**
     * Updates the scroll target; Useful when the parent elements change so that the scrolling target also changes
     */
    updateScrollTarget (): void
}

export interface QRadio extends Vue {
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value : number | string
    /**
     * The actual value of the option with which model value is changed
     */
    val : number | string
    /**
     * Label to display along the radio control (or use the default slot instead of this prop)
     */
    label? : string
    /**
     * Label (if any specified) should be displayed on the left side of the checkbox
     */
    leftLabel? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Should the color (if specified any) be kept when checkbox is unticked?
     */
    keepColor? : boolean
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
    /**
     * Sets the Radio's v-model to equal the val
     */
    set (): void
}

export interface QRange extends Vue {
    /**
     * Model of the component of type { min, max } (both values must be between global min/max); Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : {
            /**
             * Model value for left thumb
             */
            min? : number
            /**
             * Model value for right thumb
             */
            max? : number }
    /**
     * Minimum value of the model
     */
    min? : number
    /**
     * Maximum value of the model
     */
    max? : number
    /**
     * Specify step amount between valid values (> 0.0); When step equals to 0 it defines infinite granularity
     */
    step? : number
    /**
     * User can drag range instead of just the two thumbs
     */
    dragRange? : boolean
    /**
     * User can drag only the range instead and NOT the two thumbs
     */
    dragOnlyRange? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Popup labels (for left and right thumbs) when user clicks/taps on the slider thumb and moves it
     */
    label? : boolean
    /**
     * Color name for labels background from the Quasar Color Palette; Applies to both labels, unless specific label color props are used
     */
    labelColor? : string
    /**
     * Color name for labels text from the Quasar Color Palette; Applies to both labels, unless specific label text color props are used
     */
    labelTextColor? : string
    /**
     * Color name for left label background from the Quasar Color Palette
     */
    leftLabelColor? : string
    /**
     * Color name for left label text from the Quasar Color Palette
     */
    leftLabelTextColor? : string
    /**
     * Color name for right label background from the Quasar Color Palette
     */
    rightLabelColor? : string
    /**
     * Color name for right label text from the Quasar Color Palette
     */
    rightLabelTextColor? : string
    /**
     * Override default label for min value
     */
    leftLabelValue? : string | number
    /**
     * Override default label for max value
     */
    rightLabelValue? : string | number
    /**
     * Always display the labels
     */
    labelAlways? : boolean
    /**
     * Display markers on the track, one for each possible value for the model
     */
    markers? : boolean
    /**
     * Snap thumbs on valid values, rather than sliding freely; Suggestion: use with 'step' prop
     */
    snap? : boolean
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
}

export interface QRating extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : number
    /**
     * Number of icons to display
     */
    max? : number | string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix; If an array is provided each rating value will use the corresponding icon in the array (0 based)
     */
    icon? : string | any[]
    /**
     * Icon name following Quasar convention to be used when selected (optional); make sure you have the icon library installed unless you are using 'img:' prefix; If an array is provided each rating value will use the corresponding icon in the array (0 based)
     */
    iconSelected? : string | any[]
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * When used, disables default behavior of clicking/tapping on icon which represents current model value to reset model to 0
     */
    noReset? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
}

export interface QScrollArea extends Vue {
    /**
     * Object with CSS properties and values for styling the thumb of custom scrollbar
     */
    thumbStyle? : any
    /**
     * Object with CSS properties and values for styling the container of QScrollArea
     */
    contentStyle? : any
    /**
     * Object with CSS properties and values for styling the container of QScrollArea when scroll area becomes active (is mouse hovered)
     */
    contentActiveStyle? : any
    /**
     * When content changes, the scrollbar appears; this delay defines the amount of time (in milliseconds) before scrollbars dissapear again (if component is not hovered)
     */
    delay? : number | string
    /**
     * Register for horizontal scroll instead of vertical (which is default)
     */
    horizontal? : boolean
    /**
     * Get the scrolling DOM element target
     * @returns DOM element upon which scrolling takes place
     */
    getScrollTarget (): any
    /**
     * Get current scroll position
     * @returns Scroll position offset from top (in pixels)
     */
    getScrollPosition (): number
    /**
     * Set scroll position to an offset; If a duration (in milliseconds) is specified then the scroll is animated
     * @param offset Scroll position offset from top (in pixels)
     * @param duration Duration (in milliseconds) enabling animated scroll
     */
    setScrollPosition (offset : number, duration? : number): void
}

export interface QSelect extends Vue {
    /**
     * Make virtual list work in horizontal mode
     */
    virtualScrollHorizontal? : boolean
    /**
     * Number of options to render in the virtual list
     */
    virtualScrollSliceSize? : number
    /**
     * Default size in pixels (height if vertical, width if horizontal) of an option; This value is used for rendering the initial list; Try to use a value close to the minimum size of an item
     */
    virtualScrollItemSize? : number
    /**
     * Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the start of the list; A correct value will improve scroll precision
     */
    virtualScrollStickySizeStart? : number
    /**
     * Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the end of the list; A correct value will improve scroll precision
     */
    virtualScrollStickySizeEnd? : number
    /**
     * Does field have validation errors?
     */
    error? : boolean
    /**
     * Validation error message (gets displayed only if 'error' is set to 'true')
     */
    errorMessage? : string
    /**
     * Hide error icon when there is an error
     */
    noErrorIcon? : boolean
    /**
     * Array of Functions/Strings; If String, then it must be a name of one of the embedded validation rules
     */
    rules? : any[]
    /**
     * Check validation status against the 'rules' only after field loses focus for first time
     */
    lazyRules? : boolean
    /**
     * A text label that will “float” up above the input field, once the field gets focus
     */
    label? : string
    /**
     * Label will be always shown above the field regardless of field content (if any)
     */
    stackLabel? : boolean
    /**
     * Helper (hint) text which gets placed below your wrapped form component
     */
    hint? : string
    /**
     * Hide the helper (hint) text when field doesn't have focus
     */
    hideHint? : boolean
    /**
     * Prefix
     */
    prefix? : string
    /**
     * Suffix
     */
    suffix? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    bgColor? : string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Signals the user a process is in progress by displaying a spinner; Spinner can be customized by using the 'loading' slot.
     */
    loading? : boolean
    /**
     * Appends clearable icon when a value (not undefined or null) is set; When clicked, model becomes null
     */
    clearable? : boolean
    /**
     * Custom icon to use for the clear button when using along with 'clearable' prop
     */
    clearIcon? : string
    /**
     * Use 'filled' design for the field
     */
    filled? : boolean
    /**
     * Use 'outlined' design for the field
     */
    outlined? : boolean
    /**
     * Use 'borderless' design for the field
     */
    borderless? : boolean
    /**
     * Use 'standout' design for the field; Specifies classes to be applied when focused (overriding default ones)
     */
    standout? : boolean | string
    /**
     * Enables bottom slots ('error', 'hint', 'counter')
     */
    bottomSlots? : boolean
    /**
     * Does not reserves space for hint/error/counter anymore when these are not used; as a result, it also disables the animation for those
     */
    hideBottomSpace? : boolean
    /**
     * Show an automatic counter on bottom right
     */
    counter? : boolean
    /**
     * Applies a small standard border-radius for a squared shape of the component
     */
    rounded? : boolean
    /**
     * Remove border-radius so borders are squared; Overrides 'rounded' prop
     */
    square? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Align content to match QItem
     */
    itemsAligned? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Focus field on initial component render
     */
    autofocus? : boolean
    /**
     * Model of the component; Must be Array if using 'multiple' prop; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value : number | string | any[]
    /**
     * Allow multiple selection; Model must be Array
     */
    multiple? : boolean
    /**
     * Override default selection string, if not using 'selected' slot/scoped slot and if not using 'use-chips' prop
     */
    displayValue? : number | string
    /**
     * Force use of textContent instead of innerHTML to render selected option(s); Use it when the selected option(s) might be unsafe (from user input); Does NOT apply when using 'selected' or 'selected-item' slots!
     */
    displayValueSanitize? : boolean
    /**
     * Available options that the user can select from. For best performance freeze the list of options.
     */
    options? : any[]
    /**
     * Property of option which holds the 'value'
     */
    optionValue? : Function | string
    /**
     * Property of option which holds the 'label'
     */
    optionLabel? : Function | string
    /**
     * Property of option which tells it's disabled; The value of the property must be a Boolean
     */
    optionDisable? : Function | string
    /**
     * Hides selection; Use the underlying input tag to hold the label (instead of showing it to the right of the input) of the selected option; Only works for non 'multiple' Selects
     */
    hideSelected? : boolean
    /**
     * Hides dropdown icon
     */
    hideDropdownIcon? : boolean
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    dropdownIcon? : string
    /**
     * Allow a maximum number of selections that the user can do
     */
    maxValues? : number | string
    /**
     * Dense mode for options list; occupies less space
     */
    optionsDense? : boolean
    /**
     * Options menu will be colored with a dark color
     */
    optionsDark? : boolean
    /**
     * CSS class name for options that are active/selected
     */
    optionsSelectedClass? : string
    /**
     * Expanded menu will cover the component (will not work along with 'use-input' prop for obvious reasons)
     */
    optionsCover? : boolean
    /**
     * Force use of textContent instead of innerHTML to render options; Use it when the options might be unsafe (from user input); Does NOT apply when using 'option' slot!
     */
    optionsSanitize? : boolean
    /**
     * Class definitions to be attributed to the popup content
     */
    popupContentClass? : string
    /**
     * Style definitions to be attributed to the popup content
     */
    popupContentStyle? : any[] | string | any
    /**
     * Use an input tag where users can type
     */
    useInput? : boolean
    /**
     * Use QChip to show what is currently selected
     */
    useChips? : boolean
    /**
     * Fills the input with current value; Useful along with 'hide-selected'; Does NOT works along with 'multiple' selection
     */
    fillInput? : boolean
    /**
     * Enables creation of new values and defines behavior when a new value is added: 'add' means it adds the value (even if possible duplicate), 'add-unique' adds only unique values, and 'toggle' adds or removes the value (based on if it exists or not already); When using this prop then listening for @new-value becomes optional (only to override the behavior defined by 'new-value-mode')
     */
    newValueMode? : string
    /**
     * Try to map labels of model from 'options' Array; has a small performance penalty; If you are using emit-value you will probably need to use map-options to display the label text in the select field rather than the value;  Refer to the 'Affecting model' section above
     */
    mapOptions? : boolean
    /**
     * Update model with the value of the selected option instead of the whole option
     */
    emitValue? : boolean
    /**
     * Debounce the input model update with an amount of milliseconds
     */
    inputDebounce? : number | string
    /**
     * Class definitions to be attributed to the underlying input tag
     */
    inputClass? : any[] | string | any
    /**
     * Style definitions to be attributed to the underlying input tag
     */
    inputStyle? : any[] | string | any
    /**
     * Transition when showing the menu/dialog; One of Quasar's embedded transitions
     */
    transitionShow? : string
    /**
     * Transition when hiding the menu/dialog; One of Quasar's embedded transitions
     */
    transitionHide? : string
    /**
     * Overrides the default dynamic mode of showing as menu on desktop and dialog on mobiles
     */
    behavior? : string
    /**
     * Scroll the virtual scroll list to the item with the specified index (0 based)
     * @param index The index of the list item (0 based)
     */
    scrollTo (index : string | number): void
    /**
     * Resets the computations; Needed for custom edge-cases
     */
    reset (): void
    /**
     * Reset validation status
     */
    resetValidation (): void
    /**
     * Trigger a validation
     * @param value Optional value to validate against
     */
    validate (value? : any): void
    /**
     * Focus component
     */
    focus (): void
    /**
     * Focus and open popup
     */
    showPopup (): void
    /**
     * Hide popup
     */
    hidePopup (): void
    /**
     * Remove selected option located at specific index
     * @param index Index at which to remove selection
     */
    removeAtIndex (index : number): void
    /**
     * Adds option to model
     * @param opt Option to add to model
     */
    add (opt : any): void
    /**
     * Add/remove option from model
     * @param opt Option to add to model
     */
    toggleOption (opt : any): void
    /**
     * Sets option from menu as 'focused'
     * @param index Index of option from menu
     */
    setOptionIndex (index : number): void
    /**
     * Filter options
     * @param value String to filter with
     */
    filter (value : string): void
    /**
     * Recomputes menu position
     */
    updateMenuPosition (): void
    /**
     * If 'use-input' is specified, this updates the value that it holds
     * @param value String to set the input value to
     * @param noFilter Set to true if you don't want the filter (if any) to be also triggered
     */
    updateInputValue (value? : string, noFilter? : boolean): void
}

export interface QSeparator extends Vue {
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * If set to true, the top and bottom margins will be set to 8px
     */
    spaced? : boolean
    /**
     * if set to true, the left and right margins will be set to 16px. If set to item, the left and right margins will be set to 72px. If set to item-thumbnail, the left margin is set to 116px and right margin is set to 0px
     */
    inset? : boolean | string
    /**
     * If set to true, the separator will be vertical.
     */
    vertical? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSlideTransition extends Vue {
    /**
     * If set to true, the transition will be applied on the initial render.
     */
    appear? : boolean
    /**
     * Duration (in milliseconds) enabling animated scroll.
     */
    duration? : number
}

export interface QSlider extends Vue {
    /**
     * Model of the component (must be between min/max); Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : number
    /**
     * Minimum value of the model
     */
    min? : number
    /**
     * Maximum value of the model
     */
    max? : number
    /**
     * Specify step amount between valid values (> 0.0); When step equals to 0 it defines infinite granularity
     */
    step? : number
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Popup a label when user clicks/taps on the slider thumb and moves it
     */
    label? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    labelColor? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    labelTextColor? : string
    /**
     * Override default label value
     */
    labelValue? : string | number
    /**
     * Always display the label
     */
    labelAlways? : boolean
    /**
     * Display markers on the track, one for each possible value for the model
     */
    markers? : boolean
    /**
     * Snap on valid values, rather than sliding freely; Suggestion: use with 'step' prop
     */
    snap? : boolean
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
}

export interface QSpace extends Vue {
}

export interface QSpinner extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Override value to use for stroke-width
     */
    thickness? : number
}

export interface QSpinnerAudio extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerBall extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerBars extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerComment extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerCube extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerDots extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerFacebook extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerGears extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerGrid extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerHearts extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerHourglass extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerInfinity extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerIos extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerOval extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerPie extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerPuff extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerRadio extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerRings extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSpinnerTail extends Vue {
    /**
     * Size in CSS units, including unit name or standard size name (xs|sm|md|lg|xl)
     */
    size? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
}

export interface QSplitter extends Vue {
    /**
     * Model of the component defining the split ratio percent (0.0 < x < 100.0) between panes; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : number
    /**
     * Allows the splitter to split its two panes horizontally, instead of vertically
     */
    horizontal? : boolean
    /**
     * An array of two values representing a ratio of minimum and maximum split area of the two panes (0.0 < x < 100.0)
     */
    limits? : any[]
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Class definitions to be attributed to the 'before' panel
     */
    beforeClass? : any[] | string | any
    /**
     * Class definitions to be attributed to the 'after' panel
     */
    afterClass? : any[] | string | any
    /**
     * Class definitions to be attributed to the splitter separator
     */
    separatorClass? : any[] | string | any
    /**
     * Style definitions to be attributed to the splitter separator
     */
    separatorStyle? : any[] | string | any
    /**
     * Applies a default lighter color on the separator; To be used when background is darker; Avoid using when you are overriding through separator-class or separator-style props
     */
    dark? : boolean
}

export interface QStep extends Vue {
    /**
     * Panel name
     */
    name : any
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Step title
     */
    title : string
    /**
     * Step’s additional information that appears beneath the title
     */
    caption? : string
    /**
     * Step's prefix (max 2 characters) which replaces the icon if step does not has error, is being edited or is marked as done
     */
    prefix? : string | number
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    doneIcon? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    doneColor? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    activeIcon? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    activeColor? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    errorIcon? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    errorColor? : string
    /**
     * Allow navigation through the header
     */
    headerNav? : boolean
    /**
     * Mark the step as 'done'
     */
    done? : boolean
    /**
     * Mark the step as having an error
     */
    error? : boolean
}

export interface QStepper extends Vue {
    /**
     * Model of the component defining current panel's name; If used as Number, it does not defines panel index though but slide name's which may be an Integer; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : any
    /**
     * Equivalent to using Vue's native <keep-alive> component on the content
     */
    keepAlive? : boolean
    /**
     * Equivalent to using Vue's native include prop for <keep-alive>
     */
    keepAliveInclude? : string | any[]
    /**
     * Equivalent to using Vue's native exclude prop for <keep-alive>
     */
    keepAliveExclude? : string | any[]
    /**
     * Equivalent to using Vue's native max prop for <keep-alive>
     */
    keepAliveMax? : number
    /**
     * Enable transitions between panel (also see 'transition-prev' and 'transition-next' props)
     */
    animated? : boolean
    /**
     * Makes component appear as infinite (when reaching last panel, next one will become the first one)
     */
    infinite? : boolean
    /**
     * Enable swipe events (may interfere with content's touch/mouse events)
     */
    swipeable? : boolean
    /**
     * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
     */
    transitionPrev? : string
    /**
     * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
     */
    transitionNext? : string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Applies a 'flat' design (no default shadow)
     */
    flat? : boolean
    /**
     * Applies a default border to the component
     */
    bordered? : boolean
    /**
     * Put Stepper in vertical mode (instead of horizontal by default)
     */
    vertical? : boolean
    /**
     * Use alternative labels (applies only to horizontal stepper)
     */
    alternativeLabels? : boolean
    /**
     * Allow navigation through the header
     */
    headerNav? : boolean
    /**
     * Hide header labels on narrow windows
     */
    contracted? : boolean
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    inactiveIcon? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    inactiveColor? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    doneIcon? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    doneColor? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    activeIcon? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    activeColor? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    errorIcon? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    errorColor? : string
    /**
     * Go to next panel
     */
    next (): void
    /**
     * Go to previous panel
     */
    previous (): void
    /**
     * Go to specific panel
     * @param panelName Panel's name, which may be a String or Number; Number does not refers to panel index, but to its name, which may be an Integer
     */
    goTo (panelName : string | number): void
}

export interface QStepperNavigation extends Vue {
}

export interface QTabPanel extends Vue {
    /**
     * Panel name
     */
    name : any
    /**
     * Put component in disabled mode
     */
    disable? : boolean
}

export interface QTabPanels extends Vue {
    /**
     * Model of the component defining current panel's name; If used as Number, it does not defines panel index though but slide name's which may be an Integer; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : any
    /**
     * Equivalent to using Vue's native <keep-alive> component on the content
     */
    keepAlive? : boolean
    /**
     * Equivalent to using Vue's native include prop for <keep-alive>
     */
    keepAliveInclude? : string | any[]
    /**
     * Equivalent to using Vue's native exclude prop for <keep-alive>
     */
    keepAliveExclude? : string | any[]
    /**
     * Equivalent to using Vue's native max prop for <keep-alive>
     */
    keepAliveMax? : number
    /**
     * Enable transitions between panel (also see 'transition-prev' and 'transition-next' props)
     */
    animated? : boolean
    /**
     * Makes component appear as infinite (when reaching last panel, next one will become the first one)
     */
    infinite? : boolean
    /**
     * Enable swipe events (may interfere with content's touch/mouse events)
     */
    swipeable? : boolean
    /**
     * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
     */
    transitionPrev? : string
    /**
     * One of Quasar's embedded transitions (has effect only if 'animated' prop is set)
     */
    transitionNext? : string
    /**
     * Go to next panel
     */
    next (): void
    /**
     * Go to previous panel
     */
    previous (): void
    /**
     * Go to specific panel
     * @param panelName Panel's name, which may be a String or Number; Number does not refers to panel index, but to its name, which may be an Integer
     */
    goTo (panelName : string | number): void
}

export interface QMarkupTable extends Vue {
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Applies a 'flat' design (no default shadow)
     */
    flat? : boolean
    /**
     * Applies a default border to the component
     */
    bordered? : boolean
    /**
     * Removes border-radius so borders are squared
     */
    square? : boolean
    /**
     * Use a separator/border between rows, columns or all cells
     */
    separator? : string
    /**
     * Wrap text within table cells
     */
    wrapCells? : boolean
}

export interface QTable extends Vue {
    /**
     * Fullscreen mode
     */
    fullscreen? : boolean
    /**
     * Changing route app won't exit fullscreen
     */
    noRouteFullscreenExit? : boolean
    /**
     * Rows of data to display
     */
    data? : any[]
    /**
     * Property of each row that defines the unique key of each row; The value of property must be string or number
     */
    rowKey? : string
    /**
     * Display data using QVirtualScroll (for non-grid mode only)
     */
    virtualScroll? : boolean
    /**
     * Number of rows to render in the virtual list
     */
    virtualScrollSliceSize? : number
    /**
     * Default size in pixels of a row; This value is used for rendering the initial table; Try to use a value close to the minimum size of a row
     */
    virtualScrollItemSize? : number
    /**
     * Size in pixels of the sticky header (if using one); A correct value will improve scroll precision
     */
    virtualScrollStickySizeStart? : number
    /**
     * Size in pixels of the sticky footer part (if using one); A correct value will improve scroll precision
     */
    virtualScrollStickySizeEnd? : number
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Display data as a grid instead of the default table
     */
    grid? : boolean
    /**
     * Display header for grid-mode also
     */
    gridHeader? : boolean
    /**
     * Dense mode; Connect with $q.screen for responsive behavior
     */
    dense? : boolean
    /**
     * The column definitions (Array of Objects)
     */
    columns? : any[]
    /**
     * Array of Strings defining column names ('name' property of each column from 'columns' prop definitions)
     */
    visibleColumns? : any[]
    /**
     * Put Table into 'loading' state; Notify the user something is happening behind the covers
     */
    loading? : boolean
    /**
     * Table title
     */
    title? : string
    /**
     * Hide table header layer
     */
    hideHeader? : boolean
    /**
     * Hide table bottom layer
     */
    hideBottom? : boolean
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Applies a 'flat' design (no default shadow)
     */
    flat? : boolean
    /**
     * Applies a default border to the component
     */
    bordered? : boolean
    /**
     * Removes border-radius so borders are squared
     */
    square? : boolean
    /**
     * Use a separator/border between rows, columns or all cells
     */
    separator? : string
    /**
     * Wrap text within table cells
     */
    wrapCells? : boolean
    /**
     * Skip the third state (unsorted) when user toggles column sort direction
     */
    binaryStateSort? : boolean
    /**
     * Override default text to display when no data is available
     */
    noDataLabel? : string
    /**
     * Override default text to display when user filters the table and no matched results are found
     */
    noResultsLabel? : string
    /**
     * Override default text to display when table is in loading state (see 'loading' prop)
     */
    loadingLabel? : string
    /**
     * Text to display when user selected at least one row
     */
    selectedRowsLabel? : Function
    /**
     * Text to override default rows per page label at bottom of table
     */
    rowsPerPageLabel? : string
    /**
     * Text to override default pagination label at bottom of table (unless 'pagination' scoped slot is used)
     */
    paginationLabel? : Function
    /**
     * CSS style to apply to native HTML <table> element's wrapper (which is a DIV)
     */
    tableStyle? : string | any[] | any
    /**
     * CSS classes to apply to native HTML <table> element's wrapper (which is a DIV)
     */
    tableClass? : string | any[] | any
    /**
     * CSS style to apply to header of native HTML <table> (which is a TR)
     */
    tableHeaderStyle? : string | any[] | any
    /**
     * CSS classes to apply to header of native HTML <table> (which is a TR)
     */
    tableHeaderClass? : string | any[] | any
    /**
     * CSS style to apply to the card
     */
    cardStyle? : string | any[] | any
    /**
     * CSS classes to apply to the card
     */
    cardClass? : string | any[] | any
    /**
     * String/Object to filter table with; When using an Object it requires 'filter-method' to also be specified since it will be a custom filtering
     */
    filter? : string | any
    /**
     * The actual filtering mechanism
     */
    filterMethod? : Function
    /**
     * Pagination object
     */
    pagination? : {
            /**
             * Column name (from column definition)
             */
            sortBy? : string
            /**
             * Is sorting in descending order?
             */
            descending? : boolean
            /**
             * Page number (1-based)
             */
            page? : number
            /**
             * How many rows per page? 0 means Infinite
             */
            rowsPerPage? : number
            /**
             * For server-side fetching only. How many total database rows are there to be added to the table. If set, causes the QTable to emit @request when data is required.
             */
            rowsNumber? : number }
    /**
     * Options for user to pick (Numbers); Number 0 means 'Show all rows in one page'
     */
    rowsPerPageOptions? : any[]
    /**
     * Selection type
     */
    selection? : string
    /**
     * Keeps the user selection array
     */
    selected? : any[]
    /**
     * The actual sort mechanism. Function (rows, sortBy, descending) => sorted rows
     */
    sortMethod? : Function
    /**
     * Toggles fullscreen mode
     */
    toggleFullscreen (): void
    /**
     * Enter the fullscreen view
     */
    setFullscreen (): void
    /**
     * Leave the fullscreen view
     */
    exitFullscreen (): void
    /**
     * Trigger a server request (emits 'request' event)
     * @param props Request details
     */
    requestServerInteraction (props? : {
            /**
             * Optional pagination object
             */
            pagination? : {
                    /**
                     * Column name (from column definition)
                     */
                    sortBy? : string
                    /**
                     * Is sorting in descending order?
                     */
                    descending? : boolean
                    /**
                     * Page number (1-based)
                     */
                    page? : number
                    /**
                     * How many rows per page? 0 means Infinite
                     */
                    rowsPerPage? : number }
            /**
             * Filtering method (the 'filter-method' prop)
             */
            filter? : Function }): void
    /**
     * Unless using an external pagination Object (through 'pagination.sync' prop), you can use this method and force the internal pagination to change
     * @param pagination Pagination object
     * @param forceServerRequest Also force a server request
     */
    setPagination (pagination : {
            /**
             * Column name (from column definition)
             */
            sortBy? : string
            /**
             * Is sorting in descending order?
             */
            descending? : boolean
            /**
             * Page number (1-based)
             */
            page? : number
            /**
             * How many rows per page? 0 means Infinite
             */
            rowsPerPage? : number }, forceServerRequest? : boolean): void
    /**
     * Navigates to previous page, if available
     */
    prevPage (): void
    /**
     * Navigates to next page, if available
     */
    nextPage (): void
    /**
     * Determine if a row has been selected by user
     * @param key Row key value
     */
    isRowSelected (key : any): void
    /**
     * Clears user selection (emits 'update:selected' with empty array)
     */
    clearSelection (): void
    /**
     * Trigger a table sort
     * @param col Column name or column definition object
     */
    sort (col : string | any): void
    /**
     * Resets the virtual scroll (if using it) computations; Needed for custom edge-cases
     */
    resetVirtualScroll (): void
}

export interface QTd extends Vue {
    /**
     * QTable's column scoped slot property
     */
    props? : any
    /**
     * Tries to shrink column width size; Useful for columns with a checkbox/radio/toggle
     */
    autoWidth? : boolean
}

export interface QTh extends Vue {
    /**
     * QTable's header column scoped slot property
     */
    props? : any
    /**
     * Tries to shrink header column width size; Useful for columns with a checkbox/radio/toggle
     */
    autoWidth? : boolean
}

export interface QTr extends Vue {
    /**
     * QTable's row scoped slot property
     */
    props? : any
}

export interface QRouteTab extends Vue {
    /**
     * Equivalent to Vue Router <router-link> 'to' property
     */
    to : string | any
    /**
     * Equivalent to Vue Router <router-link> 'exact' property
     */
    exact? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'append' property
     */
    append? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'replace' property
     */
    replace? : boolean
    /**
     * Equivalent to Vue Router <router-link> 'active-class' property
     */
    activeClass? : string
    /**
     * Equivalent to Vue Router <router-link> 'active-class' property
     */
    exactActiveClass? : string
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Configure material ripple (disable it by setting it to 'false' or supply a config object)
     */
    ripple? : boolean | any
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * A number or string to label the tab
     */
    label? : number | string
    /**
     * Adds an alert symbol to the tab, notifying the user there are some updates; If its value is not a Boolean, then you can specify a color
     */
    alert? : boolean | string
    /**
     * Panel name
     */
    name? : number | string
    /**
     * Turns off capitalizing all letters within the tab (which is the default)
     */
    noCaps? : boolean
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
}

export interface QTab extends Vue {
    /**
     * Configure material ripple (disable it by setting it to 'false' or supply a config object)
     */
    ripple? : boolean | any
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * A number or string to label the tab
     */
    label? : number | string
    /**
     * Adds an alert symbol to the tab, notifying the user there are some updates; If its value is not a Boolean, then you can specify a color
     */
    alert? : boolean | string
    /**
     * Panel name
     */
    name? : number | string
    /**
     * Turns off capitalizing all letters within the tab (which is the default)
     */
    noCaps? : boolean
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
    /**
     * Put component in disabled mode
     */
    disable? : boolean
}

export interface QTabs extends Vue {
    /**
     * Model of the component defining current panel name; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : number | string
    /**
     * Use vertical design (tabs one on top of each other rather than one next to the other horizontally)
     */
    vertical? : boolean
    /**
     * Horizontal alignment the tabs within the tabs container
     */
    align? : string
    /**
     * Breakpoint (in pixels) of tabs container width at which the tabs automatically turn to a justify alignment
     */
    breakpoint? : number | string
    /**
     * The color to be attributed to the text of the active tab
     */
    activeColor? : string
    /**
     * The color to be attributed to the background of the active tab
     */
    activeBgColor? : string
    /**
     * The color to be attributed to the indicator (the underline) of the active tab
     */
    indicatorColor? : string
    /**
     * The name of an icon to replace the default arrow used to scroll through the tabs to the left, when the tabs extend past the width of the tabs container
     */
    leftIcon? : string
    /**
     * The name of an icon to replace the default arrow used to scroll through the tabs to the right, when the tabs extend past the width of the tabs container
     */
    rightIcon? : string
    /**
     * When used on flexbox parent, tabs will stretch to parent's height
     */
    stretch? : boolean
    /**
     * By default, QTabs is set to grow to the available space; However, you can reverse that with this prop; Useful (and required) when placing the component in a QToolbar
     */
    shrink? : boolean
    /**
     * Switches the indicator position (on left of tab for vertical mode or above the tab for default horizontal mode)
     */
    switchIndicator? : boolean
    /**
     * Allows the indicator to be the same width as the tab's content (text or icon), instead of the whole width of the tab
     */
    narrowIndicator? : boolean
    /**
     * Allows the text to be inline with the icon, should one be used
     */
    inlineLabel? : boolean
    /**
     * Turns off capitalizing all letters within the tab (which is the default)
     */
    noCaps? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
}

export interface QTimeline extends Vue {
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Side to place the timeline entries in dense and comfortable layout; For loose layout it gets overriden by QTimelineEntry side prop
     */
    side? : string
    /**
     * Layout of the timeline. Dense keeps content and labels on one side. Comfortable keeps content on one side and labels on the opposite side. Loose puts content on both sides.
     */
    layout? : string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
}

export interface QTimelineEntry extends Vue {
    /**
     * Defines a heading timeline item
     */
    heading? : boolean
    /**
     * Tag to use, if of type 'heading' only
     */
    tag? : string
    /**
     * Side to place the timeline entry; Works only if QTimeline layout is loose.
     */
    side? : string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * URL to the avatar image; Icon takes precedence if used, so it replaces avatar; Suggestion: use a static resource
     */
    avatar? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Title of timeline entry; Is overriden if using 'title' slot
     */
    title? : string
    /**
     * Subtitle of timeline entry; Is overriden if using 'subtitle' slot
     */
    subtitle? : string
    /**
     * Body content of timeline entry; Use this prop or the default slot
     */
    body? : string
}

export interface QToggle extends Vue {
    /**
     * Model of the component; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value : any | any[]
    /**
     * Works when model ('value') is Array. It tells the component which value should add/remove when ticked/unticked
     */
    val? : any
    /**
     * What model value should be considered as checked/ticked/on?
     */
    trueValue? : any
    /**
     * What model value should be considered as unchecked/unticked/off?
     */
    falseValue? : any
    /**
     * Label to display along the component (or use the default slot instead of this prop)
     */
    label? : string
    /**
     * Label (if any specified) should be displayed on the left side of the component
     */
    leftLabel? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Should the color (if specified any) be kept when the component is unticked/ off?
     */
    keepColor? : boolean
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Dense mode; occupies less space
     */
    dense? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Tabindex HTML attribute value
     */
    tabindex? : number | string
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * The icon to be used when the toggle is on
     */
    checkedIcon? : string
    /**
     * The icon to be used when the toggle is off
     */
    uncheckedIcon? : string
    /**
     * Toggle the state (of the model)
     */
    toggle (): void
}

export interface QToolbar extends Vue {
    /**
     * Apply an inset to content (useful for subsequent toolbars)
     */
    inset? : boolean
}

export interface QToolbarTitle extends Vue {
    /**
     * By default, QToolbarTitle is set to grow to the available space. However, you can reverse that with this prop
     */
    shrink? : boolean
}

export interface QTooltip extends Vue {
    /**
     * Class definitions to be attributed to the content
     */
    contentClass? : any[] | string | any
    /**
     * Style definitions to be attributed to the content
     */
    contentStyle? : any[] | string | any
    /**
     * Model of the component defining shown/hidden state; Either use this property (along with a listener for 'input' event) OR use v-model directive
     */
    value? : boolean
    /**
     * The maximimum height of the Tooltip; Size in CSS units, including unit name
     */
    maxHeight? : string
    /**
     * The maximimum width of the Tooltip; Size in CSS units, including unit name
     */
    maxWidth? : string
    /**
     * One of Quasar's embedded transitions
     */
    transitionShow? : string
    /**
     * One of Quasar's embedded transitions
     */
    transitionHide? : string
    /**
     * Two values setting the starting position or anchor point of the Tooltip relative to its target
     */
    anchor? : string
    /**
     * Two values setting the Tooltip's own position relative to its target
     */
    self? : string
    /**
     * An array of two numbers to offset the Tooltip horizontally and vertically in pixels
     */
    offset? : any[]
    /**
     * Configure a target element to trigger Tooltip toggle; 'true' means it enables the parent DOM element, 'false' means it disables attaching events to any DOM elements; By using a String (CSS selector) it attaches the events to the specified DOM element (if it exists)
     */
    target? : boolean | string
    /**
     * Skips attaching events to the target DOM element (that trigger the element to get shown)
     */
    noParentEvent? : boolean
    /**
     * Configure Tooltip to appear with delay
     */
    delay? : number
    /**
     * Triggers component to show
     * @param evt JS event object
     */
    show (evt? : any): void
    /**
     * Triggers component to hide
     * @param evt JS event object
     */
    hide (evt? : any): void
    /**
     * Triggers component to toggle between show/hide
     * @param evt JS event object
     */
    toggle (evt? : any): void
    /**
     * There are some custom scenarios for which Quasar cannot automatically reposition the tooltip without significant performance drawbacks so the optimal solution is for you to call this method when you need it
     */
    updatePosition (): void
}

export interface QTree extends Vue {
    /**
     * The array of nodes that designates the tree structure
     */
    nodes : any[]
    /**
     * The property name of each node object that holds a unique node id
     */
    nodeKey : string
    /**
     * The property name of each node object that holds the label of the node
     */
    labelKey? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Color name for controls (like checkboxes) from the Quasar Color Palette
     */
    controlColor? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Color name for selected nodes (from the Quasar Color Palette)
     */
    selectedColor? : string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
     */
    icon? : string
    /**
     * The type of strategy to use for the selection of the nodes
     */
    tickStrategy? : string
    /**
     * Keys of nodes that are ticked
     */
    ticked? : any[]
    /**
     * Keys of nodes that are expanded
     */
    expanded? : any[]
    /**
     * Key of node currently selected
     */
    selected? : any
    /**
     * Allow the tree to have all its branches expanded, when first rendered
     */
    defaultExpandAll? : boolean
    /**
     * Allows the tree to be set in accordion mode
     */
    accordion? : boolean
    /**
     * The text value to be used for filtering nodes
     */
    filter? : string
    /**
     * The function to use to filter the tree nodes
     */
    filterMethod? : Function
    /**
     * Toggle animation duration (in milliseconds)
     */
    duration? : number
    /**
     * Override default such label for when no nodes are available
     */
    noNodesLabel? : string
    /**
     * Override default such label for when no nodes are available due to filtering
     */
    noResultsLabel? : string
    /**
     * Get the node with the given key
     * @param key The key of a node
     * @returns Requested node
     */
    getNodeByKey (key : any): any
    /**
     * Get array of nodes that are ticked
     * @returns Ticked node objects
     */
    getTickedNodes (): any[]
    /**
     * Get array of nodes that are expanded
     * @returns Expanded node objects
     */
    getExpandedNodes (): any[]
    /**
     * Determine if a node is expanded
     * @param key The key of a node
     * @returns Is specified node expanded?
     */
    isExpanded (key : any): boolean
    /**
     * Use to expand all branches of the tree
     */
    expandAll (): void
    /**
     * Use to collapse all branches of the tree
     */
    collapseAll (): void
    /**
     * Expands the tree at the point of the node with the key given
     * @param key The key of a node
     * @param state Set to 'true' to expand the branch of the tree, otherwise 'false' collapses it
     */
    setExpanded (key : any, state : boolean): void
    /**
     * Method to check if a node's checkbox is selected or not
     * @param key The key of a node
     * @returns Is specified node ticked?
     */
    isTicked (key : any): boolean
    /**
     * Method to set a node's checkbox programmatically
     * @param keys The keys of nodes to tick/untick
     * @param state Set to 'true' to tick the checkbox of nodes, otherwise 'false' unticks them
     */
    setTicked (keys : any[], state : boolean): void
}

export interface QUploader extends Vue {
    /**
     * Label for the uploader
     */
    label? : string
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Overrides text color (if needed); color name from the Quasar Color Palette
     */
    textColor? : string
    /**
     * Notify the component that the background is a dark color
     */
    dark? : boolean
    /**
     * Removes border-radius so borders are squared
     */
    square? : boolean
    /**
     * Applies a 'flat' design (no default shadow)
     */
    flat? : boolean
    /**
     * Applies a default border to the component
     */
    bordered? : boolean
    /**
     * Allow multiple file uploads
     */
    multiple? : boolean
    /**
     * Comma separated list of unique file type specifiers. Maps to 'accept' attribute of native input type=file element
     */
    accept? : string
    /**
     * Maximum size of individual file in bytes
     */
    maxFileSize? : number
    /**
     * Maximum size of all files combined in bytes
     */
    maxTotalSize? : number
    /**
     * Custom filter for added files; Only files that pass this filter will be added to the queue and uploaded
     */
    filter? : Function
    /**
     * Don't display thumbnails for image files
     */
    noThumbnails? : boolean
    /**
     * Upload files immediately when added
     */
    autoUpload? : boolean
    /**
     * Don't show the upload button
     */
    hideUploadBtn? : boolean
    /**
     * Put component in disabled mode
     */
    disable? : boolean
    /**
     * Put component in readonly mode
     */
    readonly? : boolean
    /**
     * Function which should return an Object or a Promise resolving with an Object
     */
    factory? : Function
    /**
     * URL or path to the server which handles the upload. Takes String or factory function, which returns String. Function is called right before upload
     */
    url? : string | Function
    /**
     * HTTP method to use for upload; Takes String or factory function which returns a String; Function is called right before upload
     */
    method? : string | Function
    /**
     * Field name for each file upload; This goes into the following header: 'Content-Disposition: form-data; name="__HERE__"; filename="somefile.png"
     */
    fieldName? : string | Function
    /**
     * Array or a factory function which returns an array; Array consists of objects with header definitions; Function is called right before upload
     */
    headers? : any[] | Function
    /**
     * Array or a factory function which returns an array; Array consists of objects with additional fields definitions (used by Form to be uploaded); Function is called right before upload
     */
    formFields? : any[] | Function
    /**
     * Sets withCredentials to true on the XHR that manages the upload; Takes boolean or factory function for Boolean; Function is called right before upload
     */
    withCredentials? : boolean | Function
    /**
     * Send raw files without wrapping into a Form(); Takes boolean or factory function for Boolean; Function is called right before upload
     */
    sendRaw? : boolean | Function
    /**
     * Upload files in batch (in one XHR request); Takes boolean or factory function for Boolean; Function is called right before upload
     */
    batch? : boolean | Function
    /**
     * Abort upload of all files (same as clicking the abort button)
     */
    abort (): void
    /**
     * Start uploading (same as clicking the upload button)
     */
    upload (): void
    /**
     * Trigger file pick (same as clicking the plus button); Must be called as a direct consequence of user interaction (eg. in a click handler), due to browsers security policy
     */
    pickFiles (): void
    /**
     * Add files to uploader programmatically
     * @param files Array of files (instances of File)
     */
    addFiles (files : any[]): void
    /**
     * Resets uploader to default; Empties queue, aborts current uploads
     */
    reset (): void
    /**
     * Removes already uploaded files from the list
     */
    removeUploadedFiles (): void
    /**
     * Remove files that are waiting for upload to start (same as clicking the left clear button)
     */
    removeQueuedFiles (): void
    /**
     * Remove specified file from the queue
     * @param file File to remove (instance of File)
     */
    removeFile (file : any): void
}

export interface QUploaderAddTrigger extends Vue {
}

export interface QVideo extends Vue {
    /**
     * The source url to display in an iframe
     */
    src : string
}

export interface QVirtualScroll extends Vue {
    /**
     * Make virtual list work in horizontal mode
     */
    virtualScrollHorizontal? : boolean
    /**
     * Number of options to render in the virtual list
     */
    virtualScrollSliceSize? : number
    /**
     * Default size in pixels (height if vertical, width if horizontal) of an option; This value is used for rendering the initial list; Try to use a value close to the minimum size of an item
     */
    virtualScrollItemSize? : number
    /**
     * Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the start of the list; A correct value will improve scroll precision
     */
    virtualScrollStickySizeStart? : number
    /**
     * Size in pixels (height if vertical, width if horizontal) of the sticky part (if using one) at the end of the list; A correct value will improve scroll precision
     */
    virtualScrollStickySizeEnd? : number
    /**
     * The type of content: list (default) or table
     */
    type? : string
    /**
     * Available list items that will be passed to the scoped slot; For best performance freeze the list of items; Required if 'itemsFn' is not supplied
     */
    items? : any[]
    /**
     * Number of available items in the list; Required and used only if 'itemsFn' is provided
     */
    itemsSize? : string | number
    /**
     * Function to return the scope for the items to be displayed; Should return an array for items starting from 'from' index for size length
     */
    itemsFn? : Function
    /**
     * CSS selector or DOM element to be used as scroll container instead of the component's own container
     */
    scrollTarget? : Element | string
    /**
     * Scroll the virtual scroll list to the item with the specified index (0 based)
     * @param index The index of the list item (0 based)
     */
    scrollTo (index : string | number): void
    /**
     * Resets the computations; Needed for custom edge-cases
     */
    reset (): void
}

export interface DialogChainObject {
    /**
     * Receives a Function param to tell what to do when OK is pressed / option is selected
     * @param callbackFn Tell what to do
     * @returns Chained Object
     */
    onOk (callbackFn : Function): DialogChainObject
    /**
     * Receives a Function as param to tell what to do when Cancel is pressed / dialog is dismissed
     * @param callbackFn Tell what to do
     * @returns Chained Object
     */
    onCancel (callbackFn : Function): DialogChainObject
    /**
     * Receives a Function param to tell what to do when the dialog is closed
     * @param callbackFn Tell what to do
     * @returns Chained Object
     */
    onDismiss (callbackFn : Function): DialogChainObject
    /**
     * Hides the dialog when called
     * @returns Chained Object
     */
    hide (): DialogChainObject
}

export interface QDialogOptions {
    /**
     * CSS Class name to apply to the Dialog's QCard
     */
    class? : string | any[] | any
    /**
     * CSS style to apply to the Dialog's QCard
     */
    style? : string | any[] | any
    /**
     * A text for the heading title of the dialog
     */
    title? : string
    /**
     * A text with more information about what needs to be input, selected or confirmed.
     */
    message? : string
    /**
     * Render title and message as HTML; This can lead to XSS attacks, so make sure that you sanitize the message first
     */
    html? : boolean
    /**
     * Position of the Dialog on screen. Standard is centered.
     */
    position? : string
    /**
     * An object definition of the input field for the prompting question.
     */
    prompt? : {
            /**
             * The value of the input: Array for Selection, String for prompt
             */
            model? : any[] | string
            /**
             * Optional property to determine the input field type. It can be either a text or number input field type
             */
            type? : string }
    /**
     * An object definition for creating the selection form content
     */
    options? : {
            /**
             * The type of selection
             */
            type? : string
            /**
             * The value of the selection
             */
            model? : any[]
            /**
             * The list of options to interact with; Equivalent to options prop of the QOptionsGroup component
             */
            items? : any[] }
    /**
     * Props for an 'OK' button
     */
    ok? : string | any | boolean
    /**
     * Props for a 'CANCEL' button
     */
    cancel? : string | any | boolean
    /**
     * Makes buttons be stacked instead of vertically aligned
     */
    stackButtons? : boolean
    /**
     * Color name for component from the Quasar Color Palette
     */
    color? : string
    /**
     * Apply dark mode
     */
    dark? : boolean
    /**
     * User cannot dismiss Dialog if clicking outside of it or hitting ESC key; Also, an app route change won't dismiss it
     */
    persistent? : boolean
    /**
     * User cannot dismiss Dialog by hitting ESC key; No need to set it if 'persistent' prop is also set
     */
    noEscDismiss? : boolean
    /**
     * User cannot dismiss Dialog by clicking outside of it; No need to set it if 'persistent' prop is also set
     */
    noBackdropDismiss? : boolean
    /**
     * Changing route app won't dismiss Dialog; No need to set it if 'persistent' prop is also set
     */
    noRouteDismiss? : boolean
    /**
     * Put Dialog into seamless mode; Does not use a backdrop so user is able to interact with the rest of the page too
     */
    seamless? : boolean
    /**
     * Put Dialog into maximized mode
     */
    maximized? : boolean
    /**
     * Dialog will try to render with same width as the window
     */
    fullWidth? : boolean
    /**
     * Dialog will try to render with same height as the window
     */
    fullHeight? : boolean
    /**
     * One of Quasar's embedded transitions
     */
    transitionShow? : string
    /**
     * One of Quasar's embedded transitions
     */
    transitionHide? : string
    /**
     * Use custom dialog component; use along with 'root' prop where possible; if using this prop, all others described here will be supplied to your custom component
     */
    component? : any
    /**
     * Required if using 'component' prop and you need access to vuex store, router and so on; Specify Vue parent component
     */
    parent? : any
    /**
     * Deprecated alias for parent
     */
    root? : any
}

import { QVueGlobals } from "./globals";
declare module "./globals" {
export interface QVueGlobals {
    addressbarColor: AddressbarColor
    fullscreen: AppFullscreen
    /**
     * Does the app have user focus? Or the app runs in the background / another tab has the user's attention
     */
    appVisible : boolean
    /**
     * Creates an ad-hoc Bottom Sheet; Same as calling $q.bottomSheet(...)
     * @param opts Bottom Sheet options
     * @returns Chainable Object
     */
    bottomSheet (opts : {
            /**
             * CSS Class name to apply to the Dialog's QCard
             */
            class? : string | any[] | any
            /**
             * CSS style to apply to the Dialog's QCard
             */
            style? : string | any[] | any
            /**
             * Title
             */
            title? : string
            /**
             * Message
             */
            message? : string
            /**
             * Array of Objects, each Object defining an action
             */
            actions? : any[]
            /**
             * Display actions as a grid instead of as a list
             */
            grid? : boolean
            /**
             * Apply dark mode
             */
            dark? : boolean
            /**
             * Put Bottom Sheet into seamless mode; Does not use a backdrop so user is able to interact with the rest of the page too
             */
            seamless? : boolean
            /**
             * User cannot dismiss Bottom Sheet if clicking outside of it or hitting ESC key
             */
            persistent? : boolean }): DialogChainObject
    cookies: Cookies
    /**
     * Creates an ad-hoc Dialog; Same as calling $q.dialog(...)
     * @param opts Dialog options
     * @returns Chainable Object
     */
    dialog (opts : QDialogOptions): DialogChainObject
    loading: Loading
    loadingBar: LoadingBar
    localStorage: LocalStorage
    /**
     * Creates a notification; Same as calling $q.notify(...)
     * @param opts For syntax, check quasar.conf options parameters
     * @returns Calling this function hides the notification
     */
    notify (opts : {
            /**
             * Color name for component from the Quasar Color Palette
             */
            color? : string
            /**
             * Color name for component from the Quasar Color Palette
             */
            textColor? : string
            /**
             * The content of your message
             */
            message : string
            /**
             * Render message as HTML; This can lead to XSS attacks, so make sure that you sanitize the message first
             */
            html? : boolean
            /**
             * Icon name following Quasar convention; make sure you have the icon library installed unless you are using 'img:' prefix
             */
            icon? : string
            /**
             * URL to an avatar/image; Suggestion: use statics folder
             */
            avatar? : string
            /**
             * Window side/corner to stick to
             */
            position? : string
            /**
             * Add CSS class(es) to the notification for easier customization
             */
            classes? : string
            /**
             * Amount of time to display (in milliseconds)
             */
            timeout? : number
            /**
             * Notification actions (buttons); If a 'handler' is specified or not, clicking/tapping on the button will also close the notification; Also check 'closeBtn' convenience prop
             */
            actions? : any[]
            /**
             * Function to call when notification gets dismissed
             */
            onDismiss? : Function
            /**
             * Convenience way to add a dismiss button with a specific label, without using the 'actions' convoluted prop
             */
            closeBtn? : string
            /**
             * Put notification into multi-line mode; If this prop isn't used and more than one 'action' is specified then notification goes into multi-line mode by default
             */
            multiLine? : boolean
            /**
             * Ignore the default configuration (set by setDefaults()) for this instance only
             */
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
        QVirtualScroll?: VueConstructor<QVirtualScroll>
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
export const QVirtualScroll: VueConstructor<QVirtualScroll>
export const Quasar: PluginObject<Partial<QuasarPluginOptions>>

import './vue'
