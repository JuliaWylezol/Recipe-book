export default function search(val, searchTerm, tagTerm) {
  if (searchTerm === '' && tagTerm === '') {
    return val;
  } else if (tagTerm === '' && val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    return val;
  } else if (
    val.category.toLowerCase() === tagTerm.toLowerCase() &&
    val.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    return val;
  } else if (
    val.difficulty.toLowerCase() === tagTerm.toLowerCase() &&
    val.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    return val;
  } else if (
    val.price.toLowerCase() === tagTerm.toLowerCase() &&
    val.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    return val;
  }
}
