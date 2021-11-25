import React from "react";

// TODO: Delete esto:
// https://twitter.com/intent/tweet?url=https://www.coderstool.com/share-social-link-generator&text=Hola%20paco%20que%20tal&via=@delineas

export default function TwitterLink({url, description}) {
  const link = `https://twitter.com/intent/tweet?url=${url}&text=${description}`;
  return (
      <a href={link}>Twitter</a>
  );
}