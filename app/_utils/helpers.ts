/** Combines classes strings into one
 * @example ```js
 *   className={classNames("p-4", "text-green-400")} -> class="p-4 text-green-400"
 * ```
 */
export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

/** Checks if the string is a valid email
 * @example ```js
 *   validateEmail(somestring) -> false
 *   validateEmail(somestring@host) -> false
 *   validateEmail(somestring@host.com) -> true
 * ```
 */
export const validateEmail = (email: string) => {
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

/** Converts strings to title case format
 * @example ```js
 *   my title -> My Title
 * ```
 */
export const titleCase = (str: string) => {
  return str
    .split(" ")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
    .join(" ");
};

/** Sorts strings alphabetically
 * @example ```js
 *   someArray.sort((a, b) => sortByString(a, b,  'desc'))
 * ```
 */
export const sortByString = (
  a: string,
  b: string,
  order: "asc" | "desc" = "asc"
) => {
  const firstValue = order === "asc" ? a : b;
  const secondValue = order === "asc" ? b : a;
  return firstValue.localeCompare(secondValue);
};
