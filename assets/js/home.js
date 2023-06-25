function toggleStrikeThrough(checkbox) {
    const listItem = checkbox.closest('li');
    if (checkbox.checked) {
        listItem.classList.add('strikethrough');
    } else {
        listItem.classList.remove('strikethrough');
    }
}