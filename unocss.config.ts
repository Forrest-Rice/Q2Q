import {
  defineConfig,
  toEscapedSelector as e,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({ scale: 1.2, warn: true }),
    presetTypography(),
    presetWebFonts({ fonts: { sans: 'DM Sans', serif: 'DM Serif Display', mono: 'DM Mono' } }),
  ],
  rules: [
    [/^z-(\d+)$/, ([, d]) => ({ 'z-index': `${d}` })],
    [/^h-(.+)$/, ([, a]) => {
      const numReg = /^((?![A-Za-z]).)*$/
      const h = numReg.test(a) ? `${a}%` : a
      return { height: h }
    }],
    [/^w-(.+)$/, ([, a]) => {
      const numReg = /^((?![A-Za-z]).)*$/
      const w = numReg.test(a) ? `${a}%` : a
      return { width: w }
    }],
    [/^p-(\w+)-(\w+)?-?(\w+)?-?(\w+)?$/, ([, t, r, b, l]) => {
      const effectiveArr = [t, r, b, l].filter(e => e)
      const numReg = /^((?![A-Za-z]).)*$/
      const paddingList = effectiveArr.map(e => numReg.test(e) ? `${e}%` : e)
      return effectiveArr.length === 0 ? { padding: '0px' } : { padding: paddingList.join(' ') }
    }],
    [/^m-(\w+)-(\w+)?-?(\w+)?-?(\w+)?$/, ([, t, r, b, l]) => {
      const effectiveArr = [t, r, b, l].filter(e => e)
      const numReg = /^((?![A-Za-z]).)*$/
      const marginList = effectiveArr.map(e => numReg.test(e) ? `${e}%` : e)
      return effectiveArr.length === 0 ? { margin: '0px' } : { margin: marginList.join(' ') }
    }],
    ['fr-b', { 'display': 'flex', 'justify-content': 'space-between' }],
    ['fr-c', { 'display': 'flex', 'justify-content': 'center' }],
    ['fr-e', { 'display': 'flex', 'justify-content': 'flex-end' }],
    ['fr-a', { 'display': 'flex', 'justify-content': 'space-around' }],

    ['fc-s', { 'display': 'flex', 'flex-direction': 'column' }],
    ['fc-b', { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'space-between' }],
    ['fc-a', { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'space-around' }],
    ['fc-c', { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center' }],
    ['fc-e', { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'flex-end' }],
    ['ca-s', { 'align-items': 'stretch' }],
    ['ca-c', { 'align-items': 'center' }],
    ['ca-a', { 'align-items': 'space-around' }],
    ['ca-e', { 'align-items': 'flex-end' }],
    ['ela-s', { 'align-content': 'flex-start' }],
    ['ela-e', { 'align-content': 'flex-end' }],
    ['ela-c', { 'align-content': 'center' }],
    ['ela-b', { 'align-content': 'space-between;' }],
    ['ela-a', { 'align-content': 'space-around;' }],
    ['f-w', { 'flex-wrap': 'wrap' }],
    [/^fx-(\w+)-(\d+)?-?(\w+)?$/, ([, g, s, b]) => ({ flex: `${g},${s},${b}` })],

    [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })],
    [/^lh-(\d+)$/, ([, d]) => ({ 'line-height': `${d}px` })],
    [/^fw-(\d+)$/, ([, d]) => ({ 'font-weight': `${d}` })],
    [/^fw-(\d+)$/, ([, d]) => ({ 'font-weight': `${d}` })],

    [/^position-(\w+)$/, ([, w]) => ({ position: `${w}` })],
    ['po-r', { position: 'relative' }],
    ['po-a', { position: 'absolute' }],
    [/^pot-(\d+)$/, ([, d]) => ({ top: `${d}px` })],
    [/^pob-(\d+)$/, ([, d]) => ({ bottom: `${d}px` })],
    [/^pol-(\d+)$/, ([, d]) => ({ left: `${d}px` })],
    [/^por-(\d+)$/, ([, d]) => ({ right: `${d}px` })],
    [/^potPE-(\d+)$/, ([, d]) => ({ top: `${d}%` })],
    [/^pobPE-(\d+)$/, ([, d]) => ({ bottom: `${d}%` })],
    [/^polPE-(\d+)$/, ([, d]) => ({ left: `${d}%` })],
    [/^porPE-(\d+)$/, ([, d]) => ({ right: `${d}%` })],

    [/^bw-(\d+)$/, ([, d]) => ({ 'border-width': `${d}px` })],
    [/^bs-(\w+)$/, ([, w]) => ({ 'border-style': `${w}` })],
    [/^br-(\d+)$/, ([, d]) => ({ ' border-radius': `${d}px` })],

    ['cursor-p', { cursor: 'pointer' }],

    ['Heiti', { 'font-family': 'Adobe Heiti Std' }],

    [/^font-(.+)-(\d+)-(\w+)-(.+)$/, ([, ff, fs, fw, fc], { rawSelector }) => {
      const selector = e(rawSelector)
      const styleArr = { 'font-size': `${fs}px`, 'font-weight': fw, 'font-family': ff, 'color': `#${fc}` }

      let temp = ''
      for (const [key, value] of Object.entries(styleArr))
        temp += `${key}: ${value};`

      return `${selector}{${temp}}`
    }],
    ['pop-content-span', {
      ' font-size': '21px',
      'font-family': 'Adobe Heiti Std',
      'font-weight': 'normal',
      'color': ' #FFFFFF',
      'display': 'flex',
      'align-items': 'center',

      'background': 'linear-gradient(0deg, rgba(21, 244, 236, 0.41) 0%, #FFFFFF 100%)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    }],

    [/^padding-(\w+)-(\w+)?-?(\w+)?-?(\w+)?$/, ([, t, r, b, l]) => {
      const effectiveArr = [t, r, b, l].filter(e => e)
      const numReg = /^((?![A-Za-z]).)*$/
      const paddingList = effectiveArr.map(e => numReg.test(e) ? `${e}%` : e)

      return effectiveArr.length === 0 ? { padding: '0px' } : { padding: paddingList.join(' ') }
    }],
    [/^h-calc-(\w+)-(\w+)$/, ([, a, b]) => {
      const numReg = /^((?![A-Za-z]).)*$/
      const heightArr = [a, b].map(e => numReg.test(e) ? `${e}%` : e)
      return { height: `calc(${heightArr[0]} - ${heightArr[1]})` }
    }],
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
