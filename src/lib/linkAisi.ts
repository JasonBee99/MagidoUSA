/** Replace plain "AISI 304 stainless steel" with a linked version for dangerouslySetInnerHTML */
export function linkAisi(text: string): string {
  return text.replace(
    /AISI 304 stainless steel/gi,
    '<a href="/solutions/aisi-304-stainless-steel-parts-washers" class="text-[#eb6c1c] hover:text-[#315687] font-medium">AISI 304 stainless steel</a>'
  );
}
