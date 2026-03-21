/** Replace plain "AISI 304 stainless steel" with a linked version for dangerouslySetInnerHTML */
export function linkAisi(text: string): string {
  return text.replace(
    /AISI 304 stainless steel/gi,
    '<a href="/solutions/aisi-304-stainless-steel-parts-washers" style="color:#eb6c1c;font-weight:500;text-decoration:none;" onmouseover="this.style.color=\'#315687\'" onmouseout="this.style.color=\'#eb6c1c\'">AISI 304 stainless steel</a>'
  );
}
