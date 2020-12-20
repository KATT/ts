export const yamlishPrinter = (val: any, tab = '  ') => {
  const buffer: string[] = []
  const printNode = (node: any, indent: number) => {
    if (typeof node === 'undefined') {
      return
    }
    if (node && typeof node === 'object') {
      const entries = Object.entries(node).sort((...items) => {
        const keys = items.map(e => (e[1] && typeof e[1] === 'object' ? 'z' : typeof e[1]))
        return keys[0].localeCompare(keys[1])
      })
      entries.forEach(e => {
        buffer.push('\n' + tab.repeat(indent) + e[0] + ': ')
        printNode(e[1], indent + 1)
      })
      return
    }
    if (typeof node === 'string' && node.includes('\n')) {
      buffer.push('|-\n')
      node.split('\n').forEach((line, i, arr) => {
        buffer.push(tab.repeat(indent) + line + (i === arr.length - 1 ? '' : '\n'))
      })
      return
    }

    buffer.push(node?.toString())
  }

  printNode(val, 0)
  return buffer.join('').trimLeft()
}
