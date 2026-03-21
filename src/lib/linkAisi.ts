/** Replace plain "AISI 304 stainless steel" with a linked version for dangerouslySetInnerHTML */
export function linkAisi(text: string): string {
  return text.replace(
    /AISI 304 stainless steel/gi,
    '<a href="/solutions/aisi-304-stainless-steel-parts-washers" class="underline decoration-[#eb6c1c]/60 hover:decoration-[#eb6c1c]">AISI 304 stainless steel</a>'
  );
}
