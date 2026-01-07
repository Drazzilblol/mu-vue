export const prepareText = (text?: string) => {
  const pattern = /(\*\*(.*)?\*\*)/g;
  const linkPattern = /\[(.+?)\]\((.+?)\)/g;
  const strong = text?.replace(pattern, "<strong>$2</strong>");
  const links = strong?.replace(
    linkPattern,
    '<a href="$2" class="underline hover:text-link" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return links;
};

export const highlightText = (text: string, query: string) => {
  const regex = new RegExp(query.trim(), "gi");
  return text.replace(regex, "<span class='text-yellow-300'>$&</span>");
};
