export const mapNumToSort = (key: number | undefined) => {
  switch (key) {
    case 0: return '技术分享';
    case 1: return 'bug 记录';
    case 2: return '周报';
  }
}