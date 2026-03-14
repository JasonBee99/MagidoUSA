path = '/home/jasonbee/adv.magidousa.com/src/lib/products.ts'

with open(path, 'r') as f:
    content = f.read()

old = "export function getSeriesByCategory(categorySlug: string): Series[] {\n  return (productsData.series as unknown as Series[]).filter(s => s.category === categorySlug);\n}"

new = """export function getSeriesByCategory(categorySlug: string): Series[] {
  const category = getCategoryBySlug(categorySlug);
  const seriesOrder: string[] = (category as unknown as Record<string, unknown>)?.seriesOrder as string[] ?? [];
  const filtered = (productsData.series as unknown as Series[]).filter(s => s.category === categorySlug);
  if (seriesOrder.length === 0) return filtered;
  return filtered.sort((a, b) => {
    const ai = seriesOrder.indexOf(a.slug);
    const bi = seriesOrder.indexOf(b.slug);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}"""

if old in content:
    content = content.replace(old, new)
    with open(path, 'w') as f:
        f.write(content)
    print('Done')
else:
    print('ERROR: anchor not found')
