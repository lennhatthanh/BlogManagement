import he from "he";

export const cleanHTMT = (html) => {
    const newhtml = he.decode(html).replace(/<[^>]*>/g, "");
    return newhtml;
};
