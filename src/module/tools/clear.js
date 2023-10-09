export default (l = 0) => {
    if (l > 0) term.previousLine(l + 1);
    term.eraseDisplayBelow();
}