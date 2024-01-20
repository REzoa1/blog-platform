const cn = (...classes: Array<boolean | string>) => [...classes].filter(Boolean).join(' ')
const aaa = 1

export { cn, aaa }
