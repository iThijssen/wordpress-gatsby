export const useSlugify = () => {
  const slugify = text =>
    text
      .toString()
      .toLowerCase()
      .replace(/ä/g, "ae")
      .replace(/ü/g, "ue")
      .replace(/ö/g, "oe")
      .replace(/ß/g, "ss")
      .normalize() // The normalize() method returns the Unicode Normalization Form of a given string.
      .trim() // Remove whitespace from both sides of a string
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-") // Replace multiple - with single -
  return slugify
}
